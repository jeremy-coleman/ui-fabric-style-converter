export function concatStyleSets(...styleSets) {
    const mergedSet = {};
    const workingSubcomponentStyles = {};
    for (const currentSet of styleSets) {
        if (currentSet) {
            for (const prop in currentSet) {
                if (currentSet.hasOwnProperty(prop)) {
                    if (prop === 'subComponentStyles' && currentSet.subComponentStyles !== undefined) {
                        const currentComponentStyles = currentSet.subComponentStyles;
                        for (const subCompProp in currentComponentStyles) {
                            if (currentComponentStyles.hasOwnProperty(subCompProp)) {
                                if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                                    workingSubcomponentStyles[subCompProp].push(currentComponentStyles[subCompProp]);
                                }
                                else {
                                    workingSubcomponentStyles[subCompProp] = [currentComponentStyles[subCompProp]];
                                }
                            }
                        }
                        continue;
                    }
                    const mergedValue = mergedSet[prop];
                    const currentValue = currentSet[prop];
                    if (mergedValue === undefined) {
                        mergedSet[prop] = currentValue;
                    }
                    else {
                        mergedSet[prop] = [
                            ...(Array.isArray(mergedValue) ? mergedValue : [mergedValue]),
                            ...(Array.isArray(currentValue) ? currentValue : [currentValue])
                        ];
                    }
                }
            }
        }
    }
    let isFunction = (v) => v === typeof 'function';
    if (Object.keys(workingSubcomponentStyles).length > 0) {
        mergedSet.subComponentStyles = {};
        const mergedSubStyles = mergedSet.subComponentStyles;
        for (const subCompProp in workingSubcomponentStyles) {
            if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                const workingSet = workingSubcomponentStyles[subCompProp];
                mergedSubStyles[subCompProp] = (styleProps) => {
                    return concatStyleSets(...workingSet.map((_S) => isFunction(_S) ? _S(styleProps) : _S));
                };
            }
        }
    }
    return mergedSet;
}
