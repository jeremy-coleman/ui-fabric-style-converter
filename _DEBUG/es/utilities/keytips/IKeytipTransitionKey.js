import { find, KeyCodes } from '../../Utilities';
export var KeytipTransitionModifier;
(function (KeytipTransitionModifier) {
    KeytipTransitionModifier[KeytipTransitionModifier["shift"] = KeyCodes.shift] = "shift";
    KeytipTransitionModifier[KeytipTransitionModifier["ctrl"] = KeyCodes.ctrl] = "ctrl";
    KeytipTransitionModifier[KeytipTransitionModifier["alt"] = KeyCodes.alt] = "alt";
    KeytipTransitionModifier[KeytipTransitionModifier["meta"] = KeyCodes.leftWindow] = "meta";
})(KeytipTransitionModifier || (KeytipTransitionModifier = {}));
export function transitionKeysAreEqual(key1, key2) {
    if (key1.key !== key2.key) {
        return false;
    }
    let mod1 = key1.modifierKeys;
    let mod2 = key2.modifierKeys;
    if ((!mod1 && mod2) || (mod1 && !mod2)) {
        return false;
    }
    if (mod1 && mod2) {
        if (mod1.length !== mod2.length) {
            return false;
        }
        mod1 = mod1.sort();
        mod2 = mod2.sort();
        for (let i = 0; i < mod1.length; i++) {
            if (mod1[i] !== mod2[i]) {
                return false;
            }
        }
    }
    return true;
}
export function transitionKeysContain(keys, key) {
    return !!find(keys, (transitionKey) => {
        return transitionKeysAreEqual(transitionKey, key);
    });
}
