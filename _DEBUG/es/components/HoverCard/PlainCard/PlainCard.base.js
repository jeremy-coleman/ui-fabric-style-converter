import * as React from 'react';
import { classNamesFunction, BaseComponent, KeyCodes } from '../../../Utilities';
import { CardCallout } from '../CardCallout/CardCallout';
const getClassNames = classNamesFunction();
export class PlainCardBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.escape) {
                this.props.onLeave && this.props.onLeave(ev);
            }
        };
    }
    render() {
        const { styles, theme, className } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        const content = (React.createElement("div", { onMouseEnter: this.props.onEnter, onMouseLeave: this.props.onLeave, onKeyDown: this._onKeyDown }, this.props.onRenderPlainCard(this.props.renderData)));
        return React.createElement(CardCallout, Object.assign({}, this.props, { content: content, className: this._classNames.root }));
    }
}
