import * as React from 'react';
import { BaseComponent, getRTL, classNamesFunction } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
const getClassNames = classNamesFunction();
const OVERFLOW_KEY = 'overflow';
const nullFunction = () => null;
export class BreadcrumbBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._focusZone = React.createRef();
        this._onReduceData = (data) => {
            let { renderedItems, renderedOverflowItems } = data;
            const { overflowIndex } = data.props;
            const movedItem = renderedItems[overflowIndex];
            renderedItems = [...renderedItems];
            renderedItems.splice(overflowIndex, 1);
            renderedOverflowItems = [...renderedOverflowItems, movedItem];
            if (movedItem !== undefined) {
                return { ...data, renderedItems, renderedOverflowItems };
            }
        };
        this._onRenderBreadcrumb = (data) => {
            const { ariaLabel, dividerAs: DividerType = Icon, onRenderItem = this._onRenderItem, overflowAriaLabel, overflowIndex } = data.props;
            const { renderedOverflowItems, renderedItems } = data;
            const contextualItems = renderedOverflowItems.map((item, index) => ({
                name: item.text,
                key: item.key,
                onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
                href: item.href
            }));
            const lastItemIndex = renderedItems.length - 1;
            const hasOverflowItems = renderedOverflowItems && renderedOverflowItems.length !== 0;
            const itemElements = renderedItems.map((item, index) => (React.createElement("li", { className: this._classNames.listItem, key: item.key || String(index) },
                onRenderItem(item, this._onRenderItem),
                (index !== lastItemIndex || (hasOverflowItems && index === overflowIndex - 1)) && (React.createElement(DividerType, { className: this._classNames.chevron, iconName: getRTL() ? 'ChevronLeft' : 'ChevronRight', item: item })))));
            if (hasOverflowItems) {
                itemElements.splice(overflowIndex, 0, React.createElement("li", { className: this._classNames.overflow, key: OVERFLOW_KEY },
                    React.createElement(IconButton, { className: this._classNames.overflowButton, iconProps: { iconName: 'More' }, role: "button", "aria-haspopup": "true", ariaLabel: overflowAriaLabel, onRenderMenuIcon: nullFunction, menuProps: {
                            items: contextualItems,
                            directionalHint: DirectionalHint.bottomLeftEdge
                        } }),
                    overflowIndex !== lastItemIndex + 1 && (React.createElement(DividerType, { className: this._classNames.chevron, iconName: getRTL() ? 'ChevronLeft' : 'ChevronRight', item: renderedOverflowItems[renderedOverflowItems.length - 1] }))));
            }
            return (React.createElement("div", { className: this._classNames.root, role: "navigation", "aria-label": ariaLabel },
                React.createElement(FocusZone, { componentRef: this._focusZone, direction: FocusZoneDirection.horizontal },
                    React.createElement("ol", { className: this._classNames.list }, itemElements))));
        };
        this._onRenderItem = (item) => {
            if (item.onClick || item.href) {
                return (React.createElement(Link, { className: this._classNames.itemLink, href: item.href, "aria-current": item.isCurrentItem ? 'page' : undefined, onClick: this._onBreadcrumbClicked.bind(this, item) },
                    React.createElement(TooltipHost, { content: item.text, overflowMode: TooltipOverflowMode.Parent }, item.text)));
            }
            else {
                return (React.createElement("span", { className: this._classNames.item },
                    React.createElement(TooltipHost, { content: item.text, overflowMode: TooltipOverflowMode.Parent }, item.text)));
            }
        };
        this._onBreadcrumbClicked = (item, ev) => {
            if (item.onClick) {
                item.onClick(ev, item);
            }
        };
        this._validateProps(props);
    }
    focus() {
        if (this._focusZone.current) {
            this._focusZone.current.focus();
        }
    }
    render() {
        const { onReduceData = this._onReduceData, overflowIndex, maxDisplayedItems, items, className, theme, styles } = this.props;
        const renderedItems = [...items];
        const renderedOverflowItems = renderedItems.splice(overflowIndex, renderedItems.length - maxDisplayedItems);
        const breadCrumbData = {
            props: this.props,
            renderedItems,
            renderedOverflowItems
        };
        this._classNames = getClassNames(styles, {
            className,
            theme: theme
        });
        return React.createElement(ResizeGroup, { onRenderData: this._onRenderBreadcrumb, onReduceData: onReduceData, data: breadCrumbData });
    }
    componentWillReceiveProps(nextProps) {
        this._validateProps(nextProps);
    }
    _validateProps(props) {
        const { maxDisplayedItems, overflowIndex, items } = props;
        if (overflowIndex < 0 ||
            (maxDisplayedItems > 1 && overflowIndex > maxDisplayedItems - 1) ||
            (items.length > 0 && overflowIndex > items.length - 1)) {
            throw new Error('Breadcrumb: overflowIndex out of range');
        }
    }
}
BreadcrumbBase.defaultProps = {
    items: [],
    maxDisplayedItems: 999,
    overflowIndex: 0
};
