import { PersonaInitialsColor } from './Persona.types';
const COLOR_SWATCHES_LOOKUP = [
    PersonaInitialsColor.lightGreen,
    PersonaInitialsColor.lightBlue,
    PersonaInitialsColor.lightPink,
    PersonaInitialsColor.green,
    PersonaInitialsColor.darkGreen,
    PersonaInitialsColor.pink,
    PersonaInitialsColor.magenta,
    PersonaInitialsColor.purple,
    PersonaInitialsColor.violet,
    PersonaInitialsColor.teal,
    PersonaInitialsColor.blue,
    PersonaInitialsColor.darkBlue,
    PersonaInitialsColor.orange,
    PersonaInitialsColor.darkRed
];
const COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;
function getInitialsColorFromName(displayName) {
    let color = PersonaInitialsColor.blue;
    if (!displayName) {
        return color;
    }
    let hashCode = 0;
    for (let iLen = displayName.length - 1; iLen >= 0; iLen--) {
        const ch = displayName.charCodeAt(iLen);
        const shift = iLen % 8;
        hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }
    color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];
    return color;
}
function personaInitialsColorToHexCode(personaInitialsColor) {
    switch (personaInitialsColor) {
        case PersonaInitialsColor.lightBlue:
            return '#6BA5E7';
        case PersonaInitialsColor.blue:
            return '#2D89EF';
        case PersonaInitialsColor.darkBlue:
            return '#2B5797';
        case PersonaInitialsColor.teal:
            return '#00ABA9';
        case PersonaInitialsColor.lightGreen:
            return '#99B433';
        case PersonaInitialsColor.green:
            return '#00A300';
        case PersonaInitialsColor.darkGreen:
            return '#1E7145';
        case PersonaInitialsColor.lightPink:
            return '#E773BD';
        case PersonaInitialsColor.pink:
            return '#FF0097';
        case PersonaInitialsColor.magenta:
            return '#7E3878';
        case PersonaInitialsColor.purple:
            return '#603CBA';
        case PersonaInitialsColor.black:
            return '#1D1D1D';
        case PersonaInitialsColor.orange:
            return '#DA532C';
        case PersonaInitialsColor.red:
            return '#EE1111';
        case PersonaInitialsColor.darkRed:
            return '#B91D47';
        case PersonaInitialsColor.transparent:
            return 'transparent';
        case PersonaInitialsColor.violet:
            return '#5E4B8B';
    }
}
export function initialsColorPropToColorCode(props) {
    const { primaryText, text } = props;
    let { initialsColor } = props;
    let initialsColorCode;
    if (typeof initialsColor === 'string') {
        initialsColorCode = initialsColor;
    }
    else {
        initialsColor = initialsColor !== undefined ? initialsColor : getInitialsColorFromName(text || primaryText);
        initialsColorCode = personaInitialsColorToHexCode(initialsColor);
    }
    return initialsColorCode;
}
