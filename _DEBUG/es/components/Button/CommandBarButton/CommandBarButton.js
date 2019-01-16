import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { getStyles } from './CommandBarButton.styles';
let CommandBarButton = class CommandBarButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { styles, theme } = this.props;
        return (React.createElement(BaseButton, Object.assign({}, this.props, { variantClassName: "ms-Button--commandBar", styles: getStyles(theme, styles), onRenderDescription: nullRender })));
    }
};
CommandBarButton = tslib_1.__decorate([
    customizable('CommandBarButton', ['theme', 'styles'], true)
], CommandBarButton);
export { CommandBarButton };
