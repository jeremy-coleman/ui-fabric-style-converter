import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { getStyles } from './DefaultButton.styles';
let DefaultButton = class DefaultButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { primary = false, styles, theme } = this.props;
        return (React.createElement(BaseButton, Object.assign({}, this.props, { variantClassName: primary ? 'ms-Button--primary' : 'ms-Button--default', styles: getStyles(theme, styles, primary), onRenderDescription: nullRender })));
    }
};
DefaultButton = tslib_1.__decorate([
    customizable('DefaultButton', ['theme', 'styles'], true)
], DefaultButton);
export { DefaultButton };
