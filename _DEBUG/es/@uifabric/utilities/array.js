export function findIndex(array, cb) {
    let index = -1;
    for (let i = 0; array && i < array.length; i++) {
        if (cb(array[i], i)) {
            index = i;
            break;
        }
    }
    return index;
}
export function find(array, cb) {
    let index = findIndex(array, cb);
    if (index < 0) {
        return undefined;
    }
    return array[index];
}
export function createArray(size, getItem) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(getItem(i));
    }
    return array;
}
export function toMatrix(items, columnCount) {
    return items.reduce((rows, currentValue, index) => {
        if (index % columnCount === 0) {
            rows.push([currentValue]);
        }
        else {
            rows[rows.length - 1].push(currentValue);
        }
        return rows;
    }, []);
}
export function removeIndex(array, index) {
    return array.filter((_, i) => index !== i);
}
export function replaceElement(array, newElement, index) {
    const copy = array.slice();
    copy[index] = newElement;
    return copy;
}
export function addElementAtIndex(array, index, itemToAdd) {
    const copy = array.slice();
    copy.splice(index, 0, itemToAdd);
    return copy;
}
export function flatten(array) {
    let result = [];
    array.forEach((item) => (result = result.concat(item)));
    return result;
}
export function arraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
