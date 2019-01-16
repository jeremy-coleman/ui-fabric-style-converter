import * as React from 'react';
import { anchorProperties, getNativeProps } from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
export class ContextualMenuAnchor extends ContextualMenuItemWrapper {
    constructor() {
        super(...arguments);
        this._anchor = React.createRef();
        this._getSubmenuTarget = () => {
            return this._anchor.current ? this._anchor.current : undefined;
        };
        this._onItemClick = (ev) => {
            const { item, onItemClick } = this.props;
            if (onItemClick) {
                onItemClick(item, ev);
            }
        };
    }
    render() {
        const { item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons, contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, expandedMenuItemKey, onItemClick, openSubMenu, dismissSubMenu, dismissMenu } = this.props;
        let anchorRel = item.rel;
        if (item.target && item.target.toLowerCase() === '_blank') {
            anchorRel = anchorRel ? anchorRel : 'nofollow noopener noreferrer';
        }
        const subMenuId = this._getSubMenuId(item);
        const itemHasSubmenu = hasSubmenu(item);
        const nativeProps = getNativeProps(item, anchorProperties);
        const disabled = isItemDisabled(item);
        const { itemProps } = item;
        let { keytipProps } = item;
        if (keytipProps && itemHasSubmenu) {
            keytipProps = {
                ...keytipProps,
                hasMenu: true
            };
        }
        return (React.createElement("div", null,
            React.createElement(KeytipData, { keytipProps: item.keytipProps, ariaDescribedBy: nativeProps['aria-describedby'], disabled: disabled }, (keytipAttributes) => (React.createElement("a", Object.assign({}, nativeProps, keytipAttributes, { ref: this._anchor, href: item.href, target: item.target, rel: anchorRel, className: classNames.root, role: "menuitem", "aria-owns": item.key === expandedMenuItemKey ? subMenuId : undefined, "aria-haspopup": itemHasSubmenu || undefined, "aria-expanded": itemHasSubmenu ? item.key === expandedMenuItemKey : undefined, "aria-posinset": focusableElementIndex + 1, "aria-setsize": totalItemCount, "aria-disabled": isItemDisabled(item), style: item.style, onClick: this._onItemClick, onMouseEnter: this._onItemMouseEnter, onMouseLeave: this._onItemMouseLeave, onMouseMove: this._onItemMouseMove, onKeyDown: itemHasSubmenu ? this._onItemKeyDown : null }),
                React.createElement(ChildrenRenderer, Object.assign({ componentRef: item.componentRef, item: item, classNames: classNames, index: index, onCheckmarkClick: hasCheckmarks && onItemClick ? onItemClick : undefined, hasIcons: hasIcons, openSubMenu: openSubMenu, dismissSubMenu: dismissSubMenu, dismissMenu: dismissMenu, getSubmenuTarget: this._getSubmenuTarget }, itemProps)))))));
    }
}
