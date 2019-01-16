import { assign } from './object';
export class EventGroup {
    constructor(parent) {
        this._id = EventGroup._uniqueId++;
        this._parent = parent;
        this._eventRecords = [];
    }
    static raise(target, eventName, eventArgs, bubbleEvent) {
        let retVal;
        if (EventGroup._isElement(target)) {
            if (document.createEvent) {
                let ev = document.createEvent('HTMLEvents');
                ev.initEvent(eventName, bubbleEvent || false, true);
                assign(ev, eventArgs);
                retVal = target.dispatchEvent(ev);
            }
            else if (document['createEventObject']) {
                let evObj = document['createEventObject'](eventArgs);
                target.fireEvent('on' + eventName, evObj);
            }
        }
        else {
            while (target && retVal !== false) {
                let events = target.__events__;
                let eventRecords = events ? events[eventName] : null;
                if (eventRecords) {
                    for (let id in eventRecords) {
                        if (eventRecords.hasOwnProperty(id)) {
                            let eventRecordList = eventRecords[id];
                            for (let listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                                let record = eventRecordList[listIndex];
                                if (record.objectCallback) {
                                    retVal = record.objectCallback.call(record.parent, eventArgs);
                                }
                            }
                        }
                    }
                }
                target = bubbleEvent ? target.parent : null;
            }
        }
        return retVal;
    }
    static isObserved(target, eventName) {
        let events = target && target.__events__;
        return !!events && !!events[eventName];
    }
    static isDeclared(target, eventName) {
        let declaredEvents = target && target.__declaredEvents;
        return !!declaredEvents && !!declaredEvents[eventName];
    }
    static stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    }
    static _isElement(target) {
        return !!target && (!!target.addEventListener || (typeof HTMLElement !== 'undefined' && target instanceof HTMLElement));
    }
    dispose() {
        if (!this._isDisposed) {
            this._isDisposed = true;
            this.off();
            this._parent = null;
        }
    }
    onAll(target, events, useCapture) {
        for (let eventName in events) {
            if (events.hasOwnProperty(eventName)) {
                this.on(target, eventName, events[eventName], useCapture);
            }
        }
    }
    on(target, eventName, callback, useCapture) {
        if (eventName.indexOf(',') > -1) {
            let events = eventName.split(/[ ,]+/);
            for (let i = 0; i < events.length; i++) {
                this.on(target, events[i], callback, useCapture);
            }
        }
        else {
            let parent = this._parent;
            let eventRecord = {
                target: target,
                eventName: eventName,
                parent: parent,
                callback: callback,
                useCapture: useCapture || false
            };
            let events = (target.__events__ = target.__events__ || {});
            events[eventName] =
                events[eventName] ||
                    {
                        count: 0
                    };
            events[eventName][this._id] = events[eventName][this._id] || [];
            events[eventName][this._id].push(eventRecord);
            events[eventName].count++;
            if (EventGroup._isElement(target)) {
                let processElementEvent = (...args) => {
                    if (this._isDisposed) {
                        return;
                    }
                    let result;
                    try {
                        result = callback.apply(parent, args);
                        if (result === false && args[0]) {
                            let e = args[0];
                            if (e.preventDefault) {
                                e.preventDefault();
                            }
                            if (e.stopPropagation) {
                                e.stopPropagation();
                            }
                            e.cancelBubble = true;
                        }
                    }
                    catch (e) {
                    }
                    return result;
                };
                eventRecord.elementCallback = processElementEvent;
                if (target.addEventListener) {
                    target.addEventListener(eventName, processElementEvent, useCapture);
                }
                else if (target.attachEvent) {
                    target.attachEvent('on' + eventName, processElementEvent);
                }
            }
            else {
                let processObjectEvent = (...args) => {
                    if (this._isDisposed) {
                        return;
                    }
                    return callback.apply(parent, args);
                };
                eventRecord.objectCallback = processObjectEvent;
            }
            this._eventRecords.push(eventRecord);
        }
    }
    off(target, eventName, callback, useCapture) {
        for (let i = 0; i < this._eventRecords.length; i++) {
            let eventRecord = this._eventRecords[i];
            if ((!target || target === eventRecord.target) &&
                (!eventName || eventName === eventRecord.eventName) &&
                (!callback || callback === eventRecord.callback) &&
                (typeof useCapture !== 'boolean' || useCapture === eventRecord.useCapture)) {
                let events = eventRecord.target.__events__;
                let targetArrayLookup = events[eventRecord.eventName];
                let targetArray = targetArrayLookup ? targetArrayLookup[this._id] : null;
                if (targetArray) {
                    if (targetArray.length === 1 || !callback) {
                        targetArrayLookup.count -= targetArray.length;
                        delete events[eventRecord.eventName][this._id];
                    }
                    else {
                        targetArrayLookup.count--;
                        targetArray.splice(targetArray.indexOf(eventRecord), 1);
                    }
                    if (!targetArrayLookup.count) {
                        delete events[eventRecord.eventName];
                    }
                }
                if (eventRecord.elementCallback) {
                    if (eventRecord.target.removeEventListener) {
                        eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.useCapture);
                    }
                    else if (eventRecord.target.detachEvent) {
                        eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
                    }
                }
                this._eventRecords.splice(i--, 1);
            }
        }
    }
    raise(eventName, eventArgs, bubbleEvent) {
        return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
    }
    declare(event) {
        let declaredEvents = (this._parent.__declaredEvents = this._parent.__declaredEvents || {});
        if (typeof event === 'string') {
            declaredEvents[event] = true;
        }
        else {
            for (let i = 0; i < event.length; i++) {
                declaredEvents[event[i]] = true;
            }
        }
    }
}
EventGroup._uniqueId = 0;
