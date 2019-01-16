import * as React from 'react';
import { BaseComponent, css, findIndex, findScrollableParent, getParent, divProperties, getNativeProps } from '../../Utilities';
import { ScrollToMode } from './List.types';
const RESIZE_DELAY = 16;
const MIN_SCROLL_UPDATE_DELAY = 100;
const MAX_SCROLL_UPDATE_DELAY = 500;
const IDLE_DEBOUNCE_DELAY = 200;
const DONE_SCROLLING_WAIT = 500;
const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_PAGE_HEIGHT = 30;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const PAGE_KEY_PREFIX = 'page-';
const SPACER_KEY_PREFIX = 'spacer-';
const EMPTY_RECT = {
    top: -1,
    bottom: -1,
    left: -1,
    right: -1,
    width: 0,
    height: 0
};
const _measurePageRect = (element) => element.getBoundingClientRect();
const _measureSurfaceRect = _measurePageRect;
const _measureScrollRect = _measurePageRect;
export class List extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._surface = React.createRef();
        this._onRenderPage = (pageProps, defaultRender) => {
            const { onRenderCell, role } = this.props;
            const { page: { items, startIndex }, ...divProps } = pageProps;
            const cellRole = role === undefined ? 'listitem' : 'presentation';
            const cells = (items || []).map((item, offset) => {
                const index = startIndex + offset;
                let itemKey = this.props.getKey ? this.props.getKey(item, index) : item && item.key;
                if (itemKey === null || itemKey === undefined) {
                    itemKey = index;
                }
                return (React.createElement("div", { role: cellRole, className: css('ms-List-cell'), key: itemKey, "data-list-index": index, "data-automationid": "ListCell" }, onRenderCell && onRenderCell(item, index, this.state.isScrolling)));
            });
            return React.createElement("div", Object.assign({}, divProps), cells);
        };
        this.state = {
            pages: [],
            isScrolling: false
        };
        this._estimatedPageHeight = 0;
        this._totalEstimates = 0;
        this._requiredWindowsAhead = 0;
        this._requiredWindowsBehind = 0;
        this._measureVersion = 0;
        this._onAsyncScroll = this._async.debounce(this._onAsyncScroll, MIN_SCROLL_UPDATE_DELAY, {
            leading: false,
            maxWait: MAX_SCROLL_UPDATE_DELAY
        });
        this._onAsyncIdle = this._async.debounce(this._onAsyncIdle, IDLE_DEBOUNCE_DELAY, {
            leading: false
        });
        this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
            leading: false
        });
        this._onScrollingDone = this._async.debounce(this._onScrollingDone, DONE_SCROLLING_WAIT, {
            leading: false
        });
        this._cachedPageHeights = {};
        this._estimatedPageHeight = 0;
        this._focusedIndex = -1;
        this._pageCache = {};
    }
    scrollToIndex(index, measureItem, scrollToMode = ScrollToMode.auto) {
        const startIndex = this.props.startIndex;
        const renderCount = this._getRenderCount();
        const endIndex = startIndex + renderCount;
        const allowedRect = this._allowedRect;
        let scrollTop = 0;
        let itemsPerPage = 1;
        for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
            const pageSpecification = this._getPageSpecification(itemIndex, allowedRect);
            const pageHeight = pageSpecification.height;
            itemsPerPage = pageSpecification.itemCount;
            const requestedIndexIsInPage = itemIndex <= index && itemIndex + itemsPerPage > index;
            if (requestedIndexIsInPage) {
                if (measureItem) {
                    const scrollRect = _measureScrollRect(this._scrollElement);
                    const scrollWindow = {
                        top: this._scrollElement.scrollTop,
                        bottom: this._scrollElement.scrollTop + scrollRect.height
                    };
                    const itemPositionWithinPage = index - itemIndex;
                    for (let itemIndexInPage = 0; itemIndexInPage < itemPositionWithinPage; ++itemIndexInPage) {
                        scrollTop += measureItem(itemIndex + itemIndexInPage);
                    }
                    const scrollBottom = scrollTop + measureItem(index);
                    switch (scrollToMode) {
                        case ScrollToMode.top:
                            this._scrollElement.scrollTop = scrollTop;
                            return;
                        case ScrollToMode.bottom:
                            this._scrollElement.scrollTop = scrollBottom - scrollRect.height;
                            return;
                        case ScrollToMode.center:
                            this._scrollElement.scrollTop = (scrollTop + scrollBottom - scrollRect.height) / 2;
                            return;
                        case ScrollToMode.auto:
                        default:
                            break;
                    }
                    const itemIsFullyVisible = scrollTop >= scrollWindow.top && scrollBottom <= scrollWindow.bottom;
                    if (itemIsFullyVisible) {
                        return;
                    }
                    const itemIsPartiallyAbove = scrollTop < scrollWindow.top;
                    const itemIsPartiallyBelow = scrollBottom > scrollWindow.bottom;
                    if (itemIsPartiallyAbove) {
                    }
                    else if (itemIsPartiallyBelow) {
                        scrollTop = scrollBottom - scrollRect.height;
                    }
                }
                this._scrollElement.scrollTop = scrollTop;
                return;
            }
            scrollTop += pageHeight;
        }
    }
    getStartItemIndexInView(measureItem) {
        const pages = this.state.pages || [];
        for (const page of pages) {
            const isPageVisible = !page.isSpacer && (this._scrollTop || 0) >= page.top && (this._scrollTop || 0) <= page.top + page.height;
            if (isPageVisible) {
                if (!measureItem) {
                    const rowHeight = Math.floor(page.height / page.itemCount);
                    return page.startIndex + Math.floor((this._scrollTop - page.top) / rowHeight);
                }
                else {
                    let totalRowHeight = 0;
                    for (let itemIndex = page.startIndex; itemIndex < page.startIndex + page.itemCount; itemIndex++) {
                        const rowHeight = measureItem(itemIndex);
                        if (page.top + totalRowHeight <= this._scrollTop && this._scrollTop < page.top + totalRowHeight + rowHeight) {
                            return itemIndex;
                        }
                        else {
                            totalRowHeight += rowHeight;
                        }
                    }
                }
            }
        }
        return 0;
    }
    componentDidMount() {
        this._updatePages();
        this._measureVersion++;
        this._scrollElement = findScrollableParent(this._root.current);
        this._events.on(window, 'resize', this._onAsyncResize);
        if (this._root.current) {
            this._events.on(this._root.current, 'focus', this._onFocus, true);
        }
        if (this._scrollElement) {
            this._events.on(this._scrollElement, 'scroll', this._onScroll);
            this._events.on(this._scrollElement, 'scroll', this._onAsyncScroll);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.items !== this.props.items ||
            newProps.renderCount !== this.props.renderCount ||
            newProps.startIndex !== this.props.startIndex) {
            this._resetRequiredWindows();
            this._requiredRect = null;
            this._measureVersion++;
            this._invalidatePageCache();
            this._updatePages(newProps);
        }
    }
    shouldComponentUpdate(newProps, newState) {
        const { pages: oldPages } = this.state;
        const { pages: newPages } = newState;
        let shouldComponentUpdate = false;
        if (!newState.isScrolling && this.state.isScrolling) {
            return true;
        }
        if (newProps.items === this.props.items && oldPages.length === newPages.length) {
            for (let i = 0; i < oldPages.length; i++) {
                const oldPage = oldPages[i];
                const newPage = newPages[i];
                if (oldPage.key !== newPage.key || oldPage.itemCount !== newPage.itemCount) {
                    shouldComponentUpdate = true;
                    break;
                }
            }
        }
        else {
            shouldComponentUpdate = true;
        }
        return shouldComponentUpdate;
    }
    forceUpdate() {
        this._invalidatePageCache();
        this._updateRenderRects(this.props, true);
        this._updatePages();
        this._measureVersion++;
        super.forceUpdate();
    }
    render() {
        const { className, role } = this.props;
        const { pages = [] } = this.state;
        const pageElements = [];
        const divProps = getNativeProps(this.props, divProperties);
        for (const page of pages) {
            pageElements.push(this._renderPage(page));
        }
        return (React.createElement("div", Object.assign({ ref: this._root }, divProps, { role: role === undefined ? 'list' : role, className: css('ms-List', className) }),
            React.createElement("div", { ref: this._surface, className: css('ms-List-surface'), role: "presentation" }, pageElements)));
    }
    _shouldVirtualize(props = this.props) {
        const { onShouldVirtualize } = props;
        return !onShouldVirtualize || onShouldVirtualize(props);
    }
    _invalidatePageCache() {
        this._pageCache = {};
    }
    _renderPage(page) {
        const { usePageCache } = this.props;
        let cachedPage;
        if (usePageCache) {
            cachedPage = this._pageCache[page.key];
            if (cachedPage && cachedPage.pageElement) {
                return cachedPage.pageElement;
            }
        }
        const pageStyle = this._getPageStyle(page);
        const { onRenderPage = this._onRenderPage } = this.props;
        const pageElement = onRenderPage({
            page: page,
            className: css('ms-List-page'),
            key: page.key,
            ref: page.key,
            style: pageStyle,
            role: 'presentation'
        }, this._onRenderPage);
        if (usePageCache && page.startIndex === 0) {
            this._pageCache[page.key] = {
                page: page,
                pageElement: pageElement
            };
        }
        return pageElement;
    }
    _getPageStyle(page) {
        const { getPageStyle } = this.props;
        return {
            ...(getPageStyle ? getPageStyle(page) : {}),
            ...(!page.items
                ? {
                    height: page.height
                }
                : {})
        };
    }
    _onFocus(ev) {
        let target = ev.target;
        while (target !== this._surface.current) {
            const indexString = target.getAttribute('data-list-index');
            if (indexString) {
                this._focusedIndex = Number(indexString);
                break;
            }
            target = getParent(target);
        }
    }
    _onScroll() {
        if (!this.state.isScrolling) {
            this.setState({ isScrolling: true });
        }
        this._resetRequiredWindows();
        this._onScrollingDone();
    }
    _resetRequiredWindows() {
        this._requiredWindowsAhead = 0;
        this._requiredWindowsBehind = 0;
    }
    _onAsyncScroll() {
        this._updateRenderRects();
        if (!this._materializedRect || !_isContainedWithin(this._requiredRect, this._materializedRect)) {
            this._updatePages();
        }
        else {
        }
    }
    _onAsyncIdle() {
        const { renderedWindowsAhead, renderedWindowsBehind } = this.props;
        const { _requiredWindowsAhead: requiredWindowsAhead, _requiredWindowsBehind: requiredWindowsBehind } = this;
        const windowsAhead = Math.min(renderedWindowsAhead, requiredWindowsAhead + 1);
        const windowsBehind = Math.min(renderedWindowsBehind, requiredWindowsBehind + 1);
        if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {
            this._requiredWindowsAhead = windowsAhead;
            this._requiredWindowsBehind = windowsBehind;
            this._updateRenderRects();
            this._updatePages();
        }
        if (renderedWindowsAhead > windowsAhead || renderedWindowsBehind > windowsBehind) {
            this._onAsyncIdle();
        }
    }
    _onScrollingDone() {
        this.setState({ isScrolling: false });
    }
    _onAsyncResize() {
        this.forceUpdate();
    }
    _updatePages(props = this.props) {
        if (!this._requiredRect) {
            this._updateRenderRects(props);
        }
        const newListState = this._buildPages(props);
        const oldListPages = this.state.pages;
        this._notifyPageChanges(oldListPages, newListState.pages);
        this.setState(newListState, () => {
            if (!props.getPageHeight) {
                const heightsChanged = this._updatePageMeasurements(newListState.pages);
                if (heightsChanged) {
                    this._materializedRect = null;
                    if (!this._hasCompletedFirstRender) {
                        this._hasCompletedFirstRender = true;
                        this._updatePages(props);
                    }
                    else {
                        this._onAsyncScroll();
                    }
                }
                else {
                    this._onAsyncIdle();
                }
            }
            else {
                this._onAsyncIdle();
            }
            if (props.onPagesUpdated) {
                props.onPagesUpdated(this.state.pages);
            }
        });
    }
    _notifyPageChanges(oldPages, newPages, props = this.props) {
        const { onPageAdded, onPageRemoved } = props;
        if (onPageAdded || onPageRemoved) {
            const renderedIndexes = {};
            for (const page of oldPages) {
                if (page.items) {
                    renderedIndexes[page.startIndex] = page;
                }
            }
            for (const page of newPages) {
                if (page.items) {
                    if (!renderedIndexes[page.startIndex]) {
                        this._onPageAdded(page);
                    }
                    else {
                        delete renderedIndexes[page.startIndex];
                    }
                }
            }
            for (const index in renderedIndexes) {
                if (renderedIndexes.hasOwnProperty(index)) {
                    this._onPageRemoved(renderedIndexes[index]);
                }
            }
        }
    }
    _updatePageMeasurements(pages) {
        let heightChanged = false;
        if (!this._shouldVirtualize()) {
            return heightChanged;
        }
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (page.items) {
                heightChanged = this._measurePage(page) || heightChanged;
            }
        }
        return heightChanged;
    }
    _measurePage(page) {
        let hasChangedHeight = false;
        const pageElement = this.refs[page.key];
        const cachedHeight = this._cachedPageHeights[page.startIndex];
        if (pageElement && this._shouldVirtualize() && (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)) {
            const newClientRect = {
                width: pageElement.clientWidth,
                height: pageElement.clientHeight
            };
            if (newClientRect.height || newClientRect.width) {
                hasChangedHeight = page.height !== newClientRect.height;
                page.height = newClientRect.height;
                this._cachedPageHeights[page.startIndex] = {
                    height: newClientRect.height,
                    measureVersion: this._measureVersion
                };
                this._estimatedPageHeight = Math.round((this._estimatedPageHeight * this._totalEstimates + newClientRect.height) / (this._totalEstimates + 1));
                this._totalEstimates++;
            }
        }
        return hasChangedHeight;
    }
    _onPageAdded(page) {
        const { onPageAdded } = this.props;
        if (onPageAdded) {
            onPageAdded(page);
        }
    }
    _onPageRemoved(page) {
        const { onPageRemoved } = this.props;
        if (onPageRemoved) {
            onPageRemoved(page);
        }
    }
    _buildPages(props) {
        let { renderCount } = props;
        const { items, startIndex, getPageHeight } = props;
        renderCount = this._getRenderCount(props);
        const materializedRect = { ...EMPTY_RECT };
        const pages = [];
        let itemsPerPage = 1;
        let pageTop = 0;
        let currentSpacer = null;
        const focusedIndex = this._focusedIndex;
        const endIndex = startIndex + renderCount;
        const shouldVirtualize = this._shouldVirtualize(props);
        const isFirstRender = this._estimatedPageHeight === 0 && !getPageHeight;
        const allowedRect = this._allowedRect;
        for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
            const pageSpecification = this._getPageSpecification(itemIndex, allowedRect);
            const pageHeight = pageSpecification.height;
            const pageData = pageSpecification.data;
            const key = pageSpecification.key;
            itemsPerPage = pageSpecification.itemCount;
            const pageBottom = pageTop + pageHeight - 1;
            const isPageRendered = findIndex(this.state.pages, (page) => !!page.items && page.startIndex === itemIndex) > -1;
            const isPageInAllowedRange = !allowedRect || (pageBottom >= allowedRect.top && pageTop <= allowedRect.bottom);
            const isPageInRequiredRange = !this._requiredRect || (pageBottom >= this._requiredRect.top && pageTop <= this._requiredRect.bottom);
            const isPageVisible = (!isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered))) || !shouldVirtualize;
            const isPageFocused = focusedIndex >= itemIndex && focusedIndex < itemIndex + itemsPerPage;
            const isFirstPage = itemIndex === startIndex;
            if (isPageVisible || isPageFocused || isFirstPage) {
                if (currentSpacer) {
                    pages.push(currentSpacer);
                    currentSpacer = null;
                }
                const itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
                const newPage = this._createPage(key, items.slice(itemIndex, itemIndex + itemsInPage), itemIndex, undefined, undefined, pageData);
                newPage.top = pageTop;
                newPage.height = pageHeight;
                pages.push(newPage);
                if (isPageInRequiredRange && this._allowedRect) {
                    _mergeRect(materializedRect, {
                        top: pageTop,
                        bottom: pageBottom,
                        height: pageHeight,
                        left: allowedRect.left,
                        right: allowedRect.right,
                        width: allowedRect.width
                    });
                }
            }
            else {
                if (!currentSpacer) {
                    currentSpacer = this._createPage(SPACER_KEY_PREFIX + itemIndex, undefined, itemIndex, 0, undefined, pageData, true);
                }
                currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1;
                currentSpacer.itemCount += itemsPerPage;
            }
            pageTop += pageBottom - pageTop + 1;
            if (isFirstRender && shouldVirtualize) {
                break;
            }
        }
        if (currentSpacer) {
            currentSpacer.key = SPACER_KEY_PREFIX + 'end';
            pages.push(currentSpacer);
        }
        this._materializedRect = materializedRect;
        return {
            pages: pages,
            measureVersion: this._measureVersion
        };
    }
    _getPageSpecification(itemIndex, visibleRect) {
        const { getPageSpecification } = this.props;
        if (getPageSpecification) {
            const pageData = getPageSpecification(itemIndex, visibleRect);
            const { itemCount = this._getItemCountForPage(itemIndex, visibleRect) } = pageData;
            const { height = this._getPageHeight(itemIndex, itemCount, visibleRect) } = pageData;
            return {
                itemCount: itemCount,
                height: height,
                data: pageData.data,
                key: pageData.key
            };
        }
        else {
            const itemCount = this._getItemCountForPage(itemIndex, visibleRect);
            return {
                itemCount: itemCount,
                height: this._getPageHeight(itemIndex, itemCount, visibleRect)
            };
        }
    }
    _getPageHeight(itemIndex, itemsPerPage, visibleRect) {
        if (this.props.getPageHeight) {
            return this.props.getPageHeight(itemIndex, visibleRect);
        }
        else {
            const cachedHeight = this._cachedPageHeights[itemIndex];
            return cachedHeight ? cachedHeight.height : this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT;
        }
    }
    _getItemCountForPage(itemIndex, visibileRect) {
        const itemsPerPage = this.props.getItemCountForPage ? this.props.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE;
        return itemsPerPage ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
    }
    _createPage(pageKey, items, startIndex = -1, count = items ? items.length : 0, style = {}, data = undefined, isSpacer) {
        pageKey = pageKey || PAGE_KEY_PREFIX + startIndex;
        const cachedPage = this._pageCache[pageKey];
        if (cachedPage && cachedPage.page) {
            return cachedPage.page;
        }
        if (items) {
            for (let i = 0; i < items.length; i++) {
                items[i] = items[i] || undefined;
            }
        }
        return {
            key: pageKey,
            startIndex: startIndex,
            itemCount: count,
            items: items,
            style: style || {},
            top: 0,
            height: 0,
            data: data,
            isSpacer: isSpacer || false
        };
    }
    _getRenderCount(props) {
        const { items, startIndex, renderCount } = props || this.props;
        return renderCount === undefined ? (items ? items.length - startIndex : 0) : renderCount;
    }
    _updateRenderRects(props, forceUpdate) {
        props = props || this.props;
        const { renderedWindowsAhead, renderedWindowsBehind } = props;
        const { pages } = this.state;
        if (!this._shouldVirtualize(props)) {
            return;
        }
        let surfaceRect = this._surfaceRect;
        const scrollHeight = this._scrollElement && this._scrollElement.scrollHeight;
        const scrollTop = this._scrollElement ? this._scrollElement.scrollTop : 0;
        if (this._surface.current &&
            (forceUpdate ||
                !pages ||
                !this._surfaceRect ||
                !scrollHeight ||
                scrollHeight !== this._scrollHeight ||
                Math.abs(this._scrollTop - scrollTop) > this._estimatedPageHeight / 3)) {
            surfaceRect = this._surfaceRect = _measureSurfaceRect(this._surface.current);
            this._scrollTop = scrollTop;
        }
        if (forceUpdate || !scrollHeight || scrollHeight !== this._scrollHeight) {
            this._measureVersion++;
        }
        this._scrollHeight = scrollHeight;
        const visibleTop = Math.max(0, -surfaceRect.top);
        const visibleRect = {
            top: visibleTop,
            left: surfaceRect.left,
            bottom: visibleTop + window.innerHeight,
            right: surfaceRect.right,
            width: surfaceRect.width,
            height: window.innerHeight
        };
        this._requiredRect = _expandRect(visibleRect, this._requiredWindowsBehind, this._requiredWindowsAhead);
        this._allowedRect = _expandRect(visibleRect, renderedWindowsBehind, renderedWindowsAhead);
    }
}
List.defaultProps = {
    startIndex: 0,
    onRenderCell: (item, index, containsFocus) => React.createElement("div", null, (item && item.name) || ''),
    renderedWindowsAhead: DEFAULT_RENDERED_WINDOWS_AHEAD,
    renderedWindowsBehind: DEFAULT_RENDERED_WINDOWS_BEHIND
};
function _expandRect(rect, pagesBefore, pagesAfter) {
    const top = rect.top - pagesBefore * rect.height;
    const height = rect.height + (pagesBefore + pagesAfter) * rect.height;
    return {
        top: top,
        bottom: top + height,
        height: height,
        left: rect.left,
        right: rect.right,
        width: rect.width
    };
}
function _isContainedWithin(innerRect, outerRect) {
    return (innerRect.top >= outerRect.top &&
        innerRect.left >= outerRect.left &&
        innerRect.bottom <= outerRect.bottom &&
        innerRect.right <= outerRect.right);
}
function _mergeRect(targetRect, newRect) {
    targetRect.top = newRect.top < targetRect.top || targetRect.top === -1 ? newRect.top : targetRect.top;
    targetRect.left = newRect.left < targetRect.left || targetRect.left === -1 ? newRect.left : targetRect.left;
    targetRect.bottom = newRect.bottom > targetRect.bottom || targetRect.bottom === -1 ? newRect.bottom : targetRect.bottom;
    targetRect.right = newRect.right > targetRect.right || targetRect.right === -1 ? newRect.right : targetRect.right;
    targetRect.width = targetRect.right - targetRect.left + 1;
    targetRect.height = targetRect.bottom - targetRect.top + 1;
    return targetRect;
}
