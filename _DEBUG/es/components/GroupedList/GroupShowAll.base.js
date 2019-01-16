import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { Link } from '../../Link';
import { GroupSpacer } from './GroupSpacer';
const getClassNames = classNamesFunction();
export class GroupShowAllBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this._onSummarizeClick = (ev) => {
            this.props.onToggleSummarize(this.props.group);
            ev.stopPropagation();
            ev.preventDefault();
        };
    }
    render() {
        const { group, groupLevel, showAllLinkText, styles, theme } = this.props;
        const classNames = getClassNames(styles, { theme: theme });
        if (group) {
            return (React.createElement("div", { className: classNames.root },
                React.createElement(GroupSpacer, { count: groupLevel }),
                React.createElement(Link, { onClick: this._onSummarizeClick }, showAllLinkText)));
        }
        return null;
    }
}
GroupShowAllBase.defaultProps = {
    showAllLinkText: 'Show All'
};
