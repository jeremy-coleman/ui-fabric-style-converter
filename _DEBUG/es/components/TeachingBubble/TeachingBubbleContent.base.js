import * as React from 'react';
import { BaseComponent, classNamesFunction, createRef, KeyCodes } from '../../Utilities';
import { PrimaryButton, DefaultButton, IconButton } from '../../Button';
import { Image, ImageFit } from '../../Image';
const getClassNames = classNamesFunction();
export class TeachingBubbleContentBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.rootElement = createRef();
        this._onKeyDown = (e) => {
            if (this.props.onDismiss) {
                if (e.which === KeyCodes.escape) {
                    this.props.onDismiss();
                }
            }
        };
        this.state = {};
    }
    componentDidMount() {
        if (this.props.onDismiss) {
            document.addEventListener('keydown', this._onKeyDown, false);
        }
    }
    componentWillUnmount() {
        if (this.props.onDismiss) {
            document.removeEventListener('keydown', this._onKeyDown);
        }
    }
    focus() {
        if (this.rootElement.current) {
            this.rootElement.current.focus();
        }
    }
    render() {
        const { children, illustrationImage, primaryButtonProps, secondaryButtonProps, headline, hasCondensedHeadline, hasCloseIcon, onDismiss, closeButtonAriaLabel, hasSmallHeadline, isWide, styles, theme, ariaDescribedBy, ariaLabelledBy } = this.props;
        let imageContent;
        let headerContent;
        let bodyContent;
        let footerContent;
        let closeButton;
        const classNames = getClassNames(styles, {
            theme: theme,
            hasCondensedHeadline,
            hasSmallHeadline,
            isWide,
            primaryButtonClassName: primaryButtonProps ? primaryButtonProps.className : undefined,
            secondaryButtonClassName: secondaryButtonProps ? secondaryButtonProps.className : undefined
        });
        if (illustrationImage && illustrationImage.src) {
            imageContent = (React.createElement("div", { className: classNames.imageContent },
                React.createElement(Image, Object.assign({}, illustrationImage))));
        }
        if (headline) {
            const HeaderWrapperAs = typeof headline === 'string' ? 'p' : 'div';
            headerContent = (React.createElement("div", { className: classNames.header },
                React.createElement(HeaderWrapperAs, { className: classNames.headline, id: ariaLabelledBy }, headline)));
        }
        if (children) {
            const BodyContentWrapperAs = typeof children === 'string' ? 'p' : 'div';
            bodyContent = (React.createElement("div", { className: classNames.body },
                React.createElement(BodyContentWrapperAs, { className: classNames.subText, id: ariaDescribedBy }, children)));
        }
        if (primaryButtonProps || secondaryButtonProps) {
            footerContent = (React.createElement("div", { className: classNames.footer },
                primaryButtonProps && React.createElement(PrimaryButton, Object.assign({}, primaryButtonProps, { className: classNames.primaryButton })),
                secondaryButtonProps && React.createElement(DefaultButton, Object.assign({}, secondaryButtonProps, { className: classNames.secondaryButton }))));
        }
        if (hasCloseIcon) {
            closeButton = (React.createElement(IconButton, { className: classNames.closeButton, iconProps: { iconName: 'Cancel' }, title: closeButtonAriaLabel, ariaLabel: closeButtonAriaLabel, onClick: onDismiss }));
        }
        return (React.createElement("div", { className: classNames.content, ref: this.rootElement, role: 'dialog', tabIndex: -1, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "data-is-focusable": true },
            imageContent,
            React.createElement("div", { className: classNames.bodyContent },
                headerContent,
                bodyContent,
                footerContent),
            closeButton));
    }
}
TeachingBubbleContentBase.defaultProps = {
    hasCondensedHeadline: false,
    imageProps: {
        imageFit: ImageFit.cover,
        width: 364,
        height: 130
    }
};
