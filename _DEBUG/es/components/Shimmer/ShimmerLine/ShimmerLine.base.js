import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
const getClassNames = classNamesFunction();
export class ShimmerLineBase extends BaseComponent {
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
        return (React.createElement("div", { style: { width: width ? width : '100%', minWidth: typeof width === 'number' ? `${width}px` : 'auto' }, className: this._classNames.root },
            React.createElement("svg", { width: "2", height: "2", className: this._classNames.topLeftCorner },
                React.createElement("path", { d: "M0 2 A 2 2, 0, 0, 1, 2 0 L 0 0 Z" })),
            React.createElement("svg", { width: "2", height: "2", className: this._classNames.topRightCorner },
                React.createElement("path", { d: "M0 0 A 2 2, 0, 0, 1, 2 2 L 2 0 Z" })),
            React.createElement("svg", { width: "2", height: "2", className: this._classNames.bottomRightCorner },
                React.createElement("path", { d: "M2 0 A 2 2, 0, 0, 1, 0 2 L 2 2 Z" })),
            React.createElement("svg", { width: "2", height: "2", className: this._classNames.bottomLeftCorner },
                React.createElement("path", { d: "M2 2 A 2 2, 0, 0, 1, 0 0 L 0 2 Z" }))));
    }
}
