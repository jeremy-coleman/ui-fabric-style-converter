import * as React from 'react';
import { BaseComponent, classNamesFunction, getRTL } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/index';
import { Check } from '../../Check';
import { Icon } from '../../Icon';
import { GroupSpacer } from './GroupSpacer';
import { Spinner } from '../../Spinner';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
const getClassNames = classNamesFunction();
export class GroupHeaderBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onToggleCollapse = (ev) => {
            const { group, onToggleCollapse, isGroupLoading } = this.props;
            const { isCollapsed } = this.state;
            const newCollapsed = !isCollapsed;
            const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);
            this.setState({
                isCollapsed: newCollapsed,
                isLoadingVisible: newLoadingVisible
            });
            if (onToggleCollapse) {
                onToggleCollapse(group);
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onToggleSelectGroupClick = (ev) => {
            const { onToggleSelectGroup, group } = this.props;
            if (onToggleSelectGroup) {
                onToggleSelectGroup(group);
            }
            ev.preventDefault();
            ev.stopPropagation();
        };
        this._onHeaderClick = () => {
            const { group, onGroupHeaderClick, onToggleSelectGroup } = this.props;
            if (onGroupHeaderClick) {
                onGroupHeaderClick(group);
            }
            else if (onToggleSelectGroup) {
                onToggleSelectGroup(group);
            }
        };
        this._onRenderTitle = (props) => {
            const { group } = props;
            if (!group) {
                return null;
            }
            return (React.createElement("div", { className: this._classNames.title },
                React.createElement("span", null, group.name),
                React.createElement("span", { className: this._classNames.headerCount },
                    "(",
                    group.count,
                    group.hasMoreData && '+',
                    ")")));
        };
        this.state = {
            isCollapsed: (this.props.group && this.props.group.isCollapsed),
            isLoadingVisible: false
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.group) {
            const newCollapsed = newProps.group.isCollapsed;
            const isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
            const newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);
            this.setState({
                isCollapsed: newCollapsed,
                isLoadingVisible: newLoadingVisible
            });
        }
    }
    render() {
        const { group, groupLevel, viewport, selectionMode, loadingText, isSelected, selected, indentWidth, onRenderTitle = this._onRenderTitle, isCollapsedGroupSelectVisible = true, expandButtonProps, theme, styles, className, groupedListId, compact } = this.props;
        const { isCollapsed, isLoadingVisible } = this.state;
        const canSelectGroup = selectionMode === SelectionMode.multiple;
        const isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
        const currentlySelected = isSelected || selected;
        const isRTL = getRTL();
        this._classNames = getClassNames(styles, {
            theme: theme,
            className,
            selected: currentlySelected,
            isCollapsed,
            compact
        });
        if (!group) {
            return null;
        }
        return (React.createElement("div", { className: this._classNames.root, style: viewport ? { minWidth: viewport.width } : {}, onClick: this._onHeaderClick, "aria-label": group.ariaLabel || group.name, "data-is-focusable": true },
            React.createElement(FocusZone, { className: this._classNames.groupHeaderContainer, direction: FocusZoneDirection.horizontal },
                isSelectionCheckVisible ? (React.createElement("button", { type: "button", className: this._classNames.check, role: "checkbox", "aria-checked": !!currentlySelected, "data-selection-toggle": true, onClick: this._onToggleSelectGroupClick },
                    React.createElement(Check, { checked: currentlySelected }))) : (selectionMode !== SelectionMode.none && React.createElement(GroupSpacer, { indentWidth: indentWidth, count: 1 })),
                React.createElement(GroupSpacer, { indentWidth: indentWidth, count: groupLevel }),
                React.createElement("div", { className: this._classNames.dropIcon },
                    React.createElement(Icon, { iconName: "Tag" })),
                React.createElement("button", Object.assign({ type: "button", className: this._classNames.expand, onClick: this._onToggleCollapse, "aria-expanded": group ? !group.isCollapsed : undefined, "aria-controls": group && !group.isCollapsed ? groupedListId : undefined }, expandButtonProps),
                    React.createElement(Icon, { className: this._classNames.expandIsCollapsed, iconName: isRTL ? 'ChevronLeftMed' : 'ChevronRightMed' })),
                onRenderTitle(this.props, this._onRenderTitle),
                isLoadingVisible && React.createElement(Spinner, { label: loadingText }))));
    }
}
GroupHeaderBase.defaultProps = {
    expandButtonProps: { 'aria-label': 'expand collapse group' }
};
