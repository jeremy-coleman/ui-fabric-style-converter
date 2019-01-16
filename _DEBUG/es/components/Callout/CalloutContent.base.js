import * as React from 'react';
import { DirectionalHint } from '../../common/DirectionalHint';
import { BaseComponent, assign, elementContains, focusFirstChild, getWindow, getDocument, css, getNativeProps, divProperties } from '../../Utilities';
import { positionCallout, getMaxHeight, RectangleEdge } from '../../utilities/positioning';
import { Popup } from '../../Popup';
import { classNamesFunction } from '../../Utilities';
import { AnimationClassNames } from '../../Styling';
const ANIMATIONS = {
    [RectangleEdge.top]: AnimationClassNames.slideUpIn10,
    [RectangleEdge.bottom]: AnimationClassNames.slideDownIn10,
    [RectangleEdge.left]: AnimationClassNames.slideLeftIn10,
    [RectangleEdge.right]: AnimationClassNames.slideRightIn10
};
const getClassNames = classNamesFunction();
const BORDER_WIDTH = 1;
const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };
const OFF_SCREEN_STYLE = { opacity: 0, filter: 'opacity(0)' };
export class CalloutContentBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._hostElement = React.createRef();
        this._calloutElement = React.createRef();
        this._hasListeners = false;
        this.dismiss = (ev) => {
            const { onDismiss } = this.props;
            if (onDismiss) {
                onDismiss(ev);
            }
        };
        this._setInitialFocus = () => {
            if (this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions && this._calloutElement.current) {
                this._didSetInitialFocus = true;
                this._async.requestAnimationFrame(() => focusFirstChild(this._calloutElement.current));
            }
        };
        this._onComponentDidMount = () => {
            this._addListeners();
            if (this.props.onLayerMounted) {
                this.props.onLayerMounted();
            }
            this._updateAsyncPosition();
            this._setHeightOffsetEveryFrame();
        };
        this._didSetInitialFocus = false;
        this.state = {
            positions: undefined,
            slideDirectionalClassName: undefined,
            calloutElementRect: undefined,
            heightOffset: 0
        };
        this._positionAttempts = 0;
    }
    componentDidUpdate() {
        this._setInitialFocus();
        if (!this.props.hidden) {
            if (!this._hasListeners) {
                this._addListeners();
            }
            this._updateAsyncPosition();
        }
        else {
            if (this._hasListeners) {
                this._removeListeners();
            }
        }
    }
    componentWillMount() {
        this._setTargetWindowAndElement(this._getTarget());
    }
    componentWillUpdate(newProps) {
        const newTarget = this._getTarget(newProps);
        const oldTarget = this._getTarget();
        if (newTarget !== oldTarget || typeof newTarget === 'string' || newTarget instanceof String) {
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.gapSpace !== this.props.gapSpace || this.props.beakWidth !== newProps.beakWidth) {
            this._maxHeight = undefined;
        }
        if (newProps.finalHeight !== this.props.finalHeight) {
            this._setHeightOffsetEveryFrame();
        }
        if (newProps.hidden && newProps.hidden !== this.props.hidden) {
            this.setState({
                positions: undefined
            });
        }
    }
    componentDidMount() {
        if (!this.props.hidden) {
            this._onComponentDidMount();
        }
    }
    render() {
        if (!this._targetWindow) {
            return null;
        }
        let { target } = this.props;
        const { styles, style, role, ariaLabel, ariaDescribedBy, ariaLabelledBy, className, isBeakVisible, children, beakWidth, calloutWidth, calloutMaxWidth, finalHeight, hideOverflow = !!finalHeight, backgroundColor, calloutMaxHeight, onScroll } = this.props;
        target = this._getTarget();
        const { positions } = this.state;
        const getContentMaxHeight = this._getMaxHeight() ? this._getMaxHeight() + this.state.heightOffset : undefined;
        const contentMaxHeight = calloutMaxHeight && getContentMaxHeight && calloutMaxHeight < getContentMaxHeight ? calloutMaxHeight : getContentMaxHeight;
        const overflowYHidden = hideOverflow;
        const beakVisible = isBeakVisible && !!target;
        this._classNames = getClassNames(styles, {
            theme: this.props.theme,
            className,
            overflowYHidden: overflowYHidden,
            calloutWidth,
            positions,
            beakWidth,
            backgroundColor,
            calloutMaxWidth
        });
        const overflowStyle = {
            ...style,
            maxHeight: contentMaxHeight,
            ...(overflowYHidden && { overflowY: 'hidden' })
        };
        const visibilityStyle = this.props.hidden ? { visibility: 'hidden' } : undefined;
        const content = (React.createElement("div", { ref: this._hostElement, className: this._classNames.container, style: visibilityStyle },
            React.createElement("div", Object.assign({}, getNativeProps(this.props, divProperties), { className: css(this._classNames.root, positions && positions.targetEdge && ANIMATIONS[positions.targetEdge]), style: positions ? positions.elementPosition : OFF_SCREEN_STYLE, tabIndex: -1, ref: this._calloutElement }),
                beakVisible && React.createElement("div", { className: this._classNames.beak, style: this._getBeakPosition() }),
                beakVisible && React.createElement("div", { className: this._classNames.beakCurtain }),
                !this.props.hidden && (React.createElement(Popup, { role: role, ariaLabel: ariaLabel, ariaDescribedBy: ariaDescribedBy, ariaLabelledBy: ariaLabelledBy, className: this._classNames.calloutMain, onDismiss: this.dismiss, onScroll: onScroll, shouldRestoreFocus: true, style: overflowStyle }, children)))));
        return content;
    }
    _dismissOnScroll(ev) {
        const { preventDismissOnScroll } = this.props;
        if (this.state.positions && !preventDismissOnScroll) {
            this._dismissOnLostFocus(ev);
        }
    }
    _dismissOnLostFocus(ev) {
        const target = ev.target;
        const clickedOutsideCallout = this._hostElement.current && !elementContains(this._hostElement.current, target);
        const { preventDismissOnLostFocus } = this.props;
        if (!preventDismissOnLostFocus &&
            ((!this._target && clickedOutsideCallout) ||
                (ev.target !== this._targetWindow &&
                    clickedOutsideCallout &&
                    (this._target.stopPropagation ||
                        (!this._target || (target !== this._target && !elementContains(this._target, target))))))) {
            this.dismiss(ev);
        }
    }
    _addListeners() {
        this._async.setTimeout(() => {
            this._events.on(this._targetWindow, 'scroll', this._dismissOnScroll, true);
            this._events.on(this._targetWindow, 'resize', this.dismiss, true);
            this._events.on(this._targetWindow.document.documentElement, 'focus', this._dismissOnLostFocus, true);
            this._events.on(this._targetWindow.document.documentElement, 'click', this._dismissOnLostFocus, true);
            this._hasListeners = true;
        }, 0);
    }
    _removeListeners() {
        this._events.off(this._targetWindow, 'scroll', this._dismissOnScroll, true);
        this._events.off(this._targetWindow, 'resize', this.dismiss, true);
        this._events.off(this._targetWindow.document.documentElement, 'focus', this._dismissOnLostFocus, true);
        this._events.off(this._targetWindow.document.documentElement, 'click', this._dismissOnLostFocus, true);
        this._hasListeners = false;
    }
    _updateAsyncPosition() {
        this._async.requestAnimationFrame(() => this._updatePosition());
    }
    _getBeakPosition() {
        const { positions } = this.state;
        const beakPostionStyle = {
            ...(positions && positions.beakPosition ? positions.beakPosition.elementPosition : null)
        };
        if (!beakPostionStyle.top && !beakPostionStyle.bottom && !beakPostionStyle.left && !beakPostionStyle.right) {
            beakPostionStyle.left = BEAK_ORIGIN_POSITION.left;
            beakPostionStyle.top = BEAK_ORIGIN_POSITION.top;
        }
        return beakPostionStyle;
    }
    _updatePosition() {
        this._setTargetWindowAndElement(this._getTarget());
        const { positions } = this.state;
        const hostElement = this._hostElement.current;
        const calloutElement = this._calloutElement.current;
        const expectsTarget = !!this.props.target;
        if (hostElement && calloutElement && (!expectsTarget || this._target)) {
            let currentProps;
            currentProps = assign(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            currentProps.target = this._target;
            const newPositions = positionCallout(currentProps, hostElement, calloutElement, positions);
            if ((!positions && newPositions) ||
                (positions && newPositions && !this._arePositionsEqual(positions, newPositions) && this._positionAttempts < 5)) {
                this._positionAttempts++;
                this.setState({
                    positions: newPositions
                });
            }
            else if (this._positionAttempts > 0) {
                this._positionAttempts = 0;
                if (this.props.onPositioned) {
                    this.props.onPositioned(this.state.positions);
                }
            }
        }
    }
    _getBounds() {
        if (!this._bounds) {
            let currentBounds = this.props.bounds;
            if (!currentBounds) {
                currentBounds = {
                    top: 0 + this.props.minPagePadding,
                    left: 0 + this.props.minPagePadding,
                    right: this._targetWindow.innerWidth - this.props.minPagePadding,
                    bottom: this._targetWindow.innerHeight - this.props.minPagePadding,
                    width: this._targetWindow.innerWidth - this.props.minPagePadding * 2,
                    height: this._targetWindow.innerHeight - this.props.minPagePadding * 2
                };
            }
            this._bounds = currentBounds;
        }
        return this._bounds;
    }
    _getMaxHeight() {
        if (!this._maxHeight) {
            if (this.props.directionalHintFixed && this._target) {
                const beakWidth = this.props.isBeakVisible ? this.props.beakWidth : 0;
                const gapSpace = this.props.gapSpace ? this.props.gapSpace : 0;
                const totalGap = gapSpace + beakWidth + BORDER_WIDTH * 2;
                this._async.requestAnimationFrame(() => {
                    if (this._target) {
                        this._maxHeight = getMaxHeight(this._target, this.props.directionalHint, totalGap, this._getBounds(), this.props.coverTarget);
                        this.forceUpdate();
                    }
                });
            }
            else {
                this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
            }
        }
        return this._maxHeight;
    }
    _arePositionsEqual(positions, newPosition) {
        return (this._comparePositions(positions.elementPosition, newPosition.elementPosition) &&
            this._comparePositions(positions.beakPosition.elementPosition, newPosition.beakPosition.elementPosition));
    }
    _comparePositions(oldPositions, newPositions) {
        for (const key in newPositions) {
            if (newPositions.hasOwnProperty(key)) {
                const oldPositionEdge = oldPositions[key];
                const newPositionEdge = newPositions[key];
                if (oldPositionEdge !== undefined && newPositionEdge !== undefined) {
                    if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
    _setTargetWindowAndElement(target) {
        if (target) {
            if (typeof target === 'string') {
                const currentDoc = getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = getWindow();
            }
            else if (target.stopPropagation) {
                this._targetWindow = getWindow(target.toElement);
                this._target = target;
            }
            else if (target.getBoundingClientRect) {
                const targetElement = target;
                this._targetWindow = getWindow(targetElement);
                this._target = target;
            }
            else {
                this._targetWindow = getWindow();
                this._target = target;
            }
        }
        else {
            this._targetWindow = getWindow();
        }
    }
    _setHeightOffsetEveryFrame() {
        if (this._calloutElement.current && this.props.finalHeight) {
            this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
                const calloutMainElem = this._calloutElement.current && this._calloutElement.current.lastChild;
                if (!calloutMainElem) {
                    return;
                }
                const cardScrollHeight = calloutMainElem.scrollHeight;
                const cardCurrHeight = calloutMainElem.offsetHeight;
                const scrollDiff = cardScrollHeight - cardCurrHeight;
                this.setState({
                    heightOffset: this.state.heightOffset + scrollDiff
                });
                if (calloutMainElem.offsetHeight < this.props.finalHeight) {
                    this._setHeightOffsetEveryFrame();
                }
                else {
                    this._async.cancelAnimationFrame(this._setHeightOffsetTimer);
                }
            });
        }
    }
    _getTarget(props = this.props) {
        const { target } = props;
        return target;
    }
}
CalloutContentBase.defaultProps = {
    preventDismissOnLostFocus: false,
    preventDismissOnScroll: false,
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint.bottomAutoEdge
};
