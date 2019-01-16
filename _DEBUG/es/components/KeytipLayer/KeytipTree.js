import { find, values } from '../../Utilities';
import { mergeOverflows, sequencesToID } from '../../utilities/keytips/KeytipUtils';
import { KTP_LAYER_ID } from '../../utilities/keytips/KeytipConstants';
export class KeytipTree {
    constructor() {
        this.nodeMap = {};
        this.root = {
            id: KTP_LAYER_ID,
            children: [],
            parent: '',
            keySequences: []
        };
        this.nodeMap[this.root.id] = this.root;
    }
    addNode(keytipProps, uniqueID, persisted) {
        const fullSequence = this._getFullSequence(keytipProps);
        const nodeID = sequencesToID(fullSequence);
        fullSequence.pop();
        const parentID = this._getParentID(fullSequence);
        const node = this._createNode(nodeID, parentID, [], keytipProps, persisted);
        this.nodeMap[uniqueID] = node;
        const parent = this.getNode(parentID);
        if (parent) {
            parent.children.push(nodeID);
        }
    }
    updateNode(keytipProps, uniqueID) {
        const fullSequence = this._getFullSequence(keytipProps);
        const nodeID = sequencesToID(fullSequence);
        fullSequence.pop();
        const parentID = this._getParentID(fullSequence);
        const node = this.nodeMap[uniqueID];
        if (node) {
            node.id = nodeID;
            node.keySequences = keytipProps.keySequences;
            node.overflowSetSequence = keytipProps.overflowSetSequence;
            node.onExecute = keytipProps.onExecute;
            node.onReturn = keytipProps.onReturn;
            node.hasDynamicChildren = keytipProps.hasDynamicChildren;
            node.hasMenu = keytipProps.hasMenu;
            node.parent = parentID;
            node.disabled = keytipProps.disabled;
        }
    }
    removeNode(keytipProps, uniqueID) {
        const fullSequence = this._getFullSequence(keytipProps);
        const nodeID = sequencesToID(fullSequence);
        fullSequence.pop();
        const parentID = this._getParentID(fullSequence);
        const parent = this.getNode(parentID);
        if (parent) {
            parent.children.splice(parent.children.indexOf(nodeID), 1);
        }
        if (this.nodeMap[uniqueID]) {
            delete this.nodeMap[uniqueID];
        }
    }
    getExactMatchedNode(keySequence, currentKeytip) {
        const possibleNodes = this.getNodes(currentKeytip.children);
        return find(possibleNodes, (node) => {
            return this._getNodeSequence(node) === keySequence && !node.disabled;
        });
    }
    getPartiallyMatchedNodes(keySequence, currentKeytip) {
        const possibleNodes = this.getNodes(currentKeytip.children);
        return possibleNodes.filter((node) => {
            return this._getNodeSequence(node).indexOf(keySequence) === 0 && !node.disabled;
        });
    }
    getChildren(node) {
        if (!node) {
            node = this.currentKeytip;
            if (!node) {
                return [];
            }
        }
        const children = node.children;
        return Object.keys(this.nodeMap).reduce((nodes, key) => {
            if (children.indexOf(this.nodeMap[key].id) >= 0 && !this.nodeMap[key].persisted) {
                nodes.push(this.nodeMap[key].id);
            }
            return nodes;
        }, []);
    }
    getNodes(ids) {
        return Object.keys(this.nodeMap).reduce((nodes, key) => {
            if (ids.indexOf(this.nodeMap[key].id) >= 0) {
                nodes.push(this.nodeMap[key]);
            }
            return nodes;
        }, []);
    }
    getNode(id) {
        const nodeMapValues = values(this.nodeMap);
        return find(nodeMapValues, (node) => {
            return node.id === id;
        });
    }
    isCurrentKeytipParent(keytipProps) {
        if (this.currentKeytip) {
            let fullSequence = [...keytipProps.keySequences];
            if (keytipProps.overflowSetSequence) {
                fullSequence = mergeOverflows(fullSequence, keytipProps.overflowSetSequence);
            }
            fullSequence.pop();
            const parentID = fullSequence.length === 0 ? this.root.id : sequencesToID(fullSequence);
            let matchesCurrWithoutOverflow = false;
            if (this.currentKeytip.overflowSetSequence) {
                const currKeytipIdWithoutOverflow = sequencesToID(this.currentKeytip.keySequences);
                matchesCurrWithoutOverflow = currKeytipIdWithoutOverflow === parentID;
            }
            return matchesCurrWithoutOverflow || this.currentKeytip.id === parentID;
        }
        return false;
    }
    _getParentID(fullSequence) {
        return fullSequence.length === 0 ? this.root.id : sequencesToID(fullSequence);
    }
    _getFullSequence(keytipProps) {
        let fullSequence = [...keytipProps.keySequences];
        if (keytipProps.overflowSetSequence) {
            fullSequence = mergeOverflows(fullSequence, keytipProps.overflowSetSequence);
        }
        return fullSequence;
    }
    _getNodeSequence(node) {
        let fullSequence = [...node.keySequences];
        if (node.overflowSetSequence) {
            fullSequence = mergeOverflows(fullSequence, node.overflowSetSequence);
        }
        return fullSequence[fullSequence.length - 1];
    }
    _createNode(id, parentId, children, keytipProps, persisted) {
        const { keySequences, hasDynamicChildren, overflowSetSequence, hasMenu, onExecute, onReturn, disabled } = keytipProps;
        const node = {
            id,
            keySequences,
            overflowSetSequence,
            parent: parentId,
            children,
            onExecute,
            onReturn,
            hasDynamicChildren,
            hasMenu,
            disabled,
            persisted
        };
        node.children = Object.keys(this.nodeMap).reduce((array, nodeMapKey) => {
            if (this.nodeMap[nodeMapKey].parent === id) {
                array.push(this.nodeMap[nodeMapKey].id);
            }
            return array;
        }, []);
        return node;
    }
}
