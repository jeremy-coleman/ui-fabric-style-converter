import * as React from 'react';
import { Async, BaseComponent, classNamesFunction, findIndex, KeyCodes, getId } from '../../Utilities';
import { Grid } from '../../utilities/grid/Grid';
import { ColorPickerGridCell } from './ColorPickerGridCell';
const getClassNames = classNamesFunction();
export class SwatchColorPickerBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.navigationIdleDelay = 250;
        this._onSwatchColorPickerBlur = () => {
            if (this.props.onCellFocused) {
                this._cellFocused = false;
                this.props.onCellFocused();
            }
        };
        this._renderOption = (item) => {
            const id = this._id;
            return (React.createElement(ColorPickerGridCell, { item: item, id: id, color: item.color, styles: this.props.getColorGridCellStyles, disabled: this.props.disabled, onClick: this._onCellClick, onHover: this._onGridCellHovered, onFocus: this._onGridCellFocused, selected: this.state.selectedIndex !== undefined && this.state.selectedIndex === item.index, circle: this.props.cellShape === 'circle', label: item.label, onMouseEnter: this._onMouseEnter, onMouseMove: this._onMouseMove, onMouseLeave: this._onMouseLeave, onWheel: this._onWheel, onKeyDown: this._onKeyDown, height: this.props.cellHeight, width: this.props.cellWidth, borderWidth: this.props.cellBorderWidth }));
        };
        this._onMouseEnter = (ev) => {
            if (!this.props.focusOnHover) {
                if (!this.isNavigationIdle || this.props.disabled) {
                    return true;
                }
                return false;
            }
            if (this.isNavigationIdle && !this.props.disabled) {
                ev.currentTarget.focus();
            }
            return true;
        };
        this._onMouseMove = (ev) => {
            if (!this.props.focusOnHover) {
                if (!this.isNavigationIdle || this.props.disabled) {
                    return true;
                }
                return false;
            }
            const targetElement = ev.currentTarget;
            if (this.isNavigationIdle && !(document && targetElement === document.activeElement)) {
                targetElement.focus();
            }
            return true;
        };
        this._onMouseLeave = (ev) => {
            const parentSelector = this.props.mouseLeaveParentSelector;
            if (!this.props.focusOnHover || !parentSelector || !this.isNavigationIdle || this.props.disabled) {
                return;
            }
            const elements = document.querySelectorAll(parentSelector);
            for (let index = 0; index < elements.length; index += 1) {
                if (elements[index].contains(ev.currentTarget)) {
                    if (elements[index].setActive) {
                        try {
                            elements[index].setActive();
                        }
                        catch (e) {
                        }
                    }
                    else {
                        elements[index].focus();
                    }
                    break;
                }
            }
        };
        this._onWheel = () => {
            this.setNavigationTimeout();
        };
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.up || ev.which === KeyCodes.down || ev.which === KeyCodes.left || ev.which === KeyCodes.right) {
                this.setNavigationTimeout();
            }
        };
        this.setNavigationTimeout = () => {
            if (!this.isNavigationIdle && this.navigationIdleTimeoutId !== undefined) {
                this.async.clearTimeout(this.navigationIdleTimeoutId);
                this.navigationIdleTimeoutId = undefined;
            }
            else {
                this.isNavigationIdle = false;
            }
            this.navigationIdleTimeoutId = this.async.setTimeout(() => {
                this.isNavigationIdle = true;
            }, this.navigationIdleDelay);
        };
        this._onGridCellHovered = (item) => {
            const { onCellHovered } = this.props;
            if (onCellHovered) {
                return item ? onCellHovered(item.id, item.color) : onCellHovered();
            }
        };
        this._onGridCellFocused = (item) => {
            const { onCellFocused } = this.props;
            if (onCellFocused) {
                if (item) {
                    this._cellFocused = true;
                    return onCellFocused(item.id, item.color);
                }
                else {
                    this._cellFocused = false;
                    return onCellFocused();
                }
            }
        };
        this._onCellClick = (item) => {
            if (this.props.disabled) {
                return;
            }
            const index = item.index;
            if (index >= 0 && index !== this.state.selectedIndex) {
                if (this.props.onCellFocused && this._cellFocused) {
                    this._cellFocused = false;
                    this.props.onCellFocused();
                }
                if (this.props.onColorChanged) {
                    this.props.onColorChanged(item.id, item.color);
                }
                this.setState({
                    selectedIndex: index
                });
            }
        };
        this._id = props.id || getId('swatchColorPicker');
        this._warnMutuallyExclusive({
            focusOnHover: 'onHover'
        });
        this._warnConditionallyRequiredProps(['focusOnHover'], 'mouseLeaveParentSelector', !!this.props.mouseLeaveParentSelector);
        this.isNavigationIdle = true;
        this.async = new Async(this);
        let selectedIndex;
        if (props.selectedId) {
            selectedIndex = this._getSelectedIndex(props.colorCells, props.selectedId);
        }
        this.state = {
            selectedIndex
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.selectedId !== undefined) {
            this.setState({
                selectedIndex: this._getSelectedIndex(newProps.colorCells, newProps.selectedId)
            });
        }
    }
    componentWillUnmount() {
        if (this.props.onCellFocused && this._cellFocused) {
            this._cellFocused = false;
            this.props.onCellFocused();
        }
    }
    render() {
        const { colorCells, columnCount, positionInSet, setSize, shouldFocusCircularNavigate, className, doNotContainWithinFocusZone, styles, cellMargin } = this.props;
        const classNames = getClassNames(styles, {
            theme: this.props.theme,
            className,
            cellMargin
        });
        if (colorCells.length < 1 || columnCount < 1) {
            return null;
        }
        return (React.createElement(Grid, Object.assign({}, this.props, { items: colorCells.map((item, index) => {
                return { ...item, index: index };
            }), columnCount: columnCount, onRenderItem: this._renderOption, positionInSet: positionInSet && positionInSet, setSize: setSize && setSize, shouldFocusCircularNavigate: shouldFocusCircularNavigate, doNotContainWithinFocusZone: doNotContainWithinFocusZone, onBlur: this._onSwatchColorPickerBlur, theme: this.props.theme, styles: props => ({
                root: classNames.root,
                tableCell: classNames.tableCell,
                focusedContainer: classNames.focusedContainer
            }) })));
    }
    _getSelectedIndex(items, selectedId) {
        const selectedIndex = findIndex(items, item => item.id === selectedId);
        return selectedIndex >= 0 ? selectedIndex : undefined;
    }
}
SwatchColorPickerBase.defaultProps = {
    cellShape: 'circle',
    disabled: false,
    shouldFocusCircularNavigate: true,
    cellMargin: 10
};
