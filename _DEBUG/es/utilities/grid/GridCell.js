import * as React from 'react';
import { css, getId } from '../../Utilities';
import { CommandButton } from '../../Button';
export class GridCell extends React.Component {
    constructor() {
        super(...arguments);
        this._onClick = () => {
            const { onClick, disabled, item } = this.props;
            if (onClick && !disabled) {
                onClick(item);
            }
        };
        this._onMouseEnter = (ev) => {
            const { onHover, disabled, item, onMouseEnter } = this.props;
            const didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);
            if (!didUpdateOnEnter && onHover && !disabled) {
                onHover(item);
            }
        };
        this._onMouseMove = (ev) => {
            const { onHover, disabled, item, onMouseMove } = this.props;
            const didUpdateOnMove = onMouseMove && onMouseMove(ev);
            if (!didUpdateOnMove && onHover && !disabled) {
                onHover(item);
            }
        };
        this._onMouseLeave = (ev) => {
            const { onHover, disabled, onMouseLeave } = this.props;
            const didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);
            if (!didUpdateOnLeave && onHover && !disabled) {
                onHover();
            }
        };
        this._onFocus = () => {
            const { onFocus, disabled, item } = this.props;
            if (onFocus && !disabled) {
                onFocus(item);
            }
        };
    }
    render() {
        const { item, id, className, role, selected, disabled, onRenderItem, cellDisabledStyle, cellIsSelectedStyle, index, label, getClassNames } = this.props;
        return (React.createElement(CommandButton, { id: id, "data-index": index, "data-is-focusable": true, disabled: disabled, className: css(className, {
                ['' + cellIsSelectedStyle]: selected,
                ['' + cellDisabledStyle]: disabled
            }), onClick: this._onClick, onMouseEnter: this._onMouseEnter, onMouseMove: this._onMouseMove, onMouseLeave: this._onMouseLeave, onFocus: this._onFocus, role: role, "aria-selected": selected, ariaLabel: label, title: label, getClassNames: getClassNames }, onRenderItem(item)));
    }
}
GridCell.defaultProps = {
    disabled: false,
    id: getId('gridCell')
};
