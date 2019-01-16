import { DropdownMenuItemType } from '../Dropdown.types';
export class DropdownSizePosCache {
    constructor() {
        this._size = 0;
    }
    updateOptions(options) {
        const displayOnlyOptionsCache = [];
        let size = 0;
        for (let i = 0; i < options.length; i++) {
            if (options[i].itemType === DropdownMenuItemType.Divider || options[i].itemType === DropdownMenuItemType.Header) {
                displayOnlyOptionsCache.push(i);
            }
            else {
                size++;
            }
        }
        this._size = size;
        this._displayOnlyOptionsCache = displayOnlyOptionsCache;
    }
    get optionSetSize() {
        return this._size;
    }
    positionInSet(index) {
        if (index === undefined) {
            return undefined;
        }
        let offset = 0;
        while (index > this._displayOnlyOptionsCache[offset]) {
            offset++;
        }
        if (this._displayOnlyOptionsCache[offset] === index) {
            throw new Error(`Unexpected: Option at index ${index} is not a selectable element.`);
        }
        return index - offset + 1;
    }
}
