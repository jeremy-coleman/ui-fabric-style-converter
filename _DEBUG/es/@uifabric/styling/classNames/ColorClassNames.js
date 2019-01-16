import { mergeStyles } from '@uifabric/merge-styles';
import { DefaultPalette } from '../styles/DefaultPalette';
import { getTheme } from '../styles/index';
export const ColorClassNames = {};
for (const colorName in DefaultPalette) {
    if (DefaultPalette.hasOwnProperty(colorName)) {
        _defineGetter(ColorClassNames, colorName, '', false, 'color');
        _defineGetter(ColorClassNames, colorName, 'Hover', true, 'color');
        _defineGetter(ColorClassNames, colorName, 'Background', false, 'background');
        _defineGetter(ColorClassNames, colorName, 'BackgroundHover', true, 'background');
        _defineGetter(ColorClassNames, colorName, 'Border', false, 'borderColor');
        _defineGetter(ColorClassNames, colorName, 'BorderHover', true, 'borderColor');
    }
}
function _defineGetter(obj, colorName, suffix, isHover, cssProperty) {
    Object.defineProperty(obj, colorName + suffix, {
        get: () => {
            const style = { [cssProperty]: getTheme().palette[colorName] };
            return mergeStyles(isHover ? { selectors: { ':hover': style } } : style).toString();
        },
        enumerable: true,
        configurable: true
    });
}
