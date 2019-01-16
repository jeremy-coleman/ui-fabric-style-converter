import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseComponent, assign, css, shallowCompare, getNativeProps, divProperties } from '../../Utilities';
import { CheckboxVisibility } from './DetailsList.types';
import { DetailsRowCheck } from './DetailsRowCheck';
import { GroupSpacer } from '../GroupedList/GroupSpacer';
import { DetailsRowFields } from './DetailsRowFields';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/interfaces';
import { CollapseAllVisibility } from '../../GroupedList';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
const NO_COLUMNS = [];
export class DetailsRowBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._cellMeasurer = React.createRef();
        this._focusZone = React.createRef();
        this._onRootRef = (focusZone) => {
            if (focusZone) {
                this._root = ReactDOM.findDOMNode(focusZone);
            }
            else {
                this._root = undefined;
            }
        };
        this.state = {
            selectionState: this._getSelectionState(props),
            columnMeasureInfo: undefined,
            isDropping: false,
            groupNestingDepth: props.groupNestingDepth
        };
        this._droppingClassNames = '';
        this._updateDroppingState = this._updateDroppingState.bind(this);
        this._onToggleSelection = this._onToggleSelection.bind(this);
    }
    componentDidMount() {
        const { dragDropHelper } = this.props;
        if (dragDropHelper) {
            this._dragDropSubscription = dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
        }
        this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);
        if (this.props.onDidMount && this.props.item) {
            this._hasMounted = true;
            this.props.onDidMount(this);
        }
    }
    componentDidUpdate(previousProps) {
        const state = this.state;
        const { item, onDidMount } = this.props;
        const { columnMeasureInfo } = state;
        if (this.props.itemIndex !== previousProps.itemIndex ||
            this.props.item !== previousProps.item ||
            this.props.dragDropHelper !== previousProps.dragDropHelper) {
            if (this._dragDropSubscription) {
                this._dragDropSubscription.dispose();
                delete this._dragDropSubscription;
            }
            if (this.props.dragDropHelper) {
                this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root, this._events, this._getRowDragDropOptions());
            }
        }
        if (columnMeasureInfo && columnMeasureInfo.index >= 0 && this._cellMeasurer.current) {
            const newWidth = this._cellMeasurer.current.getBoundingClientRect().width;
            columnMeasureInfo.onMeasureDone(newWidth);
            this.setState({
                columnMeasureInfo: undefined
            });
        }
        if (item && onDidMount && !this._hasMounted) {
            this._hasMounted = true;
            onDidMount(this);
        }
    }
    componentWillUnmount() {
        const { item, onWillUnmount } = this.props;
        if (onWillUnmount && item) {
            onWillUnmount(this);
        }
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            selectionState: this._getSelectionState(newProps),
            groupNestingDepth: newProps.groupNestingDepth
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.useReducedRowRenderer) {
            if (this.state.selectionState) {
                const newSelectionState = this._getSelectionState(nextProps);
                if (this.state.selectionState.isSelected !== newSelectionState.isSelected) {
                    return true;
                }
            }
            return shallowCompare(this.props, nextProps);
        }
        else {
            return true;
        }
    }
    render() {
        const { className, columns = NO_COLUMNS, dragDropEvents, item, itemIndex, onRenderCheck = this._onRenderCheck, onRenderItemColumn, selectionMode, viewport, checkboxVisibility, getRowAriaLabel, getRowAriaDescribedBy, checkButtonAriaLabel, checkboxCellClassName, rowFieldsAs: RowFields = DetailsRowFields, selection, indentWidth, shimmer, compact, theme, styles } = this.props;
        const { columnMeasureInfo, isDropping, groupNestingDepth } = this.state;
        const { isSelected = false, isSelectionModal = false } = this.state.selectionState;
        const isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
        const droppingClassName = isDropping ? (this._droppingClassNames ? this._droppingClassNames : DEFAULT_DROPPING_CSS_CLASS) : '';
        const ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : undefined;
        const ariaDescribedBy = getRowAriaDescribedBy ? getRowAriaDescribedBy(item) : undefined;
        const canSelect = !!selection && selection.canSelectItem(item, itemIndex);
        const isContentUnselectable = selectionMode === SelectionMode.multiple;
        const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
        const ariaSelected = selectionMode === SelectionMode.none ? undefined : isSelected;
        const classNames = getClassNames(styles, {
            theme: theme,
            isSelected,
            canSelect: !isContentUnselectable,
            anySelected: isSelectionModal,
            checkboxCellClassName,
            droppingClassName,
            className,
            compact
        });
        const rowFields = (React.createElement(RowFields, { rowClassNames: classNames, columns: columns, item: item, itemIndex: itemIndex, columnStartIndex: showCheckbox ? 1 : 0, onRenderItemColumn: onRenderItemColumn, shimmer: shimmer }));
        if (shimmer) {
            return (React.createElement("div", { className: css(showCheckbox && classNames.shimmerLeftBorder, !compact && classNames.shimmerBottomBorder) }, rowFields));
        }
        return (React.createElement(FocusZone, Object.assign({}, getNativeProps(this.props, divProperties), { direction: FocusZoneDirection.horizontal, ref: this._onRootRef, componentRef: this._focusZone, role: "row", "aria-label": ariaLabel, ariaDescribedBy: ariaDescribedBy, className: css(classNames.root), "data-is-focusable": true, "data-selection-index": itemIndex, "data-item-index": itemIndex, "aria-rowindex": itemIndex + 1, "data-is-draggable": isDraggable, draggable: isDraggable, "data-automationid": "DetailsRow", style: { minWidth: viewport ? viewport.width : 0 }, "aria-selected": ariaSelected, allowFocusRoot: true }),
            showCheckbox && (React.createElement("div", { role: "gridcell", "aria-colindex": 1, "data-selection-toggle": true, className: classNames.checkCell }, onRenderCheck({
                selected: isSelected,
                anySelected: isSelectionModal,
                title: checkButtonAriaLabel,
                canSelect,
                compact,
                className: classNames.check,
                theme,
                isVisible: checkboxVisibility === CheckboxVisibility.always
            }))),
            React.createElement(GroupSpacer, { indentWidth: indentWidth, count: groupNestingDepth - (this.props.collapseAllVisibility === CollapseAllVisibility.hidden ? 1 : 0) }),
            item && rowFields,
            columnMeasureInfo && (React.createElement("span", { role: "presentation", className: css(classNames.cellMeasurer, classNames.cell), ref: this._cellMeasurer },
                React.createElement(RowFields, { rowClassNames: classNames, columns: [columnMeasureInfo.column], item: item, itemIndex: itemIndex, columnStartIndex: (showCheckbox ? 1 : 0) + columns.length, onRenderItemColumn: onRenderItemColumn }))),
            React.createElement("span", { role: "checkbox", className: css(classNames.checkCover), "aria-checked": isSelected, "data-selection-toggle": true })));
    }
    measureCell(index, onMeasureDone) {
        const { columns = NO_COLUMNS } = this.props;
        const column = assign({}, columns[index]);
        column.minWidth = 0;
        column.maxWidth = 999999;
        delete column.calculatedWidth;
        this.setState({
            columnMeasureInfo: {
                index,
                column,
                onMeasureDone
            }
        });
    }
    focus(forceIntoFirstElement = false) {
        return !!this._focusZone.current && this._focusZone.current.focus(forceIntoFirstElement);
    }
    _onRenderCheck(props) {
        return React.createElement(DetailsRowCheck, Object.assign({}, props));
    }
    _getSelectionState(props) {
        const { itemIndex, selection } = props;
        return {
            isSelected: !!selection && selection.isIndexSelected(itemIndex),
            isSelectionModal: !!selection && !!selection.isModal && selection.isModal()
        };
    }
    _onSelectionChanged() {
        const selectionState = this._getSelectionState(this.props);
        if (!shallowCompare(selectionState, this.state.selectionState)) {
            this.setState({
                selectionState: selectionState
            });
        }
    }
    _onToggleSelection() {
        const { selection } = this.props;
        if (selection && this.props.itemIndex > -1) {
            selection.toggleIndexSelected(this.props.itemIndex);
        }
    }
    _getRowDragDropOptions() {
        const { item, itemIndex, dragDropEvents, eventsToRegister } = this.props;
        const options = {
            eventMap: eventsToRegister,
            selectionIndex: itemIndex,
            context: { data: item, index: itemIndex },
            canDrag: dragDropEvents.canDrag,
            canDrop: dragDropEvents.canDrop,
            onDragStart: dragDropEvents.onDragStart,
            updateDropState: this._updateDroppingState,
            onDrop: dragDropEvents.onDrop,
            onDragEnd: dragDropEvents.onDragEnd
        };
        return options;
    }
    _updateDroppingState(newValue, event) {
        const { selectionState, isDropping } = this.state;
        const { dragDropEvents, item } = this.props;
        if (!newValue) {
            if (dragDropEvents.onDragLeave) {
                dragDropEvents.onDragLeave(item, event);
            }
        }
        else {
            if (dragDropEvents.onDragEnter) {
                this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
            }
        }
        if (isDropping !== newValue) {
            this.setState({ selectionState: selectionState, isDropping: newValue });
        }
    }
}
