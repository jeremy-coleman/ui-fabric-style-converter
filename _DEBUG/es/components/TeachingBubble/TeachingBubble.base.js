import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef } from '../../Utilities';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
const getClassNames = classNamesFunction();
export class TeachingBubbleBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.rootElement = createRef();
        this.state = {};
        this._defaultCalloutProps = {
            beakWidth: 16,
            gapSpace: 0,
            setInitialFocus: true,
            doNotLayer: false,
            directionalHint: DirectionalHint.rightCenter
        };
    }
    focus() {
        if (this.rootElement.current) {
            this.rootElement.current.focus();
        }
    }
    render() {
        const { calloutProps: setCalloutProps, targetElement, onDismiss, isWide, styles, theme } = this.props;
        const calloutProps = { ...this._defaultCalloutProps, ...setCalloutProps };
        const stylesProps = {
            theme: theme,
            isWide,
            calloutClassName: calloutProps ? calloutProps.className : undefined
        };
        const classNames = getClassNames(styles, stylesProps);
        const calloutStyles = classNames.subComponentStyles
            ? classNames.subComponentStyles.callout
            : undefined;
        return (React.createElement(Callout, Object.assign({ target: targetElement, onDismiss: onDismiss }, calloutProps, { className: classNames.root, styles: calloutStyles, hideOverflow: true }),
            React.createElement("div", { ref: this.rootElement },
                React.createElement(TeachingBubbleContent, Object.assign({}, this.props)))));
    }
}
TeachingBubbleBase.defaultProps = {
    calloutProps: {
        beakWidth: 16,
        gapSpace: 0,
        setInitialFocus: true,
        doNotLayer: false,
        directionalHint: DirectionalHint.rightCenter
    }
};
