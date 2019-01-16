import { Stylesheet } from './Stylesheet';
import { kebabRules } from './transforms/kebabRules';
import { prefixRules } from './transforms/prefixRules';
import { provideUnits } from './transforms/provideUnits';
import { rtlifyRules } from './transforms/rtlifyRules';
const DISPLAY_NAME = 'displayName';
function getDisplayName(rules) {
    const rootStyle = rules && rules['&'];
    return rootStyle ? rootStyle.displayName : undefined;
}
function expandSelector(newSelector, currentSelector) {
    if (newSelector.indexOf(':global(') === 0) {
        return newSelector.replace(/:global\(|\)$/g, '');
    }
    else if (newSelector.indexOf(':') === 0) {
        return currentSelector + newSelector;
    }
    else if (newSelector.indexOf('&') < 0) {
        return currentSelector + ' ' + newSelector;
    }
    return newSelector;
}
function extractRules(args, rules = { __order: [] }, currentSelector = '&') {
    const stylesheet = Stylesheet.getInstance();
    let currentRules = rules[currentSelector];
    if (!currentRules) {
        currentRules = {};
        rules[currentSelector] = currentRules;
        rules.__order.push(currentSelector);
    }
    for (const arg of args) {
        if (typeof arg === 'string') {
            const expandedRules = stylesheet.argsFromClassName(arg);
            if (expandedRules) {
                extractRules(expandedRules, rules, currentSelector);
            }
        }
        else if (Array.isArray(arg)) {
            extractRules(arg, rules, currentSelector);
        }
        else {
            for (const prop in arg) {
                if (prop === 'selectors') {
                    const selectors = arg.selectors;
                    for (let newSelector in selectors) {
                        if (selectors.hasOwnProperty(newSelector)) {
                            const selectorValue = selectors[newSelector];
                            if (newSelector.indexOf('@') === 0) {
                                newSelector = newSelector + '{' + currentSelector;
                                extractRules([selectorValue], rules, newSelector);
                            }
                            else if (newSelector.indexOf(',') > -1) {
                                const commaSeparatedSelectors = newSelector.split(/,/g).map((s) => s.trim());
                                extractRules([selectorValue], rules, commaSeparatedSelectors
                                    .map((commaSeparatedSelector) => expandSelector(commaSeparatedSelector, currentSelector))
                                    .join(', '));
                            }
                            else {
                                extractRules([selectorValue], rules, expandSelector(newSelector, currentSelector));
                            }
                        }
                    }
                }
                else {
                    if (arg[prop] !== undefined) {
                        if (prop === 'margin' || prop === 'padding') {
                            expandQuads(currentRules, prop, arg[prop]);
                        }
                        else {
                            currentRules[prop] = arg[prop];
                        }
                    }
                }
            }
        }
    }
    return rules;
}
function expandQuads(currentRules, name, value) {
    const parts = typeof value === 'string' ? value.split(' ') : [value];
    currentRules[name + 'Top'] = parts[0];
    currentRules[name + 'Right'] = parts[1] || parts[0];
    currentRules[name + 'Bottom'] = parts[2] || parts[0];
    currentRules[name + 'Left'] = parts[3] || parts[1] || parts[0];
}
function getKeyForRules(rules) {
    const serialized = [];
    let hasProps = false;
    for (const selector of rules.__order) {
        serialized.push(selector);
        const rulesForSelector = rules[selector];
        for (const propName in rulesForSelector) {
            if (rulesForSelector.hasOwnProperty(propName) && rulesForSelector[propName] !== undefined) {
                hasProps = true;
                serialized.push(propName, rulesForSelector[propName]);
            }
        }
    }
    return hasProps ? serialized.join('') : undefined;
}
export function serializeRuleEntries(ruleEntries) {
    if (!ruleEntries) {
        return '';
    }
    const allEntries = [];
    for (const entry in ruleEntries) {
        if (ruleEntries.hasOwnProperty(entry) && entry !== DISPLAY_NAME && ruleEntries[entry] !== undefined) {
            allEntries.push(entry, ruleEntries[entry]);
        }
    }
    for (let i = 0; i < allEntries.length; i += 2) {
        kebabRules(allEntries, i);
        provideUnits(allEntries, i);
        rtlifyRules(allEntries, i);
        prefixRules(allEntries, i);
    }
    for (let i = 1; i < allEntries.length; i += 4) {
        allEntries.splice(i, 1, ':', allEntries[i], ';');
    }
    return allEntries.join('');
}
export function styleToRegistration(...args) {
    const rules = extractRules(args);
    const key = getKeyForRules(rules);
    if (key) {
        const stylesheet = Stylesheet.getInstance();
        const registration = {
            className: stylesheet.classNameFromKey(key),
            key,
            args
        };
        if (!registration.className) {
            registration.className = stylesheet.getClassName(getDisplayName(rules));
            const rulesToInsert = [];
            for (const selector of rules.__order) {
                rulesToInsert.push(selector, serializeRuleEntries(rules[selector]));
            }
            registration.rulesToInsert = rulesToInsert;
        }
        return registration;
    }
}
export function applyRegistration(registration, classMap) {
    const stylesheet = Stylesheet.getInstance();
    const { className, key, args, rulesToInsert } = registration;
    if (rulesToInsert) {
        for (let i = 0; i < rulesToInsert.length; i += 2) {
            const rules = rulesToInsert[i + 1];
            if (rules) {
                let selector = rulesToInsert[i];
                selector = selector.replace(/(&)|\$([\w-]+)\b/g, (match, amp, cn) => {
                    if (amp) {
                        return '.' + registration.className;
                    }
                    else if (cn) {
                        return '.' + ((classMap && classMap[cn]) || cn);
                    }
                    return '';
                });
                const processedRule = `${selector}{${rules}}${selector.indexOf('@') === 0 ? '}' : ''}`;
                stylesheet.insertRule(processedRule);
            }
        }
        stylesheet.cacheClassName(className, key, args, rulesToInsert);
    }
}
export function styleToClassName(...args) {
    const registration = styleToRegistration(...args);
    if (registration) {
        applyRegistration(registration);
        return registration.className;
    }
    return '';
}
