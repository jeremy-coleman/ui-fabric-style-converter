import { memoizeFunction } from '../../Utilities';
import { mergeStyleSets } from '../../Styling';
export const getDividerClassNames = memoizeFunction((theme) => {
    return mergeStyleSets({
        wrapper: {
            display: 'inline-flex',
            height: '100%',
            alignItems: 'center'
        },
        divider: {
            width: 1,
            height: '100%',
            backgroundColor: theme.palette.neutralTertiaryAlt
        }
    });
});
