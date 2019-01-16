import * as React from 'react';
import { getId, classNamesFunction, styled } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { IconButton } from '../../../../Button';
import { ValidationState } from '../../BasePicker.types';
import { getStyles } from './PeoplePickerItem.styles';
const getClassNames = classNamesFunction();
export const PeoplePickerItemBase = (props) => {
    const { item, onRemoveItem, index, selected, removeButtonAriaLabel, styles, theme, className } = props;
    const itemId = getId();
    const classNames = getClassNames(styles, {
        theme: theme,
        className,
        selected,
        invalid: item.ValidationState === ValidationState.warning
    });
    const personaStyles = classNames.subComponentStyles
        ? classNames.subComponentStyles.persona
        : undefined;
    const personaCoinStyles = classNames.subComponentStyles
        ? classNames.subComponentStyles.personaCoin
        : undefined;
    return (React.createElement("div", { className: classNames.root, "data-is-focusable": true, "data-is-sub-focuszone": true, "data-selection-index": index, role: 'listitem', "aria-labelledby": 'selectedItemPersona-' + itemId },
        React.createElement("div", { className: classNames.itemContent, id: 'selectedItemPersona-' + itemId },
            React.createElement(Persona, Object.assign({ size: PersonaSize.size28, styles: personaStyles, coinProps: { styles: personaCoinStyles } }, item))),
        React.createElement(IconButton, { onClick: onRemoveItem, iconProps: { iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }, className: classNames.removeButton, ariaLabel: removeButtonAriaLabel })));
};
export const PeoplePickerItem = styled(PeoplePickerItemBase, getStyles, undefined, { scope: 'PeoplePickerItem' });
