import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps, getRTL } from '../../Utilities';
const getClassNames = classNamesFunction();
export class ScrollablePaneBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._stickyAboveRef = React.createRef();
        this._stickyBelowRef = React.createRef();
        this._contentContainer = React.createRef();
        this.subscribe = (handler) => {
            this._subscribers.add(handler);
        };
        this.unsubscribe = (handler) => {
            this._subscribers.delete(handler);
        };
        this.addSticky = (sticky) => {
            this._stickies.add(sticky);
            if (this.contentContainer) {
                sticky.setDistanceFromTop(this.contentContainer);
                this.sortSticky(sticky);
            }
            this.notifySubscribers();
        };
        this.removeSticky = (sticky) => {
            this._stickies.delete(sticky);
            this._removeStickyFromContainers(sticky);
            this.notifySubscribers();
        };
        this.sortSticky = (sticky, sortAgain) => {
            if (this.stickyAbove && this.stickyBelow) {
                if (sortAgain) {
                    this._removeStickyFromContainers(sticky);
                }
                if (sticky.canStickyTop && sticky.stickyContentTop) {
                    this._addToStickyContainer(sticky, this.stickyAbove, sticky.stickyContentTop);
                }
                if (sticky.canStickyBottom && sticky.stickyContentBottom) {
                    this._addToStickyContainer(sticky, this.stickyBelow, sticky.stickyContentBottom);
                }
            }
        };
        this.updateStickyRefHeights = () => {
            const stickyItems = this._stickies;
            let stickyTopHeight = 0;
            let stickyBottomHeight = 0;
            stickyItems.forEach((sticky) => {
                const { isStickyTop, isStickyBottom } = sticky.state;
                if (sticky.nonStickyContent) {
                    if (isStickyTop) {
                        stickyTopHeight += sticky.nonStickyContent.offsetHeight;
                    }
                    if (isStickyBottom) {
                        stickyBottomHeight += sticky.nonStickyContent.offsetHeight;
                    }
                    this._checkStickyStatus(sticky);
                }
            });
            this.setState({
                stickyTopHeight: stickyTopHeight,
                stickyBottomHeight: stickyBottomHeight
            });
        };
        this.notifySubscribers = () => {
            if (this.contentContainer) {
                this._subscribers.forEach(handle => {
                    handle(this.contentContainer, this.stickyBelow);
                });
            }
        };
        this.getScrollPosition = () => {
            if (this.contentContainer) {
                return this.contentContainer.scrollTop;
            }
            return 0;
        };
        this.syncScrollSticky = (sticky) => {
            if (sticky && this.contentContainer) {
                sticky.syncScroll(this.contentContainer);
            }
        };
        this._addToStickyContainer = (sticky, stickyContainer, stickyContentToAdd) => {
            if (!stickyContainer.children.length) {
                stickyContainer.appendChild(stickyContentToAdd);
            }
            else {
                if (!stickyContainer.contains(stickyContentToAdd)) {
                    const stickyChildrenElements = [].slice.call(stickyContainer.children);
                    const stickyList = [];
                    this._stickies.forEach(stickyItem => {
                        if (stickyContainer === this.stickyAbove && sticky.canStickyTop) {
                            stickyList.push(stickyItem);
                        }
                        else if (sticky.canStickyBottom) {
                            stickyList.push(stickyItem);
                        }
                    });
                    const stickyListSorted = stickyList
                        .sort((a, b) => {
                        return a.distanceFromTop - b.distanceFromTop;
                    })
                        .filter(item => {
                        const stickyContent = stickyContainer === this.stickyAbove ? item.stickyContentTop : item.stickyContentBottom;
                        if (stickyContent) {
                            return stickyChildrenElements.indexOf(stickyContent) > -1;
                        }
                    });
                    let targetStickyToAppendBefore = undefined;
                    for (const i in stickyListSorted) {
                        if (stickyListSorted[i].distanceFromTop >= sticky.distanceFromTop) {
                            targetStickyToAppendBefore = stickyListSorted[i];
                            break;
                        }
                    }
                    let targetContainer = null;
                    if (targetStickyToAppendBefore) {
                        targetContainer =
                            stickyContainer === this.stickyAbove
                                ? targetStickyToAppendBefore.stickyContentTop
                                : targetStickyToAppendBefore.stickyContentBottom;
                    }
                    stickyContainer.insertBefore(stickyContentToAdd, targetContainer);
                }
            }
        };
        this._removeStickyFromContainers = (sticky) => {
            if (this.stickyAbove && sticky.stickyContentTop && this.stickyAbove.contains(sticky.stickyContentTop)) {
                this.stickyAbove.removeChild(sticky.stickyContentTop);
            }
            if (this.stickyBelow && sticky.stickyContentBottom && this.stickyBelow.contains(sticky.stickyContentBottom)) {
                this.stickyBelow.removeChild(sticky.stickyContentBottom);
            }
        };
        this._onWindowResize = () => {
            const scrollbarWidth = this._getScrollbarWidth();
            const scrollbarHeight = this._getScrollbarHeight();
            this.setState({
                scrollbarWidth,
                scrollbarHeight
            });
            this.notifySubscribers();
        };
        this._getStickyContainerStyle = (height, isTop) => {
            return {
                height: height,
                ...(getRTL()
                    ? {
                        right: '0',
                        left: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`
                    }
                    : {
                        left: '0',
                        right: `${this.state.scrollbarWidth || this._getScrollbarWidth() || 0}px`
                    }),
                ...(isTop
                    ? {
                        top: '0'
                    }
                    : {
                        bottom: `${this.state.scrollbarHeight || this._getScrollbarHeight() || 0}px`
                    })
            };
        };
        this._onScroll = () => {
            const { contentContainer } = this;
            if (contentContainer) {
                this._stickies.forEach((sticky) => {
                    sticky.syncScroll(contentContainer);
                });
            }
            this._notifyThrottled();
        };
        this._subscribers = new Set();
        this._stickies = new Set();
        this.state = {
            stickyTopHeight: 0,
            stickyBottomHeight: 0,
            scrollbarWidth: undefined,
            scrollbarHeight: undefined
        };
        this._notifyThrottled = this._async.throttle(this.notifySubscribers, 50);
    }
    get root() {
        return this._root.current;
    }
    get stickyAbove() {
        return this._stickyAboveRef.current;
    }
    get stickyBelow() {
        return this._stickyBelowRef.current;
    }
    get contentContainer() {
        return this._contentContainer.current;
    }
    getChildContext() {
        return {
            scrollablePane: {
                subscribe: this.subscribe,
                unsubscribe: this.unsubscribe,
                addSticky: this.addSticky,
                removeSticky: this.removeSticky,
                updateStickyRefHeights: this.updateStickyRefHeights,
                sortSticky: this.sortSticky,
                notifySubscribers: this.notifySubscribers,
                syncScrollSticky: this.syncScrollSticky
            }
        };
    }
    componentDidMount() {
        const { initialScrollPosition } = this.props;
        this._events.on(this.contentContainer, 'scroll', this._onScroll);
        this._events.on(window, 'resize', this._onWindowResize);
        if (this.contentContainer && initialScrollPosition) {
            this.contentContainer.scrollTop = initialScrollPosition;
        }
        this.setStickiesDistanceFromTop();
        this._stickies.forEach(sticky => {
            this.sortSticky(sticky);
        });
        this.notifySubscribers();
        if ('MutationObserver' in window) {
            this._mutationObserver = new MutationObserver(mutation => {
                function checkIfMutationIsSticky(mutationRecord) {
                    if (this.stickyAbove !== null && this.stickyBelow !== null) {
                        return this.stickyAbove.contains(mutationRecord.target) || this.stickyBelow.contains(mutationRecord.target);
                    }
                    return false;
                }
                const scrollbarHeight = this._getScrollbarHeight();
                if (scrollbarHeight !== this.state.scrollbarHeight) {
                    this.setState({
                        scrollbarHeight: scrollbarHeight
                    });
                }
                this.notifySubscribers();
                if (mutation.some(checkIfMutationIsSticky.bind(this))) {
                    this.updateStickyRefHeights();
                }
                else {
                    const stickyList = [];
                    this._stickies.forEach(sticky => {
                        if (sticky.root && sticky.root.contains(mutation[0].target)) {
                            stickyList.push(sticky);
                        }
                    });
                    if (stickyList.length) {
                        stickyList.forEach(sticky => {
                            sticky.forceUpdate();
                        });
                    }
                }
            });
            if (this.root) {
                this._mutationObserver.observe(this.root, {
                    childList: true,
                    attributes: true,
                    subtree: true,
                    characterData: true
                });
            }
        }
    }
    componentWillUnmount() {
        this._events.off(this.contentContainer);
        this._events.off(window);
        if (this._mutationObserver) {
            this._mutationObserver.disconnect();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.children !== nextProps.children ||
            this.props.initialScrollPosition !== nextProps.initialScrollPosition ||
            this.props.className !== nextProps.className ||
            this.state.stickyTopHeight !== nextState.stickyTopHeight ||
            this.state.stickyBottomHeight !== nextState.stickyBottomHeight ||
            this.state.scrollbarWidth !== nextState.scrollbarWidth ||
            this.state.scrollbarHeight !== nextState.scrollbarHeight);
    }
    componentDidUpdate(prevProps, prevState) {
        const initialScrollPosition = this.props.initialScrollPosition;
        if (this.contentContainer && typeof initialScrollPosition === 'number' && prevProps.initialScrollPosition !== initialScrollPosition) {
            this.contentContainer.scrollTop = initialScrollPosition;
        }
        if (prevState.stickyTopHeight !== this.state.stickyTopHeight || prevState.stickyBottomHeight !== this.state.stickyBottomHeight) {
            this.notifySubscribers();
        }
        this._async.setTimeout(this._onWindowResize, 0);
    }
    render() {
        const { className, theme, styles } = this.props;
        const { stickyTopHeight, stickyBottomHeight } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            scrollbarVisibility: this.props.scrollbarVisibility
        });
        return (React.createElement("div", Object.assign({}, getNativeProps(this.props, divProperties), { ref: this._root, className: classNames.root }),
            React.createElement("div", { ref: this._contentContainer, className: classNames.contentContainer, "data-is-scrollable": true }, this.props.children),
            React.createElement("div", { ref: this._stickyAboveRef, className: classNames.stickyAbove, style: this._getStickyContainerStyle(stickyTopHeight, true) }),
            React.createElement("div", { className: classNames.stickyBelow, style: this._getStickyContainerStyle(stickyBottomHeight, false) },
                React.createElement("div", { ref: this._stickyBelowRef, className: classNames.stickyBelowItems }))));
    }
    setStickiesDistanceFromTop() {
        if (this.contentContainer) {
            this._stickies.forEach(sticky => {
                sticky.setDistanceFromTop(this.contentContainer);
            });
        }
    }
    forceLayoutUpdate() {
        this._onWindowResize();
    }
    _checkStickyStatus(sticky) {
        if (this.stickyAbove && this.stickyBelow && this.contentContainer && sticky.nonStickyContent) {
            if (sticky.state.isStickyTop || sticky.state.isStickyBottom) {
                if (sticky.state.isStickyTop && !this.stickyAbove.contains(sticky.nonStickyContent) && sticky.stickyContentTop) {
                    sticky.addSticky(sticky.stickyContentTop);
                }
                if (sticky.state.isStickyBottom && !this.stickyBelow.contains(sticky.nonStickyContent) && sticky.stickyContentBottom) {
                    sticky.addSticky(sticky.stickyContentBottom);
                }
            }
            else if (!this.contentContainer.contains(sticky.nonStickyContent)) {
                sticky.resetSticky();
            }
        }
    }
    _getScrollbarWidth() {
        const { contentContainer } = this;
        return contentContainer ? contentContainer.offsetWidth - contentContainer.clientWidth : undefined;
    }
    _getScrollbarHeight() {
        const { contentContainer } = this;
        return contentContainer ? contentContainer.offsetHeight - contentContainer.clientHeight : undefined;
    }
}
ScrollablePaneBase.childContextTypes = {
    scrollablePane: PropTypes.object
};
