import { MAX_COLOR_RGBA } from './colors';
import * as Colors from './colors';
import { assign } from '../../Utilities';
const WhiteShadeTableBG = [0.027, 0.043, 0.082, 0.145, 0.184, 0.216, 0.349, 0.537];
const BlackTintTableBG = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043];
const WhiteShadeTable = [0.537, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043, 0.027];
const BlackTintTable = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043];
const LumTintTable = [0.88, 0.77, 0.66, 0.55, 0.44, 0.33, 0.22, 0.11];
const LumShadeTable = [0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88];
const ColorTintTable = [0.96, 0.84, 0.7, 0.4, 0.12];
const ColorShadeTable = [0.1, 0.24, 0.44];
const LowLuminanceThreshold = 0.2;
const HighLuminanceThreshold = 0.8;
export var Shade;
(function (Shade) {
    Shade[Shade["Unshaded"] = 0] = "Unshaded";
    Shade[Shade["Shade1"] = 1] = "Shade1";
    Shade[Shade["Shade2"] = 2] = "Shade2";
    Shade[Shade["Shade3"] = 3] = "Shade3";
    Shade[Shade["Shade4"] = 4] = "Shade4";
    Shade[Shade["Shade5"] = 5] = "Shade5";
    Shade[Shade["Shade6"] = 6] = "Shade6";
    Shade[Shade["Shade7"] = 7] = "Shade7";
    Shade[Shade["Shade8"] = 8] = "Shade8";
})(Shade || (Shade = {}));
export function isValidShade(shade) {
    'use strict';
    return typeof shade === 'number' && shade >= Shade.Unshaded && shade <= Shade.Shade8;
}
function _isBlack(color) {
    return color.r === 0 && color.g === 0 && color.b === 0;
}
function _isWhite(color) {
    return color.r === MAX_COLOR_RGBA && color.g === MAX_COLOR_RGBA && color.b === MAX_COLOR_RGBA;
}
function _darken(hsv, factor) {
    return {
        h: hsv.h,
        s: hsv.s,
        v: _clamp(hsv.v - hsv.v * factor, 0, 100)
    };
}
function _lighten(hsv, factor) {
    return {
        h: hsv.h,
        s: _clamp(hsv.s - hsv.s * factor, 0, 100),
        v: _clamp(hsv.v + (100 - hsv.v) * factor, 0, 100)
    };
}
function _clamp(n, min, max) {
    return n;
}
export function isDark(color) {
    return Colors.hsv2hsl(color.h, color.s, color.v).l < 50;
}
export function getShade(color, shade, isInverted = false) {
    if (!color) {
        return null;
    }
    if (shade === Shade.Unshaded || !isValidShade(shade)) {
        return color;
    }
    const hsl = Colors.hsv2hsl(color.h, color.s, color.v);
    let hsv = { h: color.h, s: color.s, v: color.v };
    const tableIndex = shade - 1;
    let _soften = _lighten;
    let _strongen = _darken;
    if (isInverted) {
        _soften = _darken;
        _strongen = _lighten;
    }
    if (_isWhite(color)) {
        hsv = _darken(hsv, WhiteShadeTable[tableIndex]);
    }
    else if (_isBlack(color)) {
        hsv = _lighten(hsv, BlackTintTable[tableIndex]);
    }
    else if (hsl.l / 100 > HighLuminanceThreshold) {
        hsv = _strongen(hsv, LumShadeTable[tableIndex]);
    }
    else if (hsl.l / 100 < LowLuminanceThreshold) {
        hsv = _soften(hsv, LumTintTable[tableIndex]);
    }
    else {
        if (tableIndex < ColorTintTable.length) {
            hsv = _soften(hsv, ColorTintTable[tableIndex]);
        }
        else {
            hsv = _strongen(hsv, ColorShadeTable[tableIndex - ColorTintTable.length]);
        }
    }
    return Colors.getColorFromRGBA(assign(Colors.hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
}
export function getBackgroundShade(color, shade, isInverted = false) {
    if (!color) {
        return null;
    }
    if (shade === Shade.Unshaded || !isValidShade(shade)) {
        return color;
    }
    let hsv = { h: color.h, s: color.s, v: color.v };
    const tableIndex = shade - 1;
    if (!isInverted) {
        hsv = _darken(hsv, WhiteShadeTableBG[tableIndex]);
    }
    else {
        hsv = _lighten(hsv, BlackTintTableBG[BlackTintTable.length - 1 - tableIndex]);
    }
    return Colors.getColorFromRGBA(assign(Colors.hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
}
export function getContrastRatio(color1, color2) {
    function _getThing(x) {
        if (x <= 0.03928) {
            return x / 12.92;
        }
        else {
            return Math.pow((x + 0.055) / 1.055, 2.4);
        }
    }
    const r1 = _getThing(color1.r / MAX_COLOR_RGBA);
    const g1 = _getThing(color1.g / MAX_COLOR_RGBA);
    const b1 = _getThing(color1.b / MAX_COLOR_RGBA);
    let L1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
    L1 += 0.05;
    const r2 = _getThing(color2.r / MAX_COLOR_RGBA);
    const g2 = _getThing(color2.g / MAX_COLOR_RGBA);
    const b2 = _getThing(color2.b / MAX_COLOR_RGBA);
    let L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    L2 += 0.05;
    return L1 / L2 > 1 ? L1 / L2 : L2 / L1;
}
