import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
const GlobalClassNames = {
    root: 'ms-ShimmerGap-root'
};
export function getStyles(props) {
    const { height, borderStyle, theme } = props;
    const { palette } = theme;
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);
    const borderStyles = !!borderStyle ? borderStyle : {};
    return {
        root: [
            globalClassNames.root,
            theme.fonts.medium,
            {
                backgroundColor: palette.white,
                height: `${height}px`,
                boxSizing: 'content-box',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
                borderColor: palette.white,
                selectors: {
                    [HighContrastSelector]: {
                        backgroundColor: 'Window',
                        borderColor: 'Window'
                    }
                }
            },
            borderStyles
        ]
    };
}
