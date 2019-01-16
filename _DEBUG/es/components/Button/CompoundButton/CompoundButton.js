import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseButton } from '../BaseButton';
import { BaseComponent, customizable } from '../../../Utilities';
import { getStyles } from './CompoundButton.styles';
let CompoundButton = class CompoundButton extends BaseComponent {
    constructor() {
        super(...arguments);
        this._skipComponentRefResolution = true;
    }
    render() {
        const { primary = false, styles, theme } = this.props;
        return (React.createElement(BaseButton, Object.assign({}, this.props, { variantClassName: primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound', styles: getStyles(theme, styles, primary) })));
    }
};
CompoundButton = tslib_1.__decorate([
    customizable('CompoundButton', ['theme', 'styles'], true)
], CompoundButton);
export { CompoundButton };
