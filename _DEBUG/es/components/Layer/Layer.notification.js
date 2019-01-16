const _layersByHostId = {};
let _defaultHostSelector;
export function registerLayer(hostId, layer) {
    if (!_layersByHostId[hostId]) {
        _layersByHostId[hostId] = [];
    }
    _layersByHostId[hostId].push(layer);
}
export function unregisterLayer(hostId, layer) {
    if (_layersByHostId[hostId]) {
        const idx = _layersByHostId[hostId].indexOf(layer);
        if (idx >= 0) {
            _layersByHostId[hostId].splice(idx, 1);
            if (_layersByHostId[hostId].length === 0) {
                delete _layersByHostId[hostId];
            }
        }
    }
}
export function notifyHostChanged(id) {
    if (_layersByHostId[id]) {
        _layersByHostId[id].forEach(layer => layer.forceUpdate());
    }
}
export function setDefaultTarget(selector) {
    _defaultHostSelector = selector;
}
export function getDefaultTarget() {
    return _defaultHostSelector;
}
