import * as React from 'react';
import { BaseComponent, getId, classNamesFunction, mergeAriaAttributeValues } from '../../Utilities';
import { Icon } from '../../Icon';
import { KeytipData } from '../../KeytipData';
const getClassNames = classNamesFunction();
export class CheckboxBase extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this._checkBox = React.createRef();
        this._onFocus = (ev) => {
            const { inputProps } = this.props;
            if (inputProps && inputProps.onFocus) {
                inputProps.onFocus(ev);
            }
        };
        this._onBlur = (ev) => {
            const { inputProps } = this.props;
            if (inputProps && inputProps.onBlur) {
                inputProps.onBlur(ev);
            }
        };
        this._onChange = (ev) => {
            const { disabled, onChange } = this.props;
            const { isChecked } = this.state;
            if (!disabled) {
                if (onChange) {
                    onChange(ev, !isChecked);
                }
                if (this.props.checked === undefined) {
                    this.setState({ isChecked: !isChecked });
                }
            }
        };
        this._onRenderLabel = (props) => {
            const { label } = props;
            return label ? React.createElement("span", { className: this._classNames.text }, label) : null;
        };
        this._warnMutuallyExclusive({
            checked: 'defaultChecked'
        });
        this._id = this.props.id || getId('checkbox-');
        this.state = {
            isChecked: !!(props.checked !== undefined ? props.checked : props.defaultChecked)
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.checked !== undefined) {
            this.setState({
                isChecked: !!newProps.checked
            });
        }
    }
    render() {
        const { checked, className, defaultChecked, disabled, inputProps, name, boxSide, theme, ariaLabel, ariaLabelledBy, ariaDescribedBy, styles, onRenderLabel = this._onRenderLabel, checkmarkIconProps, ariaPositionInSet, ariaSetSize, keytipProps, title } = this.props;
        const isChecked = checked === undefined ? this.state.isChecked : checked;
        const isReversed = boxSide !== 'start' ? true : false;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className,
            disabled,
            checked: isChecked,
            reversed: isReversed,
            isUsingCustomLabelRender: onRenderLabel !== this._onRenderLabel
        });
        return (React.createElement(KeytipData, { keytipProps: keytipProps, disabled: disabled }, (keytipAttributes) => (React.createElement("div", { className: this._classNames.root },
            React.createElement("input", Object.assign({ type: "checkbox" }, inputProps, { "data-ktp-execute-target": keytipAttributes['data-ktp-execute-target'] }, checked !== undefined && { checked }, defaultChecked !== undefined && { defaultChecked }, { disabled: disabled, className: this._classNames.input, ref: this._checkBox, name: name, id: this._id, title: title, onChange: this._onChange, onFocus: this._onFocus, onBlur: this._onBlur, "aria-disabled": disabled, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby']), "aria-posinset": ariaPositionInSet, "aria-setsize": ariaSetSize })),
            React.createElement("label", { className: this._classNames.label, htmlFor: this._id },
                React.createElement("div", { className: this._classNames.checkbox, "data-ktp-target": keytipAttributes['data-ktp-target'] },
                    React.createElement(Icon, Object.assign({ iconName: "CheckMark" }, checkmarkIconProps, { className: this._classNames.checkmark }))),
                onRenderLabel(this.props, this._onRenderLabel))))));
    }
    get checked() {
        return this.state.isChecked;
    }
    focus() {
        if (this._checkBox.current) {
            this._checkBox.current.focus();
        }
    }
}
CheckboxBase.defaultProps = {
    boxSide: 'start'
};
