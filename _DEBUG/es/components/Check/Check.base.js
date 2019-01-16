import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { Icon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
export class CheckBase extends BaseComponent {
    shouldComponentUpdate(newProps) {
        return this.props.checked !== newProps.checked || this.props.theme !== newProps.theme || this.props.className !== newProps.className;
    }
    render() {
        const { checked, className, theme, styles } = this.props;
        const classNames = getClassNames(styles, { theme: theme, className, checked });
        return (React.createElement("div", { className: classNames.root },
            React.createElement(Icon, { iconName: "CircleRing", className: classNames.circle }),
            React.createElement(Icon, { iconName: "StatusCircleCheckmark", className: classNames.check })));
    }
}
CheckBase.defaultProps = {
    checked: false
};
