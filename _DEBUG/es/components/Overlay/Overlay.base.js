import * as React from 'react';
import { BaseComponent, classNamesFunction, getNativeProps, divProperties, enableBodyScroll, disableBodyScroll } from '../../Utilities';
const getClassNames = classNamesFunction();
export class OverlayBase extends BaseComponent {
    componentDidMount() {
        disableBodyScroll();
    }
    componentWillUnmount() {
        enableBodyScroll();
    }
    render() {
        const { isDarkThemed: isDark, className, theme, styles } = this.props;
        const divProps = getNativeProps(this.props, divProperties);
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            isDark
        });
        return React.createElement("div", Object.assign({}, divProps, { className: classNames.root }));
    }
}
