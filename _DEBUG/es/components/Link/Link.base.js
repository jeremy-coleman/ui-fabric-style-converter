import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { KeytipData } from '../../KeytipData';
const getClassNames = classNamesFunction();
export class LinkBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this._link = React.createRef();
        this._onClick = (ev) => {
            const { onClick, disabled } = this.props;
            if (disabled) {
                ev.preventDefault();
            }
            else if (onClick) {
                onClick(ev);
            }
        };
    }
    render() {
        const { disabled, children, className, href, theme, styles, keytipProps } = this.props;
        const classNames = getClassNames(styles, {
            className,
            isButton: !href,
            isDisabled: disabled,
            theme: theme
        });
        const RootType = this._getRootType(this.props);
        return (React.createElement(KeytipData, { keytipProps: keytipProps, ariaDescribedBy: this.props['aria-describedby'], disabled: disabled }, (keytipAttributes) => (React.createElement(RootType, Object.assign({}, keytipAttributes, this._removeInvalidPropsForRootType(RootType, this.props), { className: classNames.root, onClick: this._onClick, ref: this._link, "aria-disabled": disabled }), children))));
    }
    focus() {
        const { current } = this._link;
        if (current && current.focus) {
            current.focus();
        }
    }
    _removeInvalidPropsForRootType(RootType, props) {
        const { children, as, disabled, target, href, theme, getStyles, styles, componentRef, ...restProps } = props;
        if (typeof RootType === 'string') {
            if (RootType === 'a') {
                return {
                    target,
                    href,
                    ...restProps
                };
            }
            return { ...restProps, disabled };
        }
        return { target, href, disabled, ...restProps };
    }
    _getRootType(props) {
        if (props.as) {
            return props.as;
        }
        if (props.href) {
            return 'a';
        }
        return 'button';
    }
}
