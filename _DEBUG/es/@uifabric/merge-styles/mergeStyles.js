import { styleToClassName } from './styleToClassName';
import { extractStyleParts } from './extractStyleParts';
export function mergeStyles(...args) {
    const { classes, objects } = extractStyleParts(args);
    if (objects.length) {
        classes.push(styleToClassName(objects));
    }
    return classes.join(' ');
}
