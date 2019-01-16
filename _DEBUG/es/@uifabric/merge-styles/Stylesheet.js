export const InjectionMode = {
    none: 0,
    insertNode: 1,
    appendChild: 2
};
const STYLESHEET_SETTING = '__stylesheet__';
const _fileScopedGlobal = {};
let _stylesheet;
export class Stylesheet {
    constructor(config) {
        this._rules = [];
        this._preservedRules = [];
        this._rulesToInsert = [];
        this._counter = 0;
        this._keyToClassName = {};
        this._onResetCallbacks = [];
        this._classNameToArgs = {};
        this._config = {
            injectionMode: InjectionMode.insertNode,
            defaultPrefix: 'css',
            namespace: undefined,
            ...config
        };
    }
    static getInstance() {
        const global = typeof window !== 'undefined' ? window : typeof process !== 'undefined' ? process : _fileScopedGlobal;
        _stylesheet = global[STYLESHEET_SETTING];
        if (!_stylesheet || (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== document)) {
            const fabricConfig = (global && global['FabricConfig']) || {};
            _stylesheet = global[STYLESHEET_SETTING] = new Stylesheet(fabricConfig.mergeStyles);
        }
        return _stylesheet;
    }
    setConfig(config) {
        this._config = {
            ...this._config,
            ...config
        };
    }
    onReset(callback) {
        this._onResetCallbacks.push(callback);
    }
    getClassName(displayName) {
        const { namespace } = this._config;
        const prefix = displayName || this._config.defaultPrefix;
        return `${namespace ? namespace + '-' : ''}${prefix}-${this._counter++}`;
    }
    cacheClassName(className, key, args, rules) {
        this._keyToClassName[key] = className;
        this._classNameToArgs[className] = {
            args,
            rules
        };
    }
    classNameFromKey(key) {
        return this._keyToClassName[key];
    }
    argsFromClassName(className) {
        const entry = this._classNameToArgs[className];
        return entry && entry.args;
    }
    insertedRulesFromClassName(className) {
        const entry = this._classNameToArgs[className];
        return entry && entry.rules;
    }
    insertRule(rule, preserve) {
        const { injectionMode } = this._config;
        const element = injectionMode !== InjectionMode.none ? this._getStyleElement() : undefined;
        if (preserve) {
            this._preservedRules.push(rule);
        }
        if (element) {
            switch (this._config.injectionMode) {
                case InjectionMode.insertNode:
                    const { sheet } = element;
                    try {
                        sheet.insertRule(rule, sheet.cssRules.length);
                    }
                    catch (e) {
                    }
                    break;
                case InjectionMode.appendChild:
                    element.appendChild(document.createTextNode(rule));
                    break;
            }
        }
        else {
            this._rules.push(rule);
        }
        if (this._config.onInsertRule) {
            this._config.onInsertRule(rule);
        }
    }
    getRules(includePreservedRules) {
        return (includePreservedRules ? this._preservedRules.join('') : '') + this._rules.join('') + this._rulesToInsert.join('');
    }
    reset() {
        this._rules = [];
        this._rulesToInsert = [];
        this._counter = 0;
        this._classNameToArgs = {};
        this._keyToClassName = {};
        this._onResetCallbacks.forEach((callback) => callback());
    }
    resetKeys() {
        this._keyToClassName = {};
    }
    _getStyleElement() {
        if (!this._styleElement && typeof document !== 'undefined') {
            this._styleElement = this._createStyleElement();
            window.requestAnimationFrame(() => {
                this._styleElement = undefined;
            });
        }
        return this._styleElement;
    }
    _createStyleElement() {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-merge-styles', 'true');
        styleElement.type = 'text/css';
        if (this._lastStyleElement && this._lastStyleElement.nextElementSibling) {
            document.head.insertBefore(styleElement, this._lastStyleElement.nextElementSibling);
        }
        else {
            document.head.appendChild(styleElement);
        }
        this._lastStyleElement = styleElement;
        return styleElement;
    }
}
