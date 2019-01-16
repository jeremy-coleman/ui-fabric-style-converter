import * as React from 'react';
import { css } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
var styles;
export const SuggestionItemNormal = (personaProps, suggestionItemProps) => {
    return (React.createElement("div", { className: css('ms-PeoplePicker-personaContent', styles.peoplePickerPersonaContent) },
        React.createElement(Persona, Object.assign({ presence: personaProps.presence !== undefined ? personaProps.presence : PersonaPresence.none, size: PersonaSize.size40, className: css('ms-PeoplePicker-Persona', styles.peoplePickerPersona), showSecondaryText: true }, personaProps))));
};
