import { Stylesheet } from '@uifabric/merge-styles';
const CURRENT_ID_PROPERTY = '__currentId__';
const DEFAULT_ID_STRING = 'id__';
let _global = (typeof window !== 'undefined' && window) || process;
if (_global[CURRENT_ID_PROPERTY] === undefined) {
    _global[CURRENT_ID_PROPERTY] = 0;
}
function checkProperties(a, b) {
    for (let propName in a) {
        if (a.hasOwnProperty(propName)) {
            if (!b.hasOwnProperty(propName) || b[propName] !== a[propName]) {
                return false;
            }
        }
    }
    return true;
}
export function shallowCompare(a, b) {
    return checkProperties(a, b) && checkProperties(b, a);
}
export function assign(target, ...args) {
    return filteredAssign.apply(this, [null, target].concat(args));
}
export function filteredAssign(isAllowed, target, ...args) {
    target = target || {};
    for (let sourceObject of args) {
        if (sourceObject) {
            for (let propName in sourceObject) {
                if (sourceObject.hasOwnProperty(propName) && (!isAllowed || isAllowed(propName))) {
                    target[propName] = sourceObject[propName];
                }
            }
        }
    }
    return target;
}
const stylesheet = Stylesheet.getInstance();
if (stylesheet && stylesheet.onReset) {
    stylesheet.onReset(resetIds);
}
export function getId(prefix) {
    let index = _global[CURRENT_ID_PROPERTY]++;
    return (prefix || DEFAULT_ID_STRING) + index;
}
export function resetIds(counter = 0) {
    _global[CURRENT_ID_PROPERTY] = counter;
}
export function mapEnumByName(theEnum, callback) {
    return Object.keys(theEnum)
        .map((p) => {
        if (String(Number(p)) !== p) {
            return callback(p, theEnum[p]);
        }
    })
        .filter((v) => !!v);
}
export function values(obj) {
    return Object.keys(obj).reduce((arr, key) => {
        arr.push(obj[key]);
        return arr;
    }, []);
}
