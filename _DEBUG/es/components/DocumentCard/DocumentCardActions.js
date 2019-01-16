import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
let styles;
export class DocumentCardActions extends BaseComponent {
    render() {
        const { actions, views } = this.props;
        return (React.createElement("div", { className: css('ms-DocumentCardActions', styles.actions) },
            actions &&
                actions.map((action, index) => {
                    return (React.createElement("div", { className: css('ms-DocumentCardActions-action', styles.action), key: index },
                        React.createElement(IconButton, Object.assign({}, action))));
                }),
            views > 0 && (React.createElement("div", { className: css('ms-DocumentCardActions-views', styles.views) },
                React.createElement(Icon, { iconName: "View", className: styles.viewsIcon }),
                views))));
    }
}
