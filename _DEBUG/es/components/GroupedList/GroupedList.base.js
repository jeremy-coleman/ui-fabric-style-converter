import * as React from 'react';
import { BaseComponent, assign, classNamesFunction } from '../../Utilities';
import { GroupedListSection } from './GroupedListSection';
import { List } from '../../List';
import { SelectionMode } from '../../utilities/selection/index';
const getClassNames = classNamesFunction();
export class GroupedListBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._list = React.createRef();
        this._renderGroup = (group, groupIndex) => {
            const { dragDropEvents, dragDropHelper, eventsToRegister, groupProps, items, listProps, onRenderCell, selectionMode, selection, viewport, onShouldVirtualize, groups, compact } = this.props;
            const dividerProps = {
                onToggleSelectGroup: this._onToggleSelectGroup,
                onToggleCollapse: this._onToggleCollapse,
                onToggleSummarize: this._onToggleSummarize
            };
            const headerProps = assign({}, groupProps.headerProps, dividerProps);
            const showAllProps = assign({}, groupProps.showAllProps, dividerProps);
            const footerProps = assign({}, groupProps.footerProps, dividerProps);
            const groupNestingDepth = this._getGroupNestingDepth();
            if (!groupProps.showEmptyGroups && group && group.count === 0) {
                return null;
            }
            return (React.createElement(GroupedListSection, { ref: 'group_' + groupIndex, key: this._getGroupKey(group, groupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: groupProps && groupProps.getGroupItemLimit, group: group, groupIndex: groupIndex, groupNestingDepth: groupNestingDepth, groupProps: groupProps, headerProps: headerProps, listProps: listProps, items: items, onRenderCell: onRenderCell, onRenderGroupHeader: groupProps.onRenderHeader, onRenderGroupShowAll: groupProps.onRenderShowAll, onRenderGroupFooter: groupProps.onRenderFooter, selectionMode: selectionMode, selection: selection, showAllProps: showAllProps, viewport: viewport, onShouldVirtualize: onShouldVirtualize, groupedListClassNames: this._classNames, groups: groups, compact: compact }));
        };
        this._getPageHeight = (getGroupHeight) => (itemIndex) => {
            const { groups } = this.state;
            const pageGroup = groups && groups[itemIndex];
            return getGroupHeight(pageGroup, itemIndex);
        };
        this._onToggleCollapse = (group) => {
            const { groupProps } = this.props;
            const onToggleCollapse = groupProps && groupProps.headerProps && groupProps.headerProps.onToggleCollapse;
            if (group) {
                if (onToggleCollapse) {
                    onToggleCollapse(group);
                }
                group.isCollapsed = !group.isCollapsed;
                this._updateIsSomeGroupExpanded();
                this.forceUpdate();
            }
        };
        this._onToggleSelectGroup = (group) => {
            if (group) {
                this.props.selection.toggleRangeSelected(group.startIndex, group.count);
            }
        };
        this._onToggleSummarize = (group) => {
            const { groupProps } = this.props;
            const onToggleSummarize = groupProps && groupProps.showAllProps && groupProps.showAllProps.onToggleSummarize;
            if (onToggleSummarize) {
                onToggleSummarize(group);
            }
            else {
                if (group) {
                    group.isShowingAll = !group.isShowingAll;
                }
                this.forceUpdate();
            }
        };
        this._getPageSpecification = (itemIndex, visibleRect) => {
            const groups = this.state.groups;
            const pageGroup = groups && groups[itemIndex];
            return {
                key: pageGroup && pageGroup.key
            };
        };
        this._isSomeGroupExpanded = this._computeIsSomeGroupExpanded(props.groups);
        this.state = {
            lastWidth: 0,
            groups: props.groups
        };
    }
    scrollToIndex(index, measureItem, scrollToMode) {
        if (this._list.current) {
            this._list.current.scrollToIndex(index, measureItem, scrollToMode);
        }
    }
    getStartItemIndexInView() {
        return this._list.current.getStartItemIndexInView() || 0;
    }
    componentWillReceiveProps(newProps) {
        const { groups, selectionMode, compact } = this.props;
        let shouldForceUpdates = false;
        if (newProps.groups !== groups) {
            this.setState({ groups: newProps.groups });
            shouldForceUpdates = true;
        }
        if (newProps.selectionMode !== selectionMode || newProps.compact !== compact) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    }
    render() {
        const { className, usePageCache, onShouldVirtualize, getGroupHeight, theme, styles, compact } = this.props;
        const { groups } = this.state;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className,
            compact: compact
        });
        return (React.createElement("div", { className: this._classNames.root, "data-automationid": "GroupedList", "data-is-scrollable": "false", role: "presentation" }, !groups ? (this._renderGroup(null, 0)) : (React.createElement(List, { ref: this._list, role: "presentation", items: groups, onRenderCell: this._renderGroup, getItemCountForPage: this._returnOne, getPageHeight: getGroupHeight && this._getPageHeight(getGroupHeight), getPageSpecification: this._getPageSpecification, usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize }))));
    }
    forceUpdate() {
        super.forceUpdate();
        this._forceListUpdates();
    }
    toggleCollapseAll(allCollapsed) {
        const { groups } = this.state;
        const { groupProps } = this.props;
        const onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;
        if (groups) {
            if (onToggleCollapseAll) {
                onToggleCollapseAll(allCollapsed);
            }
            for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                groups[groupIndex].isCollapsed = allCollapsed;
            }
            this._updateIsSomeGroupExpanded();
            this.forceUpdate();
        }
    }
    _returnOne() {
        return 1;
    }
    _getGroupKey(group, index) {
        return 'group-' + (group && group.key ? group.key : String(index));
    }
    _getGroupNestingDepth() {
        const { groups } = this.state;
        let level = 0;
        let groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    }
    _forceListUpdates(groups) {
        groups = groups || this.state.groups;
        const groupCount = groups ? groups.length : 1;
        if (this._list.current) {
            this._list.current.forceUpdate();
            for (let i = 0; i < groupCount; i++) {
                const group = this._list.current.refs['group_' + String(i)];
                if (group) {
                    group.forceListUpdate();
                }
            }
        }
        else {
            const group = this.refs['group_' + String(0)];
            if (group) {
                group.forceListUpdate();
            }
        }
    }
    _computeIsSomeGroupExpanded(groups) {
        return !!(groups && groups.some(group => (group.children ? this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed)));
    }
    _updateIsSomeGroupExpanded() {
        const { groups } = this.state;
        const { onGroupExpandStateChanged } = this.props;
        const newIsSomeGroupExpanded = this._computeIsSomeGroupExpanded(groups);
        if (this._isSomeGroupExpanded !== newIsSomeGroupExpanded) {
            if (onGroupExpandStateChanged) {
                onGroupExpandStateChanged(newIsSomeGroupExpanded);
            }
            this._isSomeGroupExpanded = newIsSomeGroupExpanded;
        }
    }
}
GroupedListBase.defaultProps = {
    selectionMode: SelectionMode.multiple,
    isHeaderVisible: true,
    groupProps: {},
    compact: false
};
