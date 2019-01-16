let _warningCallback = undefined;
export function warnDeprecations(componentName, props, deprecationMap) {
    for (const propName in deprecationMap) {
        if (props && propName in props) {
            let deprecationMessage = `${componentName} property '${propName}' was used but has been deprecated.`;
            const replacementPropName = deprecationMap[propName];
            if (replacementPropName) {
                deprecationMessage += ` Use '${replacementPropName}' instead.`;
            }
            warn(deprecationMessage);
        }
    }
}
export function warnMutuallyExclusive(componentName, props, exclusiveMap) {
    for (const propName in exclusiveMap) {
        if (props && propName in props) {
            let propInExclusiveMapValue = exclusiveMap[propName];
            if (propInExclusiveMapValue && propInExclusiveMapValue in props) {
                warn(`${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`);
            }
        }
    }
}
export function warnConditionallyRequiredProps(componentName, props, requiredProps, conditionalPropName, condition) {
    if (condition === true) {
        for (const requiredPropName of requiredProps) {
            if (!(requiredPropName in props)) {
                warn(`${componentName} property '${requiredPropName}' is required when '${conditionalPropName}' is used.'`);
            }
        }
    }
}
export function warn(message) {
    if (_warningCallback) {
        _warningCallback(message);
    }
    else if (console && console.warn) {
        console.warn(message);
    }
}
export function setWarningCallback(warningCallback) {
    _warningCallback = warningCallback;
}
