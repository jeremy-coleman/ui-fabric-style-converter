import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode } from '../../Utilities';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { Label } from '../../Label';
export var ValuePosition;
(function (ValuePosition) {
    ValuePosition[ValuePosition["Previous"] = 0] = "Previous";
    ValuePosition[ValuePosition["Next"] = 1] = "Next";
})(ValuePosition || (ValuePosition = {}));
const getClassNames = classNamesFunction();
export class SliderBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._sliderLine = React.createRef();
        this._thumb = React.createRef();
        this._getAriaValueText = (value) => {
            if (this.props.ariaValueText && value !== undefined) {
                return this.props.ariaValueText(value);
            }
        };
        this._onMouseDownOrTouchStart = (event) => {
            if (event.type === 'mousedown') {
                this._events.on(window, 'mousemove', this._onMouseMoveOrTouchMove, true);
                this._events.on(window, 'mouseup', this._onMouseUpOrTouchEnd, true);
            }
            else if (event.type === 'touchstart') {
                this._events.on(window, 'touchmove', this._onMouseMoveOrTouchMove, true);
                this._events.on(window, 'touchend', this._onMouseUpOrTouchEnd, true);
            }
            this._onMouseMoveOrTouchMove(event, true);
        };
        this._onMouseMoveOrTouchMove = (event, suppressEventCancelation) => {
            if (!this._sliderLine.current) {
                return;
            }
            const { max, min, step } = this.props;
            const steps = (max - min) / step;
            const sliderPositionRect = this._sliderLine.current.getBoundingClientRect();
            const sliderLength = !this.props.vertical ? sliderPositionRect.width : sliderPositionRect.height;
            const stepLength = sliderLength / steps;
            let currentSteps;
            let distance;
            if (!this.props.vertical) {
                const left = this._getPosition(event, this.props.vertical);
                distance = getRTL() ? sliderPositionRect.right - left : left - sliderPositionRect.left;
                currentSteps = distance / stepLength;
            }
            else {
                const bottom = this._getPosition(event, this.props.vertical);
                distance = sliderPositionRect.bottom - bottom;
                currentSteps = distance / stepLength;
            }
            let currentValue;
            let renderedValue;
            if (currentSteps > Math.floor(steps)) {
                renderedValue = currentValue = max;
            }
            else if (currentSteps < 0) {
                renderedValue = currentValue = min;
            }
            else {
                renderedValue = min + step * currentSteps;
                currentValue = min + step * Math.round(currentSteps);
            }
            this._updateValue(currentValue, renderedValue);
            if (!suppressEventCancelation) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this._onMouseUpOrTouchEnd = (event) => {
            this.setState({
                renderedValue: this.state.value
            });
            if (this.props.onChanged) {
                this.props.onChanged(event, this.state.value);
            }
            this._events.off();
        };
        this._onKeyDown = (event) => {
            let value = this.state.value;
            const { max, min, step } = this.props;
            let diff = 0;
            switch (event.which) {
                case getRTLSafeKeyCode(KeyCodes.left):
                case KeyCodes.down:
                    diff = -step;
                    break;
                case getRTLSafeKeyCode(KeyCodes.right):
                case KeyCodes.up:
                    diff = step;
                    break;
                case KeyCodes.home:
                    value = min;
                    break;
                case KeyCodes.end:
                    value = max;
                    break;
                default:
                    return;
            }
            const newValue = Math.min(max, Math.max(min, value + diff));
            this._updateValue(newValue, newValue);
            event.preventDefault();
            event.stopPropagation();
        };
        this._warnMutuallyExclusive({
            value: 'defaultValue'
        });
        this._id = getId('Slider');
        const value = props.value !== undefined ? props.value : props.defaultValue !== undefined ? props.defaultValue : props.min;
        this.state = {
            value: value,
            renderedValue: value
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.value !== undefined) {
            const value = Math.max(newProps.min, Math.min(newProps.max, newProps.value));
            this.setState({
                value: value,
                renderedValue: value
            });
        }
    }
    render() {
        const { ariaLabel, className, disabled, label, max, min, showValue, buttonProps, vertical, valueFormat, styles, theme } = this.props;
        const { value, renderedValue } = this.state;
        const thumbOffsetPercent = min === max ? 0 : ((renderedValue - min) / (max - min)) * 100;
        const lengthString = vertical ? 'height' : 'width';
        const onMouseDownProp = disabled ? {} : { onMouseDown: this._onMouseDownOrTouchStart };
        const onTouchStartProp = disabled ? {} : { onTouchStart: this._onMouseDownOrTouchStart };
        const onKeyDownProp = disabled ? {} : { onKeyDown: this._onKeyDown };
        const classNames = getClassNames(styles, {
            className,
            disabled,
            vertical,
            showTransitions: renderedValue === value,
            showValue,
            theme: theme
        });
        const divButtonProps = buttonProps ? getNativeProps(buttonProps, divProperties) : undefined;
        return (React.createElement("div", { className: classNames.root },
            label && (React.createElement(Label, Object.assign({ className: classNames.titleLabel }, (ariaLabel ? {} : { htmlFor: this._id })), label)),
            React.createElement("div", { className: classNames.container },
                React.createElement("div", Object.assign({ "aria-valuenow": value, "aria-valuemin": min, "aria-valuemax": max, "aria-valuetext": this._getAriaValueText(value), "aria-label": ariaLabel || label, "aria-disabled": disabled }, onMouseDownProp, onTouchStartProp, onKeyDownProp, divButtonProps, { className: css(classNames.slideBox, buttonProps.className), id: this._id, role: "slider", tabIndex: disabled ? undefined : 0, "data-is-focusable": !disabled }),
                    React.createElement("div", { ref: this._sliderLine, className: classNames.line },
                        React.createElement("span", { ref: this._thumb, className: classNames.thumb, style: this._getThumbStyle(vertical, thumbOffsetPercent) }),
                        React.createElement("span", { className: css(classNames.lineContainer, classNames.activeSection), style: { [lengthString]: thumbOffsetPercent + '%' } }),
                        React.createElement("span", { className: css(classNames.lineContainer, classNames.inactiveSection), style: { [lengthString]: 100 - thumbOffsetPercent + '%' } }))),
                showValue && React.createElement(Label, { className: classNames.valueLabel }, valueFormat ? valueFormat(value) : value))));
    }
    focus() {
        if (this._thumb.current) {
            this._thumb.current.focus();
        }
    }
    get value() {
        return this.state.value;
    }
    _getThumbStyle(vertical, thumbOffsetPercent) {
        const direction = vertical ? 'bottom' : getRTL() ? 'right' : 'left';
        return {
            [direction]: thumbOffsetPercent + '%'
        };
    }
    _getPosition(event, vertical) {
        let currentPosition;
        switch (event.type) {
            case 'mousedown':
            case 'mousemove':
                currentPosition = !vertical ? event.clientX : event.clientY;
                break;
            case 'touchstart':
            case 'touchmove':
                currentPosition = !vertical ? event.touches[0].clientX : event.touches[0].clientY;
                break;
        }
        return currentPosition;
    }
    _updateValue(value, renderedValue) {
        const { step } = this.props;
        let numDec = 0;
        if (isFinite(step)) {
            while (Math.round(step * Math.pow(10, numDec)) / Math.pow(10, numDec) !== step) {
                numDec++;
            }
        }
        const roundedValue = parseFloat(value.toFixed(numDec));
        const valueChanged = roundedValue !== this.state.value;
        this.setState({
            value: roundedValue,
            renderedValue
        }, () => {
            if (valueChanged && this.props.onChange) {
                this.props.onChange(this.state.value);
            }
        });
    }
}
SliderBase.defaultProps = {
    step: 1,
    min: 0,
    max: 10,
    showValue: true,
    disabled: false,
    vertical: false,
    buttonProps: {}
};
