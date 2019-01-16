import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, KeyCodes, assign, elementContains, getRTLSafeKeyCode, classNamesFunction } from '../../Utilities';
import { CheckboxVisibility, ColumnActionsMode, ConstrainMode, DetailsListLayoutMode, ColumnDragEndLocation } from '../DetailsList/DetailsList.types';
import { DetailsHeader } from '../DetailsList/DetailsHeader';
import { SelectAllVisibility } from '../DetailsList/DetailsHeader.types';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Selection, SelectionMode, SelectionZone } from '../../utilities/selection/index';
import { DragDropHelper } from '../../utilities/dragdrop/DragDropHelper';
import { GroupedList } from '../../GroupedList';
import { List } from '../../List';
import { withViewport } from '../../utilities/decorators/withViewport';
import { GetGroupCount } from '../../utilities/groupedList/GroupedListUtility';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
import { SPACER_WIDTH as GROUP_EXPAND_WIDTH } from '../GroupedList/GroupSpacer';
const getClassNames = classNamesFunction();
const MIN_COLUMN_WIDTH = 100;
const CHECKBOX_WIDTH = 40;
const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
const SHIMMER_INITIAL_ITEMS = 10;
const SHIMMER_ITEMS = new Array(SHIMMER_INITIAL_ITEMS);
let DetailsListBase = class DetailsListBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._header = React.createRef();
        this._groupedList = React.createRef();
        this._list = React.createRef();
        this._focusZone = React.createRef();
        this._selectionZone = React.createRef();
        this._onRenderRow = (props, defaultRender) => {
            return React.createElement(DetailsRow, Object.assign({}, props));
        };
        this._onRenderDetailsHeader = (detailsHeaderProps, defaultRender) => {
            return React.createElement(DetailsHeader, Object.assign({}, detailsHeaderProps));
        };
        this._onRenderDetailsFooter = (detailsFooterProps, defaultRender) => {
            return null;
        };
        this._onRenderListCell = (nestingDepth) => {
            return (item, itemIndex) => {
                return this._onRenderCell(nestingDepth, item, itemIndex);
            };
        };
        this._activeRows = {};
        this._columnOverrides = {};
        this._onColumnIsSizingChanged = this._onColumnIsSizingChanged.bind(this);
        this._onColumnResized = this._onColumnResized.bind(this);
        this._onColumnAutoResized = this._onColumnAutoResized.bind(this);
        this._onRowDidMount = this._onRowDidMount.bind(this);
        this._onRowWillUnmount = this._onRowWillUnmount.bind(this);
        this._onToggleCollapse = this._onToggleCollapse.bind(this);
        this._onActiveRowChanged = this._onActiveRowChanged.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onHeaderKeyDown = this._onHeaderKeyDown.bind(this);
        this._onContentKeyDown = this._onContentKeyDown.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
        this._onGroupExpandStateChanged = this._onGroupExpandStateChanged.bind(this);
        this._onColumnDragEnd = this._onColumnDragEnd.bind(this);
        this.state = {
            focusedItemIndex: -1,
            lastWidth: 0,
            adjustedColumns: this._getAdjustedColumns(props),
            isSizing: false,
            isDropping: false,
            isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
            isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
        };
        this._selection = props.selection || new Selection({ onSelectionChanged: undefined, getKey: props.getKey });
        if (!this.props.disableSelectionZone) {
            this._selection.setItems(props.items, false);
        }
        this._dragDropHelper = props.dragDropEvents
            ? new DragDropHelper({
                selection: this._selection,
                minimumPixelsForDrag: props.minimumPixelsForDrag
            })
            : null;
        this._initialFocusedIndex = props.initialFocusedIndex;
    }
    scrollToIndex(index, measureItem, scrollToMode) {
        this._list.current && this._list.current.scrollToIndex(index, measureItem, scrollToMode);
        this._groupedList.current && this._groupedList.current.scrollToIndex(index, measureItem, scrollToMode);
    }
    focusIndex(index, forceIntoFirstElement = false, measureItem, scrollToMode) {
        const item = this.props.items[index];
        if (item) {
            this.scrollToIndex(index, measureItem, scrollToMode);
            const itemKey = this._getItemKey(item, index);
            const row = this._activeRows[itemKey];
            if (row) {
                this._setFocusToRow(row, forceIntoFirstElement);
            }
        }
    }
    getStartItemIndexInView() {
        if (this._list && this._list.current) {
            return this._list.current.getStartItemIndexInView();
        }
        else if (this._groupedList && this._groupedList.current) {
            return this._groupedList.current.getStartItemIndexInView();
        }
        return 0;
    }
    componentWillUnmount() {
        if (this._dragDropHelper) {
            this._dragDropHelper.dispose();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this._initialFocusedIndex !== undefined) {
            const item = this.props.items[this._initialFocusedIndex];
            if (item) {
                const itemKey = this._getItemKey(item, this._initialFocusedIndex);
                const row = this._activeRows[itemKey];
                if (row) {
                    this._setFocusToRowIfPending(row);
                }
            }
        }
        if (this.props.items !== prevProps.items &&
            this.props.items.length > 0 &&
            this.state.focusedItemIndex !== -1 &&
            !elementContains(this._root.current, document.activeElement, false)) {
            const index = this.state.focusedItemIndex < this.props.items.length ? this.state.focusedItemIndex : this.props.items.length - 1;
            const item = this.props.items[index];
            const itemKey = this._getItemKey(item, this.state.focusedItemIndex);
            const row = this._activeRows[itemKey];
            if (row) {
                this._setFocusToRow(row);
            }
            else {
                this._initialFocusedIndex = index;
            }
        }
        if (this.props.onDidUpdate) {
            this.props.onDidUpdate(this);
        }
    }
    componentWillReceiveProps(newProps) {
        const { checkboxVisibility, items, setKey, selectionMode = this._selection.mode, columns, viewport, compact } = this.props;
        const { isAllGroupsCollapsed = undefined } = this.props.groupProps || {};
        const shouldResetSelection = newProps.setKey !== setKey || newProps.setKey === undefined;
        let shouldForceUpdates = false;
        if (newProps.layoutMode !== this.props.layoutMode) {
            shouldForceUpdates = true;
        }
        if (shouldResetSelection) {
            this._initialFocusedIndex = newProps.initialFocusedIndex;
            this.setState({
                focusedItemIndex: this._initialFocusedIndex !== undefined ? this._initialFocusedIndex : -1
            });
        }
        if (!this.props.disableSelectionZone && newProps.items !== items) {
            this._selection.setItems(newProps.items, shouldResetSelection);
        }
        if (newProps.checkboxVisibility !== checkboxVisibility ||
            newProps.columns !== columns ||
            newProps.viewport.width !== viewport.width ||
            newProps.compact !== compact) {
            shouldForceUpdates = true;
        }
        this._adjustColumns(newProps, true);
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (isAllGroupsCollapsed === undefined && (newProps.groupProps && newProps.groupProps.isAllGroupsCollapsed !== undefined)) {
            this.setState({
                isCollapsed: newProps.groupProps.isAllGroupsCollapsed,
                isSomeGroupExpanded: !newProps.groupProps.isAllGroupsCollapsed
            });
        }
        if (shouldForceUpdates) {
            this._pendingForceUpdate = true;
        }
    }
    componentWillUpdate() {
        if (this._pendingForceUpdate) {
            this._forceListUpdates();
        }
    }
    render() {
        const { ariaLabelForListHeader, ariaLabelForSelectAllCheckbox, ariaLabelForSelectionColumn, className, checkboxVisibility, compact, constrainMode, dragDropEvents, groups, groupProps, indentWidth, items, isHeaderVisible, layoutMode, onItemInvoked, onItemContextMenu, onColumnHeaderClick, onColumnHeaderContextMenu, selectionMode = this._selection.mode, selectionPreservedOnEmptyClick, selectionZoneProps, ariaLabel, ariaLabelForGrid, rowElementEventMap, shouldApplyApplicationRole = false, getKey, listProps, usePageCache, onShouldVirtualize, enableShimmer, viewport, minimumPixelsForDrag, getGroupHeight, styles, theme, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;
        const { adjustedColumns, isCollapsed, isSizing, isSomeGroupExpanded } = this.state;
        const { _selection: selection, _dragDropHelper: dragDropHelper } = this;
        const groupNestingDepth = this._getGroupNestingDepth();
        const additionalListProps = {
            renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
            renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND,
            getKey,
            ...listProps
        };
        let selectAllVisibility = SelectAllVisibility.none;
        if (selectionMode === SelectionMode.single) {
            selectAllVisibility = SelectAllVisibility.hidden;
        }
        if (selectionMode === SelectionMode.multiple) {
            let isCollapsedGroupSelectVisible = groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
            if (isCollapsedGroupSelectVisible === undefined) {
                isCollapsedGroupSelectVisible = true;
            }
            const isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
            selectAllVisibility = isSelectAllVisible ? SelectAllVisibility.visible : SelectAllVisibility.hidden;
        }
        if (checkboxVisibility === CheckboxVisibility.hidden) {
            selectAllVisibility = SelectAllVisibility.none;
        }
        const { onRenderDetailsHeader = this._onRenderDetailsHeader, onRenderDetailsFooter = this._onRenderDetailsFooter } = this.props;
        const detailsFooterProps = this._getDetailsFooterProps();
        const columnReorderProps = this._getColumnReorderProps();
        const rowCount = (isHeaderVisible ? 1 : 0) + GetGroupCount(groups) + (items ? items.length : 0);
        const classNames = getClassNames(styles, {
            theme: theme,
            compact,
            isFixed: layoutMode === DetailsListLayoutMode.fixedColumns,
            isHorizontalConstrained: constrainMode === ConstrainMode.horizontalConstrained,
            className
        });
        const list = groups ? (React.createElement(GroupedList, { componentRef: this._groupedList, groups: groups, groupProps: groupProps ? this._getGroupProps(groupProps) : undefined, items: items, onRenderCell: this._onRenderCell, selection: selection, selectionMode: checkboxVisibility !== CheckboxVisibility.hidden ? selectionMode : SelectionMode.none, dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: rowElementEventMap, listProps: additionalListProps, onGroupExpandStateChanged: this._onGroupExpandStateChanged, usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize, getGroupHeight: getGroupHeight, compact: compact })) : (React.createElement(List, Object.assign({ ref: this._list, role: "presentation", items: enableShimmer && !items.length ? SHIMMER_ITEMS : items, onRenderCell: this._onRenderListCell(0), usePageCache: usePageCache, onShouldVirtualize: onShouldVirtualize }, additionalListProps)));
        return (React.createElement("div", Object.assign({ ref: this._root, className: classNames.root, "data-automationid": "DetailsList", "data-is-scrollable": "false", "aria-label": ariaLabel }, (shouldApplyApplicationRole ? { role: 'application' } : {})),
            React.createElement("div", { role: "grid", "aria-label": ariaLabelForGrid, "aria-rowcount": rowCount, "aria-colcount": (selectAllVisibility !== SelectAllVisibility.none ? 1 : 0) + (adjustedColumns ? adjustedColumns.length : 0), "aria-readonly": "true" },
                React.createElement("div", { onKeyDown: this._onHeaderKeyDown, role: "presentation", className: classNames.headerWrapper }, isHeaderVisible &&
                    onRenderDetailsHeader({
                        componentRef: this._header,
                        selectionMode: selectionMode,
                        layoutMode: layoutMode,
                        selection: selection,
                        columns: adjustedColumns,
                        onColumnClick: onColumnHeaderClick,
                        onColumnContextMenu: onColumnHeaderContextMenu,
                        onColumnResized: this._onColumnResized,
                        onColumnIsSizingChanged: this._onColumnIsSizingChanged,
                        onColumnAutoResized: this._onColumnAutoResized,
                        groupNestingDepth: groupNestingDepth,
                        isAllCollapsed: isCollapsed,
                        onToggleCollapseAll: this._onToggleCollapse,
                        ariaLabel: ariaLabelForListHeader,
                        ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox,
                        ariaLabelForSelectionColumn: ariaLabelForSelectionColumn,
                        selectAllVisibility: selectAllVisibility,
                        collapseAllVisibility: groupProps && groupProps.collapseAllVisibility,
                        viewport: viewport,
                        columnReorderProps: columnReorderProps,
                        minimumPixelsForDrag: minimumPixelsForDrag,
                        cellStyleProps: cellStyleProps,
                        checkboxVisibility,
                        indentWidth
                    }, this._onRenderDetailsHeader)),
                React.createElement("div", { onKeyDown: this._onContentKeyDown, role: "presentation", className: classNames.contentWrapper },
                    React.createElement(FocusZone, { componentRef: this._focusZone, className: classNames.focusZone, direction: FocusZoneDirection.vertical, isInnerZoneKeystroke: isRightArrow, onActiveElementChanged: this._onActiveRowChanged, onBlur: this._onBlur }, !this.props.disableSelectionZone ? (React.createElement(SelectionZone, Object.assign({ ref: this._selectionZone, selection: selection, selectionPreservedOnEmptyClick: selectionPreservedOnEmptyClick, selectionMode: selectionMode, onItemInvoked: onItemInvoked, onItemContextMenu: onItemContextMenu, enterModalOnTouch: this.props.enterModalSelectionOnTouch }, selectionZoneProps || {}), list)) : (list))),
                onRenderDetailsFooter({
                    ...detailsFooterProps
                }, this._onRenderDetailsFooter))));
    }
    forceUpdate() {
        super.forceUpdate();
        this._forceListUpdates();
    }
    _onRenderCell(nestingDepth, item, index) {
        const { compact, dragDropEvents, rowElementEventMap: eventsToRegister, onRenderMissingItem, onRenderItemColumn, onRenderRow = this._onRenderRow, selectionMode = this._selection.mode, viewport, checkboxVisibility, getRowAriaLabel, getRowAriaDescribedBy, checkButtonAriaLabel, checkboxCellClassName, groupProps, useReducedRowRenderer, indentWidth, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;
        const collapseAllVisibility = groupProps && groupProps.collapseAllVisibility;
        const selection = this._selection;
        const dragDropHelper = this._dragDropHelper;
        const { adjustedColumns: columns } = this.state;
        const rowProps = {
            item: item,
            itemIndex: index,
            compact: compact,
            columns: columns,
            groupNestingDepth: nestingDepth,
            selectionMode: selectionMode,
            selection: selection,
            onDidMount: this._onRowDidMount,
            onWillUnmount: this._onRowWillUnmount,
            onRenderItemColumn: onRenderItemColumn,
            eventsToRegister: eventsToRegister,
            dragDropEvents: dragDropEvents,
            dragDropHelper: dragDropHelper,
            viewport: viewport,
            checkboxVisibility: checkboxVisibility,
            collapseAllVisibility: collapseAllVisibility,
            getRowAriaLabel: getRowAriaLabel,
            getRowAriaDescribedBy: getRowAriaDescribedBy,
            checkButtonAriaLabel: checkButtonAriaLabel,
            checkboxCellClassName: checkboxCellClassName,
            useReducedRowRenderer: useReducedRowRenderer,
            indentWidth,
            cellStyleProps: cellStyleProps
        };
        if (!item) {
            if (onRenderMissingItem) {
                return onRenderMissingItem(index, rowProps);
            }
            return null;
        }
        return onRenderRow(rowProps, this._onRenderRow);
    }
    _onGroupExpandStateChanged(isSomeGroupExpanded) {
        this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
    }
    _onColumnIsSizingChanged(column, isSizing) {
        this.setState({ isSizing: isSizing });
    }
    _onHeaderKeyDown(ev) {
        if (ev.which === KeyCodes.down) {
            if (this._focusZone.current && this._focusZone.current.focus()) {
                this._selection.setIndexSelected(0, true, false);
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }
    _onContentKeyDown(ev) {
        if (ev.which === KeyCodes.up && !ev.altKey) {
            if (this._header.current && this._header.current.focus()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }
    _getGroupNestingDepth() {
        const { groups } = this.props;
        let level = 0;
        let groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    }
    _onRowDidMount(row) {
        const { item, itemIndex } = row.props;
        const itemKey = this._getItemKey(item, itemIndex);
        this._activeRows[itemKey] = row;
        this._setFocusToRowIfPending(row);
        const { onRowDidMount } = this.props;
        if (onRowDidMount) {
            onRowDidMount(item, itemIndex);
        }
    }
    _setFocusToRowIfPending(row) {
        const { itemIndex } = row.props;
        if (this._initialFocusedIndex !== undefined && itemIndex === this._initialFocusedIndex) {
            this._setFocusToRow(row);
            delete this._initialFocusedIndex;
        }
    }
    _setFocusToRow(row, forceIntoFirstElement = false) {
        if (this._selectionZone.current) {
            this._selectionZone.current.ignoreNextFocus();
        }
        this._async.setTimeout(() => {
            row.focus(forceIntoFirstElement);
        }, 0);
    }
    _onRowWillUnmount(row) {
        const { onRowWillUnmount } = this.props;
        const { item, itemIndex } = row.props;
        const itemKey = this._getItemKey(item, itemIndex);
        delete this._activeRows[itemKey];
        if (onRowWillUnmount) {
            onRowWillUnmount(item, itemIndex);
        }
    }
    _onToggleCollapse(collapsed) {
        this.setState({
            isCollapsed: collapsed
        });
        if (this._groupedList.current) {
            this._groupedList.current.toggleCollapseAll(collapsed);
        }
    }
    _onColumnDragEnd(props, event) {
        const { columnReorderOptions } = this.props;
        let finalDropLocation = ColumnDragEndLocation.outside;
        if (columnReorderOptions && columnReorderOptions.onDragEnd) {
            if (props.dropLocation && props.dropLocation !== ColumnDragEndLocation.header) {
                finalDropLocation = props.dropLocation;
            }
            else if (this._root.current) {
                const clientRect = this._root.current.getBoundingClientRect();
                if (event.clientX > clientRect.left &&
                    event.clientX < clientRect.right &&
                    event.clientY > clientRect.top &&
                    event.clientY < clientRect.bottom) {
                    finalDropLocation = ColumnDragEndLocation.surface;
                }
            }
            columnReorderOptions.onDragEnd(finalDropLocation);
        }
    }
    _forceListUpdates() {
        this._pendingForceUpdate = false;
        if (this._groupedList.current) {
            this._groupedList.current.forceUpdate();
        }
        if (this._list.current) {
            this._list.current.forceUpdate();
        }
    }
    _notifyColumnsResized() {
        this.state.adjustedColumns.forEach(column => {
            if (column.onColumnResize) {
                column.onColumnResize(column.currentWidth);
            }
        });
    }
    _adjustColumns(newProps, forceUpdate, resizingColumnIndex) {
        const adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, resizingColumnIndex);
        const { width: viewportWidth } = this.props.viewport;
        if (adjustedColumns) {
            this.setState({
                adjustedColumns: adjustedColumns,
                lastWidth: viewportWidth
            }, this._notifyColumnsResized);
        }
    }
    _getAdjustedColumns(newProps, forceUpdate, resizingColumnIndex) {
        const { items: newItems, layoutMode, selectionMode } = newProps;
        let { columns: newColumns } = newProps;
        let { width: viewportWidth } = newProps.viewport;
        const columns = this.props ? this.props.columns : [];
        const lastWidth = this.state ? this.state.lastWidth : -1;
        const lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;
        if (viewportWidth !== undefined) {
            if (!forceUpdate && lastWidth === viewportWidth && lastSelectionMode === selectionMode && (!columns || newColumns === columns)) {
                return [];
            }
        }
        else {
            viewportWidth = this.props.viewport.width;
        }
        newColumns = newColumns || buildColumns(newItems, true);
        let adjustedColumns;
        if (layoutMode === DetailsListLayoutMode.fixedColumns) {
            adjustedColumns = this._getFixedColumns(newColumns);
            adjustedColumns.forEach(column => {
                this._rememberCalculatedWidth(column, column.calculatedWidth);
            });
        }
        else {
            if (resizingColumnIndex !== undefined) {
                adjustedColumns = this._getJustifiedColumnsAfterResize(newColumns, viewportWidth, newProps, resizingColumnIndex);
            }
            else {
                adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps, 0);
            }
            adjustedColumns.forEach(column => {
                this._getColumnOverride(column.key).currentWidth = column.calculatedWidth;
            });
        }
        return adjustedColumns;
    }
    _getFixedColumns(newColumns) {
        return newColumns.map(column => {
            const newColumn = assign({}, column, this._columnOverrides[column.key]);
            if (!newColumn.calculatedWidth) {
                newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
            }
            return newColumn;
        });
    }
    _getJustifiedColumnsAfterResize(newColumns, viewportWidth, props, resizingColumnIndex) {
        const fixedColumns = newColumns.slice(0, resizingColumnIndex);
        fixedColumns.forEach(column => (column.calculatedWidth = this._getColumnOverride(column.key).currentWidth));
        const fixedWidth = fixedColumns.reduce((total, column, i) => total + getPaddedWidth(column, i === 0, props), 0);
        const remainingColumns = newColumns.slice(resizingColumnIndex);
        const remainingWidth = viewportWidth - fixedWidth;
        return [...fixedColumns, ...this._getJustifiedColumns(remainingColumns, remainingWidth, props, resizingColumnIndex)];
    }
    _getJustifiedColumns(newColumns, viewportWidth, props, firstIndex) {
        const { selectionMode = this._selection.mode, checkboxVisibility } = props;
        const rowCheckWidth = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden ? CHECKBOX_WIDTH : 0;
        const groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
        let totalWidth = 0;
        const availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
        const adjustedColumns = newColumns.map((column, i) => {
            const newColumn = {
                ...column,
                calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH,
                ...this._columnOverrides[column.key]
            };
            const isFirst = i + firstIndex === 0;
            totalWidth += getPaddedWidth(newColumn, isFirst, props);
            return newColumn;
        });
        let lastIndex = adjustedColumns.length - 1;
        while (lastIndex > 0 && totalWidth > availableWidth) {
            const column = adjustedColumns[lastIndex];
            const minWidth = column.minWidth || MIN_COLUMN_WIDTH;
            const overflowWidth = totalWidth - availableWidth;
            if (column.calculatedWidth - minWidth >= overflowWidth || !(column.isCollapsable || column.isCollapsible)) {
                column.calculatedWidth = Math.max(column.calculatedWidth - overflowWidth, minWidth);
                totalWidth = availableWidth;
            }
            else {
                totalWidth -= getPaddedWidth(column, false, props);
                adjustedColumns.splice(lastIndex, 1);
            }
            lastIndex--;
        }
        for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
            const column = adjustedColumns[i];
            const isLast = i === adjustedColumns.length - 1;
            const overrides = this._columnOverrides[column.key];
            if (overrides && overrides.calculatedWidth && !isLast) {
                continue;
            }
            const spaceLeft = availableWidth - totalWidth;
            let increment;
            if (isLast) {
                increment = spaceLeft;
            }
            else {
                const maxWidth = column.maxWidth;
                const minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
                increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;
            }
            column.calculatedWidth = column.calculatedWidth + increment;
            totalWidth += increment;
        }
        return adjustedColumns;
    }
    _onColumnResized(resizingColumn, newWidth, resizingColumnIndex) {
        const newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
        if (this.props.onColumnResize) {
            this.props.onColumnResize(resizingColumn, newCalculatedWidth, resizingColumnIndex);
        }
        this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);
        this._adjustColumns(this.props, true, resizingColumnIndex);
        this._forceListUpdates();
    }
    _rememberCalculatedWidth(column, newCalculatedWidth) {
        const overrides = this._getColumnOverride(column.key);
        overrides.calculatedWidth = newCalculatedWidth;
        overrides.currentWidth = newCalculatedWidth;
    }
    _getColumnOverride(key) {
        return (this._columnOverrides[key] = this._columnOverrides[key] || {});
    }
    _onColumnAutoResized(column, columnIndex) {
        let max = 0;
        let count = 0;
        const totalCount = Object.keys(this._activeRows).length;
        for (const key in this._activeRows) {
            if (this._activeRows.hasOwnProperty(key)) {
                const currentRow = this._activeRows[key];
                currentRow.measureCell(columnIndex, (width) => {
                    max = Math.max(max, width);
                    count++;
                    if (count === totalCount) {
                        this._onColumnResized(column, max, columnIndex);
                    }
                });
            }
        }
    }
    _onActiveRowChanged(el, ev) {
        const { items, onActiveItemChanged } = this.props;
        if (!el) {
            return;
        }
        if (el.getAttribute('data-item-index')) {
            const index = Number(el.getAttribute('data-item-index'));
            if (index >= 0) {
                if (onActiveItemChanged) {
                    onActiveItemChanged(items[index], index, ev);
                }
                this.setState({
                    focusedItemIndex: index
                });
            }
        }
    }
    _onBlur(event) {
        this.setState({
            focusedItemIndex: -1
        });
    }
    _getItemKey(item, itemIndex) {
        const { getKey } = this.props;
        let itemKey = undefined;
        if (item) {
            itemKey = item.key;
        }
        if (getKey) {
            itemKey = getKey(item, itemIndex);
        }
        if (!itemKey) {
            itemKey = itemIndex;
        }
        return itemKey;
    }
    _getDetailsFooterProps() {
        const { adjustedColumns: columns } = this.state;
        const { viewport, checkboxVisibility, indentWidth, cellStyleProps = DEFAULT_CELL_STYLE_PROPS, selectionMode = this._selection.mode } = this.props;
        return {
            columns: columns,
            groupNestingDepth: this._getGroupNestingDepth(),
            selection: this._selection,
            selectionMode: selectionMode,
            viewport: viewport,
            checkboxVisibility,
            indentWidth,
            cellStyleProps
        };
    }
    _getColumnReorderProps() {
        const { columnReorderOptions } = this.props;
        if (columnReorderOptions) {
            return {
                ...columnReorderOptions,
                onColumnDragEnd: this._onColumnDragEnd
            };
        }
    }
    _getGroupProps(detailsGroupProps) {
        const { onRenderFooter: onRenderDetailsGroupFooter, onRenderHeader: onRenderDetailsGroupHeader } = detailsGroupProps;
        const { adjustedColumns: columns } = this.state;
        const { selectionMode = this._selection.mode, viewport, cellStyleProps = DEFAULT_CELL_STYLE_PROPS, checkboxVisibility, indentWidth } = this.props;
        const groupNestingDepth = this._getGroupNestingDepth();
        const onRenderFooter = onRenderDetailsGroupFooter
            ? (props, defaultRender) => {
                return onRenderDetailsGroupFooter({
                    ...props,
                    columns: columns,
                    groupNestingDepth: groupNestingDepth,
                    indentWidth,
                    selection: this._selection,
                    selectionMode: selectionMode,
                    viewport: viewport,
                    checkboxVisibility,
                    cellStyleProps
                }, defaultRender);
            }
            : undefined;
        const onRenderHeader = onRenderDetailsGroupHeader
            ? (props, defaultRender) => {
                return onRenderDetailsGroupHeader({
                    ...props,
                    columns: columns,
                    groupNestingDepth: groupNestingDepth,
                    indentWidth,
                    selection: this._selection,
                    selectionMode: selectionMode,
                    viewport: viewport,
                    checkboxVisibility,
                    cellStyleProps
                }, defaultRender);
            }
            : undefined;
        const groupProps = detailsGroupProps;
        return {
            ...groupProps,
            onRenderFooter,
            onRenderHeader
        };
    }
};
DetailsListBase.defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true,
    enableShimmer: false,
    compact: false
};
DetailsListBase = tslib_1.__decorate([
    withViewport
], DetailsListBase);
export { DetailsListBase };
export function buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline) {
    const columns = [];
    if (items && items.length) {
        const firstItem = items[0];
        for (const propName in firstItem) {
            if (firstItem.hasOwnProperty(propName)) {
                columns.push({
                    key: propName,
                    name: propName,
                    fieldName: propName,
                    minWidth: MIN_COLUMN_WIDTH,
                    maxWidth: 300,
                    isCollapsable: !!columns.length,
                    isCollapsible: !!columns.length,
                    isMultiline: isMultiline === undefined ? false : isMultiline,
                    isSorted: sortedColumnKey === propName,
                    isSortedDescending: !!isSortedDescending,
                    isRowHeader: false,
                    columnActionsMode: ColumnActionsMode.clickable,
                    isResizable: canResizeColumns,
                    onColumnClick: onColumnClick,
                    isGrouped: groupedColumnKey === propName
                });
            }
        }
    }
    return columns;
}
function isRightArrow(event) {
    return event.which === getRTLSafeKeyCode(KeyCodes.right);
}
function getPaddedWidth(column, isFirst, props) {
    const { cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = props;
    return (column.calculatedWidth +
        cellStyleProps.cellLeftPadding +
        cellStyleProps.cellRightPadding +
        (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0));
}
