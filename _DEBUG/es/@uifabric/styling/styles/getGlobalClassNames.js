import { Stylesheet } from '@uifabric/merge-styles';
import { memoizeFunction } from '@uifabric/utilities';
const _getGlobalClassNames = memoizeFunction((classNames, disableGlobalClassNames) => {
    const styleSheet = Stylesheet.getInstance();
    if (disableGlobalClassNames) {
        return Object.keys(classNames).reduce((acc, className) => {
            acc[className] = styleSheet.getClassName(classNames[className]);
            return acc;
        }, {});
    }
    return classNames;
});
export function getGlobalClassNames(classNames, theme, disableGlobalClassNames) {
    return _getGlobalClassNames(classNames, disableGlobalClassNames !== undefined ? disableGlobalClassNames : theme.disableGlobalClassNames);
}
