import * as React from 'react';
import { BaseComponent, getId, KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
const getClassNames = classNamesFunction();
export class SearchBoxBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._rootElement = React.createRef();
        this._inputElement = React.createRef();
        this._onClickFocus = () => {
            const inputElement = this._inputElement.current;
            if (inputElement) {
                this.focus();
                inputElement.selectionStart = inputElement.selectionEnd = 0;
            }
        };
        this._onFocusCapture = (ev) => {
            this.setState({
                hasFocus: true
            });
            this._events.on(ev.currentTarget, 'blur', this._onBlur, true);
            if (this.props.onFocus) {
                this.props.onFocus(ev);
            }
        };
        this._onClearClick = (ev) => {
            const { clearButtonProps } = this.props;
            if (clearButtonProps && clearButtonProps.onClick) {
                clearButtonProps.onClick(ev);
            }
            if (!ev.defaultPrevented) {
                this._onClear(ev);
            }
        };
        this._onKeyDown = (ev) => {
            switch (ev.which) {
                case KeyCodes.escape:
                    this.props.onEscape && this.props.onEscape(ev);
                    if (!ev.defaultPrevented) {
                        this._onClear(ev);
                    }
                    break;
                case KeyCodes.enter:
                    if (this.props.onSearch) {
                        this.props.onSearch(this.state.value);
                    }
                    break;
                default:
                    this.props.onKeyDown && this.props.onKeyDown(ev);
                    if (!ev.defaultPrevented) {
                        return;
                    }
            }
            ev.preventDefault();
            ev.stopPropagation();
        };
        this._onBlur = (ev) => {
            this._events.off(this._rootElement.current, 'blur');
            this.setState({
                hasFocus: false
            });
            if (this.props.onBlur) {
                this.props.onBlur(ev);
            }
        };
        this._onInputChange = (ev) => {
            const value = ev.target.value;
            if (value === this._latestValue) {
                return;
            }
            this._latestValue = value;
            this.setState({ value });
            this._callOnChange(value);
        };
        this._warnDeprecations({
            labelText: 'placeholder',
            defaultValue: 'value'
        });
        this._latestValue = props.value || '';
        this.state = {
            value: this._latestValue,
            hasFocus: false,
            id: getId('SearchBox')
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.value !== undefined) {
            this._latestValue = newProps.value;
            this.setState({
                value: newProps.value || ''
            });
        }
    }
    render() {
        const { ariaLabel, placeholder, className, disabled, underlined, styles, labelText, theme, clearButtonProps, disableAnimation, iconProps } = this.props;
        const { value, hasFocus, id } = this.state;
        const placeholderValue = labelText === undefined ? placeholder : labelText;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            underlined,
            hasFocus,
            disabled,
            hasInput: value.length > 0,
            disableAnimation
        });
        const nativeProps = getNativeProps(this.props, inputProperties, ['id', 'className', 'placeholder', 'onFocus', 'onBlur', 'value']);
        return (React.createElement("div", { ref: this._rootElement, className: classNames.root, onFocusCapture: this._onFocusCapture },
            React.createElement("div", { className: classNames.iconContainer, onClick: this._onClickFocus, "aria-hidden": true },
                React.createElement(Icon, Object.assign({ iconName: "Search" }, iconProps, { className: classNames.icon }))),
            React.createElement("input", Object.assign({}, nativeProps, { id: id, className: classNames.field, placeholder: placeholderValue, onChange: this._onInputChange, onInput: this._onInputChange, onKeyDown: this._onKeyDown, value: value, disabled: disabled, "aria-label": ariaLabel ? ariaLabel : placeholder, ref: this._inputElement })),
            value.length > 0 && (React.createElement("div", { className: classNames.clearButton },
                React.createElement(IconButton, Object.assign({ styles: { root: { height: 'auto' }, icon: { fontSize: '12px' } }, iconProps: { iconName: 'Clear' } }, clearButtonProps, { onClick: this._onClearClick }))))));
    }
    focus() {
        if (this._inputElement.current) {
            this._inputElement.current.focus();
        }
    }
    hasFocus() {
        return !!this.state.hasFocus;
    }
    _onClear(ev) {
        this.props.onClear && this.props.onClear(ev);
        if (!ev.defaultPrevented) {
            this._latestValue = '';
            this.setState({
                value: ''
            });
            this._callOnChange('');
            ev.stopPropagation();
            ev.preventDefault();
            this.focus();
        }
    }
    _callOnChange(newValue) {
        const { onChange, onChanged } = this.props;
        if (onChanged) {
            onChanged(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
    }
}
SearchBoxBase.defaultProps = {
    disableAnimation: false,
    clearButtonProps: { ariaLabel: 'Clear text' }
};
