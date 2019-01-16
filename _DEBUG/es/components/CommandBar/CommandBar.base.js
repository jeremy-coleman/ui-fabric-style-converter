import * as React from 'react';
import { BaseComponent, css, nullRender } from '../../Utilities';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { classNamesFunction } from '../../Utilities';
import { CommandBarButton } from '../../Button';
import { TooltipHost } from '../../Tooltip';
const getClassNames = classNamesFunction();
export class CommandBarBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this._overflowSet = React.createRef();
        this._resizeGroup = React.createRef();
        this._onRenderData = (data) => {
            return (React.createElement(FocusZone, { className: css(this._classNames.root), direction: FocusZoneDirection.horizontal, role: 'menubar', "aria-label": this.props.ariaLabel },
                React.createElement(OverflowSet, { componentRef: this._resolveRef('_overflowSet'), className: css(this._classNames.primarySet), doNotContainWithinFocusZone: true, role: 'presentation', items: data.primaryItems, overflowItems: data.overflowItems.length ? data.overflowItems : undefined, onRenderItem: this._onRenderItem, onRenderOverflowButton: this._onRenderOverflowButton }),
                data.farItems && (React.createElement(OverflowSet, { className: css(this._classNames.secondarySet), doNotContainWithinFocusZone: true, role: 'presentation', items: data.farItems, onRenderItem: this._onRenderItem, onRenderOverflowButton: nullRender }))));
        };
        this._onRenderItem = (item) => {
            const CommandButtonType = this.props.buttonAs || item.commandBarButtonAs || CommandBarButton;
            const itemText = item.text || item.name;
            if (item.onRender) {
                return item.onRender(item, () => undefined);
            }
            const commandButtonProps = {
                allowDisabledFocus: true,
                role: 'menuitem',
                ...item,
                styles: { root: { height: '100%' }, label: { whiteSpace: 'nowrap' }, ...item.buttonStyles },
                className: css('ms-CommandBarItem-link', item.className),
                text: !item.iconOnly ? itemText : undefined,
                menuProps: item.subMenuProps,
                onClick: this._onButtonClick(item)
            };
            if (item.iconOnly && itemText !== undefined) {
                return (React.createElement(TooltipHost, Object.assign({ content: itemText }, item.tooltipHostProps),
                    React.createElement(CommandButtonType, Object.assign({}, commandButtonProps, { defaultRender: CommandBarButton }))));
            }
            return React.createElement(CommandButtonType, Object.assign({}, commandButtonProps, { defaultRender: CommandBarButton }));
        };
        this._onRenderOverflowButton = (overflowItems) => {
            const { overflowButtonAs: OverflowButtonType = CommandBarButton, overflowButtonProps = {} } = this.props;
            const combinedOverflowItems = [
                ...(overflowButtonProps.menuProps ? overflowButtonProps.menuProps.items : []),
                ...overflowItems
            ];
            const overflowProps = {
                ...overflowButtonProps,
                styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.styles },
                className: css('ms-CommandBar-overflowButton', overflowButtonProps.className),
                menuProps: { ...overflowButtonProps.menuProps, items: combinedOverflowItems },
                menuIconProps: { iconName: 'More', ...overflowButtonProps.menuIconProps }
            };
            return React.createElement(OverflowButtonType, Object.assign({}, overflowProps));
        };
        this._onReduceData = (data) => {
            const { shiftOnReduce, onDataReduced } = this.props;
            let { primaryItems, overflowItems, cacheKey } = data;
            const movedItem = primaryItems[shiftOnReduce ? 0 : primaryItems.length - 1];
            if (movedItem !== undefined) {
                movedItem.renderedInOverflow = true;
                overflowItems = [movedItem, ...overflowItems];
                primaryItems = shiftOnReduce ? primaryItems.slice(1) : primaryItems.slice(0, -1);
                const newData = { ...data, primaryItems, overflowItems };
                cacheKey = this._computeCacheKey(newData);
                if (onDataReduced) {
                    onDataReduced(movedItem);
                }
                newData.cacheKey = cacheKey;
                return newData;
            }
            return undefined;
        };
        this._onGrowData = (data) => {
            const { shiftOnReduce, onDataGrown } = this.props;
            const { minimumOverflowItems } = data;
            let { primaryItems, overflowItems, cacheKey } = data;
            const movedItem = overflowItems[0];
            if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
                movedItem.renderedInOverflow = false;
                overflowItems = overflowItems.slice(1);
                primaryItems = shiftOnReduce ? [movedItem, ...primaryItems] : [...primaryItems, movedItem];
                const newData = { ...data, primaryItems, overflowItems };
                cacheKey = this._computeCacheKey(newData);
                if (onDataGrown) {
                    onDataGrown(movedItem);
                }
                newData.cacheKey = cacheKey;
                return newData;
            }
            return undefined;
        };
    }
    render() {
        const { className, items, overflowItems, farItems, styles, theme, onReduceData = this._onReduceData, onGrowData = this._onGrowData } = this.props;
        const commandBarData = {
            primaryItems: [...items],
            overflowItems: [...overflowItems],
            minimumOverflowItems: [...overflowItems].length,
            farItems,
            cacheKey: ''
        };
        this._classNames = getClassNames(styles, { theme: theme });
        return (React.createElement(ResizeGroup, { componentRef: this._resizeGroup, className: className, data: commandBarData, onReduceData: onReduceData, onGrowData: onGrowData, onRenderData: this._onRenderData }));
    }
    focus() {
        const { current: overflowSet } = this._overflowSet;
        overflowSet && overflowSet.focus();
    }
    remeasure() {
        this._resizeGroup.current && this._resizeGroup.current.remeasure();
    }
    _onButtonClick(item) {
        return ev => {
            if (item.inactive) {
                return;
            }
            if (item.onClick) {
                item.onClick(ev, item);
            }
        };
    }
    _computeCacheKey(data) {
        const { primaryItems, farItems = [], overflowItems } = data;
        const returnKey = (acc, current) => {
            const { cacheKey = current.key } = current;
            return acc + cacheKey;
        };
        const primaryKey = primaryItems.reduce(returnKey, '');
        const farKey = farItems.reduce(returnKey, '');
        const overflowKey = !!overflowItems.length ? 'overflow' : '';
        return [primaryKey, farKey, overflowKey].join(' ');
    }
}
CommandBarBase.defaultProps = {
    items: [],
    overflowItems: []
};
