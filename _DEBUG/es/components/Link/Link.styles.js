import { getGlobalClassNames, HighContrastSelector, HighContrastSelectorWhite, HighContrastSelectorBlack } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';
const GlobalClassNames = {
    root: 'ms-Link'
};
export const getStyles = (props) => {
    const { className, isButton, isDisabled, theme } = props;
    const { semanticColors } = theme;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return {
        root: [
            classNames.root,
            theme.fonts.medium,
            {
                color: semanticColors.link,
                outline: 'none',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                selectors: {
                    [`.${IsFocusVisibleClassName} &:focus`]: {
                        outline: `1px solid ${theme.palette.neutralSecondary}`
                    }
                }
            },
            isButton && {
                background: 'none',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline',
                margin: 0,
                overflow: 'inherit',
                padding: 0,
                textAlign: 'left',
                textOverflow: 'inherit',
                userSelect: 'text',
                borderBottom: '1px solid transparent',
                selectors: {
                    [HighContrastSelectorBlack]: {
                        color: '#FFFF00'
                    },
                    [HighContrastSelectorWhite]: {
                        color: '#00009F'
                    },
                    '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
                        borderBottom: 'none'
                    }
                }
            },
            !isButton && {
                textDecoration: 'none'
            },
            isDisabled && [
                'is-disabled',
                {
                    color: semanticColors.disabledText,
                    cursor: 'default'
                },
                {
                    selectors: {
                        '&:link, &:visited': {
                            pointerEvents: 'none'
                        }
                    }
                }
            ],
            !isDisabled && {
                selectors: {
                    '&:active, &:hover, &:active:hover': {
                        color: semanticColors.linkHovered,
                        selectors: {
                            [HighContrastSelector]: {
                                textDecoration: 'underline'
                            }
                        }
                    },
                    '&:focus': {
                        color: semanticColors.link
                    }
                }
            },
            classNames.root,
            className
        ]
    };
};
