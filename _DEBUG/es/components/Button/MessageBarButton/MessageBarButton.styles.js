import { concatStyleSets } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
export const getStyles = memoizeFunction((theme, customStyles, focusInset, focusColor) => {
    const baseButtonStyles = getBaseButtonStyles(theme);
    const messageBarButtonStyles = {
        root: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.neutralPrimary
        },
        rootHovered: {
            backgroundColor: theme.palette.neutralTertiaryAlt,
            color: theme.palette.neutralDark
        },
        rootPressed: {
            backgroundColor: theme.palette.neutralTertiary,
            color: theme.palette.neutralDark
        }
    };
    return concatStyleSets(baseButtonStyles, messageBarButtonStyles, customStyles);
});
