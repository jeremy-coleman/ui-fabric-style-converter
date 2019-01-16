export function getIsChecked(item) {
    if (item.canCheck) {
        return !!(item.isChecked || item.checked);
    }
    if (typeof item.isChecked === 'boolean') {
        return item.isChecked;
    }
    if (typeof item.checked === 'boolean') {
        return item.checked;
    }
    return null;
}
export function hasSubmenu(item) {
    return !!(item.subMenuProps || item.items);
}
export function isItemDisabled(item) {
    return !!(item.isDisabled || item.disabled);
}
