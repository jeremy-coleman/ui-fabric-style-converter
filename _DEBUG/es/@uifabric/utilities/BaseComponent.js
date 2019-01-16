import * as React from 'react';
import { Async } from './Async';
import { EventGroup } from './EventGroup';
import { warnDeprecations, warnMutuallyExclusive, warnConditionallyRequiredProps } from './warn';
import { initializeFocusRects } from './initializeFocusRects';
import { initializeDir } from './initializeDir';
export class BaseComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        initializeFocusRects();
        initializeDir();
        _makeAllSafe(this, BaseComponent.prototype, [
            'componentDidMount',
            'shouldComponentUpdate',
            'getSnapshotBeforeUpdate',
            'render',
            'componentDidUpdate',
            'componentWillUnmount'
        ]);
    }
    componentDidUpdate(prevProps, prevState) {
        this._updateComponentRef(prevProps, this.props);
    }
    componentDidMount() {
        this._setComponentRef(this.props.componentRef, this);
    }
    componentWillUnmount() {
        this._setComponentRef(this.props.componentRef, null);
        if (this.__disposables) {
            for (let i = 0, len = this._disposables.length; i < len; i++) {
                let disposable = this.__disposables[i];
                if (disposable.dispose) {
                    disposable.dispose();
                }
            }
            this.__disposables = null;
        }
    }
    get className() {
        if (!this.__className) {
            let funcNameRegex = /function (.{1,})\(/;
            let results = funcNameRegex.exec(this.constructor.toString());
            this.__className = results && results.length > 1 ? results[1] : '';
        }
        return this.__className;
    }
    get _disposables() {
        if (!this.__disposables) {
            this.__disposables = [];
        }
        return this.__disposables;
    }
    get _async() {
        if (!this.__async) {
            this.__async = new Async(this);
            this._disposables.push(this.__async);
        }
        return this.__async;
    }
    get _events() {
        if (!this.__events) {
            this.__events = new EventGroup(this);
            this._disposables.push(this.__events);
        }
        return this.__events;
    }
    _resolveRef(refName) {
        if (!this.__resolves) {
            this.__resolves = {};
        }
        if (!this.__resolves[refName]) {
            this.__resolves[refName] = (ref) => {
                return (this[refName] = ref);
            };
        }
        return this.__resolves[refName];
    }
    _updateComponentRef(currentProps, newProps = {}) {
        if (currentProps && newProps && currentProps.componentRef !== newProps.componentRef) {
            this._setComponentRef(currentProps.componentRef, null);
            this._setComponentRef(newProps.componentRef, this);
        }
    }
    _warnDeprecations(deprecationMap) {
        warnDeprecations(this.className, this.props, deprecationMap);
    }
    _warnMutuallyExclusive(mutuallyExclusiveMap) {
        warnMutuallyExclusive(this.className, this.props, mutuallyExclusiveMap);
    }
    _warnConditionallyRequiredProps(requiredProps, conditionalPropName, condition) {
        warnConditionallyRequiredProps(this.className, this.props, requiredProps, conditionalPropName, condition);
    }
    _setComponentRef(ref, value) {
        if (!this._skipComponentRefResolution && ref) {
            if (typeof ref === 'function') {
                ref(value);
            }
            if (typeof ref === 'object') {
                ref.current = value;
            }
        }
    }
}
function _makeAllSafe(obj, prototype, methodNames) {
    for (let i = 0, len = methodNames.length; i < len; i++) {
        _makeSafe(obj, prototype, methodNames[i]);
    }
}
function _makeSafe(obj, prototype, methodName) {
    let classMethod = obj[methodName];
    let prototypeMethod = prototype[methodName];
    if (classMethod || prototypeMethod) {
        obj[methodName] = function () {
            let retVal;
            if (prototypeMethod) {
                retVal = prototypeMethod.apply(this, arguments);
            }
            if (classMethod !== prototypeMethod) {
                retVal = classMethod.apply(this, arguments);
            }
            return retVal;
        };
    }
}
export function nullRender() {
    return null;
}
