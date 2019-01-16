import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
export class KeytipContentBase extends BaseComponent {
    render() {
        const { content, styles, theme, disabled, visible } = this.props;
        const getClassNames = classNamesFunction();
        const classNames = getClassNames(styles, {
            theme: theme,
            disabled,
            visible
        });
        return (React.createElement("div", { className: classNames.container },
            React.createElement("span", { className: classNames.root }, content)));
    }
}
