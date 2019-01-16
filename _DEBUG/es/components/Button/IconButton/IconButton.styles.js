import { concatStyleSets, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';
export const getStyles = memoizeFunction((theme, customStyles) => {
    const baseButtonStyles = getBaseButtonStyles(theme);
    const splitButtonStyles = getSplitButtonStyles(theme);
    const { palette, semanticColors } = theme;
    const iconButtonStyles = {
        root: {
            padding: '0 4px',
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: 'none',
            color: semanticColors.actionLink
        },
        rootHovered: {
            color: semanticColors.actionLinkHovered,
            selectors: {
                [HighContrastSelector]: {
                    borderColor: 'Highlight',
                    color: 'Highlight'
                }
            }
        },
        rootPressed: {
            color: palette.themePrimary
        },
        rootExpanded: {
            color: palette.themePrimary
        },
        rootChecked: {
            backgroundColor: semanticColors.buttonBackgroundChecked
        },
        rootCheckedHovered: {
            backgroundColor: semanticColors.buttonBackgroundHovered
        },
        rootDisabled: {
            color: semanticColors.disabledText
        }
    };
    return concatStyleSets(baseButtonStyles, iconButtonStyles, splitButtonStyles, customStyles);
});
