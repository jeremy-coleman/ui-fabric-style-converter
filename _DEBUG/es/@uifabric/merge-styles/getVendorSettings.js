let _vendorSettings;
export function getVendorSettings() {
    if (!_vendorSettings) {
        const doc = typeof document !== 'undefined' ? document : undefined;
        const nav = typeof navigator !== 'undefined' ? navigator : undefined;
        const userAgent = nav ? nav.userAgent.toLowerCase() : undefined;
        if (!doc) {
            _vendorSettings = {
                isWebkit: true,
                isMoz: true,
                isOpera: true,
                isMs: true
            };
        }
        else {
            _vendorSettings = {
                isWebkit: !!(doc && 'WebkitAppearance' in doc.documentElement.style),
                isMoz: !!(userAgent && userAgent.indexOf('firefox') > -1),
                isOpera: !!(userAgent && userAgent.indexOf('opera') > -1),
                isMs: !!(nav && (/rv:11.0/i.test(nav.userAgent) || /Edge\/\d./i.test(navigator.userAgent)))
            };
        }
    }
    return _vendorSettings;
}
export function setVendorSettings(vendorSettings) {
    _vendorSettings = vendorSettings;
}
