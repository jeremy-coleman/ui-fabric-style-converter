import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
export class DialogFooterBase extends BaseComponent {
    render() {
        const { className, styles, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        return (React.createElement("div", { className: this._classNames.actions },
            React.createElement("div", { className: this._classNames.actionsRight }, this._renderChildrenAsActions())));
    }
    _renderChildrenAsActions() {
        return React.Children.map(this.props.children, child => (child ? React.createElement("span", { className: this._classNames.action }, child) : null));
    }
}
