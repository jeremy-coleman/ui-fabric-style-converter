import { IsFocusVisibleClassName } from '../../Utilities';
export const getStyles = (props) => {
    const { theme, disabled, selected, circle, isWhite, height, width, borderWidth } = props;
    const { semanticColors } = theme;
    return {
        colorCell: [
            {
                backgroundColor: semanticColors.bodyBackground,
                padding: 0,
                position: 'relative',
                boxSizing: 'border-box',
                display: 'inline-block',
                cursor: 'pointer',
                userSelect: 'none',
                height: height,
                width: width,
                selectors: {
                    [`.${IsFocusVisibleClassName} &:focus::after`]: { display: 'none' },
                    [`.${IsFocusVisibleClassName} &:focus`]: { outline: `1px solid ${semanticColors.focusBorder}` }
                }
            },
            circle && {
                borderRadius: '100%'
            },
            selected && {
                padding: borderWidth,
                border: `${borderWidth}px solid ${theme.palette.neutralTertiaryAlt}`
            },
            !selected && {
                selectors: {
                    ['&:hover, &:active, &:focus']: {
                        backgroundColor: semanticColors.bodyBackground,
                        padding: borderWidth,
                        border: `${borderWidth}px solid ${theme.palette.neutralLight}`
                    }
                }
            },
            disabled && {
                color: semanticColors.disabledBodyText,
                pointerEvents: 'none',
                opacity: 0.3
            },
            isWhite &&
                !selected && {
                backgroundColor: semanticColors.bodyDivider,
                padding: 1
            }
        ],
        svg: [
            {
                width: '100%',
                height: '100%'
            },
            circle && {
                borderRadius: '100%'
            }
        ]
    };
};
