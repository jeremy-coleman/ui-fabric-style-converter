export class Async {
    constructor(parent, onError) {
        this._timeoutIds = null;
        this._immediateIds = null;
        this._intervalIds = null;
        this._animationFrameIds = null;
        this._isDisposed = false;
        this._parent = parent || null;
        this._onErrorHandler = onError;
        this._noop = () => {
        };
    }
    dispose() {
        let id;
        this._isDisposed = true;
        this._parent = null;
        if (this._timeoutIds) {
            for (id in this._timeoutIds) {
                if (this._timeoutIds.hasOwnProperty(id)) {
                    this.clearTimeout(parseInt(id, 10));
                }
            }
            this._timeoutIds = null;
        }
        if (this._immediateIds) {
            for (id in this._immediateIds) {
                if (this._immediateIds.hasOwnProperty(id)) {
                    this.clearImmediate(parseInt(id, 10));
                }
            }
            this._immediateIds = null;
        }
        if (this._intervalIds) {
            for (id in this._intervalIds) {
                if (this._intervalIds.hasOwnProperty(id)) {
                    this.clearInterval(parseInt(id, 10));
                }
            }
            this._intervalIds = null;
        }
        if (this._animationFrameIds) {
            for (id in this._animationFrameIds) {
                if (this._animationFrameIds.hasOwnProperty(id)) {
                    this.cancelAnimationFrame(parseInt(id, 10));
                }
            }
            this._animationFrameIds = null;
        }
    }
    setTimeout(callback, duration) {
        let timeoutId = 0;
        if (!this._isDisposed) {
            if (!this._timeoutIds) {
                this._timeoutIds = {};
            }
            timeoutId = setTimeout(() => {
                try {
                    if (this._timeoutIds) {
                        delete this._timeoutIds[timeoutId];
                    }
                    callback.apply(this._parent);
                }
                catch (e) {
                    if (this._onErrorHandler) {
                        this._onErrorHandler(e);
                    }
                }
            }, duration);
            this._timeoutIds[timeoutId] = true;
        }
        return timeoutId;
    }
    clearTimeout(id) {
        if (this._timeoutIds && this._timeoutIds[id]) {
            clearTimeout(id);
            delete this._timeoutIds[id];
        }
    }
    setImmediate(callback) {
        let immediateId = 0;
        if (!this._isDisposed) {
            if (!this._immediateIds) {
                this._immediateIds = {};
            }
            let setImmediateCallback = () => {
                try {
                    if (this._immediateIds) {
                        delete this._immediateIds[immediateId];
                    }
                    callback.apply(this._parent);
                }
                catch (e) {
                    this._logError(e);
                }
            };
            immediateId = window.setImmediate ? window.setImmediate(setImmediateCallback) : window.setTimeout(setImmediateCallback, 0);
            this._immediateIds[immediateId] = true;
        }
        return immediateId;
    }
    clearImmediate(id) {
        if (this._immediateIds && this._immediateIds[id]) {
            window.clearImmediate ? window.clearImmediate(id) : window.clearTimeout(id);
            delete this._immediateIds[id];
        }
    }
    setInterval(callback, duration) {
        let intervalId = 0;
        if (!this._isDisposed) {
            if (!this._intervalIds) {
                this._intervalIds = {};
            }
            intervalId = setInterval(() => {
                try {
                    callback.apply(this._parent);
                }
                catch (e) {
                    this._logError(e);
                }
            }, duration);
            this._intervalIds[intervalId] = true;
        }
        return intervalId;
    }
    clearInterval(id) {
        if (this._intervalIds && this._intervalIds[id]) {
            clearInterval(id);
            delete this._intervalIds[id];
        }
    }
    throttle(func, wait, options) {
        if (this._isDisposed) {
            return this._noop;
        }
        let waitMS = wait || 0;
        let leading = true;
        let trailing = true;
        let lastExecuteTime = 0;
        let lastResult;
        let lastArgs;
        let timeoutId = null;
        if (options && typeof options.leading === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof options.trailing === 'boolean') {
            trailing = options.trailing;
        }
        let callback = (userCall) => {
            let now = new Date().getTime();
            let delta = now - lastExecuteTime;
            let waitLength = leading ? waitMS - delta : waitMS;
            if (delta >= waitMS && (!userCall || leading)) {
                lastExecuteTime = now;
                if (timeoutId) {
                    this.clearTimeout(timeoutId);
                    timeoutId = null;
                }
                lastResult = func.apply(this._parent, lastArgs);
            }
            else if (timeoutId === null && trailing) {
                timeoutId = this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        let resultFunction = (...args) => {
            lastArgs = args;
            return callback(true);
        };
        return resultFunction;
    }
    debounce(func, wait, options) {
        if (this._isDisposed) {
            let noOpFunction = (() => {
            });
            noOpFunction.cancel = () => {
                return;
            };
            noOpFunction.flush = (() => null);
            noOpFunction.pending = () => false;
            return noOpFunction;
        }
        let waitMS = wait || 0;
        let leading = false;
        let trailing = true;
        let maxWait = null;
        let lastCallTime = 0;
        let lastExecuteTime = new Date().getTime();
        let lastResult;
        let lastArgs;
        let timeoutId = null;
        if (options && typeof options.leading === 'boolean') {
            leading = options.leading;
        }
        if (options && typeof options.trailing === 'boolean') {
            trailing = options.trailing;
        }
        if (options && typeof options.maxWait === 'number' && !isNaN(options.maxWait)) {
            maxWait = options.maxWait;
        }
        let markExecuted = (time) => {
            if (timeoutId) {
                this.clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastExecuteTime = time;
        };
        let invokeFunction = (time) => {
            markExecuted(time);
            lastResult = func.apply(this._parent, lastArgs);
        };
        let callback = (userCall) => {
            let now = new Date().getTime();
            let executeImmediately = false;
            if (userCall) {
                if (leading && now - lastCallTime >= waitMS) {
                    executeImmediately = true;
                }
                lastCallTime = now;
            }
            let delta = now - lastCallTime;
            let waitLength = waitMS - delta;
            let maxWaitDelta = now - lastExecuteTime;
            let maxWaitExpired = false;
            if (maxWait !== null) {
                if (maxWaitDelta >= maxWait && timeoutId) {
                    maxWaitExpired = true;
                }
                else {
                    waitLength = Math.min(waitLength, maxWait - maxWaitDelta);
                }
            }
            if (delta >= waitMS || maxWaitExpired || executeImmediately) {
                invokeFunction(now);
            }
            else if ((timeoutId === null || !userCall) && trailing) {
                timeoutId = this.setTimeout(callback, waitLength);
            }
            return lastResult;
        };
        let pending = () => {
            return !!timeoutId;
        };
        let cancel = () => {
            if (pending()) {
                markExecuted(new Date().getTime());
            }
        };
        let flush = () => {
            if (pending()) {
                invokeFunction(new Date().getTime());
            }
            return lastResult;
        };
        let resultFunction = ((...args) => {
            lastArgs = args;
            return callback(true);
        });
        resultFunction.cancel = cancel;
        resultFunction.flush = flush;
        resultFunction.pending = pending;
        return resultFunction;
    }
    requestAnimationFrame(callback) {
        let animationFrameId = 0;
        if (!this._isDisposed) {
            if (!this._animationFrameIds) {
                this._animationFrameIds = {};
            }
            let animationFrameCallback = () => {
                try {
                    if (this._animationFrameIds) {
                        delete this._animationFrameIds[animationFrameId];
                    }
                    callback.apply(this._parent);
                }
                catch (e) {
                    this._logError(e);
                }
            };
            animationFrameId = window.requestAnimationFrame
                ? window.requestAnimationFrame(animationFrameCallback)
                : window.setTimeout(animationFrameCallback, 0);
            this._animationFrameIds[animationFrameId] = true;
        }
        return animationFrameId;
    }
    cancelAnimationFrame(id) {
        if (this._animationFrameIds && this._animationFrameIds[id]) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(id) : window.clearTimeout(id);
            delete this._animationFrameIds[id];
        }
    }
    _logError(e) {
        if (this._onErrorHandler) {
            this._onErrorHandler(e);
        }
    }
}
