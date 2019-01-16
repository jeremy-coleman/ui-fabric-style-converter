import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { BaseComponent, css, getRTL, getId, KeyCodes } from '../../Utilities';
import { ColumnDragEndLocation, CheckboxVisibility } from './DetailsList.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon } from '../../Icon';
import { Layer } from '../../Layer';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { CollapseAllVisibility } from '../../GroupedList';
import { DetailsRowCheck } from './DetailsRowCheck';
import { SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { DragDropHelper } from '../../utilities/dragdrop/index';
import { DetailsColumn } from '../../components/DetailsList/DetailsColumn';
import { SelectAllVisibility } from './DetailsHeader.types';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
const MOUSEDOWN_PRIMARY_BUTTON = 0;
const MOUSEMOVE_PRIMARY_BUTTON = 1;
const NO_COLUMNS = [];
export class DetailsHeaderBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._rootComponent = React.createRef();
        this._draggedColumnIndex = -1;
        this._dropHintDetails = {};
        this._getDropHintPositions = () => {
            const { columns = NO_COLUMNS } = this.props;
            const { columnReorderProps } = this.state;
            let prevX = 0;
            let prevMid = 0;
            let prevRef;
            const frozenColumnCountFromStart = columnReorderProps && columnReorderProps.frozenColumnCountFromStart ? columnReorderProps.frozenColumnCountFromStart : 0;
            const frozenColumnCountFromEnd = columnReorderProps && columnReorderProps.frozenColumnCountFromEnd ? columnReorderProps.frozenColumnCountFromEnd : 0;
            for (let i = frozenColumnCountFromStart; i < columns.length - frozenColumnCountFromEnd + 1; i++) {
                if (this._rootElement) {
                    const dropHintElement = this._rootElement.querySelectorAll('#columnDropHint_' + i)[0];
                    if (dropHintElement) {
                        if (i === frozenColumnCountFromStart) {
                            prevX = dropHintElement.offsetLeft;
                            prevMid = dropHintElement.offsetLeft;
                            prevRef = dropHintElement;
                        }
                        else {
                            const newMid = (dropHintElement.offsetLeft + prevX) / 2;
                            this._dropHintDetails[i - 1] = {
                                originX: prevX,
                                startX: prevMid,
                                endX: newMid,
                                dropHintElementRef: prevRef
                            };
                            prevMid = newMid;
                            prevRef = dropHintElement;
                            prevX = dropHintElement.offsetLeft;
                            if (i === columns.length - frozenColumnCountFromEnd) {
                                this._dropHintDetails[i] = {
                                    originX: prevX,
                                    startX: prevMid,
                                    endX: dropHintElement.offsetLeft,
                                    dropHintElementRef: prevRef
                                };
                            }
                        }
                    }
                }
            }
        };
        this._computeDropHintToBeShown = (clientX) => {
            if (this._rootElement) {
                const clientRect = this._rootElement.getBoundingClientRect();
                const headerOriginX = clientRect.left;
                const eventXRelativePosition = clientX - headerOriginX;
                const currentDropHintIndex = this._currentDropHintIndex;
                if (this._isValidCurrentDropHintIndex()) {
                    if (this._liesBetween(eventXRelativePosition, this._dropHintDetails[currentDropHintIndex].startX, this._dropHintDetails[currentDropHintIndex].endX)) {
                        return;
                    }
                }
                const { columns = NO_COLUMNS } = this.props;
                const { columnReorderProps } = this.state;
                const frozenColumnCountFromStart = columnReorderProps && columnReorderProps.frozenColumnCountFromStart ? columnReorderProps.frozenColumnCountFromStart : 0;
                const frozenColumnCountFromEnd = columnReorderProps && columnReorderProps.frozenColumnCountFromEnd ? columnReorderProps.frozenColumnCountFromEnd : 0;
                const currentIndex = frozenColumnCountFromStart;
                const lastValidColumn = columns.length - frozenColumnCountFromEnd;
                let indexToUpdate = -1;
                if (this._isBefore(eventXRelativePosition, this._dropHintDetails[currentIndex].endX)) {
                    indexToUpdate = currentIndex;
                }
                else if (this._isAfter(eventXRelativePosition, this._dropHintDetails[lastValidColumn].startX)) {
                    indexToUpdate = lastValidColumn;
                }
                else if (this._isValidCurrentDropHintIndex()) {
                    if (this._dropHintDetails[currentDropHintIndex + 1] &&
                        this._liesBetween(eventXRelativePosition, this._dropHintDetails[currentDropHintIndex + 1].startX, this._dropHintDetails[currentDropHintIndex + 1].endX)) {
                        indexToUpdate = currentDropHintIndex + 1;
                    }
                    else if (this._dropHintDetails[currentDropHintIndex - 1] &&
                        this._liesBetween(eventXRelativePosition, this._dropHintDetails[currentDropHintIndex - 1].startX, this._dropHintDetails[currentDropHintIndex - 1].endX)) {
                        indexToUpdate = currentDropHintIndex - 1;
                    }
                }
                if (indexToUpdate === -1) {
                    let startIndex = frozenColumnCountFromStart;
                    let endIndex = lastValidColumn;
                    while (startIndex < endIndex) {
                        const middleIndex = Math.ceil((endIndex + startIndex) / 2);
                        if (this._liesBetween(eventXRelativePosition, this._dropHintDetails[middleIndex].startX, this._dropHintDetails[middleIndex].endX)) {
                            indexToUpdate = middleIndex;
                            break;
                        }
                        else if (this._isBefore(eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
                            endIndex = middleIndex;
                        }
                        else if (this._isAfter(eventXRelativePosition, this._dropHintDetails[middleIndex].originX)) {
                            startIndex = middleIndex;
                        }
                    }
                }
                if (indexToUpdate === this._draggedColumnIndex || indexToUpdate === this._draggedColumnIndex + 1) {
                    if (this._isValidCurrentDropHintIndex()) {
                        this._resetDropHints();
                    }
                }
                else if (currentDropHintIndex !== indexToUpdate && indexToUpdate >= 0) {
                    this._resetDropHints();
                    this._updateDropHintElement(this._dropHintDetails[indexToUpdate].dropHintElementRef, 'inline-block');
                    this._currentDropHintIndex = indexToUpdate;
                }
            }
        };
        this._renderColumnSizer = ({ columnIndex }) => {
            const { columns = NO_COLUMNS } = this.props;
            const column = columns[columnIndex];
            const { columnResizeDetails } = this.state;
            const classNames = this._classNames;
            return column.isResizable ? (React.createElement("div", { key: `${column.key}_sizer`, "aria-hidden": true, role: "button", "data-is-focusable": false, onClick: stopPropagation, "data-sizer-index": columnIndex, onBlur: this._onSizerBlur, className: css(classNames.cellSizer, columnIndex < columns.length - 1 ? classNames.cellSizerStart : classNames.cellSizerEnd, {
                    [classNames.cellIsResizing]: columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
                }), onDoubleClick: this._onSizerDoubleClick.bind(this, columnIndex) })) : null;
        };
        this._onRenderColumnHeaderTooltip = (tooltipHostProps, defaultRender) => {
            return React.createElement("span", { className: tooltipHostProps.hostClassName }, tooltipHostProps.children);
        };
        this._onSelectAllClicked = () => {
            const { selection } = this.props;
            if (selection) {
                selection.toggleAllSelected();
            }
        };
        this._onRootMouseDown = (ev) => {
            const columnIndexAttr = ev.target.getAttribute('data-sizer-index');
            const columnIndex = Number(columnIndexAttr);
            const { columns = NO_COLUMNS } = this.props;
            if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
                return;
            }
            this.setState({
                columnResizeDetails: {
                    columnIndex: columnIndex,
                    columnMinWidth: columns[columnIndex].calculatedWidth,
                    originX: ev.clientX
                }
            });
            ev.preventDefault();
            ev.stopPropagation();
        };
        this._onRootMouseMove = (ev) => {
            const { columnResizeDetails, isSizing } = this.state;
            if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
                this.setState({ isSizing: true });
            }
        };
        this._onRootRef = (focusZone) => {
            if (focusZone) {
                this._rootElement = findDOMNode(focusZone);
            }
            else {
                this._rootElement = undefined;
            }
        };
        this._onRootKeyDown = (ev) => {
            const { columnResizeDetails, isSizing } = this.state;
            const { columns = NO_COLUMNS, onColumnResized } = this.props;
            const columnIndexAttr = ev.target.getAttribute('data-sizer-index');
            if (!columnIndexAttr || isSizing) {
                return;
            }
            const columnIndex = Number(columnIndexAttr);
            if (!columnResizeDetails) {
                if (ev.which === KeyCodes.enter) {
                    this.setState({
                        columnResizeDetails: {
                            columnIndex: columnIndex,
                            columnMinWidth: columns[columnIndex].calculatedWidth
                        }
                    });
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
            else {
                let increment;
                if (ev.which === KeyCodes.enter) {
                    this.setState({
                        columnResizeDetails: undefined
                    });
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                else if (ev.which === KeyCodes.left) {
                    increment = getRTL() ? 1 : -1;
                }
                else if (ev.which === KeyCodes.right) {
                    increment = getRTL() ? -1 : 1;
                }
                if (increment) {
                    if (!ev.shiftKey) {
                        increment *= 10;
                    }
                    this.setState({
                        columnResizeDetails: {
                            ...columnResizeDetails,
                            columnMinWidth: columnResizeDetails.columnMinWidth + increment
                        }
                    });
                    if (onColumnResized) {
                        onColumnResized(columns[columnIndex], columnResizeDetails.columnMinWidth + increment, columnIndex);
                    }
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }
        };
        this._onSizerMouseMove = (ev) => {
            const { buttons } = ev;
            const { onColumnIsSizingChanged, onColumnResized, columns = NO_COLUMNS } = this.props;
            const { columnResizeDetails } = this.state;
            if (buttons !== undefined && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
                this._onSizerMouseUp(ev);
                return;
            }
            if (ev.clientX !== columnResizeDetails.originX) {
                if (onColumnIsSizingChanged) {
                    onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
                }
            }
            if (onColumnResized) {
                let movement = ev.clientX - columnResizeDetails.originX;
                if (getRTL()) {
                    movement = -movement;
                }
                onColumnResized(columns[columnResizeDetails.columnIndex], columnResizeDetails.columnMinWidth + movement, columnResizeDetails.columnIndex);
            }
        };
        this._onSizerBlur = (ev) => {
            const { columnResizeDetails } = this.state;
            if (columnResizeDetails) {
                this.setState({
                    columnResizeDetails: undefined,
                    isSizing: false
                });
            }
        };
        this._onSizerMouseUp = (ev) => {
            const { columns = NO_COLUMNS, onColumnIsSizingChanged } = this.props;
            const { columnResizeDetails } = this.state;
            this.setState({
                columnResizeDetails: undefined,
                isSizing: false
            });
            if (onColumnIsSizingChanged) {
                onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
            }
        };
        const columnReorderProps = props.columnReorderProps || (props.columnReorderOptions && getLegacyColumnReorderProps(props.columnReorderOptions));
        this.state = {
            columnReorderProps,
            columnResizeDetails: undefined,
            groupNestingDepth: this.props.groupNestingDepth,
            isAllCollapsed: this.props.isAllCollapsed,
            isAllSelected: !!this.props.selection && this.props.selection.isAllSelected()
        };
        this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
        this._onSelectAllClicked = this._onSelectAllClicked.bind(this);
        this._updateDragInfo = this._updateDragInfo.bind(this);
        this._onDragOver = this._onDragOver.bind(this);
        this._onDrop = this._onDrop.bind(this);
        this._getHeaderDragDropOptions = this._getHeaderDragDropOptions.bind(this);
        this._updateDroppingState = this._updateDroppingState.bind(this);
        this._getDropHintPositions = this._getDropHintPositions.bind(this);
        this._computeDropHintToBeShown = this._computeDropHintToBeShown.bind(this);
        this._resetDropHints = this._resetDropHints.bind(this);
        this._isValidCurrentDropHintIndex = this._isValidCurrentDropHintIndex.bind(this);
        this._onRootRef = this._onRootRef.bind(this);
        this._isEventOnHeader = this._isEventOnHeader.bind(this);
        this._onDropIndexInfo = {
            sourceIndex: Number.MIN_SAFE_INTEGER,
            targetIndex: Number.MIN_SAFE_INTEGER
        };
        this._id = getId('header');
        this._currentDropHintIndex = Number.MIN_SAFE_INTEGER;
    }
    componentDidMount() {
        const { selection } = this.props;
        const { columnReorderProps } = this.state;
        this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);
        this._events.on(this._rootElement, 'mousedown', this._onRootMouseDown);
        this._events.on(this._rootElement, 'keydown', this._onRootKeyDown);
        if (columnReorderProps && this._dragDropHelper) {
            this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement, this._events, this._getHeaderDragDropOptions());
        }
    }
    componentDidUpdate(prevProps) {
        const { columnReorderProps } = this.state;
        if (!columnReorderProps) {
            if (this._subscriptionObject) {
                this._subscriptionObject.dispose();
                delete this._subscriptionObject;
            }
        }
        else if (!this._subscriptionObject && this._dragDropHelper) {
            this._subscriptionObject = this._dragDropHelper.subscribe(this._rootElement, this._events, this._getHeaderDragDropOptions());
        }
        if (this.props !== prevProps && this._onDropIndexInfo.sourceIndex >= 0 && this._onDropIndexInfo.targetIndex >= 0) {
            const { columns: previousColumns = NO_COLUMNS } = prevProps;
            const { columns = NO_COLUMNS } = this.props;
            if (previousColumns[this._onDropIndexInfo.sourceIndex].key === columns[this._onDropIndexInfo.targetIndex].key) {
                this._onDropIndexInfo = {
                    sourceIndex: Number.MIN_SAFE_INTEGER,
                    targetIndex: Number.MIN_SAFE_INTEGER
                };
            }
        }
    }
    componentWillReceiveProps(newProps) {
        const columnReorderProps = newProps.columnReorderProps || (newProps.columnReorderOptions && getLegacyColumnReorderProps(newProps.columnReorderOptions));
        const { groupNestingDepth } = this.state;
        if (newProps.groupNestingDepth !== groupNestingDepth) {
            this.setState({
                columnReorderProps,
                groupNestingDepth: newProps.groupNestingDepth
            });
        }
        else {
            this.setState({ columnReorderProps });
        }
        if (newProps.isAllCollapsed !== undefined) {
            this.setState({
                isAllCollapsed: newProps.isAllCollapsed
            });
        }
    }
    componentWillUnmount() {
        if (this._subscriptionObject) {
            this._subscriptionObject.dispose();
            delete this._subscriptionObject;
        }
    }
    render() {
        const { columns = NO_COLUMNS, ariaLabel, ariaLabelForSelectAllCheckbox, selectAllVisibility, ariaLabelForSelectionColumn, indentWidth, viewport, onColumnClick, onColumnContextMenu, onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip, styles, theme } = this.props;
        const { isAllSelected, columnResizeDetails, isSizing, groupNestingDepth, isAllCollapsed, columnReorderProps } = this.state;
        const showCheckbox = selectAllVisibility !== SelectAllVisibility.none;
        const isCheckboxHidden = selectAllVisibility === SelectAllVisibility.hidden;
        if (!this._dragDropHelper && columnReorderProps) {
            this._dragDropHelper = new DragDropHelper({
                selection: {
                    getSelection: () => {
                        return;
                    }
                },
                minimumPixelsForDrag: this.props.minimumPixelsForDrag
            });
        }
        const frozenColumnCountFromStart = columnReorderProps && columnReorderProps.frozenColumnCountFromStart ? columnReorderProps.frozenColumnCountFromStart : 0;
        const frozenColumnCountFromEnd = columnReorderProps && columnReorderProps.frozenColumnCountFromEnd ? columnReorderProps.frozenColumnCountFromEnd : 0;
        this._classNames = getClassNames(styles, {
            theme: theme,
            isAllSelected,
            isSelectAllHidden: selectAllVisibility === SelectAllVisibility.hidden,
            isResizingColumn: !!columnResizeDetails && isSizing,
            isSizing,
            isAllCollapsed,
            isCheckboxHidden
        });
        const classNames = this._classNames;
        const isRTL = getRTL();
        return (React.createElement(FocusZone, { role: "row", "aria-label": ariaLabel, className: classNames.root, componentRef: this._rootComponent, ref: this._onRootRef, onMouseMove: this._onRootMouseMove, "data-automationid": "DetailsHeader", style: { minWidth: viewport ? viewport.width : 0 }, direction: FocusZoneDirection.horizontal },
            showCheckbox
                ? [
                    React.createElement("div", { key: "__checkbox", className: classNames.cellIsCheck, "aria-labelledby": `${this._id}-check`, onClick: !isCheckboxHidden ? this._onSelectAllClicked : undefined, "aria-colindex": 1, role: 'columnheader', "aria-hidden": isCheckboxHidden ? true : undefined }, onRenderColumnHeaderTooltip({
                        hostClassName: css(classNames.checkTooltip),
                        id: `${this._id}-checkTooltip`,
                        setAriaDescribedBy: false,
                        content: ariaLabelForSelectAllCheckbox,
                        children: (React.createElement(DetailsRowCheck, { id: `${this._id}-check`, "aria-label": ariaLabelForSelectionColumn, "aria-describedby": ariaLabelForSelectAllCheckbox && !this.props.onRenderColumnHeaderTooltip ? `${this._id}-checkTooltip` : undefined, "data-is-focusable": !isCheckboxHidden, isHeader: true, selected: isAllSelected, anySelected: false, canSelect: !isCheckboxHidden, className: classNames.check }))
                    }, this._onRenderColumnHeaderTooltip)),
                    ariaLabelForSelectAllCheckbox && !this.props.onRenderColumnHeaderTooltip ? (React.createElement("label", { key: "__checkboxLabel", id: `${this._id}-checkTooltip`, className: classNames.accessibleLabel }, ariaLabelForSelectAllCheckbox)) : null
                ]
                : null,
            groupNestingDepth > 0 && this.props.collapseAllVisibility === CollapseAllVisibility.visible ? (React.createElement("div", { className: classNames.cellIsGroupExpander, onClick: this._onToggleCollapseAll, "data-is-focusable": true },
                React.createElement(Icon, { className: classNames.collapseButton, iconName: isRTL ? 'ChevronLeftMed' : 'ChevronRightMed' }))) : null,
            React.createElement(GroupSpacer, { indentWidth: indentWidth, count: groupNestingDepth - 1 }),
            columns.map((column, columnIndex) => {
                const _isDraggable = columnReorderProps
                    ? columnIndex >= frozenColumnCountFromStart && columnIndex < columns.length - frozenColumnCountFromEnd
                    : false;
                return [
                    columnReorderProps &&
                        (_isDraggable || columnIndex === columns.length - frozenColumnCountFromEnd) &&
                        this._renderDropHint(columnIndex),
                    React.createElement(DetailsColumn, { column: column, key: column.key, columnIndex: (showCheckbox ? 2 : 1) + columnIndex, parentId: this._id, isDraggable: _isDraggable, updateDragInfo: this._updateDragInfo, dragDropHelper: this._dragDropHelper, onColumnClick: onColumnClick, onColumnContextMenu: onColumnContextMenu, onRenderColumnHeaderTooltip: this.props.onRenderColumnHeaderTooltip, isDropped: this._onDropIndexInfo.targetIndex === columnIndex, cellStyleProps: this.props.cellStyleProps }),
                    this._renderColumnDivider(columnIndex)
                ];
            }),
            columnReorderProps && frozenColumnCountFromEnd === 0 && this._renderDropHint(columns.length),
            isSizing && (React.createElement(Layer, null,
                React.createElement("div", { className: classNames.sizingOverlay, onMouseMove: this._onSizerMouseMove, onMouseUp: this._onSizerMouseUp })))));
    }
    focus() {
        return Boolean(this._rootComponent.current && this._rootComponent.current.focus());
    }
    _getHeaderDragDropOptions() {
        const options = {
            selectionIndex: 1,
            context: { data: this, index: 0 },
            canDrag: () => false,
            canDrop: () => true,
            onDragStart: () => undefined,
            updateDropState: this._updateDroppingState,
            onDrop: this._onDrop,
            onDragEnd: () => undefined,
            onDragOver: this._onDragOver
        };
        return options;
    }
    _updateDroppingState(newValue, event) {
        if (this._draggedColumnIndex >= 0 && event.type !== 'drop') {
            if (!newValue) {
                this._resetDropHints();
            }
        }
    }
    _isValidCurrentDropHintIndex() {
        return this._currentDropHintIndex >= 0;
    }
    _onDragOver(item, event) {
        if (this._draggedColumnIndex >= 0) {
            event.stopPropagation();
            this._computeDropHintToBeShown(event.clientX);
        }
    }
    _onDrop(item, event) {
        const { columnReorderProps } = this.state;
        if (this._draggedColumnIndex >= 0 && event) {
            const targetIndex = this._draggedColumnIndex > this._currentDropHintIndex ? this._currentDropHintIndex : this._currentDropHintIndex - 1;
            let isValidDrop = false;
            event.stopPropagation();
            if (this._isValidCurrentDropHintIndex()) {
                isValidDrop = true;
                this._onDropIndexInfo.sourceIndex = this._draggedColumnIndex;
                this._onDropIndexInfo.targetIndex = targetIndex;
            }
            if (isValidDrop) {
                if (columnReorderProps && columnReorderProps.onColumnDrop) {
                    const dragDropDetails = {
                        draggedIndex: this._draggedColumnIndex,
                        targetIndex: targetIndex
                    };
                    columnReorderProps.onColumnDrop(dragDropDetails);
                }
                else if (columnReorderProps && columnReorderProps.handleColumnReorder) {
                    columnReorderProps.handleColumnReorder(this._draggedColumnIndex, targetIndex);
                }
            }
        }
        this._resetDropHints();
        this._dropHintDetails = {};
        this._draggedColumnIndex = -1;
    }
    _isCheckboxColumnHidden() {
        const { selectionMode, checkboxVisibility } = this.props;
        return selectionMode === SelectionMode.none || checkboxVisibility === CheckboxVisibility.hidden;
    }
    _updateDragInfo(props, event) {
        const { columnReorderProps } = this.state;
        const itemIndex = props.itemIndex;
        if (itemIndex >= 0) {
            this._draggedColumnIndex = this._isCheckboxColumnHidden() ? itemIndex - 1 : itemIndex - 2;
            this._getDropHintPositions();
            if (columnReorderProps && columnReorderProps.onColumnDragStart) {
                columnReorderProps.onColumnDragStart(true);
            }
        }
        else if (event && this._draggedColumnIndex >= 0) {
            this._resetDropHints();
            this._draggedColumnIndex = -1;
            this._dropHintDetails = {};
            if (columnReorderProps && columnReorderProps.onColumnDragEnd) {
                const columnDragEndLocation = this._isEventOnHeader(event);
                columnReorderProps.onColumnDragEnd({ dropLocation: columnDragEndLocation }, event);
            }
        }
    }
    _resetDropHints() {
        if (this._currentDropHintIndex >= 0) {
            this._updateDropHintElement(this._dropHintDetails[this._currentDropHintIndex].dropHintElementRef, 'none');
            this._currentDropHintIndex = Number.MIN_SAFE_INTEGER;
        }
    }
    _updateDropHintElement(element, displayProperty) {
        element.childNodes[1].style.display = displayProperty;
        element.childNodes[0].style.display = displayProperty;
    }
    _liesBetween(target, left, right) {
        return getRTL() ? target <= left && target >= right : target >= left && target <= right;
    }
    _isBefore(a, b) {
        return getRTL() ? a >= b : a <= b;
    }
    _isAfter(a, b) {
        return getRTL() ? a <= b : a >= b;
    }
    _isEventOnHeader(event) {
        if (this._rootElement) {
            const clientRect = this._rootElement.getBoundingClientRect();
            if (event.clientX > clientRect.left &&
                event.clientX < clientRect.right &&
                event.clientY > clientRect.top &&
                event.clientY < clientRect.bottom) {
                return ColumnDragEndLocation.header;
            }
        }
    }
    _renderColumnDivider(columnIndex) {
        const { columns = NO_COLUMNS } = this.props;
        const column = columns[columnIndex];
        const { onRenderDivider } = column;
        return onRenderDivider
            ? onRenderDivider({ column, columnIndex }, this._renderColumnSizer)
            : this._renderColumnSizer({ column, columnIndex });
    }
    _renderDropHint(dropHintIndex) {
        const classNames = this._classNames;
        return (React.createElement("div", { key: 'dropHintKey', className: classNames.dropHintStyle, id: `columnDropHint_${dropHintIndex}` },
            React.createElement(Icon, { key: `dropHintCaretKey`, "aria-hidden": true, "data-is-focusable": false, "data-sizer-index": dropHintIndex, className: classNames.dropHintCaretStyle, iconName: 'CaretUpSolid8' }),
            React.createElement("div", { key: `dropHintLineKey`, "aria-hidden": true, "data-is-focusable": false, "data-sizer-index": dropHintIndex, className: classNames.dropHintLineStyle })));
    }
    _onSizerDoubleClick(columnIndex, ev) {
        const { onColumnAutoResized, columns = NO_COLUMNS } = this.props;
        if (onColumnAutoResized) {
            onColumnAutoResized(columns[columnIndex], columnIndex);
        }
    }
    _onSelectionChanged() {
        const isAllSelected = !!this.props.selection && this.props.selection.isAllSelected();
        if (this.state.isAllSelected !== isAllSelected) {
            this.setState({
                isAllSelected: isAllSelected
            });
        }
    }
    _onToggleCollapseAll() {
        const { onToggleCollapseAll } = this.props;
        const newCollapsed = !this.state.isAllCollapsed;
        this.setState({
            isAllCollapsed: newCollapsed
        });
        if (onToggleCollapseAll) {
            onToggleCollapseAll(newCollapsed);
        }
    }
}
DetailsHeaderBase.defaultProps = {
    selectAllVisibility: SelectAllVisibility.visible,
    collapseAllVisibility: CollapseAllVisibility.visible
};
function getLegacyColumnReorderProps(columnReorderOptions) {
    return {
        ...columnReorderOptions,
        onColumnDragEnd: undefined
    };
}
function stopPropagation(ev) {
    ev.stopPropagation();
}
