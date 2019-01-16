import { GlobalSettings } from './GlobalSettings';
import { EventGroup } from './EventGroup';
const CustomizationsGlobalKey = 'customizations';
const NO_CUSTOMIZATIONS = { settings: {}, scopedSettings: {}, inCustomizerContext: false };
let _allSettings = GlobalSettings.getValue(CustomizationsGlobalKey, {
    settings: {},
    scopedSettings: {},
    inCustomizerContext: false
});
const _events = new EventGroup(_allSettings);
export class Customizations {
    static reset() {
        _allSettings.settings = {};
        _allSettings.scopedSettings = {};
    }
    static applySettings(settings) {
        _allSettings.settings = { ..._allSettings.settings, ...settings };
        Customizations._raiseChange();
    }
    static applyScopedSettings(scopeName, settings) {
        _allSettings.scopedSettings[scopeName] = { ..._allSettings.scopedSettings[scopeName], ...settings };
        Customizations._raiseChange();
    }
    static getSettings(properties, scopeName, localSettings = NO_CUSTOMIZATIONS) {
        const settings = {};
        const localScopedSettings = (scopeName && localSettings.scopedSettings[scopeName]) || {};
        const globalScopedSettings = (scopeName && _allSettings.scopedSettings[scopeName]) || {};
        for (let property of properties) {
            settings[property] =
                localScopedSettings[property] ||
                    localSettings.settings[property] ||
                    globalScopedSettings[property] ||
                    _allSettings.settings[property];
        }
        return settings;
    }
    static observe(onChange) {
        _events.on(_allSettings, 'change', onChange);
    }
    static unobserve(onChange) {
        _events.off(_allSettings, 'change', onChange);
    }
    static _raiseChange() {
        _events.raise('change');
    }
}
