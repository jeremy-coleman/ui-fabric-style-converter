import { concatStyleSets, getFocusStyle, HighContrastSelector } from '../../../Styling';
import { memoizeFunction } from '../../../Utilities';
import { getStyles as getBaseButtonStyles } from '../BaseButton.styles';
import { getStyles as getSplitButtonStyles } from '../SplitButton/SplitButton.styles';
export const getStyles = memoizeFunction((theme, customStyles, focusInset, focusColor) => {
    const baseButtonStyles = getBaseButtonStyles(theme);
    const baseSplitButtonStyles = getSplitButtonStyles(theme);
    const commandButtonHighContrastFocus = {
        left: 4,
        top: 4,
        bottom: 4,
        right: 4,
        border: 'none'
    };
    const commandButtonStyles = {
        root: [
            getFocusStyle(theme, -1, 'relative', commandButtonHighContrastFocus),
            theme.fonts.medium,
            {
                minWidth: '40px',
                backgroundColor: theme.palette.neutralLighter,
                color: theme.palette.neutralPrimary,
                padding: '0 4px',
                selectors: {
                    [HighContrastSelector]: {
                        border: 'none'
                    }
                }
            }
        ],
        rootHovered: {
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.neutralDark,
            selectors: {
                [HighContrastSelector]: {
                    color: 'Highlight'
                }
            }
        },
        rootPressed: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black
        },
        rootChecked: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black
        },
        rootExpanded: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black
        },
        rootCheckedHovered: {
            backgroundColor: theme.palette.neutralQuaternary,
            color: theme.palette.black
        },
        splitButtonContainer: {
            selectors: {
                [HighContrastSelector]: {
                    border: 'none'
                }
            }
        },
        splitButtonDivider: {
            backgroundColor: theme.palette.neutralTertiaryAlt,
            marginTop: 4,
            marginBottom: 4
        },
        splitButtonMenuButton: {
            backgroundColor: theme.palette.neutralLighter,
            color: theme.palette.neutralPrimary,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralLight,
                    color: theme.palette.neutralDark,
                    selectors: {
                        [HighContrastSelector]: {
                            color: 'Highlight'
                        }
                    }
                }
            }
        },
        splitButtonMenuButtonDisabled: {
            backgroundColor: theme.palette.neutralLighter,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralLighter
                }
            }
        },
        splitButtonMenuButtonChecked: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralQuaternaryAlt
                }
            }
        },
        splitButtonMenuButtonExpanded: {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black,
            selectors: {
                ':hover': {
                    backgroundColor: theme.palette.neutralQuaternaryAlt
                }
            }
        },
        splitButtonMenuIcon: {
            color: theme.palette.neutralPrimary
        },
        splitButtonMenuIconDisabled: {
            color: theme.palette.neutralTertiary
        },
        label: {
            fontWeight: 'normal'
        },
        icon: {
            color: theme.palette.themeDarkAlt
        },
        menuIcon: {
            color: theme.palette.neutralSecondary
        }
    };
    return concatStyleSets(baseButtonStyles, commandButtonStyles, baseSplitButtonStyles, customStyles);
});
