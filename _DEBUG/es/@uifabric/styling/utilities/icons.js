import { GlobalSettings, warn } from '@uifabric/utilities';
import { fontFace, mergeStyles, Stylesheet } from '@uifabric/merge-styles';
const ICON_SETTING_NAME = 'icons';
const _iconSettings = GlobalSettings.getValue(ICON_SETTING_NAME, {
    __options: {
        disableWarnings: false,
        warnOnMissingIcons: true
    },
    __remapped: {}
});
const stylesheet = Stylesheet.getInstance();
if (stylesheet && stylesheet.onReset) {
    stylesheet.onReset(() => {
        for (const name in _iconSettings) {
            if (_iconSettings.hasOwnProperty(name) && !!_iconSettings[name].subset) {
                _iconSettings[name].subset.className = undefined;
            }
        }
    });
}
const normalizeIconName = (name) => name.toLowerCase();
export function registerIcons(iconSubset, options) {
    let subset = {
        ...iconSubset,
        isRegistered: false,
        className: undefined
    };
    let { icons } = iconSubset;
    options = options ? { ..._iconSettings.__options, ...options } : _iconSettings.__options;
    for (const iconName in icons) {
        if (icons.hasOwnProperty(iconName)) {
            const code = icons[iconName];
            const normalizedIconName = normalizeIconName(iconName);
            if (_iconSettings[normalizedIconName]) {
                _warnDuplicateIcon(iconName);
            }
            else {
                _iconSettings[normalizedIconName] = {
                    code,
                    subset
                };
            }
        }
    }
}
export function unregisterIcons(iconNames) {
    const options = _iconSettings.__options;
    for (const iconName of iconNames) {
        const normalizedIconName = normalizeIconName(iconName);
        if (_iconSettings[normalizedIconName]) {
            delete _iconSettings[normalizedIconName];
        }
        else {
            if (!options.disableWarnings) {
                warn(`The icon "${iconName}" tried to unregister but was not registered.`);
            }
        }
        if (_iconSettings.__remapped[normalizedIconName]) {
            delete _iconSettings.__remapped[normalizedIconName];
        }
        Object.keys(_iconSettings.__remapped).forEach((key) => {
            if (_iconSettings.__remapped[key] === normalizedIconName) {
                delete _iconSettings.__remapped[key];
            }
        });
    }
}
export function registerIconAlias(iconName, mappedToName) {
    _iconSettings.__remapped[normalizeIconName(iconName)] = normalizeIconName(mappedToName);
}
export function getIcon(name) {
    let icon = undefined;
    const options = _iconSettings.__options;
    name = name ? normalizeIconName(name) : '';
    name = _iconSettings.__remapped[name] || name;
    if (name) {
        icon = _iconSettings[name];
        if (icon) {
            let { subset } = icon;
            if (subset && subset.fontFace) {
                if (!subset.isRegistered) {
                    fontFace(subset.fontFace);
                    subset.isRegistered = true;
                }
                if (!subset.className) {
                    subset.className = mergeStyles(subset.style, {
                        fontFamily: subset.fontFace.fontFamily,
                        fontWeight: subset.fontFace.fontWeight || 'normal',
                        fontStyle: subset.fontFace.fontStyle || 'normal'
                    });
                }
            }
        }
        else {
            if (!options.disableWarnings && options.warnOnMissingIcons) {
                warn(`The icon "${name}" was used but not registered. See http://aka.ms/fabric-icon-usage for more information.`);
            }
        }
    }
    return icon;
}
export function setIconOptions(options) {
    _iconSettings.__options = {
        ..._iconSettings.__options,
        ...options
    };
}
let _missingIcons = [];
let _missingIconsTimer = undefined;
function _warnDuplicateIcon(iconName) {
    const options = _iconSettings.__options;
    const warningDelay = 2000;
    const maxIconsInMessage = 10;
    if (!options.disableWarnings) {
        _missingIcons.push(iconName);
        if (_missingIconsTimer === undefined) {
            _missingIconsTimer = self.setTimeout(() => {
                warn(`Some icons were re-registered. Applications should only call registerIcons for any given ` +
                    `icon once. Redefining what an icon is may have unintended consequences. Duplicates ` +
                    `include: \n` +
                    _missingIcons.slice(0, maxIconsInMessage).join(', ') +
                    (_missingIcons.length > maxIconsInMessage ? ` (+ ${_missingIcons.length - maxIconsInMessage} more)` : ''));
                _missingIconsTimer = undefined;
                _missingIcons = [];
            }, warningDelay);
        }
    }
}
