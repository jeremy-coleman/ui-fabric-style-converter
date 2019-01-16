const REACT_LIFECYCLE_EXCLUSIONS = [
    'setState',
    'render',
    'componentWillMount',
    'UNSAFE_componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'UNSAFE_componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'getSnapshotBeforeUpdate',
    'UNSAFE_componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];
export function hoistMethods(destination, source, exclusions = REACT_LIFECYCLE_EXCLUSIONS) {
    let hoisted = [];
    for (let methodName in source) {
        if (typeof source[methodName] === 'function' &&
            destination[methodName] === undefined &&
            (!exclusions || exclusions.indexOf(methodName) === -1)) {
            hoisted.push(methodName);
            destination[methodName] = function () {
                source[methodName].apply(source, arguments);
            };
        }
    }
    return hoisted;
}
export function unhoistMethods(source, methodNames) {
    methodNames.forEach((methodName) => delete source[methodName]);
}
