import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { TooltipDelay } from './Tooltip.types';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
const getClassNames = classNamesFunction();
export class TooltipBase extends BaseComponent {
    constructor() {
        super(...arguments);
        this._onRenderContent = (props) => {
            return React.createElement("p", { className: this._classNames.subText }, props.content);
        };
    }
    render() {
        const { className, calloutProps, delay, directionalHint, directionalHintForRTL, styles, id, maxWidth, onRenderContent = this._onRenderContent, targetElement, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className: className || (calloutProps && calloutProps.className),
            delay: delay,
            maxWidth: maxWidth
        });
        return (React.createElement(Callout, Object.assign({ target: targetElement, directionalHint: directionalHint, directionalHintForRTL: directionalHintForRTL }, calloutProps, getNativeProps(this.props, divProperties, ['id']), { className: this._classNames.root }),
            React.createElement("div", { className: this._classNames.content, id: id, role: "tooltip", onMouseEnter: this.props.onMouseEnter, onMouseLeave: this.props.onMouseLeave }, onRenderContent(this.props, this._onRenderContent))));
    }
}
TooltipBase.defaultProps = {
    directionalHint: DirectionalHint.topCenter,
    delay: TooltipDelay.medium,
    maxWidth: '364px',
    calloutProps: {
        isBeakVisible: true,
        beakWidth: 16,
        gapSpace: 0,
        setInitialFocus: true,
        doNotLayer: false
    }
};
