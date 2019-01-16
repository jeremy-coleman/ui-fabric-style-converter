import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { SELECTION_CHANGE } from '../../utilities/selection/index';
import { GroupHeader } from './GroupHeader';
import { GroupShowAll } from './GroupShowAll';
import { GroupFooter } from './GroupFooter';
import { List } from '../../List';
import { assign, css, getId } from '../../Utilities';
const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
export class GroupedListSection extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._list = React.createRef();
        this._onRenderGroupHeader = (props) => {
            return React.createElement(GroupHeader, Object.assign({}, props));
        };
        this._onRenderGroupShowAll = (props) => {
            return React.createElement(GroupShowAll, Object.assign({}, props));
        };
        this._onRenderGroupFooter = (props) => {
            return React.createElement(GroupFooter, Object.assign({}, props));
        };
        this._renderSubGroup = (subGroup, subGroupIndex) => {
            const { dragDropEvents, dragDropHelper, eventsToRegister, getGroupItemLimit, groupNestingDepth, groupProps, items, headerProps, showAllProps, footerProps, listProps, onRenderCell, selection, selectionMode, viewport, onRenderGroupHeader, onRenderGroupShowAll, onRenderGroupFooter, onShouldVirtualize, group, compact } = this.props;
            return !subGroup || subGroup.count > 0 || (groupProps && groupProps.showEmptyGroups) ? (React.createElement(GroupedListSection, { ref: 'subGroup_' + subGroupIndex, key: this._getGroupKey(subGroup, subGroupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: getGroupItemLimit, group: subGroup, groupIndex: subGroupIndex, groupNestingDepth: groupNestingDepth, groupProps: groupProps, headerProps: headerProps, items: items, listProps: listProps, onRenderCell: onRenderCell, selection: selection, selectionMode: selectionMode, showAllProps: showAllProps, viewport: viewport, onRenderGroupHeader: onRenderGroupHeader, onRenderGroupShowAll: onRenderGroupShowAll, onRenderGroupFooter: onRenderGroupFooter, onShouldVirtualize: onShouldVirtualize, groups: group.children, compact: compact })) : null;
        };
        this._getGroupDragDropOptions = () => {
            const { group, groupIndex, dragDropEvents, eventsToRegister } = this.props;
            const options = {
                eventMap: eventsToRegister,
                selectionIndex: -1,
                context: { data: group, index: groupIndex, isGroup: true },
                canDrag: () => false,
                canDrop: dragDropEvents.canDrop,
                updateDropState: this._updateDroppingState
            };
            return options;
        };
        this._updateDroppingState = (newIsDropping, event) => {
            const { isDropping } = this.state;
            const { dragDropEvents } = this.props;
            if (!isDropping) {
                if (dragDropEvents && dragDropEvents.onDragLeave) {
                    dragDropEvents.onDragLeave(event, undefined);
                }
            }
            else {
                if (dragDropEvents && dragDropEvents.onDragEnter) {
                    dragDropEvents.onDragEnter(event, undefined);
                }
            }
            if (isDropping !== newIsDropping) {
                this.setState({ isDropping: newIsDropping });
            }
        };
        const { selection, group } = props;
        this._id = getId('GroupedListSection');
        this.state = {
            isDropping: false,
            isSelected: selection && group ? selection.isRangeSelected(group.startIndex, group.count) : false
        };
    }
    componentDidMount() {
        const { dragDropHelper, selection } = this.props;
        if (dragDropHelper && this._root.current) {
            this._dragDropSubscription = dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
        }
        if (selection) {
            this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
        }
    }
    componentWillUnmount() {
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
        }
    }
    componentDidUpdate(previousProps) {
        if (this.props.group !== previousProps.group ||
            this.props.groupIndex !== previousProps.groupIndex ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper && this._root.current) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getGroupDragDropOptions());
            }
        }
    }
    render() {
        const { getGroupItemLimit, group, groupIndex, headerProps, showAllProps, footerProps, viewport, selectionMode, onRenderGroupHeader = this._onRenderGroupHeader, onRenderGroupShowAll = this._onRenderGroupShowAll, onRenderGroupFooter = this._onRenderGroupFooter, onShouldVirtualize, groupedListClassNames, groups, compact } = this.props;
        const { isSelected } = this.state;
        const renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
        const isShowAllVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && (group.count > renderCount || group.hasMoreData);
        const hasNestedGroups = group && group.children && group.children.length > 0;
        const dividerProps = {
            group,
            groupIndex,
            groupLevel: group ? group.level : 0,
            isSelected,
            viewport,
            selectionMode,
            groups,
            compact
        };
        const ariaControlsProps = {
            groupedListId: this._id
        };
        const groupHeaderProps = assign({}, headerProps, dividerProps, ariaControlsProps);
        const groupShowAllProps = assign({}, showAllProps, dividerProps);
        const groupFooterProps = assign({}, footerProps, dividerProps);
        return (React.createElement("div", { ref: this._root, className: css(groupedListClassNames && groupedListClassNames.group, this._getDroppingClassName()), role: "presentation" },
            onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader),
            group && group.isCollapsed ? null : hasNestedGroups ? (React.createElement(List, { role: "presentation", ref: this._list, items: group.children, onRenderCell: this._renderSubGroup, getItemCountForPage: this._returnOne, onShouldVirtualize: onShouldVirtualize, id: this._id })) : (this._onRenderGroup(renderCount)),
            group && group.isCollapsed ? null : isShowAllVisible && onRenderGroupShowAll(groupShowAllProps, this._onRenderGroupShowAll),
            onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter)));
    }
    forceUpdate() {
        super.forceUpdate();
        this.forceListUpdate();
    }
    forceListUpdate() {
        const { group } = this.props;
        if (this._list.current) {
            this._list.current.forceUpdate();
            if (group && group.children && group.children.length > 0) {
                const subGroupCount = group.children.length;
                for (let i = 0; i < subGroupCount; i++) {
                    const subGroup = this._list.current.refs['subGroup_' + String(i)];
                    if (subGroup) {
                        subGroup.forceListUpdate();
                    }
                }
            }
        }
        else {
            const subGroup = this.refs['subGroup_' + String(0)];
            if (subGroup) {
                subGroup.forceListUpdate();
            }
        }
    }
    _onSelectionChange() {
        const { group, selection } = this.props;
        const isSelected = selection.isRangeSelected(group.startIndex, group.count);
        if (isSelected !== this.state.isSelected) {
            this.setState({ isSelected });
        }
    }
    _onRenderGroupCell(onRenderCell, groupNestingDepth) {
        return (item, itemIndex) => {
            return onRenderCell(groupNestingDepth, item, itemIndex);
        };
    }
    _onRenderGroup(renderCount) {
        const { group, items, onRenderCell, listProps, groupNestingDepth, onShouldVirtualize } = this.props;
        const count = group ? group.count : items.length;
        const startIndex = group ? group.startIndex : 0;
        return (React.createElement(List, Object.assign({ role: "grid", items: items, onRenderCell: this._onRenderGroupCell(onRenderCell, groupNestingDepth), ref: this._list, renderCount: Math.min(count, renderCount), startIndex: startIndex, onShouldVirtualize: onShouldVirtualize, id: this._id }, listProps)));
    }
    _returnOne() {
        return 1;
    }
    _getGroupKey(group, index) {
        return 'group-' + (group && group.key ? group.key : String(group.level) + String(index));
    }
    _getDroppingClassName() {
        let { isDropping } = this.state;
        const { group, groupedListClassNames } = this.props;
        isDropping = !!(group && isDropping);
        return css(isDropping && DEFAULT_DROPPING_CSS_CLASS, isDropping && groupedListClassNames && groupedListClassNames.groupIsDropping);
    }
}
