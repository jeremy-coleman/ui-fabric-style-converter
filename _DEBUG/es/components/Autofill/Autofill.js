import * as React from 'react';
import { BaseComponent, KeyCodes, getNativeProps, inputProperties } from '../../Utilities';
const SELECTION_FORWARD = 'forward';
const SELECTION_BACKWARD = 'backward';
export class Autofill extends BaseComponent {
    constructor(props) {
        super(props);
        this._inputElement = React.createRef();
        this._autoFillEnabled = true;
        this._onCompositionStart = (ev) => {
            this._autoFillEnabled = false;
        };
        this._onCompositionEnd = (ev) => {
            const inputValue = this._getCurrentInputValue();
            this._tryEnableAutofill(inputValue, this.value, false, true);
            const isKorean = ev.nativeEvent.locale === 'ko';
            this._async.setTimeout(() => {
                const updatedInputValue = isKorean ? this.value : inputValue;
                this._updateValue(updatedInputValue);
            }, 0);
        };
        this._onClick = () => {
            if (this._value && this._value !== '' && this._autoFillEnabled) {
                this._autoFillEnabled = false;
            }
        };
        this._onKeyDown = (ev) => {
            if (this.props.onKeyDown) {
                this.props.onKeyDown(ev);
            }
            if (!ev.nativeEvent.isComposing) {
                switch (ev.which) {
                    case KeyCodes.backspace:
                        this._autoFillEnabled = false;
                        break;
                    case KeyCodes.left:
                    case KeyCodes.right:
                        if (this._autoFillEnabled) {
                            this._value = this.state.displayValue;
                            this._autoFillEnabled = false;
                        }
                        break;
                    default:
                        if (!this._autoFillEnabled) {
                            if (this.props.enableAutofillOnKeyPress.indexOf(ev.which) !== -1) {
                                this._autoFillEnabled = true;
                            }
                        }
                        break;
                }
            }
        };
        this._onInputChanged = (ev) => {
            const value = this._getCurrentInputValue(ev);
            this._tryEnableAutofill(value, this._value, ev.nativeEvent.isComposing);
            this._updateValue(value);
        };
        this._onChanged = () => {
            return;
        };
        this._updateValue = (newValue) => {
            if (!newValue && newValue === this._value) {
                return;
            }
            this._value = this.props.onInputChange ? this.props.onInputChange(newValue) : newValue;
            this.setState({
                displayValue: this._getDisplayValue(this._value, this.props.suggestedDisplayValue)
            }, () => this._notifyInputChange(this._value));
        };
        this._value = props.defaultVisibleValue || '';
        this.state = {
            displayValue: props.defaultVisibleValue || ''
        };
    }
    get cursorLocation() {
        if (this._inputElement.current) {
            const inputElement = this._inputElement.current;
            if (inputElement.selectionDirection !== SELECTION_FORWARD) {
                return inputElement.selectionEnd;
            }
            else {
                return inputElement.selectionStart;
            }
        }
        else {
            return -1;
        }
    }
    get isValueSelected() {
        return Boolean(this.inputElement && this.inputElement.selectionStart !== this.inputElement.selectionEnd);
    }
    get value() {
        return this._value;
    }
    get selectionStart() {
        return this._inputElement.current ? this._inputElement.current.selectionStart : -1;
    }
    get selectionEnd() {
        return this._inputElement.current ? this._inputElement.current.selectionEnd : -1;
    }
    get inputElement() {
        return this._inputElement.current;
    }
    componentWillReceiveProps(nextProps) {
        let newValue;
        if (this.props.updateValueInWillReceiveProps) {
            newValue = this.props.updateValueInWillReceiveProps();
        }
        newValue = this._getDisplayValue(newValue ? newValue : this._value, nextProps.suggestedDisplayValue);
        if (typeof newValue === 'string') {
            this.setState({ displayValue: newValue });
        }
    }
    componentDidUpdate() {
        const value = this._value;
        const { suggestedDisplayValue, shouldSelectFullInputValueInComponentDidUpdate, preventValueSelection } = this.props;
        let differenceIndex = 0;
        if (preventValueSelection) {
            return;
        }
        if (this._autoFillEnabled && value && suggestedDisplayValue && this._doesTextStartWith(suggestedDisplayValue, value)) {
            let shouldSelectFullRange = false;
            if (shouldSelectFullInputValueInComponentDidUpdate) {
                shouldSelectFullRange = shouldSelectFullInputValueInComponentDidUpdate();
            }
            if (shouldSelectFullRange && this._inputElement.current) {
                this._inputElement.current.setSelectionRange(0, suggestedDisplayValue.length, SELECTION_BACKWARD);
            }
            else {
                while (differenceIndex < value.length &&
                    value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()) {
                    differenceIndex++;
                }
                if (differenceIndex > 0 && this._inputElement.current) {
                    this._inputElement.current.setSelectionRange(differenceIndex, suggestedDisplayValue.length, SELECTION_BACKWARD);
                }
            }
        }
    }
    render() {
        const { displayValue } = this.state;
        const nativeProps = getNativeProps(this.props, inputProperties);
        return (React.createElement("input", Object.assign({}, nativeProps, { ref: this._inputElement, value: displayValue, autoCapitalize: 'off', autoComplete: 'off', onCompositionStart: this._onCompositionStart, onCompositionEnd: this._onCompositionEnd, onChange: this._onChanged, onInput: this._onInputChanged, onKeyDown: this._onKeyDown, onClick: this.props.onClick ? this.props.onClick : this._onClick, "data-lpignore": true })));
    }
    focus() {
        this._inputElement.current && this._inputElement.current.focus();
    }
    clear() {
        this._autoFillEnabled = true;
        this._updateValue('');
        this._inputElement.current && this._inputElement.current.setSelectionRange(0, 0);
    }
    _getCurrentInputValue(ev) {
        if (ev && ev.target && ev.target.value) {
            return ev.target.value;
        }
        else if (this.inputElement && this.inputElement.value) {
            return this.inputElement.value;
        }
        else {
            return '';
        }
    }
    _tryEnableAutofill(newValue, oldValue, isComposing, isComposed) {
        if (!isComposing &&
            newValue &&
            this._inputElement.current &&
            this._inputElement.current.selectionStart === newValue.length &&
            !this._autoFillEnabled &&
            (newValue.length > oldValue.length || isComposed)) {
            this._autoFillEnabled = true;
        }
    }
    _notifyInputChange(newValue) {
        if (this.props.onInputValueChange) {
            this.props.onInputValueChange(newValue);
        }
    }
    _getDisplayValue(inputValue, suggestedDisplayValue) {
        let displayValue = inputValue;
        if (suggestedDisplayValue && inputValue && this._doesTextStartWith(suggestedDisplayValue, displayValue) && this._autoFillEnabled) {
            displayValue = suggestedDisplayValue;
        }
        return displayValue;
    }
    _doesTextStartWith(text, startWith) {
        if (!text || !startWith) {
            return false;
        }
        return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
    }
}
Autofill.defaultProps = {
    enableAutofillOnKeyPress: [KeyCodes.down, KeyCodes.up]
};
export class BaseAutoFill extends Autofill {
}
