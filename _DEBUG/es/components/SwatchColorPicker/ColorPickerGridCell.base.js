import * as React from 'react';
import { getColorFromString } from '../../utilities/color/colors';
import { GridCell } from '../../utilities/grid/GridCell';
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles';
import { mergeStyleSets } from '../../Styling';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
class ColorCell extends GridCell {
}
export class ColorPickerGridCellBase extends React.Component {
    constructor() {
        super(...arguments);
        this._onRenderColorOption = (colorOption) => {
            return (React.createElement("svg", { className: this._classNames.svg, viewBox: "0 0 20 20", fill: getColorFromString(colorOption.color).str }, this.props.circle ? React.createElement("circle", { cx: "50%", cy: "50%", r: "50%" }) : React.createElement("rect", { width: "100%", height: "100%" })));
        };
        this._getClassNames = (theme, className, variantClassName, iconClassName, menuIconClassName, disabled, checked, expanded, isSplit) => {
            const styles = getActionButtonStyles(theme);
            return mergeStyleSets(this._classNames, {
                root: [
                    'ms-Button',
                    styles.root,
                    variantClassName,
                    className,
                    checked && ['is-checked', styles.rootChecked],
                    disabled && ['is-disabled', styles.rootDisabled],
                    !disabled &&
                        !checked && {
                        selectors: {
                            ':hover': styles.rootHovered,
                            ':focus': styles.rootFocused,
                            ':active': styles.rootPressed
                        }
                    },
                    disabled && checked && [styles.rootCheckedDisabled],
                    !disabled &&
                        checked && {
                        selectors: {
                            ':hover': styles.rootCheckedHovered,
                            ':active': styles.rootCheckedPressed
                        }
                    }
                ],
                flexContainer: ['ms-Button-flexContainer', styles.flexContainer]
            });
        };
    }
    render() {
        const { item, id, selected, disabled, styles, theme, circle, color, onClick, onHover, onFocus, onMouseEnter, onMouseMove, onMouseLeave, onWheel, onKeyDown, height, width, borderWidth } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            disabled,
            selected,
            circle,
            isWhite: this._isWhiteCell(color),
            height,
            width,
            borderWidth
        });
        return (React.createElement(ColorCell, { item: item, id: `${id}-${item.id}-${item.index}`, key: item.id, disabled: disabled, role: 'gridcell', onRenderItem: this._onRenderColorOption, selected: selected, onClick: onClick, onHover: onHover, onFocus: onFocus, label: item.label, className: this._classNames.colorCell, getClassNames: this._getClassNames, index: item.index, onMouseEnter: onMouseEnter, onMouseMove: onMouseMove, onMouseLeave: onMouseLeave, onWheel: onWheel, onKeyDown: onKeyDown }));
    }
    _isWhiteCell(inputColor) {
        const color = getColorFromString(inputColor);
        return color.hex === 'ffffff';
    }
}
ColorPickerGridCellBase.defaultProps = {
    circle: true,
    disabled: false,
    selected: false,
    height: 20,
    width: 20,
    borderWidth: 2
};
