import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { getStyles } from './IconButton.styles';
let IconButton = class IconButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { styles, theme } = this.props;
        return (React.createElement(BaseButton, Object.assign({}, this.props, { variantClassName: "ms-Button--icon", styles: getStyles(theme, styles), onRenderText: nullRender, onRenderDescription: nullRender })));
    }
};
IconButton = tslib_1.__decorate([
    customizable('IconButton', ['theme', 'styles'], true)
], IconButton);
export { IconButton };
