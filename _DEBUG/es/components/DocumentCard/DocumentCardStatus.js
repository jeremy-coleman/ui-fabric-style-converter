import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { Icon } from '../../Icon';
let styles;
export class DocumentCardStatus extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { statusIcon, status } = this.props;
        const iconProps = {
            iconName: statusIcon,
            styles: {
                root: { padding: '8px' }
            }
        };
        return (React.createElement("div", { className: css('ms-DocumentCardStatus', styles.status) },
            statusIcon && React.createElement(Icon, Object.assign({}, iconProps)),
            status));
    }
}
