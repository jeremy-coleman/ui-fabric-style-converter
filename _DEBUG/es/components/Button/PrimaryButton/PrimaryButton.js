import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, customizable, nullRender } from '../../../Utilities';
import { DefaultButton } from '../DefaultButton/DefaultButton';
let PrimaryButton = class PrimaryButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        return React.createElement(DefaultButton, Object.assign({}, this.props, { primary: true, onRenderDescription: nullRender }));
    }
};
PrimaryButton = tslib_1.__decorate([
    customizable('PrimaryButton', ['theme', 'styles'], true)
], PrimaryButton);
export { PrimaryButton };
