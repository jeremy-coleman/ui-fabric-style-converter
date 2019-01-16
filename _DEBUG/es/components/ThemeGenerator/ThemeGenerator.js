import { getColorFromString } from '../../utilities/color/colors';
import { isValidShade, getShade, getBackgroundShade } from '../../utilities/color/shades';
import { format } from '../../Utilities';
export class ThemeGenerator {
    static setSlot(rule, color, isInverted = false, isCustomization = false, overwriteCustomColor = true) {
        if (!rule.color && rule.value) {
            return;
        }
        if (overwriteCustomColor) {
            let colorAsIColor;
            if (typeof color === 'string') {
                colorAsIColor = getColorFromString(color);
                if (!colorAsIColor) {
                    throw 'color is invalid in setSlot(): ' + color;
                }
            }
            else {
                colorAsIColor = color;
            }
            ThemeGenerator._setSlot(rule, colorAsIColor, isInverted, isCustomization, overwriteCustomColor);
        }
        else if (rule.color) {
            ThemeGenerator._setSlot(rule, rule.color, isInverted, isCustomization, overwriteCustomColor);
        }
    }
    static insureSlots(slotRules, isInverted) {
        for (const ruleName in slotRules) {
            if (slotRules.hasOwnProperty(ruleName)) {
                const rule = slotRules[ruleName];
                if (!rule.inherits && !rule.value) {
                    if (!rule.color) {
                        throw 'A color slot rule that does not inherit must provide its own color.';
                    }
                    ThemeGenerator._setSlot(rule, rule.color, isInverted, false, false);
                }
            }
        }
    }
    static getThemeAsJson(slotRules) {
        const theme = {};
        for (const ruleName in slotRules) {
            if (slotRules.hasOwnProperty(ruleName)) {
                const rule = slotRules[ruleName];
                theme[rule.name] = rule.color ? rule.color.str : rule.value || '';
            }
        }
        return theme;
    }
    static getThemeAsCode(slotRules) {
        const attributeTemplate = "    {0}: '{1}',\n";
        let output = '';
        output += 'loadTheme({\n  palette: {\n';
        for (const ruleName in slotRules) {
            if (slotRules.hasOwnProperty(ruleName)) {
                const rule = slotRules[ruleName];
                const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
                const outputColor = rule.color ? '#' + rule.color.hex : rule.value || '';
                output += format(attributeTemplate, camelCasedName, outputColor);
            }
        }
        output += '  }\n});';
        return output;
    }
    static getThemeAsSass(slotRules) {
        const sassVarTemplate = '${0}Color: "[theme: {1}, default: {2}]";\n';
        let output = '';
        for (const ruleName in slotRules) {
            if (slotRules.hasOwnProperty(ruleName)) {
                const rule = slotRules[ruleName];
                const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
                output += format(sassVarTemplate, camelCasedName, camelCasedName, rule.color ? rule.color.str : rule.value || '');
            }
        }
        return output;
    }
    static getThemeForPowerShell(slotRules) {
        const psVarTemplate = '"{0}" = "{1}";\n';
        let output = '';
        for (const ruleName in slotRules) {
            if (slotRules.hasOwnProperty(ruleName)) {
                const rule = slotRules[ruleName];
                if (rule.value) {
                    continue;
                }
                const camelCasedName = rule.name.charAt(0).toLowerCase() + rule.name.slice(1);
                let outputColor = rule.color ? '#' + rule.color.hex : rule.value || '';
                if (rule.color && rule.color.a && rule.color.a !== 100) {
                    outputColor += String(rule.color.a.toString(16));
                }
                output += format(psVarTemplate, camelCasedName, outputColor);
            }
        }
        return '@{\n' + output + '}';
    }
    static _setSlot(rule, color, isInverted, isCustomization, overwriteCustomColor = true) {
        if (!rule.color && rule.value) {
            return;
        }
        if (overwriteCustomColor || !rule.color || !rule.isCustomized || !rule.inherits) {
            if ((overwriteCustomColor || !rule.isCustomized) && !isCustomization && rule.inherits && isValidShade(rule.asShade)) {
                if (rule.isBackgroundShade) {
                    rule.color = getBackgroundShade(color, rule.asShade, isInverted);
                }
                else {
                    rule.color = getShade(color, rule.asShade, isInverted);
                }
                rule.isCustomized = false;
            }
            else {
                rule.color = color;
                rule.isCustomized = true;
            }
            for (const ruleToUpdate of rule.dependentRules) {
                ThemeGenerator._setSlot(ruleToUpdate, rule.color, isInverted, false, overwriteCustomColor);
            }
        }
    }
}
