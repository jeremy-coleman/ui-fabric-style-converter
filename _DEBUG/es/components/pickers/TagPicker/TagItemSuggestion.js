import * as React from 'react';
import { classNamesFunction, styled } from '../../../Utilities';
import { getStyles } from './TagItemSuggestion.styles';
const getClassNames = classNamesFunction();
export const TagItemSuggestionBase = (props) => {
    const { styles, theme, children } = props;
    const classNames = getClassNames(styles, {
        theme: theme
    });
    return React.createElement("div", { className: classNames.suggestionTextOverflow },
        " ",
        children,
        " ");
};
export const TagItemSuggestion = styled(TagItemSuggestionBase, getStyles, undefined, { scope: 'TagItemSuggestion' });
