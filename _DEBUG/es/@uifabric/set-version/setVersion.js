const packagesCache = {};
export function setVersion(packageName, packageVersion) {
    if (typeof window !== 'undefined') {
        const packages = (window.__packages__ = window.__packages__ || {});
        if (!packages[packageName] || !packagesCache[packageName]) {
            packagesCache[packageName] = packageVersion;
            const versions = (packages[packageName] = packages[packageName] || []);
            versions.push(packageVersion);
        }
    }
}
