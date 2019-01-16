import * as tslib_1 from "tslib";
import * as React from 'react';
import { TextField } from '../TextField';
import { autobind, BaseComponent, KeyCodes } from '../../../Utilities';
import { clearNext, clearPrev, clearRange, DEFAULT_MASK_FORMAT_CHARS, getLeftFormatIndex, getMaskDisplay, getRightFormatIndex, insertString, parseMask } from './inputMask';
export const DEFAULT_MASK_CHAR = '_';
export class MaskedTextField extends BaseComponent {
    constructor(props) {
        super(props);
        this._skipComponentRefResolution = true;
        this._maskCharData = parseMask(props.mask, props.maskFormat);
        props.value && this.setValue(props.value);
        this._isFocused = false;
        this._moveCursorOnMouseUp = false;
        this.state = {
            displayValue: getMaskDisplay(props.mask, this._maskCharData, props.maskChar)
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.mask !== this.props.mask) {
            this._maskCharData = parseMask(newProps.mask, newProps.maskFormat);
            this.state = {
                displayValue: getMaskDisplay(newProps.mask, this._maskCharData, newProps.maskChar)
            };
        }
    }
    componentDidUpdate() {
        if (this.state.maskCursorPosition !== undefined) {
            this._textField.setSelectionRange(this.state.maskCursorPosition, this.state.maskCursorPosition);
        }
    }
    render() {
        return (React.createElement(TextField, Object.assign({}, this.props, { onFocus: this._onFocus, onBlur: this._onBlur, onMouseDown: this._onMouseDown, onMouseUp: this._onMouseUp, onChange: this._onInputChange, onBeforeChange: this._onBeforeChange, onKeyDown: this._onKeyDown, onPaste: this._onPaste, value: this.state.displayValue, componentRef: this._resolveRef('_textField') })));
    }
    get value() {
        let value = '';
        for (let i = 0; i < this._maskCharData.length; i++) {
            if (!this._maskCharData[i].value) {
                return undefined;
            }
            value += this._maskCharData[i].value;
        }
        return value;
    }
    setValue(newValue) {
        let valueIndex = 0, charDataIndex = 0;
        while (valueIndex < newValue.length && charDataIndex < this._maskCharData.length) {
            const testVal = newValue[valueIndex];
            if (this._maskCharData[charDataIndex].format.test(testVal)) {
                this._maskCharData[charDataIndex].value = testVal;
                charDataIndex++;
            }
            valueIndex++;
        }
    }
    focus() {
        this._textField && this._textField.focus();
    }
    blur() {
        this._textField && this._textField.blur();
    }
    select() {
        this._textField && this._textField.select();
    }
    setSelectionStart(value) {
        this._textField && this._textField.setSelectionStart(value);
    }
    setSelectionEnd(value) {
        this._textField && this._textField.setSelectionEnd(value);
    }
    setSelectionRange(start, end) {
        this._textField && this._textField.setSelectionRange(start, end);
    }
    get selectionStart() {
        return this._textField && this._textField.selectionStart !== null ? this._textField.selectionStart : -1;
    }
    get selectionEnd() {
        return this._textField && this._textField.selectionEnd ? this._textField.selectionEnd : -1;
    }
    _onFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
        this._isFocused = true;
        for (let i = 0; i < this._maskCharData.length; i++) {
            if (!this._maskCharData[i].value) {
                this.setState({
                    maskCursorPosition: this._maskCharData[i].displayIndex
                });
                break;
            }
        }
    }
    _onBlur(event) {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
        this._isFocused = false;
        this._moveCursorOnMouseUp = true;
    }
    _onMouseDown(event) {
        if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
        }
        if (!this._isFocused) {
            this._moveCursorOnMouseUp = true;
        }
    }
    _onMouseUp(event) {
        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
        if (this._moveCursorOnMouseUp) {
            this._moveCursorOnMouseUp = false;
            for (let i = 0; i < this._maskCharData.length; i++) {
                if (!this._maskCharData[i].value) {
                    this.setState({
                        maskCursorPosition: this._maskCharData[i].displayIndex
                    });
                    break;
                }
            }
        }
    }
    _onBeforeChange(value) {
        if (this.props.onBeforeChange) {
            this.props.onBeforeChange(value);
        }
        if (this._changeSelectionData === null) {
            this._changeSelectionData = {
                changeType: 'default',
                selectionStart: this._textField.selectionStart !== null ? this._textField.selectionStart : -1,
                selectionEnd: this._textField.selectionEnd !== null ? this._textField.selectionEnd : -1
            };
        }
    }
    _onInputChange(ev, value) {
        if (!this._changeSelectionData) {
            return;
        }
        const { displayValue } = this.state;
        let cursorPos = 0;
        const { changeType, selectionStart, selectionEnd } = this._changeSelectionData;
        if (changeType === 'textPasted') {
            const charsSelected = selectionEnd - selectionStart, charCount = value.length + charsSelected - displayValue.length, startPos = selectionStart, pastedString = value.substr(startPos, charCount);
            if (charsSelected) {
                this._maskCharData = clearRange(this._maskCharData, selectionStart, charsSelected);
            }
            cursorPos = insertString(this._maskCharData, startPos, pastedString);
        }
        else if (changeType === 'delete' || changeType === 'backspace') {
            const isDel = changeType === 'delete', charCount = selectionEnd - selectionStart;
            if (charCount) {
                this._maskCharData = clearRange(this._maskCharData, selectionStart, charCount);
                cursorPos = getRightFormatIndex(this._maskCharData, selectionStart);
            }
            else {
                if (isDel) {
                    this._maskCharData = clearNext(this._maskCharData, selectionStart);
                    cursorPos = getRightFormatIndex(this._maskCharData, selectionStart);
                }
                else {
                    this._maskCharData = clearPrev(this._maskCharData, selectionStart);
                    cursorPos = getLeftFormatIndex(this._maskCharData, selectionStart);
                }
            }
        }
        else if (value.length > displayValue.length) {
            const charCount = value.length - displayValue.length, startPos = selectionEnd - charCount, enteredString = value.substr(startPos, charCount);
            cursorPos = insertString(this._maskCharData, startPos, enteredString);
        }
        else if (value.length <= displayValue.length) {
            const charCount = 1, selectCount = displayValue.length + charCount - value.length, startPos = selectionEnd - charCount, enteredString = value.substr(startPos, charCount);
            this._maskCharData = clearRange(this._maskCharData, startPos, selectCount);
            cursorPos = insertString(this._maskCharData, startPos, enteredString);
        }
        this._changeSelectionData = null;
        const newValue = getMaskDisplay(this.props.mask, this._maskCharData, this.props.maskChar);
        this.setState({
            displayValue: newValue,
            maskCursorPosition: cursorPos
        });
        if (this.props.onChange) {
            this.props.onChange(ev, newValue);
        }
        if (this.props.onChanged) {
            this.props.onChanged(newValue);
        }
    }
    _onKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
        this._changeSelectionData = null;
        if (this._textField.value) {
            const { keyCode, ctrlKey, metaKey } = event;
            if (ctrlKey || metaKey) {
                return;
            }
            if (keyCode === KeyCodes.backspace || keyCode === KeyCodes.del) {
                const selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd;
                if (!(keyCode === KeyCodes.backspace && selectionEnd && selectionEnd > 0) &&
                    !(keyCode === KeyCodes.del && selectionStart !== null && selectionStart < this._textField.value.length)) {
                    return;
                }
                this._changeSelectionData = {
                    changeType: keyCode === KeyCodes.backspace ? 'backspace' : 'delete',
                    selectionStart: selectionStart !== null ? selectionStart : -1,
                    selectionEnd: selectionEnd !== null ? selectionEnd : -1
                };
            }
        }
    }
    _onPaste(event) {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
        const selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd;
        this._changeSelectionData = {
            changeType: 'textPasted',
            selectionStart: selectionStart !== null ? selectionStart : -1,
            selectionEnd: selectionEnd !== null ? selectionEnd : -1
        };
    }
}
MaskedTextField.defaultProps = {
    maskChar: DEFAULT_MASK_CHAR,
    maskFormat: DEFAULT_MASK_FORMAT_CHARS
};
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onFocus", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onBlur", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onMouseDown", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onMouseUp", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onBeforeChange", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onInputChange", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onKeyDown", null);
tslib_1.__decorate([
    autobind
], MaskedTextField.prototype, "_onPaste", null);
