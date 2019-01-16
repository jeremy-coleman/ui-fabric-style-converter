import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef, getId, inputProperties, getNativeProps } from '../../Utilities';
import { Label } from '../../Label';
import { KeytipData } from '../../KeytipData';
const getClassNames = classNamesFunction();
export class ToggleBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._toggleButton = createRef();
        this._onClick = (ev) => {
            const { disabled, checked: checkedProp, onChange, onChanged, onClick } = this.props;
            const { checked } = this.state;
            if (!disabled) {
                if (checkedProp === undefined) {
                    this.setState({
                        checked: !checked
                    });
                }
                if (onChange) {
                    onChange(ev, !checked);
                }
                if (onChanged) {
                    onChanged(!checked);
                }
                if (onClick) {
                    onClick(ev);
                }
            }
        };
        this._warnMutuallyExclusive({
            checked: 'defaultChecked'
        });
        this._warnDeprecations({
            onAriaLabel: 'ariaLabel',
            offAriaLabel: undefined,
            onChanged: 'onChange'
        });
        this.state = {
            checked: !!(props.checked || props.defaultChecked)
        };
        this._id = props.id || getId('Toggle');
    }
    get checked() {
        return this.state.checked;
    }
    componentWillReceiveProps(newProps) {
        if (newProps.checked !== undefined) {
            this.setState({
                checked: !!newProps.checked
            });
        }
    }
    render() {
        const { as: RootType = 'div', className, theme, disabled, keytipProps, label, ariaLabel, onAriaLabel, offAriaLabel, offText, onText, styles } = this.props;
        const { checked } = this.state;
        const stateText = checked ? onText : offText;
        const badAriaLabel = checked ? onAriaLabel : offAriaLabel;
        const toggleNativeProps = getNativeProps(this.props, inputProperties, ['defaultChecked']);
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            disabled,
            checked
        });
        return (React.createElement(RootType, { className: classNames.root },
            label && (React.createElement(Label, { htmlFor: this._id, className: classNames.label }, label)),
            React.createElement("div", { className: classNames.container },
                React.createElement(KeytipData, { keytipProps: keytipProps, ariaDescribedBy: toggleNativeProps['aria-describedby'], disabled: disabled }, (keytipAttributes) => (React.createElement("button", Object.assign({}, toggleNativeProps, keytipAttributes, { className: classNames.pill, disabled: disabled, id: this._id, type: "button", role: "switch", ref: this._toggleButton, "aria-disabled": disabled, "aria-checked": checked, "aria-label": ariaLabel ? ariaLabel : badAriaLabel, "data-is-focusable": true, onChange: this._noop, onClick: this._onClick }),
                    React.createElement("div", { className: classNames.thumb })))),
                stateText && React.createElement(Label, { className: classNames.text }, stateText))));
    }
    focus() {
        if (this._toggleButton.current) {
            this._toggleButton.current.focus();
        }
    }
    _noop() {
    }
}
