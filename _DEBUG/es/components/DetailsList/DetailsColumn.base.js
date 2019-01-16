import * as React from 'react';
import { Icon } from '../../Icon';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { ColumnActionsMode } from './DetailsList.types';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
const MOUSEDOWN_PRIMARY_BUTTON = 0;
const getClassNames = classNamesFunction();
const TRANSITION_DURATION_DRAG = 200;
const TRANSITION_DURATION_DROP = 1500;
const CLASSNAME_ADD_INTERVAL = 20;
export class DetailsColumnBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderColumnHeaderTooltip = (tooltipHostProps, defaultRender) => {
            return React.createElement("span", { className: tooltipHostProps.hostClassName }, tooltipHostProps.children);
        };
        this._onRootMouseDown = (ev) => {
            const { isDraggable } = this.props;
            if (isDraggable && ev.button === MOUSEDOWN_PRIMARY_BUTTON) {
                ev.stopPropagation();
            }
        };
        this._root = React.createRef();
        this._onDragStart = this._onDragStart.bind(this);
        this._onDragEnd = this._onDragEnd.bind(this);
        this._onRootMouseDown = this._onRootMouseDown.bind(this);
        this._updateHeaderDragInfo = this._updateHeaderDragInfo.bind(this);
    }
    render() {
        const { column, columnIndex, parentId, isDraggable, styles, theme, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;
        const { onRenderColumnHeaderTooltip = this._onRenderColumnHeaderTooltip } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            headerClassName: column.headerClassName,
            iconClassName: column.iconClassName,
            isActionable: column.columnActionsMode !== ColumnActionsMode.disabled,
            isEmpty: !column.name,
            isIconVisible: column.isSorted || column.isGrouped || column.isFiltered,
            isPadded: column.isPadded,
            isIconOnly: column.isIconOnly,
            cellStyleProps,
            transitionDurationDrag: TRANSITION_DURATION_DRAG,
            transitionDurationDrop: TRANSITION_DURATION_DROP
        });
        const classNames = this._classNames;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { key: column.key, ref: this._root, role: 'columnheader', "aria-sort": column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none', "aria-colindex": columnIndex, className: classNames.root, "data-is-draggable": isDraggable, draggable: isDraggable, style: {
                    width: column.calculatedWidth +
                        cellStyleProps.cellLeftPadding +
                        cellStyleProps.cellRightPadding +
                        (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
                }, "data-automationid": 'ColumnsHeaderColumn', "data-item-key": column.key },
                isDraggable && React.createElement(Icon, { iconName: "GripperBarVertical", className: classNames.gripperBarVerticalStyle }),
                onRenderColumnHeaderTooltip({
                    hostClassName: classNames.cellTooltip,
                    id: `${parentId}-${column.key}-tooltip`,
                    setAriaDescribedBy: false,
                    content: column.columnActionsMode !== ColumnActionsMode.disabled ? column.ariaLabel : '',
                    children: (React.createElement("span", { id: `${parentId}-${column.key}`, "aria-label": column.isIconOnly ? column.name : undefined, "aria-labelledby": column.isIconOnly ? undefined : `${parentId}-${column.key}-name `, className: classNames.cellTitle, "data-is-focusable": column.columnActionsMode !== ColumnActionsMode.disabled, role: column.columnActionsMode !== ColumnActionsMode.disabled &&
                            (column.onColumnClick !== undefined || this.props.onColumnClick !== undefined)
                            ? 'button'
                            : undefined, "aria-describedby": !this.props.onRenderColumnHeaderTooltip && this._hasAccessibleLabel() ? `${parentId}-${column.key}-tooltip` : undefined, onContextMenu: this._onColumnContextMenu.bind(this, column), onClick: this._onColumnClick.bind(this, column), "aria-haspopup": column.columnActionsMode === ColumnActionsMode.hasDropdown },
                        React.createElement("span", { id: `${parentId}-${column.key}-name`, className: classNames.cellName },
                            (column.iconName || column.iconClassName) && React.createElement(Icon, { className: classNames.iconClassName, iconName: column.iconName }),
                            column.isIconOnly ? React.createElement("span", { className: classNames.accessibleLabel }, column.name) : column.name),
                        column.isFiltered && React.createElement(Icon, { className: classNames.nearIcon, iconName: 'Filter' }),
                        column.isSorted && React.createElement(Icon, { className: classNames.sortIcon, iconName: column.isSortedDescending ? 'SortDown' : 'SortUp' }),
                        column.isGrouped && React.createElement(Icon, { className: classNames.nearIcon, iconName: 'GroupedDescending' }),
                        column.columnActionsMode === ColumnActionsMode.hasDropdown && !column.isIconOnly && (React.createElement(Icon, { "aria-hidden": true, className: classNames.filterChevron, iconName: 'ChevronDown' }))))
                }, this._onRenderColumnHeaderTooltip)),
            !this.props.onRenderColumnHeaderTooltip ? this._renderAccessibleLabel() : null));
    }
    componentDidMount() {
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
        if (this.props.dragDropHelper && this.props.isDraggable) {
            this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getColumnDragDropOptions());
            this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
        }
        const classNames = this._classNames;
        if (this.props.isDropped) {
            if (this._root.current) {
                this._root.current.classList.add(classNames.borderAfterDropping);
                this._async.setTimeout(() => {
                    if (this._root.current) {
                        this._root.current.classList.add(classNames.noBorderAfterDropping);
                    }
                }, CLASSNAME_ADD_INTERVAL);
            }
            this._async.setTimeout(() => {
                if (this._root.current) {
                    this._root.current.classList.remove(classNames.borderAfterDropping);
                    this._root.current.classList.remove(classNames.noBorderAfterDropping);
                }
            }, TRANSITION_DURATION_DROP + CLASSNAME_ADD_INTERVAL);
        }
    }
    componentWillUnmount() {
        if (this._dragDropSubscription) {
            this._dragDropSubscription.dispose();
            delete this._dragDropSubscription;
        }
    }
    componentDidUpdate() {
        if (!this._dragDropSubscription && this.props.dragDropHelper && this.props.isDraggable) {
            this._dragDropSubscription = this.props.dragDropHelper.subscribe(this._root.current, this._events, this._getColumnDragDropOptions());
            this._events.on(this._root.current, 'mousedown', this._onRootMouseDown);
        }
        if (this._dragDropSubscription && !this.props.isDraggable) {
            this._dragDropSubscription.dispose();
            this._events.off(this._root.current, 'mousedown');
            delete this._dragDropSubscription;
        }
    }
    _onColumnClick(column, ev) {
        if (column.columnActionsMode === ColumnActionsMode.disabled) {
            return;
        }
        const { onColumnClick } = this.props;
        if (column.onColumnClick) {
            column.onColumnClick(ev, column);
        }
        if (onColumnClick) {
            onColumnClick(ev, column);
        }
    }
    _getColumnDragDropOptions() {
        const { columnIndex } = this.props;
        const options = {
            selectionIndex: columnIndex,
            context: { data: columnIndex, index: columnIndex },
            canDrag: () => this.props.isDraggable,
            canDrop: () => false,
            onDragStart: this._onDragStart,
            updateDropState: () => undefined,
            onDrop: () => undefined,
            onDragEnd: this._onDragEnd
        };
        return options;
    }
    _hasAccessibleLabel() {
        const { column } = this.props;
        return !!(column.ariaLabel ||
            column.filterAriaLabel ||
            column.sortAscendingAriaLabel ||
            column.sortDescendingAriaLabel ||
            column.groupAriaLabel);
    }
    _renderAccessibleLabel() {
        const { column, parentId } = this.props;
        const classNames = this._classNames;
        return this._hasAccessibleLabel() && !this.props.onRenderColumnHeaderTooltip ? (React.createElement("label", { key: `${column.key}_label`, id: `${parentId}-${column.key}-tooltip`, className: classNames.accessibleLabel },
            column.ariaLabel,
            (column.isFiltered && column.filterAriaLabel) || null,
            (column.isSorted && (column.isSortedDescending ? column.sortDescendingAriaLabel : column.sortAscendingAriaLabel)) || null,
            (column.isGrouped && column.groupAriaLabel) || null)) : null;
    }
    _onDragStart(item, itemIndex, selectedItems, event) {
        const classNames = this._classNames;
        if (itemIndex) {
            this._updateHeaderDragInfo(itemIndex);
            this._root.current.classList.add(classNames.borderWhileDragging);
            this._async.setTimeout(() => {
                if (this._root.current) {
                    this._root.current.classList.add(classNames.noBorderWhileDragging);
                }
            }, CLASSNAME_ADD_INTERVAL);
        }
    }
    _onDragEnd(item, event) {
        const classNames = this._classNames;
        if (event) {
            this._updateHeaderDragInfo(-1, event);
        }
        this._root.current.classList.remove(classNames.borderWhileDragging);
        this._root.current.classList.remove(classNames.noBorderWhileDragging);
    }
    _updateHeaderDragInfo(itemIndex, event) {
        if (this.props.setDraggedItemIndex) {
            this.props.setDraggedItemIndex(itemIndex);
        }
        if (this.props.updateDragInfo) {
            this.props.updateDragInfo({ itemIndex }, event);
        }
    }
    _onColumnContextMenu(column, ev) {
        const { onColumnContextMenu } = this.props;
        if (column.onColumnContextMenu) {
            column.onColumnContextMenu(column, ev);
            ev.preventDefault();
        }
        if (onColumnContextMenu) {
            onColumnContextMenu(column, ev);
            ev.preventDefault();
        }
    }
}
