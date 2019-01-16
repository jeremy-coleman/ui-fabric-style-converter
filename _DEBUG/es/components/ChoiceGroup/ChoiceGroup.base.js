import * as React from 'react';
import { Label } from '../../Label';
import { BaseComponent, classNamesFunction, find, getId } from '../../Utilities';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
const getClassNames = classNamesFunction();
export class ChoiceGroupBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._inputElement = React.createRef();
        this.focusedVars = {};
        this.changedVars = {};
        this._onFocus = (key) => this.focusedVars[key]
            ? this.focusedVars[key]
            : (this.focusedVars[key] = (ev, option) => {
                this.setState({
                    keyFocused: key,
                    keyChecked: this.state.keyChecked
                });
            });
        this._onBlur = (ev, option) => {
            this.setState({
                keyFocused: undefined,
                keyChecked: this.state.keyChecked
            });
        };
        this._onChange = (key) => this.changedVars[key]
            ? this.changedVars[key]
            : (this.changedVars[key] = (evt, option) => {
                const { onChanged, onChange, selectedKey, options = [] } = this.props;
                if (selectedKey === undefined) {
                    this.setState({
                        keyChecked: key
                    });
                }
                const originalOption = find(options, (value) => value.key === key);
                if (onChange) {
                    onChange(evt, originalOption);
                }
                else if (onChanged) {
                    onChanged(originalOption);
                }
            });
        this._warnDeprecations({ onChanged: 'onChange' });
        this._warnMutuallyExclusive({
            selectedKey: 'defaultSelectedKey'
        });
        this.state = {
            keyChecked: props.defaultSelectedKey === undefined ? this._getKeyChecked(props) : props.defaultSelectedKey,
            keyFocused: undefined
        };
        this._id = getId('ChoiceGroup');
        this._labelId = getId('ChoiceGroupLabel');
    }
    componentWillReceiveProps(newProps) {
        const newKeyChecked = this._getKeyChecked(newProps);
        const oldKeyChecked = this._getKeyChecked(this.props);
        if (newKeyChecked !== oldKeyChecked) {
            this.setState({
                keyChecked: newKeyChecked
            });
        }
    }
    render() {
        const { className, theme, styles, options, label, required, disabled, name, role } = this.props;
        const { keyChecked, keyFocused } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            optionsContainIconOrImage: options.some(option => Boolean(option.iconProps || option.imageSrc))
        });
        const ariaLabelledBy = this.props.ariaLabelledBy
            ? this.props.ariaLabelledBy
            : label
                ? this._id + '-label'
                : this.props['aria-labelledby'];
        const firstEnabledOption = disabled || options === undefined ? undefined : find(options, option => !option.disabled);
        const keyDefaultFocusable = keyChecked === undefined && firstEnabledOption ? firstEnabledOption.key : undefined;
        return (React.createElement("div", { role: role, className: classNames.applicationRole },
            React.createElement("div", Object.assign({ className: classNames.root, role: "radiogroup" }, ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy }),
                label && (React.createElement(Label, { className: classNames.label, required: required, id: this._id + '-label' }, label)),
                React.createElement("div", { className: classNames.flexContainer }, options.map((option) => {
                    const innerOptionProps = {
                        ...option,
                        focused: option.key === keyFocused,
                        checked: option.key === keyChecked,
                        'data-is-focusable': option.key === keyChecked || option.key === keyDefaultFocusable ? true : false,
                        disabled: option.disabled || disabled,
                        id: `${this._id}-${option.key}`,
                        labelId: `${this._labelId}-${option.key}`,
                        name: name || this._id,
                        required
                    };
                    return (React.createElement(ChoiceGroupOption, Object.assign({ key: option.key, onBlur: this._onBlur, onFocus: this._onFocus(option.key), onChange: this._onChange(option.key) }, innerOptionProps)));
                })))));
    }
    focus() {
        const { options } = this.props;
        if (options) {
            for (const option of options) {
                const elementToFocus = document.getElementById(`${this._id}-${option.key}`);
                if (elementToFocus && elementToFocus.getAttribute('data-is-focusable') === 'true') {
                    elementToFocus.focus();
                    return;
                }
            }
        }
        if (this._inputElement.current) {
            this._inputElement.current.focus();
        }
    }
    _getKeyChecked(props) {
        if (props.selectedKey !== undefined) {
            return props.selectedKey;
        }
        const { options = [] } = props;
        const optionsChecked = options.filter((option) => {
            return option.checked;
        });
        if (optionsChecked.length === 0) {
            return undefined;
        }
        else {
            return optionsChecked[0].key;
        }
    }
}
ChoiceGroupBase.defaultProps = {
    options: []
};
