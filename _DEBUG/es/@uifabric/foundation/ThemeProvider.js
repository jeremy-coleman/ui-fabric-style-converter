import * as React from 'react';
import { getThemedContext } from '@uifabric/styling';
import { Customizer } from '@uifabric/utilities';
export const ThemeProvider = (props) => {
    const { scheme, theme, ...rest } = props;
    const contextTransform = context => {
        return getThemedContext(context, scheme, theme);
    };
    return React.createElement(Customizer, Object.assign({}, rest, { contextTransform: contextTransform }));
};
