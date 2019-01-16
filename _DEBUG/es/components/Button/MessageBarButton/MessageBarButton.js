import * as tslib_1 from "tslib";
import * as React from 'react';
import { DefaultButton } from '../DefaultButton/DefaultButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { getStyles } from './MessageBarButton.styles';
let MessageBarButton = class MessageBarButton extends BaseComponent {
    render() {
        const { styles, theme } = this.props;
        return React.createElement(DefaultButton, Object.assign({}, this.props, { styles: getStyles(theme, styles), onRenderDescription: nullRender }));
    }
};
MessageBarButton = tslib_1.__decorate([
    customizable('MessageBarButton', ['theme', 'styles'], true)
], MessageBarButton);
export { MessageBarButton };
