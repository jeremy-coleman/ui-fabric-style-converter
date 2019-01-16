import * as React from 'react';
import { BaseComponent, getId, toMatrix, classNamesFunction, getNativeProps, htmlElementProperties } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
const getClassNames = classNamesFunction();
export class GridBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._id = getId();
    }
    render() {
        const { items, columnCount, onRenderItem, positionInSet, setSize, styles } = this.props;
        const htmlProps = getNativeProps(this.props, htmlElementProperties, ['onBlur, aria-posinset, aria-setsize']);
        const classNames = getClassNames(styles, { theme: this.props.theme });
        const rowsOfItems = toMatrix(items, columnCount);
        const content = (React.createElement("table", Object.assign({}, htmlProps, { "aria-posinset": positionInSet, "aria-setsize": setSize, id: this._id, role: 'grid', className: classNames.root }),
            React.createElement("tbody", null, rowsOfItems.map((rows, rowIndex) => {
                return (React.createElement("tr", { role: 'row', key: this._id + '-' + rowIndex + '-row' }, rows.map((cell, cellIndex) => {
                    return (React.createElement("td", { role: 'presentation', key: this._id + '-' + cellIndex + '-cell', className: classNames.tableCell }, onRenderItem(cell, cellIndex)));
                })));
            }))));
        return this.props.doNotContainWithinFocusZone ? (content) : (React.createElement(FocusZone, { isCircularNavigation: this.props.shouldFocusCircularNavigate, className: classNames.focusedContainer, onBlur: this.props.onBlur }, content));
    }
}
