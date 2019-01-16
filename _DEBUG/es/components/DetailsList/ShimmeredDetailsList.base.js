import * as React from 'react';
import { BaseComponent, css, classNamesFunction } from '../../Utilities';
import { SelectionMode } from '../../utilities/selection/interfaces';
import { DetailsList } from './DetailsList';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType } from '../../Shimmer';
import { CheckboxVisibility } from './DetailsList.types';
import { DEFAULT_CELL_STYLE_PROPS, DEFAULT_ROW_HEIGHTS, getStyles as getRowStyles } from './DetailsRow.styles';
const getRowClassNames = classNamesFunction();
const getClassNames = classNamesFunction();
const SHIMMER_INITIAL_ITEMS = 10;
const DEFAULT_SHIMMER_HEIGHT = 7;
const SHIMMER_LINE_VS_CELL_WIDTH_RATIO = 0.95;
export class ShimmeredDetailsListBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderShimmerPlaceholder = (index, rowProps) => {
            const { onRenderCustomPlaceholder, compact } = this.props;
            const { selectionMode, checkboxVisibility } = rowProps;
            const theme = this.props.theme;
            const showCheckbox = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
            const rowStyleProps = {
                ...rowProps,
                theme: theme
            };
            const rowClassNames = getRowClassNames(getRowStyles(rowStyleProps), {
                theme: theme
            });
            const placeholderElements = onRenderCustomPlaceholder
                ? onRenderCustomPlaceholder()
                : this._renderDefaultShimmerPlaceholder(rowProps);
            return (React.createElement("div", { className: css(showCheckbox && rowClassNames.shimmerLeftBorder, !compact && rowClassNames.shimmerBottomBorder) },
                React.createElement(Shimmer, { customElementsGroup: placeholderElements })));
        };
        this._renderDefaultShimmerPlaceholder = (rowProps) => {
            const { columns, compact, cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = rowProps;
            const shimmerElementsRow = [];
            const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;
            const gapHeight = compact ? compactRowHeight : rowHeight;
            columns.map((column, columnIdx) => {
                const shimmerElements = [];
                const groupWidth = cellStyleProps.cellLeftPadding +
                    cellStyleProps.cellRightPadding +
                    column.calculatedWidth +
                    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0);
                shimmerElements.push({
                    type: ShimmerElementType.gap,
                    width: cellStyleProps.cellLeftPadding,
                    height: gapHeight
                });
                if (column.isIconOnly) {
                    shimmerElements.push({
                        type: ShimmerElementType.line,
                        width: column.calculatedWidth,
                        height: column.calculatedWidth
                    });
                    shimmerElements.push({
                        type: ShimmerElementType.gap,
                        width: cellStyleProps.cellRightPadding,
                        height: gapHeight
                    });
                }
                else {
                    shimmerElements.push({
                        type: ShimmerElementType.line,
                        width: column.calculatedWidth * SHIMMER_LINE_VS_CELL_WIDTH_RATIO,
                        height: DEFAULT_SHIMMER_HEIGHT
                    });
                    shimmerElements.push({
                        type: ShimmerElementType.gap,
                        width: cellStyleProps.cellRightPadding +
                            (column.calculatedWidth - column.calculatedWidth * SHIMMER_LINE_VS_CELL_WIDTH_RATIO) +
                            (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0),
                        height: gapHeight
                    });
                }
                shimmerElementsRow.push(React.createElement(ShimmerElementsGroup, { key: columnIdx, width: `${groupWidth}px`, shimmerElements: shimmerElements }));
            });
            shimmerElementsRow.push(React.createElement(ShimmerElementsGroup, { key: 'endGap', width: '100%', shimmerElements: [{ type: ShimmerElementType.gap, width: '100%', height: gapHeight }] }));
            return React.createElement("div", { style: { display: 'flex' } }, shimmerElementsRow);
        };
        this._shimmerItems = props.shimmerLines ? new Array(props.shimmerLines) : new Array(SHIMMER_INITIAL_ITEMS);
    }
    render() {
        const { items, listProps, styles, theme, shimmerLines, onRenderCustomPlaceholder, enableShimmer, ...detailsListProps } = this.props;
        const classNames = getClassNames(styles, {
            theme: theme,
            className: listProps && listProps.className,
            enableShimmer
        });
        const newListProps = { ...listProps, className: classNames.root };
        return (React.createElement(DetailsList, Object.assign({}, detailsListProps, { enableShimmer: enableShimmer, items: enableShimmer ? this._shimmerItems : items, onRenderMissingItem: this._onRenderShimmerPlaceholder, listProps: newListProps })));
    }
}
