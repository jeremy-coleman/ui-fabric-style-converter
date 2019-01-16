import * as ReactDOM from 'react-dom';
import { EventGroup } from '../../Utilities';
const MOUSEDOWN_PRIMARY_BUTTON = 0;
const MOUSEMOVE_PRIMARY_BUTTON = 1;
export class DragDropHelper {
    constructor(params) {
        this._selection = params.selection;
        this._dragEnterCounts = {};
        this._activeTargets = {};
        this._lastId = 0;
        this._events = new EventGroup(this);
        this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
        this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
    }
    dispose() {
        this._events.dispose();
    }
    subscribe(root, events, dragDropOptions) {
        const { key = `${++this._lastId}` } = dragDropOptions;
        const handlers = [];
        let onDragStart;
        let onDragLeave;
        let onDragEnter;
        let onDragEnd;
        let onDrop;
        let onDragOver;
        let onMouseDown;
        let isDraggable;
        let isDroppable;
        let activeTarget;
        if (dragDropOptions && root) {
            const { eventMap, context, updateDropState } = dragDropOptions;
            const dragDropTarget = {
                root: root,
                options: dragDropOptions,
                key: key
            };
            isDraggable = this._isDraggable(dragDropTarget);
            isDroppable = this._isDroppable(dragDropTarget);
            if (isDraggable || isDroppable) {
                if (eventMap) {
                    for (const event of eventMap) {
                        const handler = {
                            callback: event.callback.bind(null, context),
                            eventName: event.eventName
                        };
                        handlers.push(handler);
                        this._events.on(root, handler.eventName, handler.callback);
                    }
                }
            }
            if (isDroppable) {
                onDragLeave = (event) => {
                    if (!event.isHandled) {
                        event.isHandled = true;
                        this._dragEnterCounts[key]--;
                        if (this._dragEnterCounts[key] === 0) {
                            updateDropState(false, event);
                        }
                    }
                };
                onDragEnter = (event) => {
                    event.preventDefault();
                    if (!event.isHandled) {
                        event.isHandled = true;
                        this._dragEnterCounts[key]++;
                        if (this._dragEnterCounts[key] === 1) {
                            updateDropState(true, event);
                        }
                    }
                };
                onDragEnd = (event) => {
                    this._dragEnterCounts[key] = 0;
                    updateDropState(false, event);
                };
                onDrop = (event) => {
                    this._dragEnterCounts[key] = 0;
                    updateDropState(false, event);
                    if (dragDropOptions.onDrop) {
                        dragDropOptions.onDrop(dragDropOptions.context.data, event);
                    }
                };
                onDragOver = (event) => {
                    event.preventDefault();
                    if (dragDropOptions.onDragOver) {
                        dragDropOptions.onDragOver(dragDropOptions.context.data, event);
                    }
                };
                this._dragEnterCounts[key] = 0;
                events.on(root, 'dragenter', onDragEnter);
                events.on(root, 'dragleave', onDragLeave);
                events.on(root, 'dragend', onDragEnd);
                events.on(root, 'drop', onDrop);
                events.on(root, 'dragover', onDragOver);
            }
            if (isDraggable) {
                onMouseDown = this._onMouseDown.bind(this, dragDropTarget);
                onDragEnd = this._onDragEnd.bind(this, dragDropTarget);
                onDragStart = (event) => {
                    const { options } = this._dragData.dragTarget;
                    if (options && options.onDragStart) {
                        options.onDragStart(options.context.data, options.context.index, this._selection.getSelection(), event);
                    }
                    this._isDragging = true;
                    event.dataTransfer.setData('id', root.id);
                };
                events.on(root, 'dragstart', onDragStart);
                events.on(root, 'mousedown', onMouseDown);
                events.on(root, 'dragend', onDragEnd);
            }
            activeTarget = {
                target: dragDropTarget,
                dispose: () => {
                    if (this._activeTargets[key] === activeTarget) {
                        delete this._activeTargets[key];
                    }
                    if (root) {
                        for (const handler of handlers) {
                            this._events.off(root, handler.eventName, handler.callback);
                        }
                        if (isDroppable) {
                            events.off(root, 'dragenter', onDragEnter);
                            events.off(root, 'dragleave', onDragLeave);
                            events.off(root, 'dragend', onDragEnd);
                            events.off(root, 'dragover', onDragOver);
                            events.off(root, 'drop', onDrop);
                        }
                        if (isDraggable) {
                            events.off(root, 'dragstart', onDragStart);
                            events.off(root, 'mousedown', onMouseDown);
                            events.off(root, 'dragend', onDragEnd);
                        }
                    }
                }
            };
            this._activeTargets[key] = activeTarget;
        }
        return {
            key: key,
            dispose: () => {
                if (activeTarget) {
                    activeTarget.dispose();
                }
            }
        };
    }
    unsubscribe(root, key) {
        const activeTarget = this._activeTargets[key];
        if (activeTarget) {
            activeTarget.dispose();
        }
    }
    _onDragEnd(target, event) {
        const { options } = target;
        if (options.onDragEnd) {
            options.onDragEnd(options.context.data, event);
        }
    }
    _onMouseUp(event) {
        this._isDragging = false;
        if (this._dragData) {
            for (const key of Object.keys(this._activeTargets)) {
                const activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.off(activeTarget.target.root, 'mousemove');
                    this._events.off(activeTarget.target.root, 'mouseleave');
                }
            }
            if (this._dragData.dropTarget) {
                EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
                EventGroup.raise(this._dragData.dropTarget.root, 'drop');
            }
        }
        this._dragData = null;
    }
    _onDocumentMouseUp(event) {
        if (event.target === document.documentElement) {
            this._onMouseUp(event);
        }
    }
    _onMouseMove(target, event) {
        const { buttons = MOUSEMOVE_PRIMARY_BUTTON } = event;
        if (this._dragData && buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
            this._onMouseUp(event);
            return;
        }
        const { root, key } = target;
        if (this._isDragging) {
            if (this._isDroppable(target)) {
                if (this._dragData) {
                    if (this._dragData.dropTarget && this._dragData.dropTarget.key !== key && !this._isChild(root, this._dragData.dropTarget.root)) {
                        if (this._dragEnterCounts[this._dragData.dropTarget.key] > 0) {
                            EventGroup.raise(this._dragData.dropTarget.root, 'dragleave');
                            EventGroup.raise(root, 'dragenter');
                            this._dragData.dropTarget = target;
                        }
                    }
                }
            }
        }
    }
    _onMouseLeave(target, event) {
        if (this._isDragging) {
            if (this._dragData && this._dragData.dropTarget && this._dragData.dropTarget.key === target.key) {
                EventGroup.raise(target.root, 'dragleave');
                this._dragData.dropTarget = undefined;
            }
        }
    }
    _onMouseDown(target, event) {
        if (event.button !== MOUSEDOWN_PRIMARY_BUTTON) {
            return;
        }
        if (this._isDraggable(target)) {
            this._dragData = {
                clientX: event.clientX,
                clientY: event.clientY,
                eventTarget: event.target,
                dragTarget: target
            };
            for (const key of Object.keys(this._activeTargets)) {
                const activeTarget = this._activeTargets[key];
                if (activeTarget.target.root) {
                    this._events.on(activeTarget.target.root, 'mousemove', this._onMouseMove.bind(this, activeTarget.target));
                    this._events.on(activeTarget.target.root, 'mouseleave', this._onMouseLeave.bind(this, activeTarget.target));
                }
            }
        }
        else {
            this._dragData = null;
        }
    }
    _isChild(parent, child) {
        const parentElement = ReactDOM.findDOMNode(parent);
        let childElement = ReactDOM.findDOMNode(child);
        while (childElement && childElement.parentElement) {
            if (childElement.parentElement === parentElement) {
                return true;
            }
            childElement = childElement.parentElement;
        }
        return false;
    }
    _isDraggable(target) {
        const { options } = target;
        return !!(options.canDrag && options.canDrag(options.context.data));
    }
    _isDroppable(target) {
        const { options } = target;
        const dragContext = this._dragData && this._dragData.dragTarget ? this._dragData.dragTarget.options.context : undefined;
        return !!(options.canDrop && options.canDrop(options.context, dragContext));
    }
}
