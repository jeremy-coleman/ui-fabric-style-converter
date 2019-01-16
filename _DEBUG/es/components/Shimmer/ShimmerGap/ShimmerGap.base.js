import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
const getClassNames = classNamesFunction();
export class ShimmerGapBase extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { height, styles, width, borderStyle, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            height,
            borderStyle
        });
        return (React.createElement("div", { style: { width: width ? width : '10px', minWidth: typeof width === 'number' ? `${width}px` : 'auto' }, className: this._classNames.root }));
    }
}
