import { SELECTION_CHANGE, SelectionMode } from './interfaces';
import { EventGroup } from '../../Utilities';
export class Selection {
    constructor(options = {}) {
        const { onSelectionChanged, getKey, canSelectItem = (item) => true, selectionMode = SelectionMode.multiple } = options;
        this.mode = selectionMode;
        this._getKey = getKey || defaultGetKey;
        this._changeEventSuppressionCount = 0;
        this._exemptedCount = 0;
        this._anchoredIndex = 0;
        this._unselectableCount = 0;
        this._onSelectionChanged = onSelectionChanged;
        this._canSelectItem = canSelectItem;
        this._isModal = false;
        this.setItems([], true);
    }
    canSelectItem(item, index) {
        if (typeof index === 'number' && index < 0) {
            return false;
        }
        return this._canSelectItem(item, index);
    }
    getKey(item, index) {
        const key = this._getKey(item, index);
        return typeof key === 'number' || key ? `${key}` : '';
    }
    setChangeEvents(isEnabled, suppressChange) {
        this._changeEventSuppressionCount += isEnabled ? -1 : 1;
        if (this._changeEventSuppressionCount === 0 && this._hasChanged) {
            this._hasChanged = false;
            if (!suppressChange) {
                this._change();
            }
        }
    }
    isModal() {
        return this._isModal;
    }
    setModal(isModal) {
        if (this._isModal !== isModal) {
            this.setChangeEvents(false);
            this._isModal = isModal;
            if (!isModal) {
                this.setAllSelected(false);
            }
            this._change();
            this.setChangeEvents(true);
        }
    }
    setItems(items, shouldClear = true) {
        const newKeyToIndexMap = {};
        const newUnselectableIndices = {};
        let hasSelectionChanged = false;
        this.setChangeEvents(false);
        this._unselectableCount = 0;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item) {
                const key = this.getKey(item, i);
                if (key) {
                    newKeyToIndexMap[key] = i;
                }
            }
            newUnselectableIndices[i] = item && !this.canSelectItem(item);
            if (newUnselectableIndices[i]) {
                this._unselectableCount++;
            }
        }
        if (shouldClear || items.length === 0) {
            this.setAllSelected(false);
        }
        const newExemptedIndicies = {};
        let newExemptedCount = 0;
        for (const indexProperty in this._exemptedIndices) {
            if (this._exemptedIndices.hasOwnProperty(indexProperty)) {
                const index = Number(indexProperty);
                const item = this._items[index];
                const exemptKey = item ? this.getKey(item, Number(index)) : undefined;
                const newIndex = exemptKey ? newKeyToIndexMap[exemptKey] : index;
                if (newIndex === undefined) {
                    hasSelectionChanged = true;
                }
                else {
                    newExemptedIndicies[newIndex] = true;
                    newExemptedCount++;
                    hasSelectionChanged = hasSelectionChanged || newIndex !== index;
                }
            }
        }
        if (this._items && this._exemptedCount === 0 && items.length !== this._items.length && this._isAllSelected) {
            hasSelectionChanged = true;
        }
        this._exemptedIndices = newExemptedIndicies;
        this._exemptedCount = newExemptedCount;
        this._keyToIndexMap = newKeyToIndexMap;
        this._unselectableIndices = newUnselectableIndices;
        this._items = items;
        this._selectedItems = null;
        if (hasSelectionChanged) {
            this._updateCount();
            this._change();
        }
        this.setChangeEvents(true);
    }
    getItems() {
        return this._items;
    }
    getSelection() {
        if (!this._selectedItems) {
            this._selectedItems = [];
            const items = this._items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (this.isIndexSelected(i)) {
                        this._selectedItems.push(items[i]);
                    }
                }
            }
        }
        return this._selectedItems;
    }
    getSelectedCount() {
        return this._isAllSelected ? this._items.length - this._exemptedCount - this._unselectableCount : this._exemptedCount;
    }
    getSelectedIndices() {
        if (!this._selectedIndices) {
            this._selectedIndices = [];
            const items = this._items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (this.isIndexSelected(i)) {
                        this._selectedIndices.push(i);
                    }
                }
            }
        }
        return this._selectedIndices;
    }
    isRangeSelected(fromIndex, count) {
        if (count === 0) {
            return false;
        }
        const endIndex = fromIndex + count;
        for (let i = fromIndex; i < endIndex; i++) {
            if (!this.isIndexSelected(i)) {
                return false;
            }
        }
        return true;
    }
    isAllSelected() {
        let selectableCount = this._items.length - this._unselectableCount;
        if (this.mode === SelectionMode.single) {
            selectableCount = Math.min(selectableCount, 1);
        }
        return ((this.count > 0 && (this._isAllSelected && this._exemptedCount === 0)) ||
            (!this._isAllSelected && this._exemptedCount === selectableCount && selectableCount > 0));
    }
    isKeySelected(key) {
        const index = this._keyToIndexMap[key];
        return this.isIndexSelected(index);
    }
    isIndexSelected(index) {
        return !!((this.count > 0 && (this._isAllSelected && !this._exemptedIndices[index] && !this._unselectableIndices[index])) ||
            (!this._isAllSelected && this._exemptedIndices[index]));
    }
    setAllSelected(isAllSelected) {
        if (isAllSelected && this.mode !== SelectionMode.multiple) {
            return;
        }
        const selectableCount = this._items ? this._items.length - this._unselectableCount : 0;
        this.setChangeEvents(false);
        if (selectableCount > 0 && (this._exemptedCount > 0 || isAllSelected !== this._isAllSelected)) {
            this._exemptedIndices = {};
            if (isAllSelected !== this._isAllSelected || this._exemptedCount > 0) {
                this._exemptedCount = 0;
                this._isAllSelected = isAllSelected;
                this._change();
            }
            this._updateCount();
        }
        this.setChangeEvents(true);
    }
    setKeySelected(key, isSelected, shouldAnchor) {
        const index = this._keyToIndexMap[key];
        if (index >= 0) {
            this.setIndexSelected(index, isSelected, shouldAnchor);
        }
    }
    setIndexSelected(index, isSelected, shouldAnchor) {
        if (this.mode === SelectionMode.none) {
            return;
        }
        index = Math.min(Math.max(0, index), this._items.length - 1);
        if (index < 0 || index >= this._items.length) {
            return;
        }
        this.setChangeEvents(false);
        const isExempt = this._exemptedIndices[index];
        const canSelect = !this._unselectableIndices[index];
        if (canSelect) {
            if (isSelected && this.mode === SelectionMode.single) {
                this.setAllSelected(false);
            }
            if (isExempt && ((isSelected && this._isAllSelected) || (!isSelected && !this._isAllSelected))) {
                delete this._exemptedIndices[index];
                this._exemptedCount--;
            }
            if (!isExempt && ((isSelected && !this._isAllSelected) || (!isSelected && this._isAllSelected))) {
                this._exemptedIndices[index] = true;
                this._exemptedCount++;
            }
            if (shouldAnchor) {
                this._anchoredIndex = index;
            }
        }
        this._updateCount();
        this.setChangeEvents(true);
    }
    selectToKey(key, clearSelection) {
        this.selectToIndex(this._keyToIndexMap[key], clearSelection);
    }
    selectToIndex(index, clearSelection) {
        if (this.mode === SelectionMode.none) {
            return;
        }
        if (this.mode === SelectionMode.single) {
            this.setIndexSelected(index, true, true);
            return;
        }
        const anchorIndex = this._anchoredIndex || 0;
        let startIndex = Math.min(index, anchorIndex);
        const endIndex = Math.max(index, anchorIndex);
        this.setChangeEvents(false);
        if (clearSelection) {
            this.setAllSelected(false);
        }
        for (; startIndex <= endIndex; startIndex++) {
            this.setIndexSelected(startIndex, true, false);
        }
        this.setChangeEvents(true);
    }
    toggleAllSelected() {
        this.setAllSelected(!this.isAllSelected());
    }
    toggleKeySelected(key) {
        this.setKeySelected(key, !this.isKeySelected(key), true);
    }
    toggleIndexSelected(index) {
        this.setIndexSelected(index, !this.isIndexSelected(index), true);
    }
    toggleRangeSelected(fromIndex, count) {
        if (this.mode === SelectionMode.none) {
            return;
        }
        const isRangeSelected = this.isRangeSelected(fromIndex, count);
        const endIndex = fromIndex + count;
        if (this.mode === SelectionMode.single && count > 1) {
            return;
        }
        this.setChangeEvents(false);
        for (let i = fromIndex; i < endIndex; i++) {
            this.setIndexSelected(i, !isRangeSelected, false);
        }
        this.setChangeEvents(true);
    }
    _updateCount() {
        const count = this.getSelectedCount();
        if (count !== this.count) {
            this.count = count;
            this._change();
        }
        if (!this.count) {
            this.setModal(false);
        }
    }
    _change() {
        if (this._changeEventSuppressionCount === 0) {
            this._selectedItems = null;
            this._selectedIndices = undefined;
            EventGroup.raise(this, SELECTION_CHANGE);
            if (this._onSelectionChanged) {
                this._onSelectionChanged();
            }
        }
        else {
            this._hasChanged = true;
        }
    }
}
function defaultGetKey(item, index) {
    return item && item.key ? item.key : `${index}`;
}
