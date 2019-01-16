import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { DialogType } from './DialogContent.types';
import { IconButton } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
const getClassNames = classNamesFunction();
const DialogFooterType = React.createElement(DialogFooter, null).type;
let DialogContentBase = class DialogContentBase extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { showCloseButton, className, closeButtonAriaLabel, onDismiss, subTextId, subText, titleId, title, type, styles, theme } = this.props;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            isLargeHeader: type === DialogType.largeHeader,
            isClose: type === DialogType.close
        });
        const groupings = this._groupChildren();
        let subTextContent;
        if (subText) {
            subTextContent = (React.createElement("p", { className: classNames.subText, id: subTextId }, subText));
        }
        return (React.createElement("div", { className: classNames.content },
            React.createElement("div", { className: classNames.header },
                React.createElement("p", { className: classNames.title, id: titleId, role: "heading", "aria-level": 2 }, title),
                React.createElement("div", { className: classNames.topButton },
                    this.props.topButtonsProps.map((props, index) => (React.createElement(IconButton, Object.assign({ key: props.uniqueId || index }, props)))),
                    (type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && (React.createElement(IconButton, { className: classNames.button, iconProps: { iconName: 'Cancel' }, ariaLabel: closeButtonAriaLabel, onClick: onDismiss })))),
            React.createElement("div", { className: classNames.inner },
                React.createElement("div", { className: classNames.innerContent },
                    subTextContent,
                    groupings.contents),
                groupings.footers)));
    }
    _groupChildren() {
        const groupings = {
            footers: [],
            contents: []
        };
        React.Children.map(this.props.children, child => {
            if (typeof child === 'object' && child !== null && child.type === DialogFooterType) {
                groupings.footers.push(child);
            }
            else {
                groupings.contents.push(child);
            }
        });
        return groupings;
    }
};
DialogContentBase.defaultProps = {
    showCloseButton: false,
    className: '',
    topButtonsProps: [],
    closeButtonAriaLabel: 'Close'
};
DialogContentBase = tslib_1.__decorate([
    withResponsiveMode
], DialogContentBase);
export { DialogContentBase };
