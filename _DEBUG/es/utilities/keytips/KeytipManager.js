import { arraysEqual, replaceElement, findIndex, find, EventGroup, getId } from '../../Utilities';
import { KeytipEvents } from '../../utilities/keytips/KeytipConstants';
export class KeytipManager {
    constructor() {
        this.keytips = [];
        this.persistedKeytips = [];
        this.inKeytipMode = false;
        this.shouldEnterKeytipMode = true;
    }
    static getInstance() {
        return this._instance;
    }
    register(keytipProps, persisted = false) {
        let props = keytipProps;
        if (!persisted) {
            props = this.addParentOverflow(keytipProps);
        }
        const uniqueKeytip = this._getUniqueKtp(props);
        persisted ? this.persistedKeytips.push(uniqueKeytip) : this.keytips.push(uniqueKeytip);
        const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_ADDED : KeytipEvents.KEYTIP_ADDED;
        EventGroup.raise(this, event, {
            keytip: props,
            uniqueID: uniqueKeytip.uniqueID
        });
        return uniqueKeytip.uniqueID;
    }
    update(keytipProps, uniqueID) {
        const newKeytipProps = this.addParentOverflow(keytipProps);
        const uniqueKeytip = this._getUniqueKtp(newKeytipProps, uniqueID);
        const keytipIndex = findIndex(this.keytips, (ktp) => {
            return ktp.uniqueID === uniqueID;
        });
        if (keytipIndex >= 0) {
            uniqueKeytip.keytip.visible = this.keytips[keytipIndex].keytip.visible;
            this.keytips = replaceElement(this.keytips, uniqueKeytip, keytipIndex);
            EventGroup.raise(this, KeytipEvents.KEYTIP_UPDATED, {
                keytip: uniqueKeytip.keytip,
                uniqueID: uniqueKeytip.uniqueID
            });
        }
    }
    unregister(keytipToRemove, uniqueID, persisted = false) {
        if (persisted) {
            this.persistedKeytips = this.persistedKeytips.filter((uniqueKtp) => {
                return uniqueKtp.uniqueID !== uniqueID;
            });
        }
        else {
            this.keytips = this.keytips.filter((uniqueKtp) => {
                return uniqueKtp.uniqueID !== uniqueID;
            });
        }
        const event = persisted ? KeytipEvents.PERSISTED_KEYTIP_REMOVED : KeytipEvents.KEYTIP_REMOVED;
        EventGroup.raise(this, event, {
            keytip: keytipToRemove,
            uniqueID: uniqueID
        });
    }
    enterKeytipMode() {
        EventGroup.raise(this, KeytipEvents.ENTER_KEYTIP_MODE);
    }
    exitKeytipMode() {
        EventGroup.raise(this, KeytipEvents.EXIT_KEYTIP_MODE);
    }
    getKeytips() {
        return this.keytips.map((uniqueKeytip) => {
            return uniqueKeytip.keytip;
        });
    }
    addParentOverflow(keytipProps) {
        const fullSequence = [...keytipProps.keySequences];
        fullSequence.pop();
        if (fullSequence.length !== 0) {
            const parentKeytip = find(this.getKeytips(), (keytip) => {
                return arraysEqual(fullSequence, keytip.keySequences);
            });
            if (parentKeytip && parentKeytip.overflowSetSequence) {
                return {
                    ...keytipProps,
                    overflowSetSequence: parentKeytip.overflowSetSequence
                };
            }
        }
        return keytipProps;
    }
    menuExecute(overflowButtonSequences, keytipSequences) {
        EventGroup.raise(this, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, {
            overflowButtonSequences,
            keytipSequences
        });
    }
    _getUniqueKtp(keytipProps, uniqueID = getId()) {
        return { keytip: { ...keytipProps }, uniqueID };
    }
}
KeytipManager._instance = new KeytipManager();
