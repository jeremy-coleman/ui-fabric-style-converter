import * as React from 'react';
import { css, styled } from '../../Utilities';
import { Check } from '../../Check';
import { getStyles as getCheckStyles } from '../Check/Check.styles';
import { getStyles } from './DetailsRowCheck.styles';
import { classNamesFunction } from '../../Utilities';
const getCheckClassNames = classNamesFunction();
const getClassNames = classNamesFunction();
const DetailsRowCheckBase = (props) => {
    const { isVisible = false, canSelect = false, isSelected = false, anySelected = false, selected = false, isHeader = false, className, checkClassName, styles, theme, compact, ...buttonProps } = props;
    const isPressed = props.isSelected || props.selected;
    const checkStyles = getCheckStyles({ theme: theme });
    const checkClassNames = getCheckClassNames(checkStyles, {
        theme: theme
    });
    const classNames = getClassNames(styles, {
        theme: theme,
        canSelect,
        selected: isPressed,
        anySelected,
        className,
        isHeader,
        isVisible,
        compact
    });
    return (React.createElement("div", Object.assign({}, buttonProps, { role: "checkbox", className: css(classNames.root, classNames.check, checkClassNames.checkHost), "aria-checked": isPressed, "data-selection-toggle": true, "data-automationid": "DetailsRowCheck" }),
        React.createElement(Check, { checked: isPressed })));
};
export const DetailsRowCheck = styled(DetailsRowCheckBase, getStyles, undefined, { scope: 'DetailsRowCheck' });
