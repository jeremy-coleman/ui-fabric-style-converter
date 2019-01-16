import * as React from 'react';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import { DelayedRender, BaseComponent, getId, getNativeProps, inputProperties, textAreaProperties, createRef, classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
const DEFAULT_STATE_VALUE = '';
export class TextFieldBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._textElement = createRef();
        this._onFocus = (ev) => {
            if (this.props.onFocus) {
                this.props.onFocus(ev);
            }
            this.setState({ isFocused: true });
            if (this.props.validateOnFocusIn) {
                this._validate(this.state.value);
            }
        };
        this._onBlur = (ev) => {
            if (this.props.onBlur) {
                this.props.onBlur(ev);
            }
            this.setState({ isFocused: false });
            if (this.props.validateOnFocusOut) {
                this._validate(this.state.value);
            }
        };
        this._onRenderLabel = (props) => {
            const { label, required } = props;
            const labelStyles = this._classNames.subComponentStyles
                ? this._classNames.subComponentStyles.label
                : undefined;
            if (label) {
                return (React.createElement(Label, { required: required, htmlFor: this._id, styles: labelStyles }, props.label));
            }
            return null;
        };
        this._onRenderDescription = (props) => {
            if (props.description) {
                return React.createElement("span", { className: this._classNames.description }, props.description);
            }
            return null;
        };
        this._onInputChange = (event) => {
            event.persist();
            const element = event.target;
            const value = element.value;
            if (value === this._latestValue) {
                return;
            }
            this._latestValue = value;
            this.setState({ value: value }, () => {
                this._adjustInputHeight();
                if (this.props.onChange) {
                    this.props.onChange(event, value);
                }
                if (this.props.onChanged) {
                    this.props.onChanged(value);
                }
            });
            const { validateOnFocusIn, validateOnFocusOut } = this.props;
            if (!(validateOnFocusIn || validateOnFocusOut)) {
                this._delayedValidate(value);
            }
            if (this.props.onBeforeChange) {
                this.props.onBeforeChange(value);
            }
        };
        this._warnDeprecations({
            iconClass: 'iconProps',
            addonString: 'prefix',
            onRenderAddon: 'onRenderPrefix',
            onChanged: 'onChange'
        });
        this._warnMutuallyExclusive({
            value: 'defaultValue'
        });
        this._id = props.id || getId('TextField');
        this._descriptionId = getId('TextFieldDescription');
        if (props.value !== undefined) {
            this._latestValue = props.value;
        }
        else if (props.defaultValue !== undefined) {
            this._latestValue = props.defaultValue;
        }
        else {
            this._latestValue = DEFAULT_STATE_VALUE;
        }
        this.state = {
            value: this._latestValue,
            isFocused: false,
            errorMessage: ''
        };
        this._delayedValidate = this._async.debounce(this._validate, this.props.deferredValidationTime);
        this._lastValidation = 0;
    }
    get value() {
        return this.state.value;
    }
    componentDidMount() {
        this._isMounted = true;
        this._adjustInputHeight();
        if (this.props.validateOnLoad) {
            this._validate(this.state.value);
        }
    }
    componentWillReceiveProps(newProps) {
        const { onBeforeChange } = this.props;
        if (newProps.value !== this.state.value && (newProps.value !== undefined || this.props.value !== undefined)) {
            if (onBeforeChange) {
                onBeforeChange(newProps.value);
            }
            this._id = newProps.id || this._id;
            this._setValue(newProps.value);
            const { validateOnFocusIn, validateOnFocusOut } = newProps;
            if (!(validateOnFocusIn || validateOnFocusOut)) {
                this._delayedValidate(newProps.value);
            }
        }
        if (newProps.defaultValue !== this.props.defaultValue && newProps.value === undefined) {
            this._setValue(newProps.defaultValue);
        }
        if (!!newProps.multiline !== !!this.props.multiline && this.state.isFocused) {
            this._shouldResetFocusAfterRender = true;
            this._selectionBeforeInputTypeChange = [this.selectionStart, this.selectionEnd];
        }
    }
    componentDidUpdate() {
        if (this._shouldResetFocusAfterRender) {
            this._shouldResetFocusAfterRender = false;
            this.focus();
            if (this._selectionBeforeInputTypeChange) {
                const [start, end] = this._selectionBeforeInputTypeChange;
                if (start !== null && end !== null) {
                    this.setSelectionRange(start, end);
                }
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { borderless, className, disabled, iconClass, iconProps, inputClassName, label, multiline, required, underlined, addonString, prefix, resizable, suffix, theme, styles, autoAdjustHeight, onRenderAddon = this._onRenderAddon, onRenderPrefix = this._onRenderPrefix, onRenderSuffix = this._onRenderSuffix, onRenderLabel = this._onRenderLabel, onRenderDescription = this._onRenderDescription } = this.props;
        const { isFocused } = this.state;
        const errorMessage = this._errorMessage;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className,
            disabled,
            focused: isFocused,
            required,
            multiline,
            hasLabel: !!label,
            hasErrorMessage: !!errorMessage,
            borderless,
            resizable,
            hasIcon: !!iconProps,
            underlined,
            iconClass,
            inputClassName,
            autoAdjustHeight
        });
        return (React.createElement("div", { className: this._classNames.root },
            React.createElement("div", { className: this._classNames.wrapper },
                onRenderLabel(this.props, this._onRenderLabel),
                React.createElement("div", { className: this._classNames.fieldGroup },
                    (addonString !== undefined || this.props.onRenderAddon) && (React.createElement("div", { className: this._classNames.prefix }, onRenderAddon(this.props, this._onRenderAddon))),
                    (prefix !== undefined || this.props.onRenderPrefix) && (React.createElement("div", { className: this._classNames.prefix }, onRenderPrefix(this.props, this._onRenderPrefix))),
                    multiline ? this._renderTextArea() : this._renderInput(),
                    (iconClass || iconProps) && React.createElement(Icon, Object.assign({ className: this._classNames.icon }, iconProps)),
                    (suffix !== undefined || this.props.onRenderSuffix) && (React.createElement("div", { className: this._classNames.suffix }, onRenderSuffix(this.props, this._onRenderSuffix))))),
            this._isDescriptionAvailable && (React.createElement("span", { id: this._descriptionId },
                onRenderDescription(this.props, this._onRenderDescription),
                errorMessage && (React.createElement("div", { role: "alert" },
                    React.createElement(DelayedRender, null,
                        React.createElement("p", { className: this._classNames.errorMessage },
                            React.createElement("span", { "data-automation-id": "error-message" }, errorMessage)))))))));
    }
    focus() {
        if (this._textElement.current) {
            this._textElement.current.focus();
        }
    }
    blur() {
        if (this._textElement.current) {
            this._textElement.current.blur();
        }
    }
    select() {
        if (this._textElement.current) {
            this._textElement.current.select();
        }
    }
    setSelectionStart(value) {
        if (this._textElement.current) {
            this._textElement.current.selectionStart = value;
        }
    }
    setSelectionEnd(value) {
        if (this._textElement.current) {
            this._textElement.current.selectionEnd = value;
        }
    }
    get selectionStart() {
        return this._textElement.current ? this._textElement.current.selectionStart : -1;
    }
    get selectionEnd() {
        return this._textElement.current ? this._textElement.current.selectionEnd : -1;
    }
    setSelectionRange(start, end) {
        if (this._textElement.current) {
            this._textElement.current.setSelectionRange(start, end);
        }
    }
    _setValue(value) {
        this._latestValue = value;
        this.setState({
            value: value || DEFAULT_STATE_VALUE,
            errorMessage: ''
        }, () => {
            this._adjustInputHeight();
        });
    }
    _onRenderAddon(props) {
        const { addonString } = props;
        return React.createElement("span", { style: { paddingBottom: '1px' } }, addonString);
    }
    _onRenderPrefix(props) {
        const { prefix } = props;
        return React.createElement("span", { style: { paddingBottom: '1px' } }, prefix);
    }
    _onRenderSuffix(props) {
        const { suffix } = props;
        return React.createElement("span", { style: { paddingBottom: '1px' } }, suffix);
    }
    get _errorMessage() {
        let { errorMessage } = this.state;
        if (!errorMessage && this.props.errorMessage) {
            errorMessage = this.props.errorMessage;
        }
        return errorMessage;
    }
    get _isDescriptionAvailable() {
        const props = this.props;
        return !!(props.onRenderDescription || props.description || this._errorMessage);
    }
    _renderTextArea() {
        const textAreaProps = getNativeProps(this.props, textAreaProperties, ['defaultValue']);
        return (React.createElement("textarea", Object.assign({ id: this._id }, textAreaProps, { ref: this._textElement, value: this.state.value, onInput: this._onInputChange, onChange: this._onInputChange, className: this._classNames.field, "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby'], "aria-invalid": !!this.state.errorMessage, "aria-label": this.props.ariaLabel, readOnly: this.props.readOnly, onFocus: this._onFocus, onBlur: this._onBlur })));
    }
    _renderInput() {
        const inputProps = getNativeProps(this.props, inputProperties, ['defaultValue']);
        return (React.createElement("input", Object.assign({ type: 'text', id: this._id }, inputProps, { ref: this._textElement, value: this.state.value, onInput: this._onInputChange, onChange: this._onInputChange, className: this._classNames.field, "aria-label": this.props.ariaLabel, "aria-describedby": this._isDescriptionAvailable ? this._descriptionId : this.props['aria-describedby'], "aria-invalid": !!this.state.errorMessage, readOnly: this.props.readOnly, onFocus: this._onFocus, onBlur: this._onBlur })));
    }
    _validate(value) {
        const { validateOnFocusIn, validateOnFocusOut } = this.props;
        if (this._latestValidateValue === value && !(validateOnFocusIn || validateOnFocusOut)) {
            return;
        }
        this._latestValidateValue = value;
        const onGetErrorMessage = this.props.onGetErrorMessage;
        const result = onGetErrorMessage(value || '');
        if (result !== undefined) {
            if (typeof result === 'string') {
                this.setState({ errorMessage: result });
                this._notifyAfterValidate(value, result);
            }
            else {
                const currentValidation = ++this._lastValidation;
                result.then((errorMessage) => {
                    if (this._isMounted && currentValidation === this._lastValidation) {
                        this.setState({ errorMessage });
                    }
                    this._notifyAfterValidate(value, errorMessage);
                });
            }
        }
        else {
            this._notifyAfterValidate(value, '');
        }
    }
    _notifyAfterValidate(value, errorMessage) {
        if (this._isMounted && value === this.state.value && this.props.onNotifyValidationResult) {
            this.props.onNotifyValidationResult(errorMessage, value);
        }
    }
    _adjustInputHeight() {
        if (this._textElement.current && this.props.autoAdjustHeight && this.props.multiline) {
            const textField = this._textElement.current;
            textField.style.height = '';
            textField.style.height = textField.scrollHeight + 'px';
        }
    }
}
TextFieldBase.defaultProps = {
    multiline: false,
    resizable: true,
    autoAdjustHeight: false,
    underlined: false,
    borderless: false,
    onChange: () => {
    },
    onBeforeChange: () => {
    },
    onNotifyValidationResult: () => {
    },
    onGetErrorMessage: () => undefined,
    deferredValidationTime: 200,
    errorMessage: '',
    validateOnFocusIn: false,
    validateOnFocusOut: false,
    validateOnLoad: true
};
