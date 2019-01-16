import * as React from 'react';
import { hasSubmenu, getIsChecked } from '../../utilities/contextualMenu/index';
import { BaseComponent, getRTL } from '../../Utilities';
import { Icon } from '../../Icon';
const renderItemIcon = (props) => {
    const { item, hasIcons, classNames } = props;
    const { iconProps } = item;
    if (!hasIcons) {
        return null;
    }
    if (item.onRenderIcon) {
        return item.onRenderIcon(props);
    }
    return React.createElement(Icon, Object.assign({}, iconProps, { className: classNames.icon }));
};
const renderCheckMarkIcon = ({ onCheckmarkClick, item, classNames }) => {
    const isItemChecked = getIsChecked(item);
    if (onCheckmarkClick) {
        const onClick = (e) => onCheckmarkClick(item, e);
        return React.createElement(Icon, { iconName: isItemChecked ? 'CheckMark' : '', className: classNames.checkmarkIcon, onClick: onClick });
    }
    return null;
};
const renderItemName = ({ item, classNames }) => {
    if (item.text || item.name) {
        return React.createElement("span", { className: classNames.label }, item.text || item.name);
    }
    return null;
};
const renderSecondaryText = ({ item, classNames }) => {
    if (item.secondaryText) {
        return React.createElement("span", { className: classNames.secondaryText }, item.secondaryText);
    }
    return null;
};
const renderSubMenuIcon = ({ item, classNames }) => {
    if (hasSubmenu(item)) {
        return React.createElement(Icon, Object.assign({ iconName: getRTL() ? 'ChevronLeft' : 'ChevronRight' }, item.submenuIconProps, { className: classNames.subMenuIcon }));
    }
    return null;
};
export class ContextualMenuItemBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this.openSubMenu = () => {
            const { item, openSubMenu, getSubmenuTarget } = this.props;
            if (getSubmenuTarget) {
                const submenuTarget = getSubmenuTarget();
                if (hasSubmenu(item) && openSubMenu && submenuTarget) {
                    openSubMenu(item, submenuTarget);
                }
            }
        };
        this.dismissSubMenu = () => {
            const { item, dismissSubMenu } = this.props;
            if (hasSubmenu(item) && dismissSubMenu) {
                dismissSubMenu();
            }
        };
        this.dismissMenu = (dismissAll) => {
            const { dismissMenu } = this.props;
            if (dismissMenu) {
                dismissMenu(undefined, dismissAll);
            }
        };
    }
    render() {
        const { item, classNames } = this.props;
        return (React.createElement("div", { className: item.split ? classNames.linkContentMenu : classNames.linkContent },
            renderCheckMarkIcon(this.props),
            renderItemIcon(this.props),
            renderItemName(this.props),
            renderSecondaryText(this.props),
            renderSubMenuIcon(this.props)));
    }
}
