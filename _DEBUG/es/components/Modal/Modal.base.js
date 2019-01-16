import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, classNamesFunction, getId, allowScrollOnElement } from '../../Utilities';
import { FocusTrapZone } from '../FocusTrapZone/index';
import { animationDuration, getOverlayStyles } from './Modal.styles';
import { Overlay } from '../../Overlay';
import { Layer } from '../../Layer';
import { Popup } from '../Popup/index';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
const DefaultLayerProps = {
    eventBubblingEnabled: false
};
const getClassNames = classNamesFunction();
let ModalBase = class ModalBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._focusTrapZone = React.createRef();
        this._allowScrollOnModal = (elt) => {
            if (elt) {
                allowScrollOnElement(elt, this._events);
            }
            else {
                this._events.off(this._scrollableContent);
            }
            this._scrollableContent = elt;
        };
        this.state = {
            id: getId('Modal'),
            isOpen: props.isOpen,
            isVisible: props.isOpen,
            hasBeenOpened: props.isOpen
        };
        this._warnDeprecations({
            onLayerDidMount: 'layerProps.onLayerDidMount'
        });
    }
    componentWillReceiveProps(newProps) {
        clearTimeout(this._onModalCloseTimer);
        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true
                });
            }
            else {
                this.setState({
                    hasBeenOpened: true,
                    isVisible: true
                });
                if (newProps.topOffsetFixed) {
                    const dialogMain = document.getElementsByClassName('ms-Dialog-main');
                    let modalRectangle;
                    if (dialogMain.length > 0) {
                        modalRectangle = dialogMain[0].getBoundingClientRect();
                        this.setState({
                            modalRectangleTop: modalRectangle.top
                        });
                    }
                }
            }
        }
        if (!newProps.isOpen && this.state.isOpen) {
            this._onModalCloseTimer = this._async.setTimeout(this._onModalClose, parseFloat(animationDuration) * 1000);
            this.setState({
                isVisible: false
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isOpen && !prevState.isVisible) {
            this.setState({
                isVisible: true
            });
        }
    }
    render() {
        const { className, containerClassName, scrollableContentClassName, elementToFocusOnDismiss, firstFocusableSelector, forceFocusInsideTrap, ignoreExternalFocusing, isBlocking, isClickableOutsideFocusTrap, isDarkOverlay, onDismiss, layerProps, responsiveMode, titleAriaId, styles, subtitleAriaId, theme, topOffsetFixed, onLayerDidMount } = this.props;
        const { isOpen, isVisible, hasBeenOpened, modalRectangleTop } = this.state;
        const mergedLayerProps = {
            ...DefaultLayerProps,
            ...this.props.layerProps,
            onLayerDidMount: layerProps && layerProps.onLayerDidMount ? layerProps.onLayerDidMount : onLayerDidMount
        };
        if (!isOpen) {
            return null;
        }
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            containerClassName,
            scrollableContentClassName,
            isOpen,
            isVisible,
            hasBeenOpened,
            modalRectangleTop,
            topOffsetFixed
        });
        if (responsiveMode >= ResponsiveMode.small) {
            return (React.createElement(Layer, Object.assign({}, mergedLayerProps),
                React.createElement(Popup, { role: isBlocking ? 'alertdialog' : 'dialog', "aria-modal": "true", ariaLabelledBy: titleAriaId, ariaDescribedBy: subtitleAriaId, onDismiss: onDismiss },
                    React.createElement("div", { className: classNames.root },
                        React.createElement(Overlay, { isDarkThemed: isDarkOverlay, onClick: isBlocking ? undefined : onDismiss, styles: getOverlayStyles }),
                        React.createElement(FocusTrapZone, { componentRef: this._focusTrapZone, className: classNames.main, elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector },
                            React.createElement("div", { ref: this._allowScrollOnModal, className: classNames.scrollableContent }, this.props.children))))));
        }
        return null;
    }
    focus() {
        if (this._focusTrapZone.current) {
            this._focusTrapZone.current.focus();
        }
    }
    _onModalClose() {
        this.setState({
            isOpen: false
        });
        if (this.props.onDismissed) {
            this.props.onDismissed();
        }
    }
};
ModalBase.defaultProps = {
    isOpen: false,
    isDarkOverlay: true,
    isBlocking: false,
    className: '',
    containerClassName: ''
};
ModalBase = tslib_1.__decorate([
    withResponsiveMode
], ModalBase);
export { ModalBase };
