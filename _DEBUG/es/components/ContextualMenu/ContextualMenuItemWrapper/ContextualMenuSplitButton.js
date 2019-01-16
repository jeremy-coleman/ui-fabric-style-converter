import * as React from 'react';
import { assign, buttonProperties, getNativeProps, KeyCodes, mergeAriaAttributeValues } from '../../../Utilities';
import { ContextualMenuItem } from '../ContextualMenuItem';
import { getSplitButtonVerticalDividerClassNames } from '../ContextualMenu.classNames';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { VerticalDivider } from '../../../Divider';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
const TouchIdleDelay = 500;
export class ContextualMenuSplitButton extends ContextualMenuItemWrapper {
    constructor() {
        super(...arguments);
        this._onItemKeyDown = (ev) => {
            const { item, onItemKeyDown } = this.props;
            if (ev.which === KeyCodes.enter) {
                this._executeItemClick(ev);
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (onItemKeyDown) {
                onItemKeyDown(item, ev);
            }
        };
        this._getSubmenuTarget = () => {
            return this._splitButton;
        };
        this._onItemMouseEnterPrimary = (ev) => {
            const { item, onItemMouseEnter } = this.props;
            if (onItemMouseEnter) {
                onItemMouseEnter({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
            }
        };
        this._onItemMouseEnterIcon = (ev) => {
            const { item, onItemMouseEnter } = this.props;
            if (onItemMouseEnter) {
                onItemMouseEnter(item, ev, this._splitButton);
            }
        };
        this._onItemMouseMovePrimary = (ev) => {
            const { item, onItemMouseMove } = this.props;
            if (onItemMouseMove) {
                onItemMouseMove({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
            }
        };
        this._onItemMouseMoveIcon = (ev) => {
            const { item, onItemMouseMove } = this.props;
            if (onItemMouseMove) {
                onItemMouseMove(item, ev, this._splitButton);
            }
        };
        this._onIconItemClick = (ev) => {
            const { item, onItemClickBase } = this.props;
            if (onItemClickBase) {
                onItemClickBase(item, ev, (this._splitButton ? this._splitButton : ev.currentTarget));
            }
        };
        this._executeItemClick = (ev) => {
            const { item, executeItemClick, onItemClick } = this.props;
            if (item.disabled || item.isDisabled) {
                return;
            }
            if (this._processingTouch && onItemClick) {
                return onItemClick(item, ev);
            }
            if (executeItemClick) {
                executeItemClick(item, ev);
            }
        };
        this._onTouchStart = (ev) => {
            if (this._splitButton && !('onpointerdown' in this._splitButton)) {
                this._handleTouchAndPointerEvent(ev);
            }
        };
        this._onPointerDown = (ev) => {
            if (ev.pointerType === 'touch') {
                this._handleTouchAndPointerEvent(ev);
                ev.preventDefault();
                ev.stopImmediatePropagation();
            }
        };
    }
    componentDidMount() {
        if (this._splitButton && 'onpointerdown' in this._splitButton) {
            this._events.on(this._splitButton, 'pointerdown', this._onPointerDown, true);
        }
    }
    render() {
        const { item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons, onItemMouseLeave, expandedMenuItemKey } = this.props;
        const itemHasSubmenu = hasSubmenu(item);
        let { keytipProps } = item;
        if (keytipProps) {
            keytipProps = {
                ...keytipProps,
                hasMenu: true
            };
        }
        return (React.createElement(KeytipData, { keytipProps: keytipProps, disabled: isItemDisabled(item) }, (keytipAttributes) => (React.createElement("div", { "data-ktp-target": keytipAttributes['data-ktp-target'], ref: (splitButton) => (this._splitButton = splitButton), role: 'menuitem', "aria-label": item.ariaLabel, className: classNames.splitContainer, "aria-disabled": isItemDisabled(item), "aria-expanded": itemHasSubmenu ? item.key === expandedMenuItemKey : undefined, "aria-haspopup": true, "aria-describedby": mergeAriaAttributeValues(item.ariaDescription, keytipAttributes['aria-describedby']), "aria-checked": item.isChecked || item.checked, "aria-posinset": focusableElementIndex + 1, "aria-setsize": totalItemCount, onMouseEnter: this._onItemMouseEnterPrimary, onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, { ...item, subMenuProps: null, items: null }) : undefined, onMouseMove: this._onItemMouseMovePrimary, onKeyDown: this._onItemKeyDown, onClick: this._executeItemClick, onTouchStart: this._onTouchStart, tabIndex: 0, "data-is-focusable": true, "aria-roledescription": item['aria-roledescription'] },
            this._renderSplitPrimaryButton(item, classNames, index, hasCheckmarks, hasIcons),
            this._renderSplitDivider(item),
            this._renderSplitIconButton(item, classNames, index, keytipAttributes)))));
    }
    _renderSplitPrimaryButton(item, classNames, index, hasCheckmarks, hasIcons) {
        const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, onItemClick } = this.props;
        const itemProps = {
            key: item.key,
            disabled: isItemDisabled(item) || item.primaryDisabled,
            name: item.name,
            text: item.text || item.name,
            className: classNames.splitPrimary,
            canCheck: item.canCheck,
            isChecked: item.isChecked,
            checked: item.checked,
            iconProps: item.iconProps,
            'data-is-focusable': false,
            'aria-hidden': true
        };
        const { itemProps: itemComponentProps } = item;
        return (React.createElement("button", Object.assign({}, getNativeProps(itemProps, buttonProperties)),
            React.createElement(ChildrenRenderer, Object.assign({ "data-is-focusable": false, item: itemProps, classNames: classNames, index: index, onCheckmarkClick: hasCheckmarks && onItemClick ? onItemClick : undefined, hasIcons: hasIcons }, itemComponentProps))));
    }
    _renderSplitDivider(item) {
        const getDividerClassNames = item.getSplitButtonVerticalDividerClassNames || getSplitButtonVerticalDividerClassNames;
        return React.createElement(VerticalDivider, { getClassNames: getDividerClassNames });
    }
    _renderSplitIconButton(item, classNames, index, keytipAttributes) {
        const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, onItemMouseLeave, onItemMouseDown, openSubMenu, dismissSubMenu, dismissMenu } = this.props;
        const itemProps = {
            onClick: this._onIconItemClick,
            disabled: isItemDisabled(item),
            className: classNames.splitMenu,
            subMenuProps: item.subMenuProps,
            submenuIconProps: item.submenuIconProps,
            split: true,
            key: item.key
        };
        const buttonProps = assign({}, getNativeProps(itemProps, buttonProperties), {
            onMouseEnter: this._onItemMouseEnterIcon,
            onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, item) : undefined,
            onMouseDown: (ev) => (onItemMouseDown ? onItemMouseDown(item, ev) : undefined),
            onMouseMove: this._onItemMouseMoveIcon,
            'data-is-focusable': false,
            'data-ktp-execute-target': keytipAttributes['data-ktp-execute-target'],
            'aria-hidden': true
        });
        const { itemProps: itemComponentProps } = item;
        return (React.createElement("button", Object.assign({}, buttonProps),
            React.createElement(ChildrenRenderer, Object.assign({ componentRef: item.componentRef, item: itemProps, classNames: classNames, index: index, hasIcons: false, openSubMenu: openSubMenu, dismissSubMenu: dismissSubMenu, dismissMenu: dismissMenu, getSubmenuTarget: this._getSubmenuTarget }, itemComponentProps))));
    }
    _handleTouchAndPointerEvent(ev) {
        const { onTap } = this.props;
        if (onTap) {
            onTap(ev);
        }
        if (this._lastTouchTimeoutId) {
            this._async.clearTimeout(this._lastTouchTimeoutId);
            this._lastTouchTimeoutId = undefined;
        }
        this._processingTouch = true;
        this._lastTouchTimeoutId = this._async.setTimeout(() => {
            this._processingTouch = false;
            this._lastTouchTimeoutId = undefined;
        }, TouchIdleDelay);
    }
}
