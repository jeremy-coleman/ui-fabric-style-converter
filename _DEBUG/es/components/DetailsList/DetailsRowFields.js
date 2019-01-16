import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
export class DetailsRowFields extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = this._getState(props);
    }
    componentWillReceiveProps(newProps) {
        this.setState(this._getState(newProps));
    }
    render() {
        const { columns, columnStartIndex, shimmer, rowClassNames, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = this.props;
        const { cellContent } = this.state;
        return (React.createElement("div", { className: rowClassNames.fields, "data-automationid": "DetailsRowFields", role: "presentation" }, columns.map((column, columnIndex) => {
            const width = typeof column.calculatedWidth === 'undefined'
                ? 'auto'
                : column.calculatedWidth +
                    cellStyleProps.cellLeftPadding +
                    cellStyleProps.cellRightPadding +
                    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);
            return (React.createElement("div", { key: columnIndex, role: column.isRowHeader ? 'rowheader' : 'gridcell', "aria-colindex": columnIndex + columnStartIndex + 1, className: css(column.className, column.isMultiline && rowClassNames.isMultiline, column.isRowHeader && rowClassNames.isRowHeader, column.isIconOnly && shimmer && rowClassNames.shimmerIconPlaceholder, shimmer && rowClassNames.shimmer, rowClassNames.cell, column.isPadded ? rowClassNames.cellPadded : rowClassNames.cellUnpadded), style: { width }, "data-automationid": "DetailsRowCell", "data-automation-key": column.key }, cellContent[columnIndex]));
        })));
    }
    _getState(props) {
        const { item, itemIndex, onRenderItemColumn, shimmer } = props;
        return {
            cellContent: props.columns.map(column => {
                let cellContent;
                try {
                    const render = column.onRender || onRenderItemColumn;
                    cellContent = render && !shimmer ? render(item, itemIndex, column) : this._getCellText(item, column);
                }
                catch (e) {
                }
                return cellContent;
            })
        };
    }
    _getCellText(item, column) {
        let value = item && column && column.fieldName ? item[column.fieldName] : '';
        if (value === null || value === undefined) {
            value = '';
        }
        return value;
    }
}
