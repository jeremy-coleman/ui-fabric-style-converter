import * as React from 'react';
import { getClassNames } from './PositioningContainer.styles';
import { Layer } from '../../../Layer';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { BaseComponent, assign, css, elementContains, focusFirstChild, getWindow, getDocument } from '../../../Utilities';
import { getMaxHeight, positionElement, RectangleEdge } from '../../../utilities/positioning';
import { AnimationClassNames, mergeStyles } from '../../../Styling';
const OFF_SCREEN_STYLE = { opacity: 0 };
const BORDER_WIDTH = 1;
const SLIDE_ANIMATIONS = {
    [RectangleEdge.top]: 'slideUpIn20',
    [RectangleEdge.bottom]: 'slideDownIn20',
    [RectangleEdge.left]: 'slideLeftIn20',
    [RectangleEdge.right]: 'slideRightIn20'
};
export class PositioningContainer extends BaseComponent {
    constructor(props) {
        super(props);
        this._positionedHost = React.createRef();
        this._contentHost = React.createRef();
        this.dismiss = (ev) => {
            this.onResize(ev);
        };
        this.onResize = (ev) => {
            const { onDismiss } = this.props;
            if (onDismiss) {
                onDismiss(ev);
            }
            else {
                this._updateAsyncPosition();
            }
        };
        this._setInitialFocus = () => {
            if (this._contentHost.current && this.props.setInitialFocus && !this._didSetInitialFocus && this.state.positions) {
                this._didSetInitialFocus = true;
                focusFirstChild(this._contentHost.current);
            }
        };
        this._onComponentDidMount = () => {
            this._async.setTimeout(() => {
                this._events.on(this._targetWindow, 'scroll', this._async.throttle(this._dismissOnScroll, 10), true);
                this._events.on(this._targetWindow, 'resize', this._async.throttle(this.onResize, 10), true);
                this._events.on(this._targetWindow.document.body, 'focus', this._dismissOnLostFocus, true);
                this._events.on(this._targetWindow.document.body, 'click', this._dismissOnLostFocus, true);
            }, 0);
            if (this.props.onLayerMounted) {
                this.props.onLayerMounted();
            }
            this._updateAsyncPosition();
            this._setHeightOffsetEveryFrame();
        };
        this._didSetInitialFocus = false;
        this.state = {
            positions: undefined,
            heightOffset: 0
        };
        this._positionAttempts = 0;
    }
    componentWillMount() {
        this._setTargetWindowAndElement(this._getTarget());
    }
    componentDidMount() {
        this._onComponentDidMount();
    }
    componentDidUpdate() {
        this._setInitialFocus();
        this._updateAsyncPosition();
    }
    componentWillUpdate(newProps) {
        const newTarget = this._getTarget(newProps);
        const oldTarget = this._getTarget();
        if (newTarget !== oldTarget || typeof newTarget === 'string' || newTarget instanceof String) {
            this._maxHeight = undefined;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.offsetFromTarget !== this.props.offsetFromTarget) {
            this._maxHeight = undefined;
        }
        if (newProps.finalHeight !== this.props.finalHeight) {
            this._setHeightOffsetEveryFrame();
        }
    }
    render() {
        if (!this._targetWindow) {
            return null;
        }
        const { className, positioningContainerWidth, positioningContainerMaxHeight, children } = this.props;
        const { positions } = this.state;
        const styles = getClassNames();
        const directionalClassName = positions && positions.targetEdge ? AnimationClassNames[SLIDE_ANIMATIONS[positions.targetEdge]] : '';
        const getContentMaxHeight = this._getMaxHeight() + this.state.heightOffset;
        const contentMaxHeight = positioningContainerMaxHeight && positioningContainerMaxHeight > getContentMaxHeight
            ? getContentMaxHeight
            : positioningContainerMaxHeight;
        const content = (React.createElement("div", { ref: this._positionedHost, className: css('ms-PositioningContainer', styles.container) },
            React.createElement("div", { className: mergeStyles('ms-PositioningContainer-layerHost', styles.root, className, directionalClassName, !!positioningContainerWidth && { width: positioningContainerWidth }), style: positions ? positions.elementPosition : OFF_SCREEN_STYLE, tabIndex: -1, ref: this._contentHost },
                children,
                contentMaxHeight)));
        return this.props.doNotLayer ? content : React.createElement(Layer, null, content);
    }
    _dismissOnScroll(ev) {
        const { preventDismissOnScroll } = this.props;
        if (this.state.positions && !preventDismissOnScroll) {
            this._dismissOnLostFocus(ev);
        }
    }
    _dismissOnLostFocus(ev) {
        const target = ev.target;
        const clickedOutsideCallout = this._positionedHost.current && !elementContains(this._positionedHost.current, target);
        if ((!this._target && clickedOutsideCallout) ||
            (ev.target !== this._targetWindow &&
                clickedOutsideCallout &&
                (this._target.stopPropagation ||
                    (!this._target || (target !== this._target && !elementContains(this._target, target)))))) {
            this.onResize(ev);
        }
    }
    _updateAsyncPosition() {
        this._async.requestAnimationFrame(() => this._updatePosition());
    }
    _updatePosition() {
        const { positions } = this.state;
        const { offsetFromTarget, onPositioned } = this.props;
        const hostElement = this._positionedHost.current;
        const positioningContainerElement = this._contentHost.current;
        if (hostElement && positioningContainerElement) {
            let currentProps;
            currentProps = assign(currentProps, this.props);
            currentProps.bounds = this._getBounds();
            currentProps.target = this._target;
            if (document.body.contains(currentProps.target)) {
                currentProps.gapSpace = offsetFromTarget;
                const newPositions = positionElement(currentProps, hostElement, positioningContainerElement);
                if ((!positions && newPositions) ||
                    (positions && newPositions && !this._arePositionsEqual(positions, newPositions) && this._positionAttempts < 5)) {
                    this._positionAttempts++;
                    this.setState({
                        positions: newPositions
                    }, () => {
                        if (onPositioned) {
                            onPositioned(newPositions);
                        }
                    });
                }
                else {
                    this._positionAttempts = 0;
                    if (onPositioned) {
                        onPositioned(newPositions);
                    }
                }
            }
            else if (positions !== undefined) {
                this.setState({
                    positions: undefined
                });
            }
        }
    }
    _getBounds() {
        if (!this._positioningBounds) {
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
            this._positioningBounds = currentBounds;
        }
        return this._positioningBounds;
    }
    _getMaxHeight() {
        const { directionalHintFixed, offsetFromTarget, directionalHint } = this.props;
        if (!this._maxHeight) {
            if (directionalHintFixed && this._target) {
                const gapSpace = offsetFromTarget ? offsetFromTarget : 0;
                this._maxHeight = getMaxHeight(this._target, directionalHint, gapSpace, this._getBounds());
            }
            else {
                this._maxHeight = this._getBounds().height - BORDER_WIDTH * 2;
            }
        }
        return this._maxHeight;
    }
    _arePositionsEqual(positions, newPosition) {
        return this._comparePositions(positions.elementPosition, newPosition.elementPosition);
    }
    _comparePositions(oldPositions, newPositions) {
        for (const key in newPositions) {
            if (newPositions.hasOwnProperty(key)) {
                const oldPositionEdge = oldPositions[key];
                const newPositionEdge = newPositions[key];
                if (oldPositionEdge && newPositionEdge) {
                    if (oldPositionEdge.toFixed(2) !== newPositionEdge.toFixed(2)) {
                        return false;
                    }
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
            else if (target.x !== undefined && target.y !== undefined) {
                this._targetWindow = getWindow();
                this._target = target;
            }
            else {
                const targetElement = target;
                this._targetWindow = getWindow(targetElement);
                this._target = target;
            }
        }
        else {
            this._targetWindow = getWindow();
        }
    }
    _setHeightOffsetEveryFrame() {
        if (this._contentHost && this.props.finalHeight) {
            this._setHeightOffsetTimer = this._async.requestAnimationFrame(() => {
                if (!this._contentHost.current) {
                    return;
                }
                const positioningContainerMainElem = this._contentHost.current.lastChild;
                const cardScrollHeight = positioningContainerMainElem.scrollHeight;
                const cardCurrHeight = positioningContainerMainElem.offsetHeight;
                const scrollDiff = cardScrollHeight - cardCurrHeight;
                this.setState({
                    heightOffset: this.state.heightOffset + scrollDiff
                });
                if (positioningContainerMainElem.offsetHeight < this.props.finalHeight) {
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
PositioningContainer.defaultProps = {
    preventDismissOnScroll: false,
    offsetFromTarget: 0,
    minPagePadding: 8,
    directionalHint: DirectionalHint.bottomAutoEdge
};
