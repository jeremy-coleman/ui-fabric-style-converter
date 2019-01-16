import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';
import { getMenuItemStyles } from './ContextualMenu.cnstyles';
import { mergeStyleSets, getGlobalClassNames, getScreenSelector, ScreenWidthMaxMedium } from '../../Styling';
import { memoizeFunction, IsFocusVisibleClassName } from '../../Utilities';
const MediumScreenSelector = getScreenSelector(0, ScreenWidthMaxMedium);
export const getSplitButtonVerticalDividerClassNames = memoizeFunction((theme) => {
    return mergeStyleSets(getDividerClassNames(theme), {
        wrapper: {
            position: 'absolute',
            right: 28,
            selectors: {
                [MediumScreenSelector]: {
                    right: 32
                }
            }
        },
        divider: {
            height: 16,
            width: 1
        }
    });
});
const GlobalClassNames = {
    item: 'ms-ContextualMenu-item',
    divider: 'ms-ContextualMenu-divider',
    root: 'ms-ContextualMenu-link',
    isChecked: 'is-checked',
    isExpanded: 'is-expanded',
    isDisabled: 'is-disabled',
    linkContent: 'ms-ContextualMenu-linkContent',
    linkContentMenu: 'ms-ContextualMenu-linkContent',
    icon: 'ms-ContextualMenu-icon',
    iconColor: 'ms-ContextualMenu-iconColor',
    checkmarkIcon: 'ms-ContextualMenu-checkmarkIcon',
    subMenuIcon: 'ms-ContextualMenu-submenuIcon',
    label: 'ms-ContextualMenu-itemText',
    secondaryText: 'ms-ContextualMenu-secondaryText'
};
export const getItemClassNames = memoizeFunction((theme, disabled, expanded, checked, isAnchorLink, knownIcon, itemClassName, dividerClassName, iconClassName, subMenuClassName, primaryDisabled, className) => {
    const styles = getMenuItemStyles(theme);
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    return mergeStyleSets({
        item: [classNames.item, styles.item, itemClassName],
        divider: [classNames.divider, styles.divider, dividerClassName],
        root: [
            classNames.root,
            styles.root,
            checked && [classNames.isChecked, styles.rootChecked],
            isAnchorLink && styles.anchorLink,
            expanded && [classNames.isExpanded, styles.rootExpanded],
            disabled && [classNames.isDisabled, styles.rootDisabled],
            !disabled &&
                !expanded && [
                {
                    selectors: {
                        ':hover': styles.rootHovered,
                        ':active': styles.rootPressed,
                        [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: styles.rootFocused,
                        [`.${IsFocusVisibleClassName} &:hover`]: { background: 'inherit;' }
                    }
                }
            ],
            className
        ],
        splitPrimary: [
            styles.root,
            checked && ['is-checked', styles.rootChecked],
            (disabled || primaryDisabled) && ['is-disabled', styles.rootDisabled],
            !(disabled || primaryDisabled) &&
                !checked && [
                {
                    selectors: {
                        ':hover': styles.rootHovered,
                        ':hover ~ $splitMenu': styles.rootHovered,
                        ':active': styles.rootPressed,
                        [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: styles.rootFocused,
                        [`.${IsFocusVisibleClassName} &:hover`]: { background: 'inherit;' }
                    }
                }
            ]
        ],
        splitMenu: [
            styles.root,
            {
                flexBasis: '0',
                padding: '0 8px'
            },
            expanded && ['is-expanded', styles.rootExpanded],
            disabled && ['is-disabled', styles.rootDisabled],
            !disabled &&
                !expanded && [
                {
                    selectors: {
                        ':hover': styles.rootHovered,
                        ':active': styles.rootPressed,
                        [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: styles.rootFocused,
                        [`.${IsFocusVisibleClassName} &:hover`]: { background: 'inherit;' }
                    }
                }
            ]
        ],
        anchorLink: styles.anchorLink,
        linkContent: [classNames.linkContent, styles.linkContent],
        linkContentMenu: [
            classNames.linkContentMenu,
            styles.linkContent,
            {
                justifyContent: 'center'
            }
        ],
        icon: [
            classNames.icon,
            knownIcon && styles.iconColor,
            styles.icon,
            iconClassName,
            disabled && [classNames.isDisabled, styles.iconDisabled]
        ],
        iconColor: styles.iconColor,
        checkmarkIcon: [classNames.checkmarkIcon, knownIcon && styles.checkmarkIcon, styles.icon, iconClassName],
        subMenuIcon: [classNames.subMenuIcon, styles.subMenuIcon, subMenuClassName],
        label: [classNames.label, styles.label],
        secondaryText: [classNames.secondaryText, styles.secondaryText],
        splitContainer: [
            styles.splitButtonFlexContainer,
            !disabled &&
                !checked && [
                {
                    selectors: {
                        [`.${IsFocusVisibleClassName} &:focus, .${IsFocusVisibleClassName} &:focus:hover`]: styles.rootFocused
                    }
                }
            ]
        ]
    });
});
export const getItemStyles = (props) => {
    const { theme, disabled, expanded, checked, isAnchorLink, knownIcon, itemClassName, dividerClassName, iconClassName, subMenuClassName, primaryDisabled, className } = props;
    return getItemClassNames(theme, disabled, expanded, checked, isAnchorLink, knownIcon, itemClassName, dividerClassName, iconClassName, subMenuClassName, primaryDisabled, className);
};
