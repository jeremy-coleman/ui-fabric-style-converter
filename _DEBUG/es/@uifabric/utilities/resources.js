let _baseUrl = '';
export function getResourceUrl(url) {
    return _baseUrl + url;
}
export function setBaseUrl(baseUrl) {
    _baseUrl = baseUrl;
}
