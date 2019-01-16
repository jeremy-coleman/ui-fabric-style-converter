export function createRef() {
    const refObject = ((element) => {
        refObject.current = element;
    });
    Object.defineProperty(refObject, 'value', {
        get() {
            return refObject.current;
        }
    });
    refObject.current = null;
    return refObject;
}
