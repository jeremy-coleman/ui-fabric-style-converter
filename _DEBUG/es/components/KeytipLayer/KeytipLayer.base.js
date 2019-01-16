import * as React from 'react';
import { getLayerStyles } from './KeytipLayer.styles';
import { Keytip } from '../../Keytip';
import { Layer } from '../../Layer';
import { BaseComponent, classNamesFunction, getDocument, arraysEqual, warn, isMac } from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { KeytipTree } from './KeytipTree';
import { ktpTargetFromId, ktpTargetFromSequences, sequencesToID, mergeOverflows } from '../../utilities/keytips/KeytipUtils';
import { transitionKeysContain, KeytipTransitionModifier } from '../../utilities/keytips/IKeytipTransitionKey';
import { KeytipEvents, KTP_LAYER_ID, KTP_ARIA_SEPARATOR } from '../../utilities/keytips/KeytipConstants';
const defaultStartSequence = {
    key: isMac() ? 'Control' : 'Meta',
    modifierKeys: [KeytipTransitionModifier.alt]
};
const defaultExitSequence = defaultStartSequence;
const defaultReturnSequence = {
    key: 'Escape'
};
const getClassNames = classNamesFunction();
export class KeytipLayerBase extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this._keytipManager = KeytipManager.getInstance();
        this._delayedKeytipQueue = [];
        this._keyHandled = false;
        this._onDismiss = (ev) => {
            if (this.state.inKeytipMode) {
                this._exitKeytipMode(ev);
            }
        };
        this._onKeyDown = (ev) => {
            this._keyHandled = false;
            let key = ev.key;
            switch (key) {
                case 'Alt':
                    break;
                case 'Tab':
                case 'Enter':
                case 'Spacebar':
                case ' ':
                case 'ArrowUp':
                case 'Up':
                case 'ArrowDown':
                case 'Down':
                case 'ArrowLeft':
                case 'Left':
                case 'ArrowRight':
                case 'Right':
                    if (this.state.inKeytipMode) {
                        this._keyHandled = true;
                        this._exitKeytipMode(ev);
                    }
                    break;
                default:
                    if (key === 'Esc') {
                        key = 'Escape';
                    }
                    else if (key === 'OS' || key === 'Win') {
                        key = 'Meta';
                    }
                    const transitionKey = { key };
                    transitionKey.modifierKeys = this._getModifierKey(key, ev);
                    this.processTransitionInput(transitionKey, ev);
                    break;
            }
        };
        this._onKeyPress = (ev) => {
            if (this.state.inKeytipMode && !this._keyHandled) {
                this.processInput(ev.key.toLocaleLowerCase(), ev);
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        this._onKeytipAdded = (eventArgs) => {
            const keytipProps = eventArgs.keytip;
            const uniqueID = eventArgs.uniqueID;
            this._keytipTree.addNode(keytipProps, uniqueID);
            this._setKeytips();
            if (this._keytipTree.isCurrentKeytipParent(keytipProps)) {
                this._addKeytipToQueue(sequencesToID(keytipProps.keySequences));
            }
            if (this._newCurrentKeytipSequences && arraysEqual(keytipProps.keySequences, this._newCurrentKeytipSequences)) {
                this._triggerKeytipImmediately(keytipProps);
            }
            if (this._isCurrentKeytipAnAlias(keytipProps)) {
                let keytipSequence = keytipProps.keySequences;
                if (keytipProps.overflowSetSequence) {
                    keytipSequence = mergeOverflows(keytipSequence, keytipProps.overflowSetSequence);
                }
                this._keytipTree.currentKeytip = this._keytipTree.getNode(sequencesToID(keytipSequence));
            }
        };
        this._onKeytipUpdated = (eventArgs) => {
            const keytipProps = eventArgs.keytip;
            const uniqueID = eventArgs.uniqueID;
            this._keytipTree.updateNode(keytipProps, uniqueID);
            this._setKeytips();
        };
        this._onKeytipRemoved = (eventArgs) => {
            const keytipProps = eventArgs.keytip;
            const uniqueID = eventArgs.uniqueID;
            this._removeKeytipFromQueue(sequencesToID(keytipProps.keySequences));
            this._keytipTree.removeNode(keytipProps, uniqueID);
            this._setKeytips();
        };
        this._onPersistedKeytipAdded = (eventArgs) => {
            const keytipProps = eventArgs.keytip;
            const uniqueID = eventArgs.uniqueID;
            this._keytipTree.addNode(keytipProps, uniqueID, true);
        };
        this._onPersistedKeytipRemoved = (eventArgs) => {
            const keytipProps = eventArgs.keytip;
            const uniqueID = eventArgs.uniqueID;
            this._keytipTree.removeNode(keytipProps, uniqueID);
        };
        this._onPersistedKeytipExecute = (eventArgs) => {
            this._persistedKeytipExecute(eventArgs.overflowButtonSequences, eventArgs.keytipSequences);
        };
        this._setInKeytipMode = (inKeytipMode) => {
            this.setState({ inKeytipMode: inKeytipMode });
            this._keytipManager.inKeytipMode = inKeytipMode;
        };
        this._warnIfDuplicateKeytips = () => {
            const duplicateKeytips = this._getDuplicateIds(this._keytipTree.getChildren());
            if (duplicateKeytips.length) {
                warn('Duplicate keytips found for ' + duplicateKeytips.join(', '));
            }
        };
        this._getDuplicateIds = (keytipIds) => {
            const seenIds = {};
            return keytipIds.filter(keytipId => {
                seenIds[keytipId] = seenIds[keytipId] ? seenIds[keytipId] + 1 : 1;
                return seenIds[keytipId] === 2;
            });
        };
        const managerKeytips = [...this._keytipManager.getKeytips()];
        this.state = {
            inKeytipMode: false,
            keytips: managerKeytips,
            visibleKeytips: this._getVisibleKeytips(managerKeytips)
        };
        this._keytipTree = new KeytipTree();
        for (const uniqueKeytip of this._keytipManager.keytips.concat(this._keytipManager.persistedKeytips)) {
            this._keytipTree.addNode(uniqueKeytip.keytip, uniqueKeytip.uniqueID);
        }
        this._currentSequence = '';
        this._events.on(this._keytipManager, KeytipEvents.KEYTIP_ADDED, this._onKeytipAdded);
        this._events.on(this._keytipManager, KeytipEvents.KEYTIP_UPDATED, this._onKeytipUpdated);
        this._events.on(this._keytipManager, KeytipEvents.KEYTIP_REMOVED, this._onKeytipRemoved);
        this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_ADDED, this._onPersistedKeytipAdded);
        this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_REMOVED, this._onPersistedKeytipRemoved);
        this._events.on(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, this._onPersistedKeytipExecute);
    }
    render() {
        const { content, styles } = this.props;
        const { keytips, visibleKeytips } = this.state;
        this._classNames = getClassNames(styles, {});
        return (React.createElement(Layer, { styles: getLayerStyles },
            React.createElement("span", { id: KTP_LAYER_ID, className: this._classNames.innerContent }, `${content}${KTP_ARIA_SEPARATOR}`),
            keytips &&
                keytips.map((keytipProps, index) => {
                    return (React.createElement("span", { key: index, id: sequencesToID(keytipProps.keySequences), className: this._classNames.innerContent }, keytipProps.keySequences.join(KTP_ARIA_SEPARATOR)));
                }),
            visibleKeytips &&
                visibleKeytips.map((visibleKeytipProps) => {
                    return React.createElement(Keytip, Object.assign({ key: sequencesToID(visibleKeytipProps.keySequences) }, visibleKeytipProps));
                })));
    }
    componentDidMount() {
        this._events.on(window, 'mouseup', this._onDismiss, true);
        this._events.on(window, 'pointerup', this._onDismiss, true);
        this._events.on(window, 'resize', this._onDismiss);
        this._events.on(window, 'keydown', this._onKeyDown, true);
        this._events.on(window, 'keypress', this._onKeyPress, true);
        this._events.on(window, 'scroll', this._onDismiss, true);
        this._events.on(this._keytipManager, KeytipEvents.ENTER_KEYTIP_MODE, this._enterKeytipMode);
        this._events.on(this._keytipManager, KeytipEvents.EXIT_KEYTIP_MODE, this._exitKeytipMode);
    }
    componentWillUnmount() {
        this._events.off(window, 'mouseup', this._onDismiss, true);
        this._events.off(window, 'pointerup', this._onDismiss, true);
        this._events.off(window, 'resize', this._onDismiss);
        this._events.off(window, 'keydown', this._onKeyDown, true);
        this._events.off(window, 'keypress', this._onKeyPress, true);
        this._events.off(window, 'scroll', this._onDismiss, true);
        this._events.off(this._keytipManager, KeytipEvents.KEYTIP_ADDED, this._onKeytipAdded);
        this._events.off(this._keytipManager, KeytipEvents.KEYTIP_UPDATED, this._onKeytipUpdated);
        this._events.off(this._keytipManager, KeytipEvents.KEYTIP_REMOVED, this._onKeytipRemoved);
        this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_ADDED, this._onPersistedKeytipAdded);
        this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_REMOVED, this._onPersistedKeytipRemoved);
        this._events.off(this._keytipManager, KeytipEvents.PERSISTED_KEYTIP_EXECUTE, this._onPersistedKeytipExecute);
        this._events.off(this._keytipManager, KeytipEvents.ENTER_KEYTIP_MODE, this._enterKeytipMode);
        this._events.off(this._keytipManager, KeytipEvents.EXIT_KEYTIP_MODE, this._exitKeytipMode);
    }
    getCurrentSequence() {
        return this._currentSequence;
    }
    getKeytipTree() {
        return this._keytipTree;
    }
    processTransitionInput(transitionKey, ev) {
        const currKtp = this._keytipTree.currentKeytip;
        if (transitionKeysContain(this.props.keytipExitSequences, transitionKey) && currKtp) {
            this._keyHandled = true;
            this._exitKeytipMode(ev);
        }
        else if (transitionKeysContain(this.props.keytipReturnSequences, transitionKey)) {
            if (currKtp) {
                this._keyHandled = true;
                if (currKtp.id === this._keytipTree.root.id) {
                    this._exitKeytipMode(ev);
                }
                else {
                    if (currKtp.onReturn) {
                        currKtp.onReturn(this._getKtpExecuteTarget(currKtp), this._getKtpTarget(currKtp));
                    }
                    this._currentSequence = '';
                    this._keytipTree.currentKeytip = this._keytipTree.getNode(currKtp.parent);
                    this.showKeytips(this._keytipTree.getChildren());
                    this._warnIfDuplicateKeytips();
                }
            }
        }
        else if (transitionKeysContain(this.props.keytipStartSequences, transitionKey) && !currKtp) {
            this._keyHandled = true;
            this._enterKeytipMode();
            this._warnIfDuplicateKeytips();
        }
    }
    processInput(key, ev) {
        const currSequence = this._currentSequence + key;
        let currKtp = this._keytipTree.currentKeytip;
        if (currKtp) {
            const node = this._keytipTree.getExactMatchedNode(currSequence, currKtp);
            if (node) {
                this._keytipTree.currentKeytip = currKtp = node;
                const currKtpChildren = this._keytipTree.getChildren();
                if (currKtp.onExecute) {
                    currKtp.onExecute(this._getKtpExecuteTarget(currKtp), this._getKtpTarget(currKtp));
                    currKtp = this._keytipTree.currentKeytip;
                }
                if (currKtpChildren.length === 0 && !(currKtp.hasDynamicChildren || currKtp.hasMenu)) {
                    this._exitKeytipMode(ev);
                }
                else {
                    this.showKeytips(currKtpChildren);
                    this._warnIfDuplicateKeytips();
                }
                this._currentSequence = '';
                return;
            }
            const partialNodes = this._keytipTree.getPartiallyMatchedNodes(currSequence, currKtp);
            if (partialNodes.length > 0) {
                const ids = partialNodes
                    .filter((partialNode) => {
                    return !partialNode.persisted;
                })
                    .map((partialNode) => {
                    return partialNode.id;
                });
                this.showKeytips(ids);
                this._currentSequence = currSequence;
            }
        }
    }
    showKeytips(ids) {
        for (const keytip of this._keytipManager.getKeytips()) {
            const keytipId = sequencesToID(keytip.keySequences);
            if (ids.indexOf(keytipId) >= 0) {
                keytip.visible = true;
            }
            else if (keytip.overflowSetSequence &&
                ids.indexOf(sequencesToID(mergeOverflows(keytip.keySequences, keytip.overflowSetSequence))) >= 0) {
                keytip.visible = true;
            }
            else {
                keytip.visible = false;
            }
        }
        this._setKeytips();
    }
    _enterKeytipMode() {
        if (this._keytipManager.shouldEnterKeytipMode) {
            this._keytipTree.currentKeytip = this._keytipTree.root;
            this.showKeytips(this._keytipTree.getChildren());
            this._setInKeytipMode(true);
            if (this.props.onEnterKeytipMode) {
                this.props.onEnterKeytipMode();
            }
        }
    }
    _exitKeytipMode(ev) {
        this._keytipTree.currentKeytip = undefined;
        this._currentSequence = '';
        this.showKeytips([]);
        this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
        this._delayedKeytipQueue = [];
        this._setInKeytipMode(false);
        if (this.props.onExitKeytipMode) {
            this.props.onExitKeytipMode(ev);
        }
    }
    _setKeytips(keytipProps = this._keytipManager.getKeytips()) {
        this.setState({ keytips: keytipProps, visibleKeytips: this._getVisibleKeytips(keytipProps) });
    }
    _persistedKeytipExecute(overflowButtonSequences, keytipSequences) {
        this._newCurrentKeytipSequences = keytipSequences;
        const overflowKeytipNode = this._keytipTree.getNode(sequencesToID(overflowButtonSequences));
        if (overflowKeytipNode && overflowKeytipNode.onExecute) {
            overflowKeytipNode.onExecute(this._getKtpExecuteTarget(overflowKeytipNode), this._getKtpTarget(overflowKeytipNode));
        }
    }
    _getVisibleKeytips(keytips) {
        const seenIds = {};
        return keytips.filter(keytip => {
            const keytipId = sequencesToID(keytip.keySequences);
            seenIds[keytipId] = seenIds[keytipId] ? seenIds[keytipId] + 1 : 1;
            return keytip.visible && seenIds[keytipId] === 1;
        });
    }
    _getModifierKey(key, ev) {
        const modifierKeys = [];
        if (ev.altKey && key !== 'Alt') {
            modifierKeys.push(KeytipTransitionModifier.alt);
        }
        if (ev.ctrlKey && key !== 'Control') {
            modifierKeys.push(KeytipTransitionModifier.ctrl);
        }
        if (ev.shiftKey && key !== 'Shift') {
            modifierKeys.push(KeytipTransitionModifier.shift);
        }
        if (ev.metaKey && key !== 'Meta') {
            modifierKeys.push(KeytipTransitionModifier.meta);
        }
        return modifierKeys.length ? modifierKeys : undefined;
    }
    _triggerKeytipImmediately(keytipProps) {
        let keytipSequence = [...keytipProps.keySequences];
        if (keytipProps.overflowSetSequence) {
            keytipSequence = mergeOverflows(keytipSequence, keytipProps.overflowSetSequence);
        }
        this._keytipTree.currentKeytip = this._keytipTree.getNode(sequencesToID(keytipSequence));
        if (this._keytipTree.currentKeytip) {
            const children = this._keytipTree.getChildren();
            if (children.length) {
                this.showKeytips(children);
            }
            if (this._keytipTree.currentKeytip.onExecute) {
                this._keytipTree.currentKeytip.onExecute(this._getKtpExecuteTarget(this._keytipTree.currentKeytip), this._getKtpTarget(this._keytipTree.currentKeytip));
            }
        }
        this._newCurrentKeytipSequences = undefined;
    }
    _addKeytipToQueue(keytipID) {
        this._delayedKeytipQueue.push(keytipID);
        this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
        this._delayedQueueTimeout = this._async.setTimeout(() => {
            if (this._delayedKeytipQueue.length) {
                this.showKeytips(this._delayedKeytipQueue);
                this._delayedKeytipQueue = [];
            }
        }, 300);
    }
    _removeKeytipFromQueue(keytipID) {
        const index = this._delayedKeytipQueue.indexOf(keytipID);
        if (index >= 0) {
            this._delayedKeytipQueue.splice(index, 1);
            this._delayedQueueTimeout && this._async.clearTimeout(this._delayedQueueTimeout);
            this._delayedQueueTimeout = this._async.setTimeout(() => {
                if (this._delayedKeytipQueue.length) {
                    this.showKeytips(this._delayedKeytipQueue);
                    this._delayedKeytipQueue = [];
                }
            }, 300);
        }
    }
    _getKtpExecuteTarget(currKtp) {
        return getDocument().querySelector(ktpTargetFromId(currKtp.id));
    }
    _getKtpTarget(currKtp) {
        return getDocument().querySelector(ktpTargetFromSequences(currKtp.keySequences));
    }
    _isCurrentKeytipAnAlias(keytipProps) {
        const currKtp = this._keytipTree.currentKeytip;
        if (currKtp && (currKtp.overflowSetSequence || currKtp.persisted) && arraysEqual(keytipProps.keySequences, currKtp.keySequences)) {
            return true;
        }
        return false;
    }
}
KeytipLayerBase.defaultProps = {
    keytipStartSequences: [defaultStartSequence],
    keytipExitSequences: [defaultExitSequence],
    keytipReturnSequences: [defaultReturnSequence],
    content: ''
};
