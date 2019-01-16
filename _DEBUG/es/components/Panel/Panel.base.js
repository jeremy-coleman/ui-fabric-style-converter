import * as React from 'react';
import { IconButton } from '../../Button';
import { Layer } from '../../Layer';
import { Overlay } from '../../Overlay';
import { Popup } from '../../Popup';
import { getTheme, IconFontSizes } from '../../Styling';
import { allowScrollOnElement, BaseComponent, classNamesFunction, divProperties, elementContains, getId, getNativeProps, getRTL } from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { PanelType } from './Panel.types';
const getClassNames = classNamesFunction();
export class PanelBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._panel = React.createRef();
        this.dismiss = (ev) => {
            if (this.state.isOpen) {
                if (this.props.onDismiss) {
                    this.props.onDismiss(ev);
                }
                if (!ev || (ev && !ev.defaultPrevented)) {
                    this.setState({
                        isOpen: false,
                        isAnimating: true
                    }, () => {
                        this._async.setTimeout(this._onTransitionComplete, 200);
                    });
                }
            }
        };
        this._allowScrollOnPanel = (elt) => {
            if (elt) {
                allowScrollOnElement(elt, this._events);
            }
            else {
                this._events.off(this._scrollableContent);
            }
            this._scrollableContent = elt;
        };
        this._onRenderNavigation = (props) => {
            const { closeButtonAriaLabel, hasCloseButton } = props;
            const theme = getTheme();
            if (hasCloseButton) {
                return (React.createElement("div", { className: this._classNames.navigation },
                    React.createElement(IconButton, { styles: {
                            root: {
                                height: 'auto',
                                width: '44px',
                                color: theme.palette.neutralSecondary,
                                fontSize: IconFontSizes.large
                            },
                            rootHovered: {
                                color: theme.palette.neutralPrimary
                            }
                        }, className: this._classNames.closeButton, onClick: this._onPanelClick, ariaLabel: closeButtonAriaLabel, "data-is-visible": true, iconProps: { iconName: 'Cancel' } })));
            }
            return null;
        };
        this._onRenderHeader = (props, defaultRender, headerTextId) => {
            const { headerText } = props;
            if (headerText) {
                return (React.createElement("div", { className: this._classNames.header },
                    React.createElement("p", { className: this._classNames.headerText, id: headerTextId, role: "heading", "aria-level": 2 }, headerText)));
            }
            return null;
        };
        this._onRenderBody = (props) => {
            return React.createElement("div", { className: this._classNames.content }, props.children);
        };
        this._onRenderFooter = (props) => {
            const { onRenderFooterContent = null } = this.props;
            if (onRenderFooterContent) {
                return (React.createElement("div", { className: this._classNames.footer },
                    React.createElement("div", { className: this._classNames.footerInner }, onRenderFooterContent())));
            }
            return null;
        };
        this._onPanelClick = (ev) => {
            this.dismiss(ev);
        };
        this._onTransitionComplete = () => {
            this._updateFooterPosition();
            this.setState({
                isAnimating: false
            });
            if (!this.state.isOpen && this.props.onDismissed) {
                this.props.onDismissed();
            }
        };
        this._warnDeprecations({
            ignoreExternalFocusing: 'focusTrapZoneProps',
            forceFocusInsideTrap: 'focusTrapZoneProps',
            firstFocusableSelector: 'focusTrapZoneProps'
        });
        this.state = {
            isFooterSticky: false,
            isOpen: false,
            isAnimating: false,
            id: getId('Panel')
        };
    }
    componentDidMount() {
        this._events.on(window, 'resize', this._updateFooterPosition);
        if (this._shouldListenForOuterClick(this.props)) {
            this._events.on(document.body, 'mousedown', this._dismissOnOuterClick, true);
        }
        if (this.props.isOpen) {
            this.open();
        }
    }
    componentDidUpdate(previousProps) {
        const shouldListenOnOuterClick = this._shouldListenForOuterClick(this.props);
        const previousShouldListenOnOuterClick = this._shouldListenForOuterClick(previousProps);
        if (shouldListenOnOuterClick && !previousShouldListenOnOuterClick) {
            this._events.on(document.body, 'mousedown', this._dismissOnOuterClick, true);
        }
        else if (!shouldListenOnOuterClick && previousShouldListenOnOuterClick) {
            this._events.off(document.body, 'mousedown', this._dismissOnOuterClick, true);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.isOpen !== this.state.isOpen) {
            if (newProps.isOpen) {
                this.open();
            }
            else {
                this.dismiss();
            }
        }
    }
    render() {
        const { className = '', elementToFocusOnDismiss, firstFocusableSelector, focusTrapZoneProps, forceFocusInsideTrap, hasCloseButton, headerText, headerClassName = '', ignoreExternalFocusing, isBlocking, isFooterAtBottom, isLightDismiss, isHiddenOnDismiss, layerProps, type, styles, theme, customWidth, onLightDismissClick = this._onPanelClick, onRenderNavigation = this._onRenderNavigation, onRenderHeader = this._onRenderHeader, onRenderBody = this._onRenderBody, onRenderFooter = this._onRenderFooter } = this.props;
        const { isFooterSticky, isOpen, isAnimating, id } = this.state;
        const isLeft = type === PanelType.smallFixedNear ? true : false;
        const isRTL = getRTL();
        const isOnRightSide = isRTL ? isLeft : !isLeft;
        const headerTextId = headerText && id + '-headerText';
        const customWidthStyles = type === PanelType.custom ? { width: customWidth } : {};
        const nativeProps = getNativeProps(this.props, divProperties);
        if (!isOpen && !isAnimating && !isHiddenOnDismiss) {
            return null;
        }
        this._classNames = getClassNames(styles, {
            theme: theme,
            className,
            focusTrapZoneClassName: focusTrapZoneProps ? focusTrapZoneProps.className : undefined,
            hasCloseButton,
            headerClassName,
            isAnimating: this.state.isAnimating,
            isFooterAtBottom,
            isFooterSticky,
            isOnRightSide,
            isOpen: this.state.isOpen,
            isHiddenOnDismiss,
            type
        });
        const { _classNames } = this;
        let overlay;
        if (isBlocking && isOpen) {
            overlay = React.createElement(Overlay, { className: _classNames.overlay, isDarkThemed: false, onClick: isLightDismiss ? onLightDismissClick : undefined });
        }
        const header = onRenderHeader(this.props, this._onRenderHeader, headerTextId);
        return (React.createElement(Layer, Object.assign({}, layerProps),
            React.createElement(Popup, { role: "dialog", ariaLabelledBy: header ? headerTextId : undefined, onDismiss: this.dismiss, className: _classNames.hiddenPanel },
                React.createElement("div", Object.assign({}, nativeProps, { ref: this._panel, className: _classNames.root }),
                    overlay,
                    React.createElement(FocusTrapZone, Object.assign({ ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: isHiddenOnDismiss && !isOpen ? false : forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector, isClickableOutsideFocusTrap: true }, focusTrapZoneProps, { className: _classNames.main, style: customWidthStyles, elementToFocusOnDismiss: elementToFocusOnDismiss }),
                        React.createElement("div", { className: _classNames.commands, "data-is-visible": true }, onRenderNavigation(this.props, this._onRenderNavigation)),
                        React.createElement("div", { className: _classNames.contentInner },
                            header,
                            React.createElement("div", { ref: this._allowScrollOnPanel, className: _classNames.scrollableContent, "data-is-scrollable": true }, onRenderBody(this.props, this._onRenderBody)),
                            onRenderFooter(this.props, this._onRenderFooter)))))));
    }
    open() {
        if (!this.state.isOpen) {
            this.setState({
                isOpen: true,
                isAnimating: true
            }, () => {
                this._async.setTimeout(this._onTransitionComplete, 200);
            });
        }
    }
    _shouldListenForOuterClick(props) {
        return !!props.isBlocking && !!props.isOpen;
    }
    _updateFooterPosition() {
        const scrollableContent = this._scrollableContent;
        if (scrollableContent) {
            const height = scrollableContent.clientHeight;
            const innerHeight = scrollableContent.scrollHeight;
            this.setState({
                isFooterSticky: height < innerHeight ? true : false
            });
        }
    }
    _dismissOnOuterClick(ev) {
        const panel = this._panel.current;
        if (this.state.isOpen && panel) {
            if (!elementContains(panel, ev.target)) {
                if (this.props.onOuterClick) {
                    this.props.onOuterClick();
                    ev.preventDefault();
                }
                else {
                    this.dismiss();
                }
            }
        }
    }
}
PanelBase.defaultProps = {
    isHiddenOnDismiss: false,
    isOpen: false,
    isBlocking: true,
    hasCloseButton: true,
    type: PanelType.smallFixedFar
};
