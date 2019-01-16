import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { GroupSpacer } from './GroupSpacer';
const getClassNames = classNamesFunction();
export class GroupFooterBase extends BaseComponent {
    render() {
        const { group, groupLevel, footerText, indentWidth, styles, theme } = this.props;
        const classNames = getClassNames(styles, { theme: theme });
        if (group && footerText) {
            return (React.createElement("div", { className: classNames.root },
                React.createElement(GroupSpacer, { indentWidth: indentWidth, count: groupLevel }),
                footerText));
        }
        return null;
    }
}
