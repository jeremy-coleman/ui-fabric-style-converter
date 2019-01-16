import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, createRef } from '../../Utilities';
import { StickyPositionType } from './Sticky.types';
export class Sticky extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = createRef();
        this._stickyContentTop = createRef();
        this._stickyContentBottom = createRef();
        this._nonStickyContent = createRef();
        this._placeHolder = createRef();
        this.syncScroll = (container) => {
            const { nonStickyContent } = this;
            if (nonStickyContent && this.props.isScrollSynced) {
                nonStickyContent.scrollLeft = container.scrollLeft;
            }
        };
        this._onScrollEvent = (container, footerStickyContainer) => {
            if (this.root && this.nonStickyContent) {
                this._setDistanceFromTop(this._getNonStickyDistanceFromTop(container));
                let isStickyTop = false;
                let isStickyBottom = false;
                if (this.canStickyTop) {
                    const distanceToStickTop = this.distanceFromTop - this._getStickyDistanceFromTop();
                    isStickyTop = distanceToStickTop < container.scrollTop;
                }
                if (this.canStickyBottom && container.clientHeight - footerStickyContainer.offsetHeight <= this.distanceFromTop) {
                    isStickyBottom =
                        this.distanceFromTop - container.scrollTop >= this._getStickyDistanceFromTopForFooter(container, footerStickyContainer);
                }
                this.setState({
                    isStickyTop: this.canStickyTop && isStickyTop,
                    isStickyBottom: isStickyBottom
                });
            }
        };
        this._getStickyDistanceFromTop = () => {
            let distance = 0;
            if (this.stickyContentTop) {
                distance = this.stickyContentTop.offsetTop;
            }
            return distance;
        };
        this._getStickyDistanceFromTopForFooter = (container, footerStickyVisibleContainer) => {
            let distance = 0;
            if (this.stickyContentBottom) {
                distance = container.clientHeight - footerStickyVisibleContainer.offsetHeight + this.stickyContentBottom.offsetTop;
            }
            return distance;
        };
        this._getNonStickyDistanceFromTop = (container) => {
            let distance = 0;
            let currElem = this.root;
            if (currElem) {
                while (currElem && currElem.offsetParent !== container) {
                    distance += currElem.offsetTop;
                    currElem = currElem.offsetParent;
                }
                if (currElem && currElem.offsetParent === container) {
                    distance += currElem.offsetTop;
                }
            }
            return distance;
        };
        this.state = {
            isStickyTop: false,
            isStickyBottom: false
        };
        this.distanceFromTop = 0;
    }
    get root() {
        return this._root.current;
    }
    get placeholder() {
        return this._placeHolder.current;
    }
    get stickyContentTop() {
        return this._stickyContentTop.current;
    }
    get stickyContentBottom() {
        return this._stickyContentBottom.current;
    }
    get nonStickyContent() {
        return this._nonStickyContent.current;
    }
    get canStickyTop() {
        return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Header;
    }
    get canStickyBottom() {
        return this.props.stickyPosition === StickyPositionType.Both || this.props.stickyPosition === StickyPositionType.Footer;
    }
    componentDidMount() {
        const { scrollablePane } = this.context;
        if (!scrollablePane) {
            return;
        }
        scrollablePane.subscribe(this._onScrollEvent);
        scrollablePane.addSticky(this);
    }
    componentWillUnmount() {
        const { scrollablePane } = this.context;
        if (!scrollablePane) {
            return;
        }
        scrollablePane.unsubscribe(this._onScrollEvent);
        scrollablePane.removeSticky(this);
    }
    componentDidUpdate(prevProps, prevState) {
        const { scrollablePane } = this.context;
        if (!scrollablePane) {
            return;
        }
        if (prevState.isStickyTop !== this.state.isStickyTop || prevState.isStickyBottom !== this.state.isStickyBottom) {
            scrollablePane.updateStickyRefHeights();
            scrollablePane.syncScrollSticky(this);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (!this.context.scrollablePane) {
            return true;
        }
        const { isStickyTop, isStickyBottom } = this.state;
        return (isStickyTop !== nextState.isStickyTop ||
            isStickyBottom !== nextState.isStickyBottom ||
            this.props.stickyPosition !== nextProps.stickyPosition ||
            this.props.children !== nextProps.children ||
            (this._nonStickyContent &&
                this._nonStickyContent.current &&
                ((this._placeHolder &&
                    this._placeHolder.current &&
                    this._nonStickyContent.current.offsetHeight !== this._placeHolder.current.offsetHeight) ||
                    (this.stickyContentTop && this._nonStickyContent.current.offsetHeight !== this.stickyContentTop.offsetHeight) ||
                    (this.stickyContentBottom && this._nonStickyContent.current.offsetHeight !== this.stickyContentBottom.offsetHeight))));
    }
    render() {
        const { isStickyTop, isStickyBottom } = this.state;
        const { stickyClassName, children } = this.props;
        if (!this.context.scrollablePane) {
            return React.createElement("div", null, this.props.children);
        }
        return (React.createElement("div", { ref: this._root },
            this.canStickyTop && (React.createElement("div", { ref: this._stickyContentTop, "aria-hidden": !isStickyTop, style: { pointerEvents: isStickyTop ? 'auto' : 'none' } },
                React.createElement("div", { style: this._getStickyPlaceholderHeight(isStickyTop) }))),
            this.canStickyBottom && (React.createElement("div", { ref: this._stickyContentBottom, "aria-hidden": !isStickyBottom, style: { pointerEvents: isStickyBottom ? 'auto' : 'none' } },
                React.createElement("div", { style: this._getStickyPlaceholderHeight(isStickyBottom) }))),
            React.createElement("div", { style: this._getNonStickyPlaceholderHeight(), ref: this._placeHolder },
                React.createElement("div", { ref: this._nonStickyContent, className: isStickyTop || isStickyBottom ? stickyClassName : undefined, style: this._getContentStyles(isStickyTop || isStickyBottom) }, children))));
    }
    addSticky(stickyContent) {
        if (this.nonStickyContent) {
            stickyContent.appendChild(this.nonStickyContent);
        }
    }
    resetSticky() {
        if (this.nonStickyContent && this.placeholder) {
            this.placeholder.appendChild(this.nonStickyContent);
        }
    }
    setDistanceFromTop(container) {
        this._setDistanceFromTop(this._getNonStickyDistanceFromTop(container));
    }
    _setDistanceFromTop(distance) {
        const { scrollablePane } = this.context;
        if (this.distanceFromTop !== distance && scrollablePane) {
            this.distanceFromTop = distance;
            scrollablePane.sortSticky(this, true);
            this.forceUpdate();
            scrollablePane.syncScrollSticky(this);
        }
    }
    _getContentStyles(isSticky) {
        return {
            backgroundColor: this.props.stickyBackgroundColor || this._getBackground(),
            overflow: isSticky ? 'hidden' : ''
        };
    }
    _getStickyPlaceholderHeight(isSticky) {
        const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
        return {
            visibility: isSticky ? 'hidden' : 'visible',
            height: isSticky ? 0 : height
        };
    }
    _getNonStickyPlaceholderHeight() {
        const { isStickyTop, isStickyBottom } = this.state;
        if (isStickyTop || isStickyBottom) {
            const height = this.nonStickyContent ? this.nonStickyContent.offsetHeight : 0;
            return {
                height: height
            };
        }
        else {
            return {};
        }
    }
    _getBackground() {
        if (!this.root) {
            return undefined;
        }
        let curr = this.root;
        while (window.getComputedStyle(curr).getPropertyValue('background-color') === 'rgba(0, 0, 0, 0)' ||
            window.getComputedStyle(curr).getPropertyValue('background-color') === 'transparent') {
            if (curr.tagName === 'HTML') {
                return undefined;
            }
            if (curr.parentElement) {
                curr = curr.parentElement;
            }
        }
        return window.getComputedStyle(curr).getPropertyValue('background-color');
    }
}
Sticky.defaultProps = {
    stickyPosition: StickyPositionType.Both,
    isScrollSynced: true
};
Sticky.contextTypes = {
    scrollablePane: PropTypes.object
};
