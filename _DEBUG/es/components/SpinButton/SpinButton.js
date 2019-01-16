import * as tslib_1 from "tslib";
import * as React from 'react';
import { IconButton } from '../../Button';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import { BaseComponent, getId, KeyCodes, customizable, calculatePrecision, precisionRound, createRef } from '../../Utilities';
import { Position } from '../../utilities/positioning';
import { getStyles, getArrowButtonStyles } from './SpinButton.styles';
import { getClassNames } from './SpinButton.classNames';
import { KeytipData } from '../../KeytipData';
export var KeyboardSpinDirection;
(function (KeyboardSpinDirection) {
    KeyboardSpinDirection[KeyboardSpinDirection["down"] = -1] = "down";
    KeyboardSpinDirection[KeyboardSpinDirection["notSpinning"] = 0] = "notSpinning";
    KeyboardSpinDirection[KeyboardSpinDirection["up"] = 1] = "up";
})(KeyboardSpinDirection || (KeyboardSpinDirection = {}));
let SpinButton = class SpinButton extends BaseComponent {
    constructor(props) {
        super(props);
        this._input = createRef();
        this._initialStepDelay = 400;
        this._stepDelay = 75;
        this._onFocus = (ev) => {
            if (!this._input.current) {
                return;
            }
            if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
                this._stop();
            }
            this._input.current.select();
            this.setState({ isFocused: true });
            if (this.props.onFocus) {
                this.props.onFocus(ev);
            }
        };
        this._onBlur = (ev) => {
            this._validate(ev);
            this.setState({ isFocused: false });
            if (this.props.onBlur) {
                this.props.onBlur(ev);
            }
        };
        this._onValidate = (value, event) => {
            if (this.props.onValidate) {
                return this.props.onValidate(value, event);
            }
            else {
                return this._defaultOnValidate(value);
            }
        };
        this._defaultOnValidate = (value) => {
            if (value === null || value.trim().length === 0 || isNaN(Number(value))) {
                return this._lastValidValue;
            }
            const newValue = Math.min(this.props.max, Math.max(this.props.min, Number(value)));
            return String(newValue);
        };
        this._onIncrement = (value) => {
            if (this.props.onIncrement) {
                return this.props.onIncrement(value);
            }
            else {
                return this._defaultOnIncrement(value);
            }
        };
        this._defaultOnIncrement = (value) => {
            let newValue = Math.min(Number(value) + Number(this.props.step), this.props.max);
            newValue = precisionRound(newValue, this.state.precision);
            return String(newValue);
        };
        this._onDecrement = (value) => {
            if (this.props.onDecrement) {
                return this.props.onDecrement(value);
            }
            else {
                return this._defaultOnDecrement(value);
            }
        };
        this._defaultOnDecrement = (value) => {
            let newValue = Math.max(Number(value) - Number(this.props.step), this.props.min);
            newValue = precisionRound(newValue, this.state.precision);
            return String(newValue);
        };
        this._validate = (event) => {
            if (this.state.value !== undefined && this._valueToValidate !== undefined && this._valueToValidate !== this._lastValidValue) {
                const newValue = this._onValidate(this._valueToValidate, event);
                if (newValue) {
                    this._lastValidValue = newValue;
                    this._valueToValidate = undefined;
                    this.setState({ value: newValue });
                }
            }
        };
        this._onInputChange = (event) => {
            const element = event.target;
            const value = element.value;
            this._valueToValidate = value;
            this.setState({
                value: value
            });
        };
        this._updateValue = (shouldSpin, stepDelay, stepFunction) => {
            const newValue = stepFunction(this.state.value);
            if (newValue) {
                this._lastValidValue = newValue;
                this.setState({ value: newValue });
            }
            if (this._spinningByMouse !== shouldSpin) {
                this._spinningByMouse = shouldSpin;
            }
            if (shouldSpin) {
                this._currentStepFunctionHandle = this._async.setTimeout(() => {
                    this._updateValue(shouldSpin, this._stepDelay, stepFunction);
                }, stepDelay);
            }
        };
        this._stop = () => {
            if (this._currentStepFunctionHandle >= 0) {
                this._async.clearTimeout(this._currentStepFunctionHandle);
                this._currentStepFunctionHandle = -1;
            }
            if (this._spinningByMouse || this.state.keyboardSpinDirection !== KeyboardSpinDirection.notSpinning) {
                this._spinningByMouse = false;
                this.setState({ keyboardSpinDirection: KeyboardSpinDirection.notSpinning });
            }
        };
        this._handleKeyDown = (event) => {
            if (event.which === KeyCodes.up || event.which === KeyCodes.down || event.which === KeyCodes.enter) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (this.props.disabled) {
                this._stop();
                return;
            }
            let spinDirection = KeyboardSpinDirection.notSpinning;
            switch (event.which) {
                case KeyCodes.up:
                    spinDirection = KeyboardSpinDirection.up;
                    this._updateValue(false, this._initialStepDelay, this._onIncrement);
                    break;
                case KeyCodes.down:
                    spinDirection = KeyboardSpinDirection.down;
                    this._updateValue(false, this._initialStepDelay, this._onDecrement);
                    break;
                case KeyCodes.enter:
                case KeyCodes.tab:
                    this._validate(event);
                    break;
                case KeyCodes.escape:
                    if (this.state.value !== this._lastValidValue) {
                        this.setState({ value: this._lastValidValue });
                    }
                    break;
                default:
                    break;
            }
            if (this.state.keyboardSpinDirection !== spinDirection) {
                this.setState({ keyboardSpinDirection: spinDirection });
            }
        };
        this._handleKeyUp = (event) => {
            if (this.props.disabled || event.which === KeyCodes.up || event.which === KeyCodes.down) {
                this._stop();
                return;
            }
        };
        this._onIncrementMouseDown = () => {
            this._updateValue(true, this._initialStepDelay, this._onIncrement);
        };
        this._onDecrementMouseDown = () => {
            this._updateValue(true, this._initialStepDelay, this._onDecrement);
        };
        this._warnMutuallyExclusive({
            value: 'defaultValue'
        });
        const value = props.value || props.defaultValue || String(props.min) || '0';
        this._lastValidValue = value;
        const precision = props.precision || Math.max(calculatePrecision(props.step), 0);
        this.state = {
            isFocused: false,
            value: value,
            keyboardSpinDirection: KeyboardSpinDirection.notSpinning,
            precision
        };
        this._currentStepFunctionHandle = -1;
        this._labelId = getId('Label');
        this._inputId = getId('input');
        this._spinningByMouse = false;
        this._valueToValidate = undefined;
    }
    componentWillReceiveProps(newProps) {
        this._lastValidValue = this.state.value;
        let value = newProps.value ? newProps.value : String(newProps.min);
        if (newProps.defaultValue) {
            value = String(Math.max(newProps.min, Math.min(newProps.max, Number(newProps.defaultValue))));
        }
        this.setState({
            value: value,
            precision: newProps.precision || this.state.precision
        });
    }
    render() {
        const { disabled, label, min, max, labelPosition, iconProps, incrementButtonIcon, incrementButtonAriaLabel, decrementButtonIcon, decrementButtonAriaLabel, title, ariaLabel, styles: customStyles, upArrowButtonStyles: customUpArrowButtonStyles, downArrowButtonStyles: customDownArrowButtonStyles, theme, ariaPositionInSet, ariaSetSize, ariaValueNow, ariaValueText, keytipProps, className } = this.props;
        const { isFocused, value, keyboardSpinDirection } = this.state;
        const classNames = this.props.getClassNames
            ? this.props.getClassNames(theme, !!disabled, !!isFocused, keyboardSpinDirection, labelPosition, className)
            : getClassNames(getStyles(theme, customStyles), !!disabled, !!isFocused, keyboardSpinDirection, labelPosition, className);
        return (React.createElement("div", { className: classNames.root },
            labelPosition !== Position.bottom && (React.createElement("div", { className: classNames.labelWrapper },
                iconProps && React.createElement(Icon, Object.assign({}, iconProps, { className: classNames.icon, "aria-hidden": "true" })),
                label && (React.createElement(Label, { id: this._labelId, htmlFor: this._inputId, className: classNames.label }, label)))),
            React.createElement(KeytipData, { keytipProps: keytipProps, disabled: disabled }, (keytipAttributes) => (React.createElement("div", { className: classNames.spinButtonWrapper, title: title && title, "aria-label": ariaLabel && ariaLabel, "aria-posinset": ariaPositionInSet, "aria-setsize": ariaSetSize, "data-ktp-target": keytipAttributes['data-ktp-target'] },
                React.createElement("input", { value: value, id: this._inputId, onChange: this._onChange, onInput: this._onInputChange, className: classNames.input, type: "text", autoComplete: "off", role: "spinbutton", "aria-labelledby": label && this._labelId, "aria-valuenow": !isNaN(Number(ariaValueNow)) ? ariaValueNow : !isNaN(Number(value)) ? Number(value) : undefined, "aria-valuetext": ariaValueText ? ariaValueText : isNaN(Number(value)) ? value : undefined, "aria-valuemin": min, "aria-valuemax": max, "aria-describedby": keytipAttributes['aria-describedby'], onBlur: this._onBlur, ref: this._input, onFocus: this._onFocus, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, readOnly: disabled, "aria-disabled": disabled, "data-lpignore": true, "data-ktp-execute-target": keytipAttributes['data-ktp-execute-target'] }),
                React.createElement("span", { className: classNames.arrowBox },
                    React.createElement(IconButton, { styles: getArrowButtonStyles(theme, true, customUpArrowButtonStyles), className: 'ms-UpButton', checked: keyboardSpinDirection === KeyboardSpinDirection.up, disabled: disabled, iconProps: incrementButtonIcon, onMouseDown: this._onIncrementMouseDown, onMouseLeave: this._stop, onMouseUp: this._stop, tabIndex: -1, ariaLabel: incrementButtonAriaLabel, "data-is-focusable": false }),
                    React.createElement(IconButton, { styles: getArrowButtonStyles(theme, false, customDownArrowButtonStyles), className: 'ms-DownButton', checked: keyboardSpinDirection === KeyboardSpinDirection.down, disabled: disabled, iconProps: decrementButtonIcon, onMouseDown: this._onDecrementMouseDown, onMouseLeave: this._stop, onMouseUp: this._stop, tabIndex: -1, ariaLabel: decrementButtonAriaLabel, "data-is-focusable": false }))))),
            labelPosition === Position.bottom && (React.createElement("div", { className: classNames.labelWrapper },
                iconProps && React.createElement(Icon, { iconName: iconProps.iconName, className: classNames.icon, "aria-hidden": "true" }),
                label && (React.createElement(Label, { id: this._labelId, htmlFor: this._inputId, className: classNames.label }, label))))));
    }
    focus() {
        if (this._input.current) {
            this._input.current.focus();
        }
    }
    get value() {
        return this.props.value === undefined ? this.state.value : this.props.value;
    }
    _onChange() {
    }
};
SpinButton.defaultProps = {
    step: 1,
    min: 0,
    max: 100,
    disabled: false,
    labelPosition: Position.start,
    label: '',
    incrementButtonIcon: { iconName: 'ChevronUpSmall' },
    decrementButtonIcon: { iconName: 'ChevronDownSmall' }
};
SpinButton = tslib_1.__decorate([
    customizable('SpinButton', ['theme', 'styles'], true)
], SpinButton);
export { SpinButton };
