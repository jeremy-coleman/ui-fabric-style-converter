import { createTheme } from '@uifabric/styling';
import { VariantThemeType } from './variantThemeType';
function makeThemeFromPartials(originalTheme, partialPalette, partialSemantic) {
    let variantTheme = createTheme({ palette: { ...originalTheme.palette, ...partialPalette } });
    variantTheme.semanticColors = { ...variantTheme.semanticColors, ...partialSemantic };
    variantTheme = { ...originalTheme, palette: variantTheme.palette, semanticColors: variantTheme.semanticColors };
    return variantTheme;
}
export function getVariant(theme, variant) {
    switch (variant) {
        case VariantThemeType.Neutral:
            return getNeutralVariant(theme);
        case VariantThemeType.Soft:
            return getSoftVariant(theme);
        case VariantThemeType.Strong:
            return getStrongVariant(theme);
        default:
            return createTheme(theme);
    }
}
export function getNeutralVariant(theme) {
    const fullTheme = createTheme(theme);
    const p = fullTheme.palette;
    const partialPalette = {
        themeDark: p.themeDarker,
        themeDarkAlt: p.themeDark,
        themePrimary: p.themeDarkAlt,
        themeSecondary: p.themePrimary,
        themeTertiary: p.themeSecondary,
        themeLight: p.themeTertiary,
        themeLighter: p.themeLight,
        themeLighterAlt: p.themeLighterAlt,
        neutralQuaternary: p.neutralTertiaryAlt,
        neutralQuaternaryAlt: p.neutralQuaternary,
        neutralLight: p.neutralQuaternaryAlt,
        neutralLighter: p.neutralLight,
        neutralLighterAlt: p.neutralLight,
        white: p.neutralLighter
    };
    const partialSemantic = {
        bodyBackground: p.neutralLighter,
        bodyStandoutBackground: p.neutralLight,
        bodyFrameBackground: !fullTheme.isInverted ? p.neutralLight : p.neutralLighter,
        bodyFrameDivider: !fullTheme.isInverted ? p.neutralLight : p.neutralQuaternaryAlt,
        bodyText: p.neutralPrimary,
        bodySubtext: p.neutralSecondary,
        bodyDivider: p.neutralQuaternaryAlt,
        focusBorder: p.neutralSecondary,
        variantBorder: p.neutralLight,
        variantBorderHovered: p.neutralTertiary,
        defaultStateBackground: p.neutralLight,
        actionLink: p.neutralPrimary,
        actionLinkHovered: p.neutralDark,
        link: p.themeDarkAlt,
        linkHovered: p.themeDarker,
        disabledBackground: !fullTheme.isInverted ? p.neutralLight : p.neutralLighter,
        disabledText: p.neutralTertiary,
        disabledBodyText: p.neutralTertiary,
        disabledBodySubtext: p.neutralTertiaryAlt,
        inputBorder: p.neutralTertiary,
        inputBorderHovered: p.neutralPrimary,
        inputBackground: p.white,
        inputFocusBorderAlt: p.themePrimary,
        inputText: p.neutralPrimary,
        inputTextHovered: p.neutralDark,
        inputPlaceholderText: p.neutralSecondary,
        buttonBackground: p.neutralQuaternaryAlt,
        buttonBackgroundHovered: p.neutralQuaternary,
        buttonBackgroundPressed: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
        buttonBackgroundDisabled: p.neutralLight,
        buttonBorder: 'transparent',
        buttonText: p.neutralPrimary,
        buttonTextHovered: p.neutralDark,
        buttonTextPressed: p.neutralDark,
        buttonTextDisabled: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.themePrimary,
        primaryButtonBackgroundHovered: p.themeDarkAlt,
        primaryButtonBackgroundPressed: p.themeDark,
        primaryButtonBorder: 'transparent',
        primaryButtonText: p.white,
        primaryButtonTextHovered: p.white,
        primaryButtonTextPressed: p.white,
        accentButtonBackground: p.accent,
        accentButtonText: p.white,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
    };
    return makeThemeFromPartials(fullTheme, partialPalette, partialSemantic);
}
export function getSoftVariant(theme) {
    const fullTheme = createTheme(theme);
    const p = fullTheme.palette;
    const partialPalette = {
        themeDark: p.themeDarker,
        themeDarkAlt: p.themeDark,
        themePrimary: p.themeDarkAlt,
        themeSecondary: p.themePrimary,
        themeTertiary: p.themeSecondary,
        themeLight: p.themeTertiary,
        themeLighter: p.themeLight,
        themeLighterAlt: p.themeLighter,
        neutralTertiaryAlt: !fullTheme.isInverted ? p.themeDarkAlt : p.themeDarker,
        neutralQuaternary: !fullTheme.isInverted ? p.themePrimary : p.themeDark,
        neutralQuaternaryAlt: !fullTheme.isInverted ? p.themeSecondary : p.themeDarkAlt,
        neutralLight: !fullTheme.isInverted ? p.themeTertiary : p.themePrimary,
        neutralLighter: !fullTheme.isInverted ? p.themeLight : p.themeSecondary,
        neutralLighterAlt: !fullTheme.isInverted ? p.themeLighter : p.themeTertiary,
        white: !fullTheme.isInverted ? p.themeLighterAlt : p.themeLight
    };
    const partialSemantic = {
        bodyBackground: !fullTheme.isInverted ? p.themeLighterAlt : p.themeLight,
        bodyStandoutBackground: !fullTheme.isInverted ? p.themeLighter : p.themeTertiary,
        bodyFrameBackground: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
        bodyFrameDivider: !fullTheme.isInverted ? p.themeLighter : p.neutralQuaternary,
        bodyText: p.neutralPrimary,
        bodySubtext: p.neutralSecondary,
        bodyDivider: p.neutralQuaternaryAlt,
        inputBorder: p.neutralTertiary,
        inputBackground: p.white,
        inputForegroundChecked: p.themeLighter,
        inputText: p.neutralPrimary,
        inputTextHovered: p.neutralDark,
        inputPlaceholderText: p.neutralSecondary,
        focusBorder: p.neutralSecondary,
        variantBorder: p.neutralLight,
        variantBorderHovered: p.neutralTertiary,
        defaultStateBackground: p.neutralLight,
        actionLink: p.neutralPrimary,
        actionLinkHovered: p.neutralDark,
        link: p.themeDarkAlt,
        linkHovered: p.themeDarker,
        disabledBackground: p.neutralLight,
        disabledText: p.neutralTertiary,
        disabledBodyText: p.neutralTertiary,
        disabledBodySubtext: p.neutralTertiaryAlt,
        buttonBackground: p.neutralQuaternaryAlt,
        buttonBackgroundHovered: p.neutralQuaternary,
        buttonBackgroundPressed: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
        buttonBackgroundDisabled: p.neutralLight,
        buttonBorder: 'transparent',
        buttonText: p.neutralPrimary,
        buttonTextHovered: p.neutralDark,
        buttonTextPressed: p.neutralDark,
        buttonTextDisabled: !fullTheme.isInverted ? p.neutralTertiary : p.neutralTertiaryAlt,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.themePrimary,
        primaryButtonBackgroundHovered: p.themeDarkAlt,
        primaryButtonBackgroundPressed: p.themeDark,
        primaryButtonBorder: 'transparent',
        primaryButtonText: p.white,
        primaryButtonTextHovered: p.white,
        primaryButtonTextPressed: p.white,
        accentButtonBackground: p.accent,
        accentButtonText: p.white,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
    };
    return makeThemeFromPartials(fullTheme, partialPalette, partialSemantic);
}
export function getStrongVariant(theme) {
    const fullTheme = createTheme(theme);
    const p = fullTheme.palette;
    const partialPalette = {
        themeDarker: p.white,
        themeDark: p.neutralLighterAlt,
        themeDarkAlt: p.neutralLighterAlt,
        themePrimary: p.white,
        themeSecondary: p.neutralLighter,
        themeTertiary: p.neutralLight,
        themeLight: p.neutralQuaternaryAlt,
        themeLighter: p.neutralQuaternary,
        themeLighterAlt: p.neutralTertiaryAlt,
        black: p.neutralLighterAlt,
        neutralDark: p.neutralLighter,
        neutralPrimary: p.white,
        neutralPrimaryAlt: p.neutralLight,
        neutralSecondary: p.neutralQuaternaryAlt,
        neutralTertiary: p.neutralQuaternary,
        neutralTertiaryAlt: p.themeLighterAlt,
        neutralQuaternary: p.themeLighterAlt,
        neutralQuaternaryAlt: p.themeLighter,
        neutralLight: p.themeLight,
        neutralLighter: p.themeTertiary,
        neutralLighterAlt: p.themeSecondary,
        white: p.themePrimary
    };
    const partialSemantic = {
        bodyBackground: p.themePrimary,
        bodyStandoutBackground: p.themeDarkAlt,
        bodyFrameBackground: !fullTheme.isInverted ? p.themeDarkAlt : p.themePrimary,
        bodyFrameDivider: !fullTheme.isInverted ? p.themeDarkAlt : p.themeTertiary,
        bodyText: p.white,
        bodySubtext: p.white,
        bodyDivider: p.themeTertiary,
        inputBorder: p.themeDarkAlt,
        inputBorderHovered: p.themeDarker,
        inputBackground: p.white,
        inputBackgroundChecked: p.white,
        inputBackgroundCheckedHovered: p.themePrimary,
        inputForegroundChecked: p.themeDark,
        inputFocusBorderAlt: p.themeTertiary,
        inputText: p.neutralPrimary,
        inputTextHovered: p.neutralDark,
        inputPlaceholderText: p.neutralSecondary,
        focusBorder: p.white,
        variantBorder: p.themeDarkAlt,
        variantBorderHovered: p.themeDarker,
        defaultStateBackground: p.neutralLighterAlt,
        actionLink: p.white,
        actionLinkHovered: p.white,
        link: p.white,
        linkHovered: p.white,
        disabledBackground: p.themeDarkAlt,
        disabledText: p.themeTertiary,
        disabledBodyText: p.neutralQuaternary,
        disabledBodySubtext: p.neutralTertiaryAlt,
        buttonBackground: p.themePrimary,
        buttonBackgroundHovered: p.themeDarkAlt,
        buttonBackgroundPressed: p.themeDark,
        buttonBackgroundDisabled: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
        buttonBorder: p.white,
        buttonText: p.white,
        buttonTextHovered: p.white,
        buttonTextPressed: p.white,
        buttonTextDisabled: p.themeTertiary,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.white,
        primaryButtonBackgroundHovered: !fullTheme.isInverted ? p.themeLighter : p.themeLight,
        primaryButtonBackgroundPressed: !fullTheme.isInverted ? p.themeLight : p.themeTertiary,
        primaryButtonBorder: 'transparent',
        primaryButtonText: !fullTheme.isInverted ? p.themePrimary : p.neutralPrimary,
        primaryButtonTextHovered: !fullTheme.isInverted ? p.themeDark : p.neutralDark,
        primaryButtonTextPressed: !fullTheme.isInverted ? p.themeDark : p.neutralDark,
        accentButtonBackground: p.white,
        accentButtonText: !fullTheme.isInverted ? p.themePrimary : p.neutralPrimary,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: !fullTheme.isInverted ? p.neutralDark : p.neutralPrimary
    };
    let variantTheme = createTheme({ palette: { ...fullTheme.palette, ...partialPalette } });
    variantTheme.semanticColors = { ...variantTheme.semanticColors, ...partialSemantic };
    variantTheme = {
        ...fullTheme,
        palette: variantTheme.palette,
        semanticColors: variantTheme.semanticColors,
        isInverted: !fullTheme.isInverted
    };
    return variantTheme;
}
