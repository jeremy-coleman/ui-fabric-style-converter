import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
const getClassNames = classNamesFunction();
export class ShimmerCircleBase extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { height, styles, borderStyle, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            height,
            borderStyle
        });
        return (React.createElement("div", { className: this._classNames.root },
            React.createElement("svg", { viewBox: "0 0 10 10", width: height, height: height, className: this._classNames.svg },
                React.createElement("path", { d: "M0,0 L10,0 L10,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z" }))));
    }
}
