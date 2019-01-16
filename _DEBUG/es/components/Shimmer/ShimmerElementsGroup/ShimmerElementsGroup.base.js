import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { ShimmerElementType, ShimmerElementsDefaultHeights } from '../Shimmer.types';
import { ShimmerLine } from '../ShimmerLine/ShimmerLine';
import { ShimmerGap } from '../ShimmerGap/ShimmerGap';
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle';
const getClassNames = classNamesFunction();
export class ShimmerElementsGroupBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._getRenderedElements = (shimmerElements, rowHeight) => {
            const renderedElements = shimmerElements ? (shimmerElements.map((elem, index) => {
                const { type, ...filteredElem } = elem;
                switch (elem.type) {
                    case ShimmerElementType.circle:
                        return React.createElement(ShimmerCircle, Object.assign({ key: index }, filteredElem, { styles: this._getBorderStyles(elem, rowHeight) }));
                    case ShimmerElementType.gap:
                        return React.createElement(ShimmerGap, Object.assign({ key: index }, filteredElem, { styles: this._getBorderStyles(elem, rowHeight) }));
                    case ShimmerElementType.line:
                        return React.createElement(ShimmerLine, Object.assign({ key: index }, filteredElem, { styles: this._getBorderStyles(elem, rowHeight) }));
                }
            })) : (React.createElement(ShimmerLine, { height: ShimmerElementsDefaultHeights.line, styles: { root: [{ borderWidth: '0px' }] } }));
            return renderedElements;
        };
        this._getBorderStyles = (elem, rowHeight) => {
            const elemHeight = elem.height;
            const dif = rowHeight && elemHeight ? rowHeight - elemHeight : 0;
            let borderStyle;
            if (!elem.verticalAlign || elem.verticalAlign === 'center') {
                borderStyle = {
                    borderBottomWidth: `${dif ? Math.floor(dif / 2) : 0}px`,
                    borderTopWidth: `${dif ? Math.ceil(dif / 2) : 0}px`
                };
            }
            else if (elem.verticalAlign && elem.verticalAlign === 'top') {
                borderStyle = {
                    borderBottomWidth: `${dif ? dif : 0}px`,
                    borderTopWidth: `0px`
                };
            }
            else if (elem.verticalAlign && elem.verticalAlign === 'bottom') {
                borderStyle = {
                    borderBottomWidth: `0px`,
                    borderTopWidth: `${dif ? dif : 0}px`
                };
            }
            return {
                root: [{ ...borderStyle }]
            };
        };
        this._findMaxElementHeight = (elements) => {
            const itemsDefaulted = elements.map((elem) => {
                switch (elem.type) {
                    case ShimmerElementType.circle:
                        if (!elem.height) {
                            elem.height = ShimmerElementsDefaultHeights.circle;
                        }
                    case ShimmerElementType.line:
                        if (!elem.height) {
                            elem.height = ShimmerElementsDefaultHeights.line;
                        }
                    case ShimmerElementType.gap:
                        if (!elem.height) {
                            elem.height = ShimmerElementsDefaultHeights.gap;
                        }
                }
                return elem;
            });
            const rowHeight = itemsDefaulted.reduce((acc, next) => {
                return next.height ? (next.height > acc ? next.height : acc) : acc;
            }, 0);
            return rowHeight;
        };
    }
    render() {
        const { styles, width, shimmerElements, rowHeight, flexWrap, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            flexWrap
        });
        const height = rowHeight ? rowHeight : this._findMaxElementHeight(shimmerElements ? shimmerElements : []);
        return (React.createElement("div", { style: { width: width ? width : 'auto' }, className: this._classNames.root }, this._getRenderedElements(shimmerElements, height)));
    }
}
ShimmerElementsGroupBase.defaultProps = {
    flexWrap: false
};
