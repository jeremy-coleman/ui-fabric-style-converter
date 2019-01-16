import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../../Button';
import { BaseComponent, customizable, nullRender } from '../../Utilities';
import { getStyles } from './FacepileButton.styles';
let FacepileButton = class FacepileButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { className, styles, ...rest } = this.props;
        const customStyles = getStyles(this.props.theme, className, styles);
        return React.createElement(BaseButton, Object.assign({}, rest, { variantClassName: "ms-Button--facepile", styles: customStyles, onRenderDescription: nullRender }));
    }
};
FacepileButton = tslib_1.__decorate([
    customizable('FacepileButton', ['theme', 'styles'], true)
], FacepileButton);
export { FacepileButton };
