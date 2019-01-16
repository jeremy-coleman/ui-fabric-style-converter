import * as React from 'react';
import { buttonProperties, getNativeProps } from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { getIsChecked, isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
export class ContextualMenuButton extends ContextualMenuItemWrapper {
    constructor() {
        super(...arguments);
        this._btn = React.createRef();
        this._getSubmenuTarget = () => {
            return this._btn.current ? this._btn.current : undefined;
        };
    }
    render() {
        const { item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons, contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, expandedMenuItemKey, onItemMouseDown, onItemClick, openSubMenu, dismissSubMenu, dismissMenu } = this.props;
        const subMenuId = this._getSubMenuId(item);
        const isChecked = getIsChecked(item);
        const canCheck = isChecked !== null;
        const defaultRole = canCheck ? 'menuitemcheckbox' : 'menuitem';
        const itemHasSubmenu = hasSubmenu(item);
        const { itemProps, ariaLabel } = item;
        const buttonNativeProperties = getNativeProps(item, buttonProperties);
        delete buttonNativeProperties.disabled;
        const itemButtonProperties = {
            className: classNames.root,
            onClick: this._onItemClick,
            onKeyDown: itemHasSubmenu ? this._onItemKeyDown : null,
            onMouseEnter: this._onItemMouseEnter,
            onMouseLeave: this._onItemMouseLeave,
            onMouseDown: (ev) => (onItemMouseDown ? onItemMouseDown(item, ev) : undefined),
            onMouseMove: this._onItemMouseMove,
            href: item.href,
            title: item.title,
            'aria-label': ariaLabel,
            'aria-haspopup': itemHasSubmenu || undefined,
            'aria-owns': item.key === expandedMenuItemKey ? subMenuId : undefined,
            'aria-expanded': itemHasSubmenu ? item.key === expandedMenuItemKey : undefined,
            'aria-checked': canCheck ? !!isChecked : undefined,
            'aria-posinset': focusableElementIndex + 1,
            'aria-setsize': totalItemCount,
            'aria-disabled': isItemDisabled(item),
            role: item.role || defaultRole,
            style: item.style
        };
        let { keytipProps } = item;
        if (keytipProps && itemHasSubmenu) {
            keytipProps = {
                ...keytipProps,
                hasMenu: true
            };
        }
        return (React.createElement(KeytipData, { keytipProps: keytipProps, ariaDescribedBy: buttonNativeProperties['aria-describedby'], disabled: isItemDisabled(item) }, (keytipAttributes) => (React.createElement("button", Object.assign({ ref: this._btn }, buttonNativeProperties, itemButtonProperties, keytipAttributes),
            React.createElement(ChildrenRenderer, Object.assign({ componentRef: item.componentRef, item: item, classNames: classNames, index: index, onCheckmarkClick: hasCheckmarks && onItemClick ? onItemClick : undefined, hasIcons: hasIcons, openSubMenu: openSubMenu, dismissSubMenu: dismissSubMenu, dismissMenu: dismissMenu, getSubmenuTarget: this._getSubmenuTarget }, itemProps))))));
    }
}
