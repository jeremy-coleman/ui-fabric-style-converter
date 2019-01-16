export function getItem(key) {
    let result = null;
    try {
        result = window.sessionStorage.getItem(key);
    }
    catch (e) {
    }
    return result;
}
export function setItem(key, data) {
    try {
        window.sessionStorage.setItem(key, data);
    }
    catch (e) {
    }
}
