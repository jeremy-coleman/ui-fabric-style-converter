import * as React from 'react';
import { getDividerClassNames } from './VerticalDivider.classNames';
import { getTheme } from '../../Styling';
export const VerticalDivider = (props) => {
    const theme = getTheme();
    const classNames = props.getClassNames ? props.getClassNames(theme) : getDividerClassNames(theme);
    return (React.createElement("span", { className: classNames.wrapper },
        React.createElement("span", { className: classNames.divider })));
};
