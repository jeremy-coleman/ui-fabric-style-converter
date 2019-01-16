import { getGlobalClassNames, getFocusStyle, FontSizes, AnimationVariables, FontWeights, IconFontSizes } from '../../Styling';
import { DEFAULT_ROW_HEIGHTS, DEFAULT_CELL_STYLE_PROPS } from '../DetailsList/DetailsRow.styles';
import { SPACER_WIDTH as EXPAND_BUTTON_WIDTH } from './GroupSpacer';
const GlobalClassNames = {
    root: 'ms-GroupHeader',
    compact: 'ms-GroupHeader--compact',
    check: 'ms-GroupHeader-check',
    dropIcon: 'ms-GroupHeader-dropIcon',
    expand: 'ms-GroupHeader-expand',
    isCollapsed: 'is-collapsed',
    title: 'ms-GroupHeader-title',
    isSelected: 'is-selected',
    iconTag: 'ms-Icon--Tag',
    group: 'ms-GroupedList-group',
    isDropping: 'is-dropping'
};
const beziers = {
    easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
};
export const getStyles = (props) => {
    const { theme, className, selected, isCollapsed, compact } = props;
    const { rowHeight, compactRowHeight } = DEFAULT_ROW_HEIGHTS;
    const { cellLeftPadding } = DEFAULT_CELL_STYLE_PROPS;
    const finalRowHeight = compact ? compactRowHeight : rowHeight;
    const { semanticColors, palette } = theme;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    const checkExpandResetStyles = [
        getFocusStyle(theme),
        {
            cursor: 'default',
            background: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0
        }
    ];
    return {
        root: [
            classNames.root,
            getFocusStyle(theme),
            theme.fonts.medium,
            {
                borderBottom: `1px solid ${semanticColors.listBackground}`,
                cursor: 'default',
                userSelect: 'none',
                selectors: {
                    ':hover': {
                        background: semanticColors.listItemBackgroundHovered
                    },
                    ':hover $check': {
                        opacity: 1
                    },
                    ':focus $check': {
                        opacity: 1
                    },
                    [`:global(.${classNames.group}.${classNames.isDropping})`]: {
                        selectors: {
                            '> $root $dropIcon': {
                                transition: `transform ${AnimationVariables.durationValue4} ${beziers.easeOutCirc} opacity ${AnimationVariables.durationValue1} ${beziers.easeOutSine}`,
                                transitionDelay: AnimationVariables.durationValue3,
                                opacity: 1,
                                transform: `rotate(0.2deg) scale(1);`
                            },
                            $check: {
                                opacity: 0
                            }
                        }
                    }
                }
            },
            selected && [
                classNames.isSelected,
                {
                    background: semanticColors.listItemBackgroundChecked,
                    selectors: {
                        ':hover': {
                            background: semanticColors.listItemBackgroundCheckedHovered
                        },
                        $check: {
                            opacity: 1
                        }
                    }
                }
            ],
            compact && [classNames.compact, { border: 'none' }],
            className
        ],
        groupHeaderContainer: [
            {
                display: 'flex',
                alignItems: 'center',
                height: finalRowHeight
            }
        ],
        headerCount: [
            {
                padding: '0px 4px'
            }
        ],
        check: [
            classNames.check,
            checkExpandResetStyles,
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 1,
                marginTop: -1,
                opacity: 0,
                width: '40px',
                height: finalRowHeight,
                selectors: {
                    ':focus': {
                        opacity: 1
                    }
                }
            }
        ],
        expand: [
            classNames.expand,
            checkExpandResetStyles,
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: compact ? FontSizes.mediumPlus : 18,
                width: EXPAND_BUTTON_WIDTH,
                height: finalRowHeight,
                color: selected ? palette.neutralPrimary : palette.neutralSecondary,
                selectors: {
                    ':hover': {
                        backgroundColor: selected ? palette.neutralQuaternary : palette.neutralLight
                    },
                    ':active': {
                        backgroundColor: selected ? palette.neutralTertiaryAlt : palette.neutralQuaternaryAlt
                    }
                }
            }
        ],
        expandIsCollapsed: [
            isCollapsed
                ? [
                    classNames.isCollapsed,
                    {
                        transform: 'rotate(0deg)',
                        transformOrigin: '50% 50%',
                        transition: 'transform .1s linear'
                    }
                ]
                : {
                    transform: 'rotate(90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'transform .1s linear'
                }
        ],
        title: [
            classNames.title,
            {
                paddingLeft: cellLeftPadding,
                fontSize: compact ? FontSizes.large : FontSizes.xLarge,
                fontWeight: FontWeights.semilight,
                cursor: 'pointer',
                outline: 0,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        ],
        dropIcon: [
            classNames.dropIcon,
            {
                position: 'absolute',
                left: -26,
                fontSize: IconFontSizes.large,
                color: palette.neutralSecondary,
                transition: `transform ${AnimationVariables.durationValue2} ${beziers.easeInBack}, opacity ${AnimationVariables.durationValue4} ${beziers.easeOutSine}`,
                opacity: 0,
                transform: 'rotate(0.2deg) scale(0.65)',
                transformOrigin: '10px 10px',
                selectors: {
                    [`:global(.${classNames.iconTag})`]: {
                        position: 'absolute'
                    }
                }
            }
        ]
    };
};