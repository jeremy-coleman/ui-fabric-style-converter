import { mergeStyles } from '../MergeStyles';
export function buildClassMap(styles) {
    let classes = {};
    for (let styleName in styles) {
        if (styles.hasOwnProperty(styleName)) {
            let className;
            Object.defineProperty(classes, styleName, {
                get: () => {
                    if (className === undefined) {
                        className = mergeStyles(styles[styleName]).toString();
                    }
                    return className;
                },
                enumerable: true,
                configurable: true
            });
        }
    }
    return classes;
}
