import * as tslib_1 from "tslib";
import * as React from 'react';
import { ContextualMenuItemType } from './ContextualMenu.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { FocusZone, FocusZoneDirection, FocusZoneTabbableElements } from '../../FocusZone';
import { assign, BaseComponent, classNamesFunction, css, getDocument, getFirstFocusable, getId, getLastFocusable, getRTL, getWindow, KeyCodes, shouldWrapFocus, isIOS, isMac } from '../../Utilities';
import { hasSubmenu, getIsChecked, isItemDisabled } from '../../utilities/contextualMenu/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { Callout } from '../../Callout';
import { ContextualMenu } from './ContextualMenu';
import { ContextualMenuItem } from './ContextualMenuItem';
import { ContextualMenuSplitButton, ContextualMenuButton, ContextualMenuAnchor } from './ContextualMenuItemWrapper/index';
import { mergeStyleSets } from '../../Styling';
import { getItemStyles } from './ContextualMenu.classNames';
const getClassNames = classNamesFunction();
const getContextualMenuItemClassNames = classNamesFunction();
export function getSubmenuItems(item) {
    return item.subMenuProps ? item.subMenuProps.items : item.items;
}
export function canAnyMenuItemsCheck(items) {
    return items.some(item => {
        if (item.canCheck) {
            return true;
        }
        if (item.sectionProps && item.sectionProps.items.some(submenuItem => submenuItem.canCheck === true)) {
            return true;
        }
        return false;
    });
}
const NavigationIdleDelay = 250;
let ContextualMenuBase = class ContextualMenuBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._mounted = false;
        this.dismiss = (ev, dismissAll) => {
            const { onDismiss } = this.props;
            if (onDismiss) {
                onDismiss(ev, dismissAll);
            }
        };
        this._onRenderMenuList = (menuListProps, defaultRender) => {
            let indexCorrection = 0;
            return (React.createElement("ul", { className: this._classNames.list, onKeyDown: this._onKeyDown, onKeyUp: this._onKeyUp }, menuListProps.items.map((item, index) => {
                const menuItem = this._renderMenuItem(item, index, indexCorrection, menuListProps.totalItemCount, menuListProps.hasCheckmarks, menuListProps.hasIcons);
                if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
                    const indexIncrease = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
                    indexCorrection += indexIncrease;
                }
                return menuItem;
            })));
        };
        this._onKeyDown = (ev) => {
            this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);
            const dismissAllMenus = ev.which === KeyCodes.escape && (isMac() || isIOS());
            return this._keyHandler(ev, this._shouldHandleKeyDown, dismissAllMenus);
        };
        this._shouldHandleKeyDown = (ev) => {
            return ev.which === KeyCodes.escape || this._shouldCloseSubMenu(ev) || (ev.which === KeyCodes.up && (ev.altKey || ev.metaKey));
        };
        this._onMenuFocusCapture = (ev) => {
            if (this.props.delayUpdateFocusOnHover) {
                this._shouldUpdateFocusOnMouseEvent = true;
            }
        };
        this._onKeyUp = (ev) => {
            return this._keyHandler(ev, this._shouldHandleKeyUp, true);
        };
        this._shouldHandleKeyUp = (ev) => {
            const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
            this._lastKeyDownWasAltOrMeta = false;
            return !!keyPressIsAltOrMetaAlone && !(isIOS() || isMac());
        };
        this._keyHandler = (ev, shouldHandleKey, dismissAllMenus) => {
            let handled = false;
            if (shouldHandleKey(ev)) {
                this._isFocusingPreviousElement = true;
                ev.preventDefault();
                ev.stopPropagation();
                this.dismiss(ev, dismissAllMenus);
                handled = true;
            }
            return handled;
        };
        this._shouldCloseSubMenu = (ev) => {
            const submenuCloseKey = getRTL() ? KeyCodes.right : KeyCodes.left;
            if (ev.which !== submenuCloseKey || !this.props.isSubMenu) {
                return false;
            }
            return (this._adjustedFocusZoneProps.direction === FocusZoneDirection.vertical ||
                (!!this._adjustedFocusZoneProps.checkForNoWrap && !shouldWrapFocus(ev.target, 'data-no-horizontal-wrap')));
        };
        this._onMenuKeyDown = (ev) => {
            const handled = this._onKeyDown(ev);
            if (handled || !this._host) {
                return;
            }
            const hasModifier = !!(ev.altKey || ev.metaKey);
            const isUp = ev.which === KeyCodes.up;
            const isDown = ev.which === KeyCodes.down;
            if (!hasModifier && (isUp || isDown)) {
                const elementToFocus = isUp
                    ? getLastFocusable(this._host, this._host.lastChild, true)
                    : getFirstFocusable(this._host, this._host.firstChild, true);
                if (elementToFocus) {
                    elementToFocus.focus();
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        this._onScroll = () => {
            if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
                this._async.clearTimeout(this._scrollIdleTimeoutId);
                this._scrollIdleTimeoutId = undefined;
            }
            else {
                this._isScrollIdle = false;
            }
            this._scrollIdleTimeoutId = this._async.setTimeout(() => {
                this._isScrollIdle = true;
            }, NavigationIdleDelay);
        };
        this._onItemMouseEnterBase = (item, ev, target) => {
            if (this._shouldIgnoreMouseEvent()) {
                return;
            }
            this._updateFocusOnMouseEvent(item, ev, target);
        };
        this._onItemMouseMoveBase = (item, ev, target) => {
            const targetElement = ev.currentTarget;
            if (this._shouldUpdateFocusOnMouseEvent) {
                this._gotMouseMove = true;
            }
            else {
                return;
            }
            if (!this._isScrollIdle ||
                this._enterTimerId !== undefined ||
                targetElement === this._targetWindow.document.activeElement) {
                return;
            }
            this._updateFocusOnMouseEvent(item, ev, target);
        };
        this._onMouseItemLeave = (item, ev) => {
            if (this._shouldIgnoreMouseEvent()) {
                return;
            }
            if (this._enterTimerId !== undefined) {
                this._async.clearTimeout(this._enterTimerId);
                this._enterTimerId = undefined;
            }
            if (this.state.expandedMenuItemKey !== undefined) {
                return;
            }
            if (this._host.setActive) {
                try {
                    this._host.setActive();
                }
                catch (e) {
                }
            }
            else {
                this._host.focus();
            }
        };
        this._onItemMouseDown = (item, ev) => {
            if (item.onMouseDown) {
                item.onMouseDown(item, ev);
            }
        };
        this._onItemClick = (item, ev) => {
            this._onItemClickBase(item, ev, ev.currentTarget);
        };
        this._onItemClickBase = (item, ev, target) => {
            const items = getSubmenuItems(item);
            this._cancelSubMenuTimer();
            if (!hasSubmenu(item) && (!items || !items.length)) {
                this._executeItemClick(item, ev);
            }
            else {
                if (item.key !== this.state.expandedMenuItemKey) {
                    this.setState({
                        expandedByMouseClick: ev.nativeEvent.detail !== 0
                    });
                    this._onItemSubMenuExpand(item, target);
                }
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onAnchorClick = (item, ev) => {
            this._executeItemClick(item, ev);
            ev.stopPropagation();
        };
        this._executeItemClick = (item, ev) => {
            if (item.disabled || item.isDisabled) {
                return;
            }
            let dismiss = false;
            if (item.onClick) {
                dismiss = !!item.onClick(ev, item);
            }
            else if (this.props.onItemClick) {
                dismiss = !!this.props.onItemClick(ev, item);
            }
            (dismiss || !ev.defaultPrevented) && this.dismiss(ev, true);
        };
        this._onItemKeyDown = (item, ev) => {
            const openKey = getRTL() ? KeyCodes.left : KeyCodes.right;
            if (!item.disabled &&
                (ev.which === openKey || ev.which === KeyCodes.enter || (ev.which === KeyCodes.down && (ev.altKey || ev.metaKey)))) {
                this.setState({
                    expandedByMouseClick: false
                });
                this._onItemSubMenuExpand(item, ev.currentTarget);
                ev.preventDefault();
            }
        };
        this._cancelSubMenuTimer = () => {
            if (this._enterTimerId !== undefined) {
                this._async.clearTimeout(this._enterTimerId);
                this._enterTimerId = undefined;
            }
        };
        this._onItemSubMenuExpand = (item, target) => {
            if (this.state.expandedMenuItemKey !== item.key) {
                if (this.state.expandedMenuItemKey) {
                    this._onSubMenuDismiss();
                }
                target.focus();
                this.setState({
                    expandedMenuItemKey: item.key,
                    submenuTarget: target
                });
            }
        };
        this._onSubMenuDismiss = (ev, dismissAll) => {
            if (dismissAll) {
                this.dismiss(ev, dismissAll);
            }
            else if (this._mounted) {
                this.setState({
                    dismissedMenuItemKey: this.state.expandedMenuItemKey,
                    expandedMenuItemKey: undefined,
                    submenuTarget: undefined
                });
            }
        };
        this._getSubMenuId = (item) => {
            let { subMenuId } = this.state;
            if (item.subMenuProps && item.subMenuProps.id) {
                subMenuId = item.subMenuProps.id;
            }
            return subMenuId;
        };
        this._onPointerAndTouchEvent = (ev) => {
            this._cancelSubMenuTimer();
        };
        this.state = {
            contextualMenuItems: undefined,
            subMenuId: getId('ContextualMenu')
        };
        this._warnDeprecations({
            getMenuClassNames: 'styles'
        });
        this._isFocusingPreviousElement = false;
        this._isScrollIdle = true;
        this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;
        this._gotMouseMove = false;
    }
    componentWillUpdate(newProps) {
        if (newProps.target !== this.props.target) {
            const newTarget = newProps.target;
            this._setTargetWindowAndElement(newTarget);
        }
        if (newProps.hidden !== this.props.hidden) {
            if (newProps.hidden) {
                this._onMenuClosed();
            }
            else {
                this._onMenuOpened();
                this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement : null;
            }
        }
        if (newProps.delayUpdateFocusOnHover !== this.props.delayUpdateFocusOnHover) {
            this._shouldUpdateFocusOnMouseEvent = !newProps.delayUpdateFocusOnHover;
            this._gotMouseMove = this._shouldUpdateFocusOnMouseEvent && this._gotMouseMove;
        }
    }
    componentWillMount() {
        const target = this.props.target;
        this._setTargetWindowAndElement(target);
        if (!this.props.hidden) {
            this._previousActiveElement = this._targetWindow ? this._targetWindow.document.activeElement : null;
        }
    }
    componentDidMount() {
        if (!this.props.hidden) {
            this._onMenuOpened();
        }
        this._mounted = true;
    }
    componentWillUnmount() {
        if (this._isFocusingPreviousElement && this._previousActiveElement) {
            setTimeout(() => {
                this._previousActiveElement && this._previousActiveElement.focus();
            }, 0);
        }
        if (this.props.onMenuDismissed) {
            this.props.onMenuDismissed(this.props);
        }
        this._events.dispose();
        this._async.dispose();
        this._mounted = false;
    }
    render() {
        let { isBeakVisible } = this.props;
        const { items, labelElementId, id, className, beakWidth, directionalHint, directionalHintForRTL, alignTargetEdge, gapSpace, coverTarget, ariaLabel, doNotLayer, target, bounds, useTargetWidth, useTargetAsMinWidth, directionalHintFixed, shouldFocusOnMount, shouldFocusOnContainer, title, styles, theme, calloutProps, onRenderSubMenu = this._onRenderSubMenu, onRenderMenuList = this._onRenderMenuList, focusZoneProps, getMenuClassNames } = this.props;
        this._classNames = getMenuClassNames
            ? getMenuClassNames(theme, className)
            : getClassNames(styles, {
                theme: theme,
                className: className
            });
        const hasIcons = itemsHaveIcons(items);
        function itemsHaveIcons(contextualMenuItems) {
            for (const item of contextualMenuItems) {
                if (!!item.iconProps) {
                    return true;
                }
                if (item.itemType === ContextualMenuItemType.Section && item.sectionProps && itemsHaveIcons(item.sectionProps.items)) {
                    return true;
                }
            }
            return false;
        }
        this._adjustedFocusZoneProps = { ...focusZoneProps, direction: this._getFocusZoneDirection() };
        const hasCheckmarks = canAnyMenuItemsCheck(items);
        const submenuProps = this.state.expandedMenuItemKey ? this._getSubmenuProps() : null;
        isBeakVisible = isBeakVisible === undefined ? this.props.responsiveMode <= ResponsiveMode.medium : isBeakVisible;
        let contextMenuStyle;
        const targetAsHtmlElement = this._target;
        if ((useTargetWidth || useTargetAsMinWidth) && targetAsHtmlElement && targetAsHtmlElement.offsetWidth) {
            const targetBoundingRect = targetAsHtmlElement.getBoundingClientRect();
            const targetWidth = targetBoundingRect.width - 2;
            if (useTargetWidth) {
                contextMenuStyle = {
                    width: targetWidth
                };
            }
            else if (useTargetAsMinWidth) {
                contextMenuStyle = {
                    minWidth: targetWidth
                };
            }
        }
        if (items && items.length > 0) {
            let totalItemCount = 0;
            for (const item of items) {
                if (item.itemType !== ContextualMenuItemType.Divider && item.itemType !== ContextualMenuItemType.Header) {
                    const itemCount = item.customOnRenderListLength ? item.customOnRenderListLength : 1;
                    totalItemCount += itemCount;
                }
            }
            const calloutStyles = !getMenuClassNames && this._classNames.subComponentStyles
                ? this._classNames.subComponentStyles.callout
                : undefined;
            return (React.createElement(Callout, Object.assign({ styles: calloutStyles }, calloutProps, { target: target, isBeakVisible: isBeakVisible, beakWidth: beakWidth, directionalHint: directionalHint, directionalHintForRTL: directionalHintForRTL, gapSpace: gapSpace, coverTarget: coverTarget, doNotLayer: doNotLayer, className: css('ms-ContextualMenu-Callout', calloutProps ? calloutProps.className : undefined), setInitialFocus: shouldFocusOnMount, onDismiss: this.props.onDismiss, onScroll: this._onScroll, bounds: bounds, directionalHintFixed: directionalHintFixed, alignTargetEdge: alignTargetEdge, hidden: this.props.hidden }),
                React.createElement("div", { role: 'menu', "aria-label": ariaLabel, "aria-labelledby": labelElementId, style: contextMenuStyle, ref: (host) => (this._host = host), id: id, className: this._classNames.container, tabIndex: shouldFocusOnContainer ? 0 : -1, onKeyDown: this._onMenuKeyDown, onKeyUp: this._onKeyUp, onFocusCapture: this._onMenuFocusCapture },
                    title && React.createElement("div", { className: this._classNames.title },
                        " ",
                        title,
                        " "),
                    items && items.length ? (React.createElement(FocusZone, Object.assign({}, this._adjustedFocusZoneProps, { className: this._classNames.root, isCircularNavigation: true, handleTabKey: FocusZoneTabbableElements.all }), onRenderMenuList({
                        items,
                        totalItemCount,
                        hasCheckmarks,
                        hasIcons
                    }, this._onRenderMenuList))) : null,
                    submenuProps && onRenderSubMenu(submenuProps, this._onRenderSubMenu))));
        }
        else {
            return null;
        }
    }
    _onMenuOpened() {
        this._events.on(this._targetWindow, 'resize', this.dismiss);
        this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;
        this._gotMouseMove = false;
        this.props.onMenuOpened && this.props.onMenuOpened(this.props);
    }
    _onMenuClosed() {
        this._events.off(this._targetWindow, 'resize', this.dismiss);
        this._previousActiveElement &&
            this._async.setTimeout(() => {
                this._previousActiveElement && this._previousActiveElement.focus();
            }, 0);
        this._shouldUpdateFocusOnMouseEvent = !this.props.delayUpdateFocusOnHover;
    }
    _getFocusZoneDirection() {
        const { focusZoneProps } = this.props;
        return focusZoneProps && focusZoneProps.direction !== undefined ? focusZoneProps.direction : FocusZoneDirection.vertical;
    }
    _onRenderSubMenu(subMenuProps) {
        return React.createElement(ContextualMenu, Object.assign({}, subMenuProps));
    }
    _renderMenuItem(item, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons) {
        const renderedItems = [];
        const iconProps = item.iconProps || { iconName: 'None' };
        const { getItemClassNames, itemProps } = item;
        const styles = itemProps ? itemProps.styles : undefined;
        const dividerClassName = item.itemType === ContextualMenuItemType.Divider ? item.className : undefined;
        const subMenuIconClassName = item.submenuIconProps ? item.submenuIconProps.className : '';
        let itemClassNames;
        if (getItemClassNames) {
            itemClassNames = getItemClassNames(this.props.theme, isItemDisabled(item), this.state.expandedMenuItemKey === item.key, !!getIsChecked(item), !!item.href, iconProps.iconName !== 'None', item.className, dividerClassName, iconProps.className, subMenuIconClassName, item.primaryDisabled);
        }
        else {
            const itemStyleProps = {
                theme: this.props.theme,
                disabled: isItemDisabled(item),
                expanded: this.state.expandedMenuItemKey === item.key,
                checked: !!getIsChecked(item),
                isAnchorLink: !!item.href,
                knownIcon: iconProps.iconName !== 'None',
                itemClassName: item.className,
                dividerClassName,
                iconClassName: iconProps.className,
                subMenuClassName: subMenuIconClassName,
                primaryDisabled: item.primaryDisabled
            };
            const menuItemStyles = this._classNames.subComponentStyles
                ? this._classNames.subComponentStyles.menuItem
                : undefined;
            itemClassNames = mergeStyleSets(getContextualMenuItemClassNames(getItemStyles, itemStyleProps), getContextualMenuItemClassNames(menuItemStyles, itemStyleProps), getContextualMenuItemClassNames(styles, itemStyleProps));
        }
        if (item.text === '-' || item.name === '-') {
            item.itemType = ContextualMenuItemType.Divider;
        }
        switch (item.itemType) {
            case ContextualMenuItemType.Divider:
                renderedItems.push(this._renderSeparator(index, itemClassNames));
                break;
            case ContextualMenuItemType.Header:
                renderedItems.push(this._renderSeparator(index, itemClassNames));
                const headerItem = this._renderHeaderMenuItem(item, itemClassNames, index, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(headerItem, item.key || index, itemClassNames, item.title));
                break;
            case ContextualMenuItemType.Section:
                renderedItems.push(this._renderSectionItem(item, itemClassNames, index, hasCheckmarks, hasIcons));
                break;
            default:
                const menuItem = this._renderNormalItem(item, itemClassNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
                renderedItems.push(this._renderListItem(menuItem, item.key || index, itemClassNames, item.title));
                break;
        }
        return renderedItems;
    }
    _renderSectionItem(item, menuClassNames, index, hasCheckmarks, hasIcons) {
        const section = item.sectionProps;
        if (!section) {
            return;
        }
        let headerItem;
        if (section.title) {
            const headerContextualMenuItem = {
                key: `section-${section.title}-title`,
                itemType: ContextualMenuItemType.Header,
                text: section.title
            };
            headerItem = this._renderHeaderMenuItem(headerContextualMenuItem, menuClassNames, index, hasCheckmarks, hasIcons);
        }
        if (section.items && section.items.length > 0) {
            return (React.createElement("li", { role: "presentation", key: section.key },
                React.createElement("div", { role: "group" },
                    React.createElement("ul", { className: this._classNames.list },
                        section.topDivider && this._renderSeparator(index, menuClassNames, true, true),
                        headerItem && this._renderListItem(headerItem, item.key || index, menuClassNames, item.title),
                        section.items.map((contextualMenuItem, itemsIndex) => this._renderMenuItem(contextualMenuItem, itemsIndex, itemsIndex, section.items.length, hasCheckmarks, hasIcons)),
                        section.bottomDivider && this._renderSeparator(index, menuClassNames, false, true)))));
        }
    }
    _renderListItem(content, key, classNames, title) {
        return (React.createElement("li", { role: "presentation", title: title, key: key, className: classNames.item }, content));
    }
    _renderSeparator(index, classNames, top, fromSection) {
        if (fromSection || index > 0) {
            return (React.createElement("li", { role: "separator", key: 'separator-' + index + (top === undefined ? '' : top ? '-top' : '-bottom'), className: classNames.divider, "aria-hidden": "true" }));
        }
        return null;
    }
    _renderNormalItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons) {
        if (item.onRender) {
            return item.onRender({ 'aria-posinset': focusableElementIndex + 1, 'aria-setsize': totalItemCount, ...item }, this.dismiss);
        }
        if (item.href) {
            return this._renderAnchorMenuItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
        }
        if (item.split && hasSubmenu(item)) {
            return this._renderSplitButton(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
        }
        return this._renderButtonItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons);
    }
    _renderHeaderMenuItem(item, classNames, index, hasCheckmarks, hasIcons) {
        const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem } = this.props;
        const { itemProps } = item;
        return (React.createElement("div", { className: this._classNames.header, style: item.style },
            React.createElement(ChildrenRenderer, Object.assign({ item: item, classNames: classNames, index: index, onCheckmarkClick: hasCheckmarks ? this._onItemClick : undefined, hasIcons: hasIcons }, itemProps))));
    }
    _renderAnchorMenuItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons) {
        const { contextualMenuItemAs } = this.props;
        const { expandedMenuItemKey } = this.state;
        return (React.createElement(ContextualMenuAnchor, { item: item, classNames: classNames, index: index, focusableElementIndex: focusableElementIndex, totalItemCount: totalItemCount, hasCheckmarks: hasCheckmarks, hasIcons: hasIcons, contextualMenuItemAs: contextualMenuItemAs, onItemMouseEnter: this._onItemMouseEnterBase, onItemMouseLeave: this._onMouseItemLeave, onItemMouseMove: this._onItemMouseMoveBase, onItemMouseDown: this._onItemMouseDown, executeItemClick: this._executeItemClick, onItemClick: this._onAnchorClick, onItemKeyDown: this._onItemKeyDown, getSubMenuId: this._getSubMenuId, expandedMenuItemKey: expandedMenuItemKey, openSubMenu: this._onItemSubMenuExpand, dismissSubMenu: this._onSubMenuDismiss, dismissMenu: this.dismiss }));
    }
    _renderButtonItem(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons) {
        const { contextualMenuItemAs } = this.props;
        const { expandedMenuItemKey } = this.state;
        return (React.createElement(ContextualMenuButton, { item: item, classNames: classNames, index: index, focusableElementIndex: focusableElementIndex, totalItemCount: totalItemCount, hasCheckmarks: hasCheckmarks, hasIcons: hasIcons, contextualMenuItemAs: contextualMenuItemAs, onItemMouseEnter: this._onItemMouseEnterBase, onItemMouseLeave: this._onMouseItemLeave, onItemMouseMove: this._onItemMouseMoveBase, onItemMouseDown: this._onItemMouseDown, executeItemClick: this._executeItemClick, onItemClick: this._onItemClick, onItemClickBase: this._onItemClickBase, onItemKeyDown: this._onItemKeyDown, getSubMenuId: this._getSubMenuId, expandedMenuItemKey: expandedMenuItemKey, openSubMenu: this._onItemSubMenuExpand, dismissSubMenu: this._onSubMenuDismiss, dismissMenu: this.dismiss }));
    }
    _renderSplitButton(item, classNames, index, focusableElementIndex, totalItemCount, hasCheckmarks, hasIcons) {
        const { contextualMenuItemAs } = this.props;
        const { expandedMenuItemKey } = this.state;
        return (React.createElement(ContextualMenuSplitButton, { item: item, classNames: classNames, index: index, focusableElementIndex: focusableElementIndex, totalItemCount: totalItemCount, hasCheckmarks: hasCheckmarks, hasIcons: hasIcons, contextualMenuItemAs: contextualMenuItemAs, onItemMouseEnter: this._onItemMouseEnterBase, onItemMouseLeave: this._onMouseItemLeave, onItemMouseMove: this._onItemMouseMoveBase, onItemMouseDown: this._onItemMouseDown, executeItemClick: this._executeItemClick, onItemClick: this._onItemClick, onItemClickBase: this._onItemClickBase, onItemKeyDown: this._onItemKeyDown, openSubMenu: this._onItemSubMenuExpand, dismissSubMenu: this._onSubMenuDismiss, dismissMenu: this.dismiss, expandedMenuItemKey: expandedMenuItemKey, onTap: this._onPointerAndTouchEvent }));
    }
    _isAltOrMeta(ev) {
        return ev.which === KeyCodes.alt || ev.key === 'Meta';
    }
    _shouldIgnoreMouseEvent() {
        return !this._isScrollIdle || !this._gotMouseMove;
    }
    _updateFocusOnMouseEvent(item, ev, target) {
        const targetElement = target ? target : ev.currentTarget;
        const { subMenuHoverDelay: timeoutDuration = NavigationIdleDelay } = this.props;
        if (item.key === this.state.expandedMenuItemKey) {
            return;
        }
        if (this._enterTimerId !== undefined) {
            this._async.clearTimeout(this._enterTimerId);
            this._enterTimerId = undefined;
        }
        if (this.state.expandedMenuItemKey === undefined) {
            targetElement.focus();
        }
        if (hasSubmenu(item)) {
            ev.stopPropagation();
            this._enterTimerId = this._async.setTimeout(() => {
                targetElement.focus();
                this.setState({
                    expandedByMouseClick: true
                });
                this._onItemSubMenuExpand(item, targetElement);
                this._enterTimerId = undefined;
            }, timeoutDuration);
        }
        else {
            this._enterTimerId = this._async.setTimeout(() => {
                this._onSubMenuDismiss(ev);
                targetElement.focus();
                this._enterTimerId = undefined;
            }, timeoutDuration);
        }
    }
    _getSubmenuProps() {
        const { submenuTarget, expandedMenuItemKey } = this.state;
        const item = this._findItemByKey(expandedMenuItemKey);
        let submenuProps = null;
        if (item) {
            submenuProps = {
                items: getSubmenuItems(item),
                target: submenuTarget,
                onDismiss: this._onSubMenuDismiss,
                isSubMenu: true,
                id: this.state.subMenuId,
                shouldFocusOnMount: true,
                shouldFocusOnContainer: this.state.expandedByMouseClick,
                directionalHint: getRTL() ? DirectionalHint.leftTopEdge : DirectionalHint.rightTopEdge,
                className: this.props.className,
                gapSpace: 0,
                isBeakVisible: false
            };
            if (item.subMenuProps) {
                assign(submenuProps, item.subMenuProps);
            }
        }
        return submenuProps;
    }
    _findItemByKey(key) {
        const { items } = this.props;
        return this._findItemByKeyFromItems(key, items);
    }
    _findItemByKeyFromItems(key, items) {
        for (const item of items) {
            if (item.itemType === ContextualMenuItemType.Section && item.sectionProps) {
                const match = this._findItemByKeyFromItems(key, item.sectionProps.items);
                if (match) {
                    return match;
                }
            }
            else if (item.key && item.key === key) {
                return item;
            }
        }
    }
    _setTargetWindowAndElement(target) {
        if (target) {
            if (typeof target === 'string') {
                const currentDoc = getDocument();
                this._target = currentDoc ? currentDoc.querySelector(target) : null;
                this._targetWindow = getWindow();
            }
            else if (target.stopPropagation) {
                this._targetWindow = getWindow(target.toElement);
                this._target = target;
            }
            else if (target.x !== undefined && target.y !== undefined) {
                this._targetWindow = getWindow();
                this._target = target;
            }
            else {
                const targetElement = target;
                this._targetWindow = getWindow(targetElement);
                this._target = target;
            }
        }
        else {
            this._targetWindow = getWindow();
        }
    }
};
ContextualMenuBase.defaultProps = {
    items: [],
    shouldFocusOnMount: true,
    gapSpace: 0,
    directionalHint: DirectionalHint.bottomAutoEdge,
    beakWidth: 16
};
ContextualMenuBase = tslib_1.__decorate([
    withResponsiveMode
], ContextualMenuBase);
export { ContextualMenuBase };
