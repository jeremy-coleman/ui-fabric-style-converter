import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { getStyles } from './ActionButton.styles';
let ActionButton = class ActionButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { styles, theme } = this.props;
        return (React.createElement(BaseButton, Object.assign({}, this.props, { variantClassName: "ms-Button--action ms-Button--command", styles: getStyles(theme, styles), onRenderDescription: nullRender })));
    }
};
ActionButton = tslib_1.__decorate([
    customizable('ActionButton', ['theme', 'styles'], true)
], ActionButton);
export { ActionButton };
