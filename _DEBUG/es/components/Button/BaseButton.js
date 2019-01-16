import * as React from 'react';
import { BaseComponent, anchorProperties, assign, buttonProperties, getId, getNativeProps, KeyCodes, css, mergeAriaAttributeValues, portalContainsElement } from '../../Utilities';
import { Icon } from '../../Icon';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ContextualMenu } from '../../ContextualMenu';
import { getBaseButtonClassNames } from './BaseButton.classNames';
import { getClassNames as getBaseSplitButtonClassNames } from './SplitButton/SplitButton.classNames';
import { KeytipData } from '../../KeytipData';
const TouchIdleDelay = 500;
export class BaseButton extends BaseComponent {
    constructor(props, rootClassName) {
        super(props);
        this._buttonElement = React.createRef();
        this._splitButtonContainer = React.createRef();
        this._onRenderIcon = (buttonProps, defaultRender) => {
            const { iconProps } = this.props;
            if (iconProps) {
                const { className, ...rest } = iconProps;
                return React.createElement(Icon, Object.assign({ className: css(this._classNames.icon, className) }, rest));
            }
            return null;
        };
        this._onRenderTextContents = () => {
            const { text, children, secondaryText = this.props.description, onRenderText = this._onRenderText, onRenderDescription = this._onRenderDescription } = this.props;
            if (text || typeof children === 'string' || secondaryText) {
                return (React.createElement("div", { className: this._classNames.textContainer },
                    onRenderText(this.props, this._onRenderText),
                    onRenderDescription(this.props, this._onRenderDescription)));
            }
            return [onRenderText(this.props, this._onRenderText), onRenderDescription(this.props, this._onRenderDescription)];
        };
        this._onRenderText = () => {
            let { text } = this.props;
            const { children } = this.props;
            if (text === undefined && typeof children === 'string') {
                text = children;
            }
            if (this._hasText()) {
                return (React.createElement("div", { key: this._labelId, className: this._classNames.label, id: this._labelId }, text));
            }
            return null;
        };
        this._onRenderChildren = () => {
            const { children } = this.props;
            if (typeof children === 'string') {
                return null;
            }
            return children;
        };
        this._onRenderDescription = (props) => {
            const { secondaryText = this.props.description } = props;
            return secondaryText ? (React.createElement("div", { key: this._descriptionId, className: this._classNames.description, id: this._descriptionId }, secondaryText)) : null;
        };
        this._onRenderAriaDescription = () => {
            const { ariaDescription } = this.props;
            return ariaDescription ? (React.createElement("span", { className: this._classNames.screenReaderText, id: this._ariaDescriptionId }, ariaDescription)) : null;
        };
        this._onRenderMenuIcon = (props) => {
            const { menuIconProps } = this.props;
            return React.createElement(Icon, Object.assign({ iconName: "ChevronDown" }, menuIconProps, { className: this._classNames.menuIcon }));
        };
        this._onRenderMenu = (menuProps) => {
            const { onDismiss = this._dismissMenu } = menuProps;
            const MenuType = this.props.menuAs || ContextualMenu;
            if (!menuProps.ariaLabel && !menuProps.labelElementId && this._hasText()) {
                menuProps = { ...menuProps, labelElementId: this._labelId };
            }
            return (React.createElement(MenuType, Object.assign({ id: this._labelId + '-menu', directionalHint: DirectionalHint.bottomLeftEdge }, menuProps, { shouldFocusOnContainer: this.state.menuProps ? this.state.menuProps.shouldFocusOnContainer : undefined, shouldFocusOnMount: this.state.menuProps ? this.state.menuProps.shouldFocusOnMount : undefined, className: css('ms-BaseButton-menuhost', menuProps.className), target: this._isSplitButton ? this._splitButtonContainer.current : this._buttonElement.current, onDismiss: onDismiss })));
        };
        this._dismissMenu = () => {
            let menuProps = null;
            if (this.props.persistMenu && this.state.menuProps) {
                menuProps = this.state.menuProps;
                menuProps.hidden = true;
            }
            this.setState({ menuProps: menuProps });
        };
        this._openMenu = (shouldFocusOnContainer, shouldFocusOnMount = true) => {
            if (this.props.menuProps) {
                const menuProps = { ...this.props.menuProps, shouldFocusOnContainer, shouldFocusOnMount };
                if (this.props.persistMenu) {
                    menuProps.hidden = false;
                }
                this.setState({ menuProps: menuProps });
            }
        };
        this._onToggleMenu = (shouldFocusOnContainer) => {
            const currentMenuProps = this.state.menuProps;
            let shouldFocusOnMount = true;
            if (this.props.menuProps && this.props.menuProps.shouldFocusOnMount === false) {
                shouldFocusOnMount = false;
            }
            if (this.props.persistMenu) {
                currentMenuProps && currentMenuProps.hidden ? this._openMenu(shouldFocusOnContainer, shouldFocusOnMount) : this._dismissMenu();
            }
            else {
                currentMenuProps ? this._dismissMenu() : this._openMenu(shouldFocusOnContainer, shouldFocusOnMount);
            }
        };
        this._onSplitContainerFocusCapture = (ev) => {
            const container = this._splitButtonContainer.current;
            if (!container || (ev.target && portalContainsElement(ev.target, container))) {
                return;
            }
            container.focus();
        };
        this._onSplitButtonPrimaryClick = (ev) => {
            if (this._isExpanded) {
                this._dismissMenu();
            }
            if (!this._processingTouch && this.props.onClick) {
                this.props.onClick(ev);
            }
            else if (this._processingTouch) {
                this._onMenuClick(ev);
            }
        };
        this._onKeyDown = (ev) => {
            if (this.props.disabled && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (!this.props.disabled) {
                if (this.props.menuProps) {
                    this._onMenuKeyDown(ev);
                }
                else if (this.props.onKeyDown !== undefined) {
                    this.props.onKeyDown(ev);
                }
            }
        };
        this._onKeyUp = (ev) => {
            if (!this.props.disabled && this.props.onKeyUp !== undefined) {
                this.props.onKeyUp(ev);
            }
        };
        this._onKeyPress = (ev) => {
            if (!this.props.disabled && this.props.onKeyPress !== undefined) {
                this.props.onKeyPress(ev);
            }
        };
        this._onMouseUp = (ev) => {
            if (!this.props.disabled && this.props.onMouseUp !== undefined) {
                this.props.onMouseUp(ev);
            }
        };
        this._onMouseDown = (ev) => {
            if (!this.props.disabled && this.props.onMouseDown !== undefined) {
                this.props.onMouseDown(ev);
            }
        };
        this._onClick = (ev) => {
            if (!this.props.disabled) {
                if (this.props.menuProps) {
                    this._onMenuClick(ev);
                }
                else if (this.props.onClick !== undefined) {
                    this.props.onClick(ev);
                }
            }
        };
        this._onSplitButtonContainerKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                if (this._buttonElement.current) {
                    this._buttonElement.current.click();
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
            else {
                this._onMenuKeyDown(ev);
            }
        };
        this._onMenuKeyDown = (ev) => {
            if (this.props.disabled) {
                return;
            }
            if (this.props.onKeyDown) {
                this.props.onKeyDown(ev);
            }
            if (!ev.defaultPrevented && this._isValidMenuOpenKey(ev)) {
                const { onMenuClick } = this.props;
                if (onMenuClick) {
                    onMenuClick(ev, this);
                }
                this._onToggleMenu(false);
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        this._onTouchStart = () => {
            if (this._isSplitButton && this._splitButtonContainer.current && !('onpointerdown' in this._splitButtonContainer.current)) {
                this._handleTouchAndPointerEvent();
            }
        };
        this._onMenuClick = (ev) => {
            const { onMenuClick } = this.props;
            if (onMenuClick) {
                onMenuClick(ev, this);
            }
            if (!ev.defaultPrevented) {
                const shouldFocusOnContainer = ev.nativeEvent.detail !== 0;
                this._onToggleMenu(shouldFocusOnContainer);
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        this._warnConditionallyRequiredProps(['menuProps', 'onClick'], 'split', this.props.split);
        this._warnDeprecations({
            rootProps: undefined,
            description: 'secondaryText',
            toggled: 'checked'
        });
        this._labelId = getId();
        this._descriptionId = getId();
        this._ariaDescriptionId = getId();
        let menuProps = null;
        if (props.persistMenu && props.menuProps) {
            menuProps = props.menuProps;
            menuProps.hidden = true;
        }
        this.state = {
            menuProps: menuProps
        };
    }
    get _isSplitButton() {
        return !!this.props.menuProps && !!this.props.onClick && this.props.split === true;
    }
    get _isExpanded() {
        if (this.props.persistMenu) {
            return !this.state.menuProps.hidden;
        }
        return !!this.state.menuProps;
    }
    render() {
        const { ariaDescription, ariaLabel, ariaHidden, className, disabled, allowDisabledFocus, primaryDisabled, secondaryText = this.props.description, href, iconProps, menuIconProps, styles, checked, variantClassName, theme, toggle, getClassNames } = this.props;
        const { menuProps } = this.state;
        const isPrimaryButtonDisabled = disabled || primaryDisabled;
        this._classNames = getClassNames
            ? getClassNames(theme, className, variantClassName, iconProps && iconProps.className, menuIconProps && menuIconProps.className, isPrimaryButtonDisabled, checked, !!menuProps, this.props.split, !!allowDisabledFocus)
            : getBaseButtonClassNames(theme, styles, className, variantClassName, iconProps && iconProps.className, menuIconProps && menuIconProps.className, isPrimaryButtonDisabled, checked, !!menuProps, this.props.split);
        const { _ariaDescriptionId, _labelId, _descriptionId } = this;
        const renderAsAnchor = !isPrimaryButtonDisabled && !!href;
        const tag = renderAsAnchor ? 'a' : 'button';
        const nativeProps = getNativeProps(assign(renderAsAnchor ? {} : { type: 'button' }, this.props.rootProps, this.props), renderAsAnchor ? anchorProperties : buttonProperties, [
            'disabled'
        ]);
        const resolvedAriaLabel = ariaLabel || nativeProps['aria-label'];
        let ariaDescribedBy = undefined;
        if (ariaDescription) {
            ariaDescribedBy = _ariaDescriptionId;
        }
        else if (secondaryText) {
            ariaDescribedBy = _descriptionId;
        }
        else if (nativeProps['aria-describedby']) {
            ariaDescribedBy = nativeProps['aria-describedby'];
        }
        let ariaLabelledBy = undefined;
        if (!resolvedAriaLabel) {
            if (nativeProps['aria-labelledby']) {
                ariaLabelledBy = nativeProps['aria-labelledby'];
            }
            else if (ariaDescribedBy) {
                ariaLabelledBy = this._hasText() ? _labelId : undefined;
            }
        }
        const dataIsFocusable = this.props['data-is-focusable'] === false || (disabled && !allowDisabledFocus) || this._isSplitButton ? false : true;
        const buttonProps = assign(nativeProps, {
            className: this._classNames.root,
            ref: this._buttonElement,
            disabled: isPrimaryButtonDisabled && !allowDisabledFocus,
            onKeyDown: this._onKeyDown,
            onKeyPress: this._onKeyPress,
            onKeyUp: this._onKeyUp,
            onMouseDown: this._onMouseDown,
            onMouseUp: this._onMouseUp,
            onClick: this._onClick,
            'aria-label': resolvedAriaLabel,
            'aria-labelledby': ariaLabelledBy,
            'aria-describedby': ariaDescribedBy,
            'aria-disabled': isPrimaryButtonDisabled,
            'data-is-focusable': dataIsFocusable,
            'aria-pressed': toggle ? !!checked : undefined
        });
        if (ariaHidden) {
            buttonProps['aria-hidden'] = true;
        }
        if (this._isSplitButton) {
            return this._onRenderSplitButtonContent(tag, buttonProps);
        }
        else if (this.props.menuProps) {
            assign(buttonProps, {
                'aria-expanded': this._isExpanded,
                'aria-owns': this.state.menuProps ? this._labelId + '-menu' : null,
                'aria-haspopup': true
            });
        }
        return this._onRenderContent(tag, buttonProps);
    }
    componentDidMount() {
        if (this._isSplitButton && this._splitButtonContainer.current && 'onpointerdown' in this._splitButtonContainer.current) {
            this._events.on(this._splitButtonContainer.current, 'pointerdown', this._onPointerDown, true);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.onAfterMenuDismiss && prevState.menuProps && !this.state.menuProps) {
            this.props.onAfterMenuDismiss();
        }
    }
    focus() {
        if (this._isSplitButton && this._splitButtonContainer.current) {
            this._splitButtonContainer.current.focus();
        }
        else if (this._buttonElement.current) {
            this._buttonElement.current.focus();
        }
    }
    dismissMenu() {
        this._dismissMenu();
    }
    openMenu(shouldFocusOnContainer, shouldFocusOnMount) {
        this._openMenu(shouldFocusOnContainer, shouldFocusOnMount);
    }
    _onRenderContent(tag, buttonProps) {
        const props = this.props;
        const Tag = tag;
        const { menuIconProps, menuProps, onRenderIcon = this._onRenderIcon, onRenderAriaDescription = this._onRenderAriaDescription, onRenderChildren = this._onRenderChildren, onRenderMenu = this._onRenderMenu, onRenderMenuIcon = this._onRenderMenuIcon, disabled } = props;
        let { keytipProps } = props;
        if (keytipProps && menuProps) {
            keytipProps = {
                ...keytipProps,
                hasMenu: true
            };
        }
        const Content = (React.createElement(KeytipData, { keytipProps: !this._isSplitButton ? keytipProps : undefined, ariaDescribedBy: buttonProps['aria-describedby'], disabled: disabled }, (keytipAttributes) => (React.createElement(Tag, Object.assign({}, buttonProps, keytipAttributes),
            React.createElement("div", { className: this._classNames.flexContainer },
                onRenderIcon(props, this._onRenderIcon),
                this._onRenderTextContents(),
                onRenderAriaDescription(props, this._onRenderAriaDescription),
                onRenderChildren(props, this._onRenderChildren),
                !this._isSplitButton &&
                    (menuProps || menuIconProps || this.props.onRenderMenuIcon) &&
                    onRenderMenuIcon(this.props, this._onRenderMenuIcon),
                this.state.menuProps && !this.state.menuProps.doNotLayer && onRenderMenu(menuProps, this._onRenderMenu))))));
        if (menuProps && menuProps.doNotLayer) {
            return (React.createElement("div", { style: { display: 'inline-block' } },
                Content,
                this.state.menuProps && onRenderMenu(menuProps, this._onRenderMenu)));
        }
        return Content;
    }
    _hasText() {
        return this.props.text !== null && (this.props.text !== undefined || typeof this.props.children === 'string');
    }
    _onRenderSplitButtonContent(tag, buttonProps) {
        const { styles = {}, disabled, allowDisabledFocus, checked, getSplitButtonClassNames, primaryDisabled, menuProps, toggle } = this.props;
        let { keytipProps } = this.props;
        const classNames = getSplitButtonClassNames
            ? getSplitButtonClassNames(!!disabled, !!this.state.menuProps, !!checked, !!allowDisabledFocus)
            : styles && getBaseSplitButtonClassNames(styles, !!disabled, !!this.state.menuProps, !!checked);
        assign(buttonProps, {
            onClick: undefined,
            tabIndex: -1,
            'data-is-focusable': false
        });
        const ariaDescribedBy = buttonProps.ariaDescription;
        if (keytipProps && menuProps) {
            keytipProps = {
                ...keytipProps,
                hasMenu: true
            };
        }
        const containerProps = getNativeProps(buttonProps, [], ['disabled']);
        return (React.createElement(KeytipData, { keytipProps: keytipProps, disabled: disabled }, (keytipAttributes) => (React.createElement("div", Object.assign({}, containerProps, { "data-ktp-target": keytipAttributes['data-ktp-target'], role: 'button', "aria-disabled": disabled, "aria-haspopup": true, "aria-expanded": this._isExpanded, "aria-pressed": toggle ? !!checked : undefined, "aria-describedby": mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby']), className: classNames && classNames.splitButtonContainer, onKeyDown: this._onSplitButtonContainerKeyDown, onTouchStart: this._onTouchStart, ref: this._splitButtonContainer, "data-is-focusable": true, onClick: !disabled && !primaryDisabled ? this._onSplitButtonPrimaryClick : undefined, tabIndex: !disabled || allowDisabledFocus ? 0 : undefined, "aria-roledescription": buttonProps['aria-roledescription'], onFocusCapture: this._onSplitContainerFocusCapture }),
            React.createElement("span", { style: { display: 'flex' } },
                this._onRenderContent(tag, buttonProps),
                this._onRenderSplitButtonMenuButton(classNames, keytipAttributes),
                this._onRenderSplitButtonDivider(classNames))))));
    }
    _onRenderSplitButtonDivider(classNames) {
        if (classNames && classNames.divider) {
            return React.createElement("span", { className: classNames.divider });
        }
        return null;
    }
    _onRenderSplitButtonMenuButton(classNames, keytipAttributes) {
        const { allowDisabledFocus, checked, disabled } = this.props;
        let menuIconProps = this.props.menuIconProps;
        const { splitButtonAriaLabel } = this.props;
        if (menuIconProps === undefined) {
            menuIconProps = {
                iconName: 'ChevronDown'
            };
        }
        const splitButtonProps = {
            styles: classNames,
            checked: checked,
            disabled: disabled,
            allowDisabledFocus: allowDisabledFocus,
            onClick: this._onMenuClick,
            menuProps: undefined,
            iconProps: { ...menuIconProps, className: this._classNames.menuIcon },
            ariaLabel: splitButtonAriaLabel,
            'aria-haspopup': true,
            'aria-expanded': this._isExpanded,
            'data-is-focusable': false
        };
        return (React.createElement(BaseButton, Object.assign({}, splitButtonProps, { "data-ktp-execute-target": keytipAttributes['data-ktp-execute-target'], onMouseDown: this._onMouseDown, tabIndex: -1 })));
    }
    _onPointerDown(ev) {
        if (ev.pointerType === 'touch') {
            this._handleTouchAndPointerEvent();
            ev.preventDefault();
            ev.stopImmediatePropagation();
        }
    }
    _handleTouchAndPointerEvent() {
        if (this._lastTouchTimeoutId !== undefined) {
            this._async.clearTimeout(this._lastTouchTimeoutId);
            this._lastTouchTimeoutId = undefined;
        }
        this._processingTouch = true;
        this._lastTouchTimeoutId = this._async.setTimeout(() => {
            this._processingTouch = false;
            this._lastTouchTimeoutId = undefined;
        }, TouchIdleDelay);
    }
    _isValidMenuOpenKey(ev) {
        if (this.props.menuTriggerKeyCode) {
            return ev.which === this.props.menuTriggerKeyCode;
        }
        else if (this.props.menuProps) {
            return ev.which === KeyCodes.down && (ev.altKey || ev.metaKey);
        }
        return false;
    }
}
BaseButton.defaultProps = {
    baseClassName: 'ms-Button',
    styles: {},
    split: false
};
