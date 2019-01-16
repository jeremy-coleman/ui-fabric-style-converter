import { getTheme } from '../../Styling';
const defaultTheme = getTheme(true);
export const defaultPalette = Object.keys(defaultTheme.palette).map(variableName => ({
    key: variableName,
    name: variableName,
    value: defaultTheme.palette[variableName],
    description: ''
}));
export const defaultSemanticColors = Object.keys(defaultTheme.semanticColors).map(variableName => ({
    key: variableName,
    name: variableName,
    value: defaultTheme.semanticColors[variableName],
    description: defaultTheme.semanticColors[variableName].indexOf('@deprecated') >= 0 ? 'Deprecated' : ''
}));
