import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
const GlobalClassNames = {
    root: 'ms-ShimmerCircle-root',
    svg: 'ms-ShimmerCircle-svg'
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
                width: `${height}px`,
                height: `${height}px`,
                minWidth: `${height}px`,
                boxSizing: 'content-box',
                borderTopStyle: 'solid',
                borderBottomStyle: 'solid',
                borderColor: palette.white,
                selectors: {
                    [HighContrastSelector]: {
                        borderColor: 'Window'
                    }
                }
            },
            borderStyles
        ],
        svg: [
            globalClassNames.svg,
            {
                display: 'block',
                fill: palette.white,
                selectors: {
                    [HighContrastSelector]: {
                        fill: 'Window'
                    }
                }
            }
        ]
    };
}
