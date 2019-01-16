import * as React from 'react';
import { css, getId } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IconButton } from '../../../../Button';
var styles;
export const SelectedItemDefault = (peoplePickerItemProps) => {
    const { item, onRemoveItem, index, selected, removeButtonAriaLabel } = peoplePickerItemProps;
    const itemId = getId();
    const onClickIconButton = (removeItem) => {
        return () => {
            if (removeItem) {
                removeItem();
            }
        };
    };
    return (React.createElement("div", { className: css('ms-PickerPersona-container', styles.personaContainer, { ['is-selected ' + styles.personaContainerIsSelected]: selected }, { ['is-invalid ' + styles.validationError]: !item.isValid }), "data-is-focusable": true, "data-is-sub-focuszone": true, "data-selection-index": index, role: 'listitem', "aria-labelledby": 'selectedItemPersona-' + itemId },
        React.createElement("div", { className: css('ms-PickerItem-content', styles.itemContent), id: 'selectedItemPersona-' + itemId },
            React.createElement(Persona, Object.assign({}, item, { presence: item.presence !== undefined ? item.presence : PersonaPresence.none, size: PersonaSize.size28 }))),
        React.createElement(IconButton, { onClick: onClickIconButton(onRemoveItem), iconProps: { iconName: 'Cancel', style: { fontSize: '12px' } }, className: css('ms-PickerItem-removeButton', styles.removeButton), ariaLabel: removeButtonAriaLabel })));
};
