import * as React from 'react';
import { styled, classNamesFunction } from '../../Utilities';
import { getStyles } from './GroupSpacer.styles';
const getClassNames = classNamesFunction();
export const SPACER_WIDTH = 32;
export const GroupSpacer = styled((props) => {
    const { count, styles, theme, indentWidth = SPACER_WIDTH } = props;
    const classNames = getClassNames(styles, {
        theme: theme
    });
    return count > 0 ? React.createElement("span", { className: classNames.root, style: { width: count * indentWidth } }) : null;
}, getStyles, undefined, { scope: 'GroupSpacer' });
