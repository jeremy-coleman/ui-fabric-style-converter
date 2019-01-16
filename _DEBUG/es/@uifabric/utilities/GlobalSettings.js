const GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
const CALLBACK_STATE_PROP_NAME = '__callbacks__';
let _global;
let _counter = 0;
if (typeof window !== 'undefined') {
    _global = window;
}
else if (typeof global !== 'undefined') {
    _global = global;
}
else {
    _global = {};
}
let _globalSettings = (_global[GLOBAL_SETTINGS_PROP_NAME] = _global[GLOBAL_SETTINGS_PROP_NAME] || {
    [CALLBACK_STATE_PROP_NAME]: {}
});
const _callbacks = _globalSettings[CALLBACK_STATE_PROP_NAME];
export class GlobalSettings {
    static getValue(key, defaultValue) {
        if (_globalSettings[key] === undefined) {
            _globalSettings[key] = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
        }
        return _globalSettings[key];
    }
    static setValue(key, value) {
        let oldValue = _globalSettings[key];
        if (value !== oldValue) {
            _globalSettings[key] = value;
            let changeDescription = {
                oldValue,
                value,
                key
            };
            for (let id in _callbacks) {
                if (_callbacks.hasOwnProperty(id)) {
                    _callbacks[id](changeDescription);
                }
            }
        }
        return value;
    }
    static addChangeListener(cb) {
        let id = cb.__id__;
        if (!id) {
            id = cb.__id__ = String(_counter++);
        }
        _callbacks[id] = cb;
    }
    static removeChangeListener(cb) {
        delete _callbacks[cb.__id__];
    }
}
