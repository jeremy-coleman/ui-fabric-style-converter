import * as React from 'react';
import { BaseComponent, KeyCodes, elementContains, findScrollableParent, getParent, getDocument, getWindow, isElementTabbable, createRef } from '../../Utilities';
import { SelectionMode } from './interfaces';
const SELECTION_DISABLED_ATTRIBUTE_NAME = 'data-selection-disabled';
const SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
const SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
const SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke';
const SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';
const SELECTION_SELECT_ATTRIBUTE_NAME = 'data-selection-select';
export class SelectionZone extends BaseComponent {
    constructor() {
        super(...arguments);
        this._root = createRef();
        this.ignoreNextFocus = () => {
            this._handleNextFocus(false);
        };
        this._onMouseDownCapture = (ev) => {
            if (document.activeElement !== ev.target && !elementContains(document.activeElement, ev.target)) {
                this.ignoreNextFocus();
                return;
            }
            if (!elementContains(ev.target, this._root.current)) {
                return;
            }
            let target = ev.target;
            while (target !== this._root.current) {
                if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    this.ignoreNextFocus();
                    break;
                }
                target = getParent(target);
            }
        };
        this._onFocus = (ev) => {
            const target = ev.target;
            const { selection } = this.props;
            const isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
            const selectionMode = this._getSelectionMode();
            if (this._shouldHandleFocus && selectionMode !== SelectionMode.none) {
                const isToggle = this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
                const itemRoot = this._findItemRoot(target);
                if (!isToggle && itemRoot) {
                    const index = this._getItemIndex(itemRoot);
                    if (isToggleModifierPressed) {
                        selection.setIndexSelected(index, selection.isIndexSelected(index), true);
                        if (this.props.enterModalOnTouch && this._isTouch && selection.setModal) {
                            selection.setModal(true);
                            this._setIsTouch(false);
                        }
                    }
                    else {
                        if (this.props.isSelectedOnFocus) {
                            this._onItemSurfaceClick(ev, index);
                        }
                    }
                }
            }
            this._handleNextFocus(false);
        };
        this._onMouseDown = (ev) => {
            this._updateModifiers(ev);
            let target = ev.target;
            const itemRoot = this._findItemRoot(target);
            if (this._isSelectionDisabled(target)) {
                return;
            }
            while (target !== this._root.current) {
                if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (itemRoot) {
                    if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if ((target === itemRoot || this._shouldAutoSelect(target)) &&
                        !this._isShiftPressed &&
                        !this._isCtrlPressed &&
                        !this._isMetaPressed) {
                        this._onInvokeMouseDown(ev, this._getItemIndex(itemRoot));
                        break;
                    }
                    else if (this.props.disableAutoSelectOnInputElements &&
                        (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT')) {
                        return;
                    }
                }
                target = getParent(target);
            }
        };
        this._onTouchStartCapture = (ev) => {
            this._setIsTouch(true);
        };
        this._onClick = (ev) => {
            this._updateModifiers(ev);
            let target = ev.target;
            const itemRoot = this._findItemRoot(target);
            if (this._isSelectionDisabled(target)) {
                return;
            }
            while (target !== this._root.current) {
                if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                    this._onToggleAllClick(ev);
                    break;
                }
                else if (itemRoot) {
                    const index = this._getItemIndex(itemRoot);
                    if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        if (this._isShiftPressed) {
                            this._onItemSurfaceClick(ev, index);
                        }
                        else {
                            this._onToggleClick(ev, index);
                        }
                        break;
                    }
                    else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        this._onInvokeClick(ev, index);
                        break;
                    }
                    else if (target === itemRoot) {
                        this._onItemSurfaceClick(ev, index);
                        break;
                    }
                    else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.tagName === 'INPUT') {
                        return;
                    }
                }
                target = getParent(target);
            }
        };
        this._onContextMenu = (ev) => {
            const target = ev.target;
            const { onItemContextMenu, selection } = this.props;
            if (onItemContextMenu) {
                const itemRoot = this._findItemRoot(target);
                if (itemRoot) {
                    const index = this._getItemIndex(itemRoot);
                    this._onInvokeMouseDown(ev, index);
                    const skipPreventDefault = onItemContextMenu(selection.getItems()[index], index, ev.nativeEvent);
                    if (!skipPreventDefault) {
                        ev.preventDefault();
                    }
                }
            }
        };
        this._onDoubleClick = (ev) => {
            let target = ev.target;
            if (this._isSelectionDisabled(target)) {
                return;
            }
            const { onItemInvoked } = this.props;
            const itemRoot = this._findItemRoot(target);
            const selectionMode = this._getSelectionMode();
            if (itemRoot && onItemInvoked && selectionMode !== SelectionMode.none && !this._isInputElement(target)) {
                const index = this._getItemIndex(itemRoot);
                while (target !== this._root.current) {
                    if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME) || this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if (target === itemRoot) {
                        this._onInvokeClick(ev, index);
                        break;
                    }
                    target = getParent(target);
                }
                target = getParent(target);
            }
        };
        this._onKeyDownCapture = (ev) => {
            this._updateModifiers(ev);
            this._handleNextFocus(true);
        };
        this._onKeyDown = (ev) => {
            this._updateModifiers(ev);
            let target = ev.target;
            if (this._isSelectionDisabled(target)) {
                return;
            }
            const { selection } = this.props;
            const isSelectAllKey = ev.which === KeyCodes.a && (this._isCtrlPressed || this._isMetaPressed);
            const isClearSelectionKey = ev.which === KeyCodes.escape;
            if (this._isInputElement(target)) {
                return;
            }
            const selectionMode = this._getSelectionMode();
            if (isSelectAllKey && selectionMode === SelectionMode.multiple && !selection.isAllSelected()) {
                selection.setAllSelected(true);
                ev.stopPropagation();
                ev.preventDefault();
                return;
            }
            if (isClearSelectionKey && selection.getSelectedCount() > 0) {
                selection.setAllSelected(false);
                ev.stopPropagation();
                ev.preventDefault();
                return;
            }
            const itemRoot = this._findItemRoot(target);
            if (itemRoot) {
                const index = this._getItemIndex(itemRoot);
                while (target !== this._root.current) {
                    if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                        break;
                    }
                    else if (this._shouldAutoSelect(target)) {
                        this._onInvokeMouseDown(ev, index);
                        break;
                    }
                    else if ((ev.which === KeyCodes.enter || ev.which === KeyCodes.space) &&
                        (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT')) {
                        return false;
                    }
                    else if (target === itemRoot) {
                        if (ev.which === KeyCodes.enter) {
                            this._onInvokeClick(ev, index);
                            ev.preventDefault();
                            return;
                        }
                        else if (ev.which === KeyCodes.space) {
                            this._onToggleClick(ev, index);
                            ev.preventDefault();
                            return;
                        }
                        break;
                    }
                    target = getParent(target);
                }
            }
        };
    }
    componentDidMount() {
        const win = getWindow(this._root.current);
        const scrollElement = findScrollableParent(this._root.current);
        this._events.on(win, 'keydown, keyup', this._updateModifiers, true);
        this._events.on(scrollElement, 'click', this._tryClearOnEmptyClick);
        this._events.on(document.body, 'touchstart', this._onTouchStartCapture, true);
        this._events.on(document.body, 'touchend', this._onTouchStartCapture, true);
    }
    render() {
        return (React.createElement("div", Object.assign({ className: "ms-SelectionZone", ref: this._root, onKeyDown: this._onKeyDown, onMouseDown: this._onMouseDown, onKeyDownCapture: this._onKeyDownCapture, onClick: this._onClick, role: "presentation", onDoubleClick: this._onDoubleClick, onContextMenu: this._onContextMenu }, {
            onMouseDownCapture: this._onMouseDownCapture,
            onFocusCapture: this._onFocus
        }), this.props.children));
    }
    _isSelectionDisabled(target) {
        while (target !== this._root.current) {
            if (this._hasAttribute(target, SELECTION_DISABLED_ATTRIBUTE_NAME)) {
                return true;
            }
            target = getParent(target);
        }
        return false;
    }
    _onToggleAllClick(ev) {
        const { selection } = this.props;
        const selectionMode = this._getSelectionMode();
        if (selectionMode === SelectionMode.multiple) {
            selection.toggleAllSelected();
            ev.stopPropagation();
            ev.preventDefault();
        }
    }
    _onToggleClick(ev, index) {
        const { selection } = this.props;
        const selectionMode = this._getSelectionMode();
        selection.setChangeEvents(false);
        if (this.props.enterModalOnTouch && this._isTouch && !selection.isIndexSelected(index) && selection.setModal) {
            selection.setModal(true);
            this._setIsTouch(false);
        }
        if (selectionMode === SelectionMode.multiple) {
            selection.toggleIndexSelected(index);
        }
        else if (selectionMode === SelectionMode.single) {
            const isSelected = selection.isIndexSelected(index);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, !isSelected, true);
        }
        else {
            selection.setChangeEvents(true);
            return;
        }
        selection.setChangeEvents(true);
        ev.stopPropagation();
    }
    _onInvokeClick(ev, index) {
        const { selection, onItemInvoked } = this.props;
        if (onItemInvoked) {
            onItemInvoked(selection.getItems()[index], index, ev.nativeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    _onItemSurfaceClick(ev, index) {
        const { selection } = this.props;
        const isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        const selectionMode = this._getSelectionMode();
        if (selectionMode === SelectionMode.multiple) {
            if (this._isShiftPressed && !this._isTabPressed) {
                selection.selectToIndex(index, !isToggleModifierPressed);
            }
            else if (isToggleModifierPressed) {
                selection.toggleIndexSelected(index);
            }
            else {
                this._clearAndSelectIndex(index);
            }
        }
        else if (selectionMode === SelectionMode.single) {
            this._clearAndSelectIndex(index);
        }
    }
    _onInvokeMouseDown(ev, index) {
        const { selection } = this.props;
        if (selection.isIndexSelected(index)) {
            return;
        }
        this._clearAndSelectIndex(index);
    }
    _tryClearOnEmptyClick(ev) {
        if (!this.props.selectionPreservedOnEmptyClick && this._isNonHandledClick(ev.target)) {
            this.props.selection.setAllSelected(false);
        }
    }
    _clearAndSelectIndex(index) {
        const { selection } = this.props;
        const isAlreadySingleSelected = selection.getSelectedCount() === 1 && selection.isIndexSelected(index);
        if (!isAlreadySingleSelected) {
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, true, true);
            if (this.props.enterModalOnTouch && this._isTouch && selection.setModal) {
                selection.setModal(true);
                this._setIsTouch(false);
            }
            selection.setChangeEvents(true);
        }
    }
    _updateModifiers(ev) {
        this._isShiftPressed = ev.shiftKey;
        this._isCtrlPressed = ev.ctrlKey;
        this._isMetaPressed = ev.metaKey;
        const keyCode = ev.keyCode;
        this._isTabPressed = keyCode ? keyCode === KeyCodes.tab : false;
    }
    _findItemRoot(target) {
        const { selection } = this.props;
        while (target !== this._root.current) {
            const indexValue = target.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);
            const index = Number(indexValue);
            if (indexValue !== null && index >= 0 && index < selection.getItems().length) {
                break;
            }
            target = getParent(target);
        }
        if (target === this._root.current) {
            return undefined;
        }
        return target;
    }
    _getItemIndex(itemRoot) {
        return Number(itemRoot.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME));
    }
    _shouldAutoSelect(element) {
        return this._hasAttribute(element, SELECTION_SELECT_ATTRIBUTE_NAME);
    }
    _hasAttribute(element, attributeName) {
        let isToggle = false;
        while (!isToggle && element !== this._root.current) {
            isToggle = element.getAttribute(attributeName) === 'true';
            element = getParent(element);
        }
        return isToggle;
    }
    _isInputElement(element) {
        return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
    }
    _isNonHandledClick(element) {
        const doc = getDocument();
        if (doc && element) {
            while (element && element !== doc.documentElement) {
                if (isElementTabbable(element)) {
                    return false;
                }
                element = getParent(element);
            }
        }
        return true;
    }
    _handleNextFocus(handleFocus) {
        if (this._shouldHandleFocusTimeoutId) {
            this._async.clearTimeout(this._shouldHandleFocusTimeoutId);
            this._shouldHandleFocusTimeoutId = undefined;
        }
        this._shouldHandleFocus = handleFocus;
        if (handleFocus) {
            this._async.setTimeout(() => {
                this._shouldHandleFocus = false;
            }, 100);
        }
    }
    _setIsTouch(isTouch) {
        if (this._isTouchTimeoutId) {
            this._async.clearTimeout(this._isTouchTimeoutId);
            this._isTouchTimeoutId = undefined;
        }
        this._isTouch = true;
        if (isTouch) {
            this._async.setTimeout(() => {
                this._isTouch = false;
            }, 300);
        }
    }
    _getSelectionMode() {
        const { selection } = this.props;
        const { selectionMode = selection ? selection.mode : SelectionMode.none } = this.props;
        return selectionMode;
    }
}
SelectionZone.defaultProps = {
    isMultiSelectEnabled: true,
    isSelectedOnFocus: true,
    selectionMode: SelectionMode.multiple
};
