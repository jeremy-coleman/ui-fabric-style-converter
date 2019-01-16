import * as React from 'react';
import { classNamesFunction, styled } from '../../../../Utilities';
import { Persona, PersonaSize } from '../../../../Persona';
import { getStyles } from './PeoplePickerItemSuggestion.styles';
const getClassNames = classNamesFunction();
export const PeoplePickerItemSuggestionBase = (props) => {
    const { personaProps, suggestionsProps, compact, styles, theme, className } = props;
    const classNames = getClassNames(styles, {
        theme: theme,
        className: (suggestionsProps && suggestionsProps.suggestionsItemClassName) || className
    });
    return (React.createElement("div", { className: classNames.root },
        React.createElement(Persona, Object.assign({ size: PersonaSize.size24, className: classNames.personaWrapper, showSecondaryText: !compact }, personaProps))));
};
export const PeoplePickerItemSuggestion = styled(PeoplePickerItemSuggestionBase, getStyles, undefined, { scope: 'PeoplePickerItemSuggestion' });
