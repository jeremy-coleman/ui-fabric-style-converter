import { memoizeFunction } from '../../../Utilities';
import { mergeStyleSets } from '../../../Styling';
export function highContrastActive(styles) {
    return {
        '@media screen and (-ms-high-contrast: active)': styles
    };
}
export function focusClear() {
    return {
        '&::-moz-focus-inner': {
            border: 0
        },
        '&': {
            outline: 'transparent'
        }
    };
}
export const getClassNames = memoizeFunction(() => {
    return mergeStyleSets({
        root: {
            position: 'absolute',
            boxSizing: 'border-box',
            border: '1px solid ${}',
            selectors: {
                ...highContrastActive({
                    border: '1px solid WindowText'
                }),
                ...focusClear()
            }
        },
        container: {
            position: 'relative'
        },
        main: {
            backgroundColor: '#ffffff',
            overflowX: 'hidden',
            overflowY: 'hidden',
            position: 'relative'
        },
        overFlowYHidden: {
            overflowY: 'hidden'
        }
    });
});
