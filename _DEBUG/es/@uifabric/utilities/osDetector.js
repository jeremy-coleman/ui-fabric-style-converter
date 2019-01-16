let isMacResult;
export function isMac(reset) {
    if (typeof isMacResult === 'undefined' || reset) {
        const userAgent = typeof window !== 'undefined' && window.navigator.userAgent;
        isMacResult = !!userAgent && userAgent.indexOf('Macintosh') !== -1;
    }
    return !!isMacResult;
}
