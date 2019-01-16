import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { Icon } from '../../Icon';
let styles;
export class DocumentCardLogo extends BaseComponent {
    render() {
        const { logoIcon } = this.props;
        return (React.createElement("div", { className: css('ms-DocumentCardLogo', styles.logo) },
            React.createElement(Icon, { iconName: logoIcon })));
    }
}
