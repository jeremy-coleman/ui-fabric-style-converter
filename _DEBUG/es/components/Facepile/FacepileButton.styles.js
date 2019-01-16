import { concatStyleSets } from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import { getStyles as getBaseButtonStyles } from '../Button/BaseButton.styles';
export const getStyles = memoizeFunction((theme, className, customStyles) => {
    const baseButtonStyles = getBaseButtonStyles(theme);
    const customButtonStyles = concatStyleSets(baseButtonStyles, customStyles);
    return {
        ...customButtonStyles,
        root: [baseButtonStyles.root, className, theme.fonts.medium, customStyles && customStyles.root]
    };
});
