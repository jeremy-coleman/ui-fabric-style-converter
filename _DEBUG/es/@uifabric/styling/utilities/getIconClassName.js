import { mergeStyles } from '@uifabric/merge-styles';
import { getIcon } from './icons';
const defaultIconStyles = {
    display: 'inline-block'
};
export function getIconClassName(name) {
    let className = '';
    const icon = getIcon(name);
    if (icon) {
        className = mergeStyles(icon.subset.className, defaultIconStyles, {
            selectors: {
                '::before': {
                    content: `"${icon.code}"`
                }
            }
        });
    }
    return className;
}
