import { mergeStyleSets } from '@uifabric/merge-styles';
export function classNamesFunction() {
    const getClassNames = (styleFunctionOrObject, styleProps = {}) => {
        if (styleFunctionOrObject === undefined) {
            return {};
        }
        const styleSet = styleFunctionOrObject && (typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject);
        return mergeStyleSets(styleSet);
    };
    return getClassNames;
}
