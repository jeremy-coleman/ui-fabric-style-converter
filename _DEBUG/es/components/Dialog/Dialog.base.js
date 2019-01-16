import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, classNamesFunction, getId } from '../../Utilities';
import { DialogType } from './DialogContent.types';
import { Modal } from '../../Modal';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
const getClassNames = classNamesFunction();
import { DialogContent } from './DialogContent';
const DefaultModalProps = {
    isDarkOverlay: false,
    isBlocking: false,
    className: '',
    containerClassName: '',
    topOffsetFixed: false
};
const DefaultDialogContentProps = {
    type: DialogType.normal,
    className: '',
    topButtonsProps: []
};
let DialogBase = class DialogBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._getSubTextId = () => {
            const { ariaDescribedById, modalProps, dialogContentProps, subText } = this.props;
            let id = ariaDescribedById || (modalProps && modalProps.subtitleAriaId);
            if (!id) {
                id = (subText || (dialogContentProps && dialogContentProps.subText)) && this._defaultSubTextId;
            }
            return id;
        };
        this._getTitleTextId = () => {
            const { ariaLabelledById, modalProps, dialogContentProps, title } = this.props;
            let id = ariaLabelledById || (modalProps && modalProps.titleAriaId);
            if (!id) {
                id = (title || (dialogContentProps && dialogContentProps.title)) && this._defaultTitleTextId;
            }
            return id;
        };
        this._id = getId('Dialog');
        this._defaultTitleTextId = this._id + '-title';
        this._defaultSubTextId = this._id + '-subText';
        this._warnDeprecations({
            isOpen: 'hidden',
            type: 'dialogContentProps.type',
            subText: 'dialogContentProps.subText',
            contentClassName: 'dialogContentProps.className',
            topButtonsProps: 'dialogContentProps.topButtonsProps',
            className: 'modalProps.className',
            isDarkOverlay: 'modalProps.isDarkOverlay',
            isBlocking: 'modalProps.isBlocking',
            containerClassName: 'modalProps.containerClassName',
            onDismissed: 'modalProps.onDismissed',
            onLayerDidMount: 'modalProps.layerProps.onLayerDidMount',
            ariaDescribedById: 'modalProps.subtitleAriaId',
            ariaLabelledById: 'modalProps.titleAriaId'
        });
    }
    render() {
        const { className, containerClassName, contentClassName, elementToFocusOnDismiss, firstFocusableSelector, forceFocusInsideTrap, styles, hidden, ignoreExternalFocusing, isBlocking, isClickableOutsideFocusTrap, isDarkOverlay, isOpen, onDismiss, onDismissed, onLayerDidMount, responsiveMode, subText, theme, title, topButtonsProps, type, minWidth, maxWidth, modalProps } = this.props;
        const mergedLayerProps = {
            ...(modalProps ? modalProps.layerProps : { onLayerDidMount })
        };
        if (onLayerDidMount && !mergedLayerProps.onLayerDidMount) {
            mergedLayerProps.onLayerDidMount = onLayerDidMount;
        }
        const mergedModalProps = {
            ...DefaultModalProps,
            ...modalProps,
            layerProps: mergedLayerProps
        };
        const dialogContentProps = {
            ...DefaultDialogContentProps,
            ...this.props.dialogContentProps
        };
        const classNames = getClassNames(styles, {
            theme: theme,
            className: className || mergedModalProps.className,
            containerClassName: containerClassName || mergedModalProps.containerClassName,
            hidden,
            dialogDefaultMinWidth: minWidth,
            dialogDefaultMaxWidth: maxWidth
        });
        return (React.createElement(Modal, Object.assign({ elementToFocusOnDismiss: elementToFocusOnDismiss, firstFocusableSelector: firstFocusableSelector, forceFocusInsideTrap: forceFocusInsideTrap, ignoreExternalFocusing: ignoreExternalFocusing, isClickableOutsideFocusTrap: isClickableOutsideFocusTrap, onDismissed: onDismissed, responsiveMode: responsiveMode }, mergedModalProps, { isDarkOverlay: isDarkOverlay !== undefined ? isDarkOverlay : mergedModalProps.isDarkOverlay, isBlocking: isBlocking !== undefined ? isBlocking : mergedModalProps.isBlocking, isOpen: isOpen !== undefined ? isOpen : !hidden, className: classNames.root, containerClassName: classNames.main, onDismiss: onDismiss ? onDismiss : mergedModalProps.onDismiss, subtitleAriaId: this._getSubTextId(), titleAriaId: this._getTitleTextId() }),
            React.createElement(DialogContent, Object.assign({ titleId: this._defaultTitleTextId, subTextId: this._defaultSubTextId, title: title, subText: subText, showCloseButton: isBlocking !== undefined ? !isBlocking : !mergedModalProps.isBlocking, topButtonsProps: topButtonsProps ? topButtonsProps : dialogContentProps.topButtonsProps, type: type !== undefined ? type : dialogContentProps.type, onDismiss: onDismiss ? onDismiss : dialogContentProps.onDismiss, className: contentClassName || dialogContentProps.className }, dialogContentProps), this.props.children)));
    }
};
DialogBase.defaultProps = {
    hidden: true
};
DialogBase = tslib_1.__decorate([
    withResponsiveMode
], DialogBase);
export { DialogBase };
