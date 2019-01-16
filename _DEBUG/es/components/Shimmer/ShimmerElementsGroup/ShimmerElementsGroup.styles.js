import { getGlobalClassNames } from '../../../Styling';
const GlobalClassNames = {
    root: 'ms-ShimmerElementsGroup-root'
};
export function getStyles(props) {
    const { flexWrap, theme } = props;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            {
                display: 'flex',
                alignItems: 'center',
                flexWrap: flexWrap ? 'wrap' : 'nowrap'
            }
        ]
    };
}
