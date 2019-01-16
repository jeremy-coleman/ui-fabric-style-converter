import * as React from 'react';
import { BaseComponent, css, getId } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { IconButton } from '../../../../Button';
var styles;
export class ExtendedSelectedItem extends BaseComponent {
    constructor(props) {
        super(props);
        this.persona = React.createRef();
        this.state = { contextualMenuVisible: false };
    }
    render() {
        const { item, onExpandItem, onRemoveItem, removeButtonAriaLabel, index, selected } = this.props;
        const itemId = getId();
        return (React.createElement("div", { ref: this.persona, className: css('ms-PickerPersona-container', styles.personaContainer, { ['is-selected ' + styles.personaContainerIsSelected]: selected }, { ['is-invalid ' + styles.validationError]: !item.isValid }), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-selection-index": index, role: 'listitem', "aria-labelledby": 'selectedItemPersona-' + itemId },
            React.createElement("div", { hidden: !item.canExpand || onExpandItem === undefined },
                React.createElement(IconButton, { onClick: this._onClickIconButton(onExpandItem), iconProps: { iconName: 'Add', style: { fontSize: '14px' } }, className: css('ms-PickerItem-removeButton', styles.expandButton, styles.actionButton), ariaLabel: removeButtonAriaLabel })),
            React.createElement("div", { className: css(styles.personaWrapper) },
                React.createElement("div", { className: css('ms-PickerItem-content', styles.itemContent), id: 'selectedItemPersona-' + itemId },
                    React.createElement(Persona, Object.assign({}, item, { onRenderCoin: this.props.renderPersonaCoin, onRenderPrimaryText: this.props.renderPrimaryText, size: PersonaSize.size32 }))),
                React.createElement(IconButton, { onClick: this._onClickIconButton(onRemoveItem), iconProps: { iconName: 'Cancel', style: { fontSize: '14px' } }, className: css('ms-PickerItem-removeButton', styles.removeButton, styles.actionButton), ariaLabel: removeButtonAriaLabel }))));
    }
    _onClickIconButton(action) {
        return (ev) => {
            ev.stopPropagation();
            ev.preventDefault();
            if (action) {
                action();
            }
        };
    }
}
