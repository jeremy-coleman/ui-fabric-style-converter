import * as React from 'react';
import { BaseComponent, classNamesFunction, elementContains, focusFirstChild, getDocument, KeyCodes, shallowCompare } from '../../Utilities';
import { DefaultPalette } from '../../Styling';
import { RectangleEdge, getOppositeEdge } from '../../utilities/positioning';
import { PositioningContainer } from './PositioningContainer/index';
import { Beak, BEAK_HEIGHT, BEAK_WIDTH } from './Beak/Beak';
import { DirectionalHint } from '../../common/DirectionalHint';
import { COACHMARK_HEIGHT, COACHMARK_WIDTH, getStyles } from './Coachmark.styles';
import { FocusTrapZone } from '../../FocusTrapZone';
const getClassNames = classNamesFunction();
export const COACHMARK_ATTRIBUTE_NAME = 'data-coachmarkid';
export class CoachmarkBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._entityHost = React.createRef();
        this._entityInnerHostElement = React.createRef();
        this._translateAnimationContainer = React.createRef();
        this._ariaAlertContainer = React.createRef();
        this._childrenContainer = React.createRef();
        this._positioningContainer = React.createRef();
        this.dismiss = (ev) => {
            const { onDismiss } = this.props;
            if (onDismiss) {
                onDismiss(ev);
            }
        };
        this._onKeyDown = (e) => {
            if ((e.altKey && e.which === KeyCodes.c) ||
                (e.which === KeyCodes.enter &&
                    this._translateAnimationContainer.current &&
                    this._translateAnimationContainer.current.contains(e.target))) {
                this._onFocusHandler();
            }
        };
        this._onFocusHandler = () => {
            if (this.state.isCollapsed) {
                this._openCoachmark();
            }
        };
        this._onPositioned = (positionData) => {
            this._async.requestAnimationFrame(() => {
                this.setState({
                    targetAlignment: positionData.alignmentEdge,
                    targetPosition: positionData.targetEdge
                });
            });
        };
        this._setBeakPosition = () => {
            let beakLeft;
            let beakTop;
            let beakRight;
            let beakBottom;
            let transformOriginX;
            let transformOriginY;
            const { targetAlignment } = this.state;
            const distanceAdjustment = '3px';
            switch (this._beakDirection) {
                case RectangleEdge.top:
                case RectangleEdge.bottom:
                    if (!targetAlignment) {
                        beakLeft = `calc(50% - ${BEAK_WIDTH / 2}px)`;
                        transformOriginX = 'center';
                    }
                    else {
                        if (targetAlignment === RectangleEdge.left) {
                            beakLeft = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
                            transformOriginX = 'left';
                        }
                        else {
                            beakRight = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
                            transformOriginX = 'right';
                        }
                    }
                    if (this._beakDirection === RectangleEdge.top) {
                        beakTop = distanceAdjustment;
                        transformOriginY = 'top';
                    }
                    else {
                        beakBottom = distanceAdjustment;
                        transformOriginY = 'bottom';
                    }
                    break;
                case RectangleEdge.left:
                case RectangleEdge.right:
                    if (!targetAlignment) {
                        beakTop = `calc(50% - ${BEAK_WIDTH / 2}px)`;
                        transformOriginY = `center`;
                    }
                    else {
                        if (targetAlignment === RectangleEdge.top) {
                            beakTop = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
                            transformOriginY = `top`;
                        }
                        else {
                            beakBottom = `${COACHMARK_WIDTH / 2 - BEAK_WIDTH / 2}px`;
                            transformOriginY = `bottom`;
                        }
                    }
                    if (this._beakDirection === RectangleEdge.left) {
                        beakLeft = distanceAdjustment;
                        transformOriginX = 'left';
                    }
                    else {
                        beakRight = distanceAdjustment;
                        transformOriginX = 'right';
                    }
                    break;
            }
            this.setState({
                beakLeft: beakLeft,
                beakRight: beakRight,
                beakBottom: beakBottom,
                beakTop: beakTop,
                transformOrigin: `${transformOriginX} ${transformOriginY}`
            });
        };
        this._openCoachmark = () => {
            this.setState({
                isCollapsed: false
            });
            if (this.props.onAnimationOpenStart) {
                this.props.onAnimationOpenStart();
            }
            this._entityInnerHostElement.current &&
                this._entityInnerHostElement.current.addEventListener('transitionend', () => {
                    this._async.setTimeout(() => {
                        if (this._entityInnerHostElement.current) {
                            focusFirstChild(this._entityInnerHostElement.current);
                        }
                    }, 1000);
                    if (this.props.onAnimationOpenEnd) {
                        this.props.onAnimationOpenEnd();
                    }
                });
        };
        this._warnDeprecations({
            teachingBubbleRef: undefined,
            collapsed: 'isCollapsed',
            beakWidth: undefined,
            beakHeight: undefined,
            width: undefined,
            height: undefined
        });
        this.state = {
            isCollapsed: props.isCollapsed,
            isBeaconAnimating: true,
            isMeasuring: true,
            entityInnerHostRect: {
                width: 0,
                height: 0
            },
            isMouseInProximity: false,
            isMeasured: false
        };
    }
    get _beakDirection() {
        const { targetPosition } = this.state;
        if (targetPosition === undefined) {
            return RectangleEdge.bottom;
        }
        return getOppositeEdge(targetPosition);
    }
    render() {
        const { children, target, color, positioningContainerProps, ariaDescribedBy, ariaDescribedByText, ariaLabelledBy, ariaLabelledByText, ariaAlertText, delayBeforeCoachmarkAnimation } = this.props;
        const { beakLeft, beakTop, beakRight, beakBottom, isCollapsed, isBeaconAnimating, isMeasuring, entityInnerHostRect, transformOrigin, alertText, isMeasured } = this.state;
        const classNames = getClassNames(getStyles, {
            isCollapsed: isCollapsed,
            isBeaconAnimating: isBeaconAnimating,
            isMeasuring: isMeasuring,
            entityHostHeight: `${entityInnerHostRect.height}px`,
            entityHostWidth: `${entityInnerHostRect.width}px`,
            width: `${COACHMARK_WIDTH}px`,
            height: `${COACHMARK_HEIGHT}px`,
            color: color,
            transformOrigin: transformOrigin,
            isMeasured: isMeasured,
            delayBeforeCoachmarkAnimation: `${delayBeforeCoachmarkAnimation}ms`
        });
        const finalHeight = isCollapsed ? COACHMARK_HEIGHT : entityInnerHostRect.height;
        return (React.createElement(PositioningContainer, Object.assign({ target: target, offsetFromTarget: BEAK_HEIGHT, componentRef: this._positioningContainer, finalHeight: finalHeight, onPositioned: this._onPositioned, bounds: this._getBounds() }, positioningContainerProps),
            React.createElement("div", { className: classNames.root },
                ariaAlertText && (React.createElement("div", { className: classNames.ariaContainer, role: "alert", ref: this._ariaAlertContainer, "aria-hidden": !isCollapsed }, alertText)),
                React.createElement("div", { className: classNames.pulsingBeacon }),
                React.createElement("div", { className: classNames.translateAnimationContainer, ref: this._translateAnimationContainer },
                    React.createElement("div", { className: classNames.scaleAnimationLayer },
                        React.createElement("div", { className: classNames.rotateAnimationLayer },
                            this._positioningContainer.current && isCollapsed && (React.createElement(Beak, { left: beakLeft, top: beakTop, right: beakRight, bottom: beakBottom, direction: this._beakDirection, color: color })),
                            React.createElement("div", { className: classNames.entityHost, ref: this._entityHost, tabIndex: -1, "data-is-focusable": true, role: "dialog", "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy },
                                isCollapsed && [
                                    ariaLabelledBy && (React.createElement("p", { id: ariaLabelledBy, key: 0, className: classNames.ariaContainer }, ariaLabelledByText)),
                                    ariaDescribedBy && (React.createElement("p", { id: ariaDescribedBy, key: 1, className: classNames.ariaContainer }, ariaDescribedByText))
                                ],
                                React.createElement(FocusTrapZone, { isClickableOutsideFocusTrap: true, forceFocusInsideTrap: false },
                                    React.createElement("div", { className: classNames.entityInnerHost, ref: this._entityInnerHostElement },
                                        React.createElement("div", { className: classNames.childrenContainer, ref: this._childrenContainer, "aria-hidden": isCollapsed }, children))))))))));
    }
    componentWillReceiveProps(newProps) {
        if (this.props.isCollapsed && !newProps.isCollapsed) {
            this._openCoachmark();
        }
    }
    shouldComponentUpdate(newProps, newState) {
        return !shallowCompare(newProps, this.props) || !shallowCompare(newState, this.state);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.targetAlignment !== this.state.targetAlignment || prevState.targetPosition !== this.state.targetPosition) {
            this._setBeakPosition();
        }
        if (prevProps.preventDismissOnLostFocus !== this.props.preventDismissOnLostFocus) {
            this._addListeners();
        }
    }
    componentDidMount() {
        this._async.requestAnimationFrame(() => {
            if (this._entityInnerHostElement.current && this.state.entityInnerHostRect.width + this.state.entityInnerHostRect.width === 0) {
                this.setState({
                    isMeasuring: false,
                    entityInnerHostRect: {
                        width: this._entityInnerHostElement.current.offsetWidth,
                        height: this._entityInnerHostElement.current.offsetHeight
                    },
                    isMeasured: true
                });
                this._setBeakPosition();
                this.forceUpdate();
            }
            this._addListeners();
            this._async.setTimeout(() => {
                this._addProximityHandler(this.props.mouseProximityOffset);
            }, this.props.delayBeforeMouseOpen);
            if (this.props.ariaAlertText) {
                this._async.setTimeout(() => {
                    if (this.props.ariaAlertText && this._ariaAlertContainer.current) {
                        this.setState({
                            alertText: this.props.ariaAlertText
                        });
                    }
                }, 0);
            }
            if (!this.props.preventFocusOnMount) {
                this._async.setTimeout(() => {
                    if (this._entityHost.current) {
                        this._entityHost.current.focus();
                    }
                }, 1000);
            }
        });
    }
    _addListeners() {
        const { preventDismissOnLostFocus } = this.props;
        const currentDoc = getDocument();
        this._events.off();
        if (currentDoc) {
            this._events.on(currentDoc, 'keydown', this._onKeyDown, true);
            if (!preventDismissOnLostFocus) {
                this._events.on(currentDoc, 'click', this._dismissOnLostFocus, true);
                this._events.on(currentDoc, 'focus', this._dismissOnLostFocus, true);
            }
        }
    }
    _dismissOnLostFocus(ev) {
        const clickTarget = ev.target;
        const clickedOutsideCallout = this._translateAnimationContainer.current && !elementContains(this._translateAnimationContainer.current, clickTarget);
        const { target } = this.props;
        if (clickedOutsideCallout && clickTarget !== target && !elementContains(target, clickTarget)) {
            this.dismiss(ev);
        }
    }
    _getBounds() {
        const { isPositionForced, positioningContainerProps } = this.props;
        if (isPositionForced) {
            if (positioningContainerProps &&
                (positioningContainerProps.directionalHint === DirectionalHint.topAutoEdge ||
                    positioningContainerProps.directionalHint === DirectionalHint.bottomAutoEdge)) {
                return {
                    left: 0,
                    top: -Infinity,
                    bottom: Infinity,
                    right: window.innerWidth,
                    width: window.innerWidth,
                    height: Infinity
                };
            }
            else {
                return {
                    left: -Infinity,
                    top: -Infinity,
                    bottom: Infinity,
                    right: Infinity,
                    width: Infinity,
                    height: Infinity
                };
            }
        }
        else {
            return undefined;
        }
    }
    _addProximityHandler(mouseProximityOffset = 0) {
        const timeoutIds = [];
        this._async.setTimeout(() => {
            this._setTargetElementRect();
            this._events.on(window, 'resize', () => {
                timeoutIds.forEach((value) => {
                    clearInterval(value);
                });
                timeoutIds.push(this._async.setTimeout(() => {
                    this._setTargetElementRect();
                }, 100));
            });
        }, 10);
        this._events.on(document, 'mousemove', (e) => {
            if (this.state.isCollapsed) {
                const mouseY = e.pageY;
                const mouseX = e.pageX;
                this._setTargetElementRect();
                const isMouseInProximity = this._isInsideElement(mouseX, mouseY, mouseProximityOffset);
                if (isMouseInProximity !== this.state.isMouseInProximity) {
                    this._openCoachmark();
                }
            }
            if (this.props.onMouseMove) {
                this.props.onMouseMove(e);
            }
        });
    }
    _setTargetElementRect() {
        if (this._translateAnimationContainer && this._translateAnimationContainer.current) {
            this._targetElementRect = this._translateAnimationContainer.current.getBoundingClientRect();
        }
    }
    _isInsideElement(mouseX, mouseY, mouseProximityOffset = 0) {
        return (mouseX > this._targetElementRect.left - mouseProximityOffset &&
            mouseX < this._targetElementRect.left + this._targetElementRect.width + mouseProximityOffset &&
            mouseY > this._targetElementRect.top - mouseProximityOffset &&
            mouseY < this._targetElementRect.top + this._targetElementRect.height + mouseProximityOffset);
    }
}
CoachmarkBase.defaultProps = {
    isCollapsed: true,
    mouseProximityOffset: 10,
    delayBeforeMouseOpen: 3600,
    delayBeforeCoachmarkAnimation: 0,
    color: DefaultPalette.themePrimary,
    isPositionForced: true,
    positioningContainerProps: {
        directionalHint: DirectionalHint.bottomAutoEdge
    }
};
