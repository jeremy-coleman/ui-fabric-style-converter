import { Stylesheet } from '@uifabric/merge-styles';
const stylesheet = Stylesheet.getInstance();
if (stylesheet && stylesheet.onReset) {
    Stylesheet.getInstance().onReset(resetMemoizations);
}
let _resetCounter = 0;
const _emptyObject = { empty: true };
const _dictionary = {};
let _weakMap = typeof WeakMap === 'undefined' ? null : WeakMap;
export function setMemoizeWeakMap(weakMap) {
    _weakMap = weakMap;
}
export function resetMemoizations() {
    _resetCounter++;
}
export function memoize(target, key, descriptor) {
    let fn = memoizeFunction(descriptor.value && descriptor.value.bind(null));
    return {
        configurable: true,
        get() {
            return fn;
        }
    };
}
export function memoizeFunction(cb, maxCacheSize = 100) {
    if (!_weakMap) {
        return cb;
    }
    let rootNode;
    let cacheSize = 0;
    let localResetCounter = _resetCounter;
    return function memoizedFunction(...args) {
        let currentNode = rootNode;
        if (rootNode === undefined || localResetCounter !== _resetCounter || (maxCacheSize > 0 && cacheSize > maxCacheSize)) {
            rootNode = _createNode();
            cacheSize = 0;
            localResetCounter = _resetCounter;
        }
        currentNode = rootNode;
        for (let i = 0; i < args.length; i++) {
            let arg = _normalizeArg(args[i]);
            if (!currentNode.map.has(arg)) {
                currentNode.map.set(arg, _createNode());
            }
            currentNode = currentNode.map.get(arg);
        }
        if (!currentNode.hasOwnProperty('value')) {
            currentNode.value = cb(...args);
            cacheSize++;
        }
        return currentNode.value;
    };
}
function _normalizeArg(val) {
    if (!val) {
        return _emptyObject;
    }
    else if (typeof val === 'object' || typeof val === 'function') {
        return val;
    }
    else if (!_dictionary[val]) {
        _dictionary[val] = { val };
    }
    return _dictionary[val];
}
function _createNode() {
    return {
        map: _weakMap ? new _weakMap() : null
    };
}
