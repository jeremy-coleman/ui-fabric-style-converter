import * as React from 'react';
import { Callout } from './Callout';
import { FocusTrapZone } from '../../FocusTrapZone';
export const FocusTrapCallout = (props) => {
    return (React.createElement(Callout, Object.assign({}, props),
        React.createElement(FocusTrapZone, Object.assign({}, props.focusTrapProps), props.children)));
};
