import * as React from 'react';
import { divProperties, getNativeProps } from '../../../Utilities';
import { Callout } from '../../../Callout';
import { DirectionalHint } from '../../../common/DirectionalHint';
import { FocusTrapCallout } from '../../../Callout';
export const CardCallout = (props) => {
    const { gapSpace = 0, directionalHint = DirectionalHint.bottomLeftEdge, directionalHintFixed, targetElement, firstFocus, trapFocus, onLeave, className, finalHeight, content } = props;
    const calloutProps = {
        ...getNativeProps(props, divProperties),
        className: className,
        target: targetElement,
        isBeakVisible: false,
        directionalHint: directionalHint,
        directionalHintFixed: directionalHintFixed,
        finalHeight: finalHeight,
        minPagePadding: 24,
        onDismiss: onLeave,
        gapSpace: gapSpace
    };
    return (React.createElement(React.Fragment, null, trapFocus ? (React.createElement(FocusTrapCallout, Object.assign({}, calloutProps, { focusTrapProps: {
            forceFocusInsideTrap: false,
            isClickableOutsideFocusTrap: true,
            disableFirstFocus: !firstFocus
        } }), content)) : (React.createElement(Callout, Object.assign({}, calloutProps), content))));
};
