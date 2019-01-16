import * as React from 'react';
import { BaseComponent, warn } from '../../Utilities';
import { ButtonType } from './Button.types';
import { DefaultButton } from './DefaultButton/DefaultButton';
import { ActionButton } from './ActionButton/ActionButton';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { IconButton } from './IconButton/IconButton';
import { PrimaryButton } from './PrimaryButton/PrimaryButton';
export class Button extends BaseComponent {
    constructor(props) {
        super(props);
        this._skipComponentRefResolution = true;
        warn(`The Button component has been deprecated. Use specific variants instead. ` +
            `(PrimaryButton, DefaultButton, IconButton, ActionButton, etc.)`);
    }
    render() {
        const props = this.props;
        switch (props.buttonType) {
            case ButtonType.command:
                return React.createElement(ActionButton, Object.assign({}, props));
            case ButtonType.compound:
                return React.createElement(CompoundButton, Object.assign({}, props));
            case ButtonType.icon:
                return React.createElement(IconButton, Object.assign({}, props));
            case ButtonType.primary:
                return React.createElement(PrimaryButton, Object.assign({}, props));
            default:
                return React.createElement(DefaultButton, Object.assign({}, props));
        }
    }
}
