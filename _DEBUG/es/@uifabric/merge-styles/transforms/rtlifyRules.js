import { Stylesheet } from '../Stylesheet';
const LEFT = 'left';
const RIGHT = 'right';
const NO_FLIP = '@noflip';
const NAME_REPLACEMENTS = {
    [LEFT]: RIGHT,
    [RIGHT]: LEFT
};
const VALUE_REPLACEMENTS = {
    'w-resize': 'e-resize',
    'sw-resize': 'se-resize',
    'nw-resize': 'ne-resize'
};
let _rtl = _msGetRTL();
export function _msSetRTL(isRTL) {
    if (_rtl !== isRTL) {
        Stylesheet.getInstance().resetKeys();
        _rtl = isRTL;
    }
}
export function _msGetRTL() {
    if (_rtl === undefined) {
        _rtl = typeof document !== 'undefined' && !!document.documentElement && document.documentElement.getAttribute('dir') === 'rtl';
    }
    return _rtl;
}
export function rtlifyRules(rulePairs, index) {
    if (_msGetRTL()) {
        const name = rulePairs[index];
        if (!name) {
            return;
        }
        const value = rulePairs[index + 1];
        if (typeof value === 'string' && value.indexOf(NO_FLIP) >= 0) {
            rulePairs[index + 1] = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, '');
        }
        else if (name.indexOf(LEFT) >= 0) {
            rulePairs[index] = name.replace(LEFT, RIGHT);
        }
        else if (name.indexOf(RIGHT) >= 0) {
            rulePairs[index] = name.replace(RIGHT, LEFT);
        }
        else if (String(value).indexOf(LEFT) >= 0) {
            rulePairs[index + 1] = value.replace(LEFT, RIGHT);
        }
        else if (String(value).indexOf(RIGHT) >= 0) {
            rulePairs[index + 1] = value.replace(RIGHT, LEFT);
        }
        else if (NAME_REPLACEMENTS[name]) {
            rulePairs[index] = NAME_REPLACEMENTS[name];
        }
        else if (VALUE_REPLACEMENTS[value]) {
            rulePairs[index + 1] = VALUE_REPLACEMENTS[value];
        }
        else {
            switch (name) {
                case 'margin':
                case 'padding':
                    rulePairs[index + 1] = flipQuad(value);
                    break;
                case 'box-shadow':
                    rulePairs[index + 1] = negateNum(value, 0);
                    break;
            }
        }
    }
}
function negateNum(value, partIndex) {
    const parts = value.split(' ');
    const numberVal = parseInt(parts[partIndex], 10);
    parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));
    return parts.join(' ');
}
function flipQuad(value) {
    if (typeof value === 'string') {
        const parts = value.split(' ');
        if (parts.length === 4) {
            return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
        }
    }
    return value;
}
