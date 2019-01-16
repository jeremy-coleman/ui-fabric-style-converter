import * as React from 'react';
import { BaseComponent } from './BaseComponent';
import { Customizations } from './Customizations';
export const CustomizerContext = React.createContext({
    customizations: {
        inCustomizerContext: false,
        settings: {},
        scopedSettings: {}
    }
});
export class Customizer extends BaseComponent {
    constructor() {
        super(...arguments);
        this._changeCount = 0;
        this._onCustomizationChange = () => this.forceUpdate();
    }
    componentDidMount() {
        Customizations.observe(this._onCustomizationChange);
    }
    componentWillUnmount() {
        Customizations.unobserve(this._onCustomizationChange);
    }
    render() {
        const { contextTransform } = this.props;
        return (React.createElement(CustomizerContext.Consumer, null, (parentContext) => {
            let newContext = mergeCustomizations(this.props, parentContext);
            if (contextTransform) {
                newContext = contextTransform(newContext);
            }
            return React.createElement(CustomizerContext.Provider, { value: newContext }, this.props.children);
        }));
    }
}
export function mergeCustomizations(props, parentContext) {
    const { customizations = { settings: {}, scopedSettings: {} } } = parentContext || {};
    return {
        customizations: {
            settings: mergeSettings(customizations.settings, props.settings),
            scopedSettings: mergeScopedSettings(customizations.scopedSettings, props.scopedSettings),
            inCustomizerContext: true
        }
    };
}
export function mergeSettings(oldSettings = {}, newSettings) {
    const mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : settingsMergeWith(newSettings);
    return mergeSettingsWith(oldSettings);
}
function mergeScopedSettings(oldSettings = {}, newSettings) {
    const mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : scopedSettingsMergeWith(newSettings);
    return mergeSettingsWith(oldSettings);
}
function isSettingsFunction(settings) {
    return typeof settings === 'function';
}
function settingsMergeWith(newSettings) {
    return (settings) => (newSettings ? { ...settings, ...newSettings } : settings);
}
function scopedSettingsMergeWith(scopedSettingsFromProps = {}) {
    return (oldScopedSettings) => {
        const newScopedSettings = { ...oldScopedSettings };
        for (let scopeName in scopedSettingsFromProps) {
            if (scopedSettingsFromProps.hasOwnProperty(scopeName)) {
                newScopedSettings[scopeName] = { ...oldScopedSettings[scopeName], ...scopedSettingsFromProps[scopeName] };
            }
        }
        return newScopedSettings;
    };
}
