export function merge(target, ...args) {
    for (const arg of args) {
        _merge(target || {}, arg);
    }
    return target;
}
function _merge(target, source, circularReferences = []) {
    circularReferences.push(source);
    for (let name in source) {
        if (source.hasOwnProperty(name)) {
            const value = source[name];
            if (typeof value === 'object') {
                const isCircularReference = circularReferences.indexOf(value) > -1;
                target[name] = isCircularReference ? value : _merge(target[name] || {}, value, circularReferences);
            }
            else {
                target[name] = value;
            }
        }
    }
    circularReferences.pop();
    return target;
}
