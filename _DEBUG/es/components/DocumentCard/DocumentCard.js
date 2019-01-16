import * as React from 'react';
import { DocumentCardType } from './DocumentCard.types';
import { BaseComponent, KeyCodes, css } from '../../Utilities';
let styles;
export class DocumentCard extends BaseComponent {
    constructor(props) {
        super(props);
        this._rootElement = React.createRef();
        this._onClick = (ev) => {
            this._onAction(ev);
        };
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
                this._onAction(ev);
            }
        };
        this._onAction = (ev) => {
            const { onClick, onClickHref } = this.props;
            if (onClick) {
                onClick(ev);
            }
            else if (!onClick && onClickHref) {
                window.location.href = onClickHref;
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        this._warnDeprecations({
            accentColor: undefined
        });
    }
    render() {
        const { onClick, onClickHref, children, className, type, accentColor } = this.props;
        const actionable = onClick || onClickHref ? true : false;
        let style;
        if (type === DocumentCardType.compact && accentColor) {
            style = {
                borderBottomColor: accentColor
            };
        }
        const role = this.props.role || (actionable ? (onClick ? 'button' : 'link') : undefined);
        const tabIndex = actionable ? 0 : undefined;
        return (React.createElement("div", { ref: this._rootElement, tabIndex: tabIndex, "data-is-focusable": actionable, role: role, className: css('ms-DocumentCard', styles.root, {
                ['ms-DocumentCard--actionable ' + styles.rootIsActionable]: actionable,
                ['ms-DocumentCard--compact ' + styles.rootIsCompact]: type === DocumentCardType.compact ? true : false
            }, className), onKeyDown: actionable ? this._onKeyDown : undefined, onClick: actionable ? this._onClick : undefined, style: style }, children));
    }
    focus() {
        if (this._rootElement.current) {
            this._rootElement.current.focus();
        }
    }
}
DocumentCard.defaultProps = {
    type: DocumentCardType.normal
};
