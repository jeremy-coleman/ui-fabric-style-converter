import { Customizations, merge } from '@uifabric/utilities';
import { DefaultFontStyles } from './DefaultFontStyles';
import { DefaultPalette } from './DefaultPalette';
import { DefaultSpacing } from './DefaultSpacing';
import { DefaultEffects } from './DefaultEffects';
let _theme = createTheme({
    palette: DefaultPalette,
    semanticColors: _makeSemanticColorsFromPalette(DefaultPalette, false, false),
    fonts: DefaultFontStyles,
    isInverted: false,
    disableGlobalClassNames: false
});
let _onThemeChangeCallbacks = [];
export const ThemeSettingName = 'theme';
if (!Customizations.getSettings([ThemeSettingName]).theme) {
    let win = typeof window !== 'undefined' ? window : undefined;
    if (win && win['FabricConfig'] && win['FabricConfig'].theme) {
        _theme = createTheme(win['FabricConfig'].theme);
    }
    Customizations.applySettings({ [ThemeSettingName]: _theme });
}
export function getTheme(depComments = false) {
    if (depComments === true) {
        _theme = createTheme({}, depComments);
    }
    return _theme;
}
export function registerOnThemeChangeCallback(callback) {
    if (_onThemeChangeCallbacks.indexOf(callback) === -1) {
        _onThemeChangeCallbacks.push(callback);
    }
}
export function removeOnThemeChangeCallback(callback) {
    const i = _onThemeChangeCallbacks.indexOf(callback);
    if (i === -1) {
        return;
    }
    _onThemeChangeCallbacks.splice(i, 1);
}
export function loadTheme(theme, depComments = false) {
    _theme = createTheme(theme, depComments);
    Customizations.applySettings({ [ThemeSettingName]: _theme });
    _onThemeChangeCallbacks.forEach((callback) => {
        try {
            callback(_theme);
        }
        catch (e) {
        }
    });
    return _theme;
}
export function createTheme(theme, depComments = false) {
    let newPalette = { ...DefaultPalette, ...theme.palette };
    if (!theme.palette || !theme.palette.accent) {
        newPalette.accent = newPalette.themePrimary;
    }
    let newSemanticColors = {
        ..._makeSemanticColorsFromPalette(newPalette, !!theme.isInverted, depComments),
        ...theme.semanticColors
    };
    let defaultFontStyles = DefaultFontStyles;
    if (theme.defaultFontStyle) {
        for (const fontStyle of Object.keys(DefaultFontStyles)) {
            defaultFontStyles[fontStyle] = { ...defaultFontStyles[fontStyle], ...theme.defaultFontStyle };
        }
    }
    if (theme.fonts) {
        for (const fontStyle of Object.keys(theme.fonts)) {
            defaultFontStyles[fontStyle] = merge(defaultFontStyles[fontStyle], theme.fonts[fontStyle]);
        }
    }
    return {
        palette: newPalette,
        fonts: {
            ...defaultFontStyles
        },
        semanticColors: newSemanticColors,
        isInverted: !!theme.isInverted,
        disableGlobalClassNames: !!theme.disableGlobalClassNames,
        spacing: {
            ...DefaultSpacing,
            ...theme.spacing
        },
        effects: {
            ...DefaultEffects,
            ...theme.effects
        }
    };
}
function _expandFrom(propertyName, ...maps) {
    if (propertyName) {
        for (const map of maps) {
            if (map[propertyName]) {
                return map[propertyName];
            }
        }
    }
    return propertyName;
}
function _makeSemanticColorsFromPalette(p, isInverted, depComments) {
    let toReturn = {
        bodyBackground: p.white,
        bodyStandoutBackground: p.neutralLighterAlt,
        bodyFrameBackground: p.white,
        bodyFrameDivider: p.neutralLight,
        bodyText: p.neutralPrimary,
        bodyTextChecked: p.black,
        bodySubtext: p.neutralSecondary,
        bodyDivider: p.neutralLight,
        disabledBackground: p.neutralLighter,
        disabledText: p.neutralTertiary,
        disabledBodyText: p.neutralTertiary,
        disabledSubtext: p.neutralQuaternary,
        disabledBodySubtext: p.neutralTertiaryAlt,
        focusBorder: p.neutralSecondary,
        variantBorder: p.neutralLight,
        variantBorderHovered: p.neutralTertiary,
        defaultStateBackground: p.neutralLighterAlt,
        errorText: !isInverted ? p.redDark : '#ff5f5f',
        warningText: !isInverted ? '#333333' : '#ffffff',
        errorBackground: !isInverted ? 'rgba(232, 17, 35, .2)' : 'rgba(232, 17, 35, .5)',
        blockingBackground: !isInverted ? 'rgba(234, 67, 0, .2)' : 'rgba(234, 67, 0, .5)',
        warningBackground: !isInverted ? 'rgba(255, 185, 0, .2)' : 'rgba(255, 251, 0, .6)',
        warningHighlight: !isInverted ? '#ffb900' : '#fff100',
        successBackground: !isInverted ? 'rgba(186, 216, 10, .2)' : 'rgba(186, 216, 10, .4)',
        inputBorder: p.neutralTertiary,
        inputBorderHovered: p.neutralPrimary,
        inputBackground: p.white,
        inputBackgroundChecked: p.themePrimary,
        inputBackgroundCheckedHovered: p.themeDarkAlt,
        inputForegroundChecked: p.white,
        inputFocusBorderAlt: p.themePrimary,
        smallInputBorder: p.neutralSecondary,
        inputText: p.neutralPrimary,
        inputTextHovered: p.neutralDark,
        inputPlaceholderText: p.neutralSecondary,
        buttonBackground: p.neutralLighter,
        buttonBackgroundChecked: p.neutralTertiaryAlt,
        buttonBackgroundHovered: p.neutralLight,
        buttonBackgroundCheckedHovered: p.neutralLight,
        buttonBackgroundPressed: p.neutralLight,
        buttonBackgroundDisabled: p.neutralLighter,
        buttonBorder: 'transparent',
        buttonText: p.neutralPrimary,
        buttonTextHovered: p.neutralDark,
        buttonTextChecked: p.neutralDark,
        buttonTextCheckedHovered: p.black,
        buttonTextPressed: p.neutralDark,
        buttonTextDisabled: p.neutralTertiary,
        buttonBorderDisabled: 'transparent',
        primaryButtonBackground: p.themePrimary,
        primaryButtonBackgroundHovered: p.themeDarkAlt,
        primaryButtonBackgroundPressed: p.themeDark,
        primaryButtonBackgroundDisabled: p.neutralLighter,
        primaryButtonBorder: 'transparent',
        primaryButtonText: p.white,
        primaryButtonTextHovered: p.white,
        primaryButtonTextPressed: p.white,
        primaryButtonTextDisabled: p.neutralQuaternary,
        accentButtonBackground: p.accent,
        accentButtonText: p.white,
        menuBackground: p.white,
        menuDivider: p.neutralTertiaryAlt,
        menuIcon: p.themePrimary,
        menuHeader: p.themePrimary,
        menuItemBackgroundHovered: p.neutralLighter,
        menuItemBackgroundPressed: p.neutralLight,
        menuItemText: p.neutralPrimary,
        menuItemTextHovered: p.neutralDark,
        listBackground: p.white,
        listText: p.neutralPrimary,
        listItemBackgroundHovered: p.neutralLighter,
        listItemBackgroundChecked: p.neutralLight,
        listItemBackgroundCheckedHovered: p.neutralQuaternaryAlt,
        listHeaderBackgroundHovered: p.neutralLighter,
        listHeaderBackgroundPressed: p.neutralLight,
        actionLink: p.neutralPrimary,
        actionLinkHovered: p.neutralDark,
        link: p.themePrimary,
        linkHovered: p.themeDarker,
        listTextColor: '',
        menuItemBackgroundChecked: p.neutralLight
    };
    return _fixDeprecatedSlots(toReturn, depComments);
}
function _fixDeprecatedSlots(s, depComments) {
    let dep = '';
    if (depComments === true) {
        dep = ' /* @deprecated */';
    }
    s.listTextColor = s.listText + dep;
    s.menuItemBackgroundChecked += dep;
    return s;
}
