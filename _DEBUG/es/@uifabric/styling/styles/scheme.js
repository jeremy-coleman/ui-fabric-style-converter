import { Customizations, mergeSettings } from '@uifabric/utilities';
export function getThemedContext(context, scheme, theme) {
    let newContext = context;
    let newSettings;
    let schemeSource = theme || Customizations.getSettings(['theme'], undefined, context.customizations).theme;
    if (theme) {
        newSettings = { theme };
    }
    const schemeTheme = scheme && schemeSource && schemeSource.schemes && schemeSource.schemes[scheme];
    if (schemeSource && schemeTheme && schemeSource !== schemeTheme) {
        newSettings = { theme: schemeTheme };
        newSettings.theme.schemes = schemeSource.schemes;
    }
    if (newSettings) {
        newContext = {
            customizations: {
                settings: mergeSettings(context.customizations.settings, newSettings),
                scopedSettings: context.customizations.scopedSettings
            }
        };
    }
    return newContext;
}
