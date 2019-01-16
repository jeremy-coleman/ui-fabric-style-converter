import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps, getId, assign, hasOverflow, createRef, portalContainsElement, classNamesFunction } from '../../Utilities';
import { TooltipOverflowMode } from './TooltipHost.types';
import { Tooltip } from './Tooltip';
import { TooltipDelay } from './Tooltip.types';
const getClassNames = classNamesFunction();
export class TooltipHostBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._tooltipHost = createRef();
        this._closingTimer = -1;
        this.show = () => {
            this._toggleTooltip(true);
        };
        this.dismiss = () => {
            this._hideTooltip();
        };
        this._onTooltipMouseEnter = (ev) => {
            const { overflowMode } = this.props;
            if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip !== this) {
                TooltipHostBase._currentVisibleTooltip.dismiss();
            }
            TooltipHostBase._currentVisibleTooltip = this;
            if (overflowMode !== undefined) {
                const overflowElement = this._getTargetElement();
                if (overflowElement && !hasOverflow(overflowElement)) {
                    return;
                }
            }
            if (ev.target && portalContainsElement(ev.target, this._getTargetElement())) {
                return;
            }
            this._toggleTooltip(true);
            this._clearDismissTimer();
        };
        this._onTooltipMouseLeave = (ev) => {
            if (this.props.closeDelay) {
                this._clearDismissTimer();
                this._closingTimer = this._async.setTimeout(() => {
                    this._toggleTooltip(false);
                }, this.props.closeDelay);
            }
            else {
                this._toggleTooltip(false);
            }
            if (TooltipHostBase._currentVisibleTooltip === this) {
                TooltipHostBase._currentVisibleTooltip = undefined;
            }
        };
        this._clearDismissTimer = () => {
            this._async.clearTimeout(this._closingTimer);
        };
        this._hideTooltip = () => {
            this._toggleTooltip(false);
        };
        this.state = {
            isTooltipVisible: false
        };
    }
    render() {
        const { calloutProps, children, content, delay, directionalHint, directionalHintForRTL, hostClassName: className, id, setAriaDescribedBy = true, tooltipProps, styles, theme } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        const { isTooltipVisible } = this.state;
        const tooltipId = id || getId('tooltip');
        const isContentPresent = !!(content || (tooltipProps && tooltipProps.onRenderContent && tooltipProps.onRenderContent()));
        const showTooltip = isTooltipVisible && isContentPresent;
        const ariaDescribedBy = setAriaDescribedBy && isTooltipVisible && isContentPresent ? tooltipId : undefined;
        return (React.createElement("div", Object.assign({ className: this._classNames.root, ref: this._tooltipHost }, { onFocusCapture: this._onTooltipMouseEnter }, { onBlurCapture: this._hideTooltip }, { onMouseEnter: this._onTooltipMouseEnter, onMouseLeave: this._onTooltipMouseLeave, "aria-describedby": ariaDescribedBy }),
            children,
            showTooltip && (React.createElement(Tooltip, Object.assign({ id: tooltipId, delay: delay, content: content, targetElement: this._getTargetElement(), directionalHint: directionalHint, directionalHintForRTL: directionalHintForRTL, calloutProps: assign({}, calloutProps, {
                    onMouseEnter: this._onTooltipMouseEnter,
                    onMouseLeave: this._onTooltipMouseLeave
                }), onMouseEnter: this._onTooltipMouseEnter, onMouseLeave: this._onTooltipMouseLeave }, getNativeProps(this.props, divProperties), tooltipProps)))));
    }
    componentWillUnmount() {
        if (TooltipHostBase._currentVisibleTooltip && TooltipHostBase._currentVisibleTooltip === this) {
            TooltipHostBase._currentVisibleTooltip = undefined;
        }
    }
    _getTargetElement() {
        if (!this._tooltipHost.current) {
            return undefined;
        }
        const { overflowMode } = this.props;
        if (overflowMode !== undefined) {
            switch (overflowMode) {
                case TooltipOverflowMode.Parent:
                    return this._tooltipHost.current.parentElement;
                case TooltipOverflowMode.Self:
                    return this._tooltipHost.current;
            }
        }
        return this._tooltipHost.current;
    }
    _toggleTooltip(isTooltipVisible) {
        if (this.state.isTooltipVisible !== isTooltipVisible) {
            this.setState({ isTooltipVisible }, () => this.props.onTooltipToggle && this.props.onTooltipToggle(this.state.isTooltipVisible));
        }
    }
}
TooltipHostBase.defaultProps = {
    delay: TooltipDelay.medium
};
