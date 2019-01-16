export function mergeAriaAttributeValues(...ariaAttributes) {
    const mergedAttribute = ariaAttributes.filter((arg) => arg !== undefined && arg !== null).join('');
    return mergedAttribute === '' ? undefined : mergedAttribute;
}
