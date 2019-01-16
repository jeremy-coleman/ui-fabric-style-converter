import { extractStyleParts } from './extractStyleParts';
import { concatStyleSets } from './concatStyleSets';
import { styleToRegistration, applyRegistration } from './styleToClassName';
export function mergeStyleSets(...styleSets) {
    const classNameSet = { subComponentStyles: {} };
    const classMap = {};
    const styleSet = styleSets[0];
    if (!styleSet && styleSets.length <= 1) {
        return { subComponentStyles: {} };
    }
    let concatenatedStyleSet = styleSet;
    concatenatedStyleSet = concatStyleSets(...styleSets);
    const registrations = [];
    for (const styleSetArea in concatenatedStyleSet) {
        if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
            if (styleSetArea === 'subComponentStyles') {
                classNameSet.subComponentStyles = concatenatedStyleSet.subComponentStyles || {};
                continue;
            }
            const styles = concatenatedStyleSet[styleSetArea];
            const { classes, objects } = extractStyleParts(styles);
            const registration = styleToRegistration({ displayName: styleSetArea }, objects);
            registrations.push(registration);
            if (registration) {
                classMap[styleSetArea] = registration.className;
                classNameSet[styleSetArea] = classes.concat([registration.className]).join(' ');
            }
        }
    }
    for (const registration of registrations) {
        if (registration) {
            applyRegistration(registration, classMap);
        }
    }
    return classNameSet;
}
