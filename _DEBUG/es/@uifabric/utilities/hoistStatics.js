export function hoistStatics(source, dest) {
    for (const name in source) {
        if (source.hasOwnProperty(name)) {
            dest[name] = source[name];
        }
    }
    return dest;
}
