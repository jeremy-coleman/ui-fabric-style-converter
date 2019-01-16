export function getItem(key) {
    let result = null;
    try {
        result = window.localStorage.getItem(key);
    }
    catch (e) {
    }
    return result;
}
export function setItem(key, data) {
    try {
        window.localStorage.setItem(key, data);
    }
    catch (e) {
    }
}
