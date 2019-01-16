import * as React from 'react';
import { BaseComponent, DelayedRender, getId, classNamesFunction } from '../../Utilities';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
import { MessageBarType } from './MessageBar.types';
const getClassNames = classNamesFunction();
export class MessageBarBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.ICON_MAP = {
            [MessageBarType.info]: 'Info',
            [MessageBarType.warning]: 'Info',
            [MessageBarType.error]: 'ErrorBadge',
            [MessageBarType.blocked]: 'Blocked2',
            [MessageBarType.remove]: 'Blocked',
            [MessageBarType.severeWarning]: 'Warning',
            [MessageBarType.success]: 'Completed'
        };
        this._onClick = (ev) => {
            this.setState({ expandSingleLine: !this.state.expandSingleLine });
        };
        this.state = {
            labelId: getId('MessageBar'),
            showContent: false,
            expandSingleLine: false
        };
    }
    render() {
        const { isMultiline } = this.props;
        this._classNames = this._getClassNames();
        return isMultiline ? this._renderMultiLine() : this._renderSingleLine();
    }
    _getActionsDiv() {
        if (this.props.actions) {
            return React.createElement("div", { className: this._classNames.actions }, this.props.actions);
        }
        return null;
    }
    _getDismissDiv() {
        if (this.props.onDismiss) {
            return (React.createElement(IconButton, { disabled: false, className: this._classNames.dismissal, onClick: this.props.onDismiss, iconProps: { iconName: 'Clear' }, ariaLabel: this.props.dismissButtonAriaLabel }));
        }
        return null;
    }
    _getDismissSingleLine() {
        if (this.props.onDismiss) {
            return React.createElement("div", { className: this._classNames.dismissSingleLine }, this._getDismissDiv());
        }
        return null;
    }
    _getExpandSingleLine() {
        if (!this.props.actions && this.props.truncated) {
            return (React.createElement("div", { className: this._classNames.expandSingleLine },
                React.createElement(IconButton, { disabled: false, className: this._classNames.expand, onClick: this._onClick, iconProps: { iconName: this.state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' }, ariaLabel: this.props.overflowButtonAriaLabel, "aria-expanded": this.state.expandSingleLine, "aria-controls": this.state.labelId })));
        }
        return null;
    }
    _getIconSpan() {
        return (React.createElement("div", { className: this._classNames.iconContainer },
            React.createElement(Icon, { iconName: this.ICON_MAP[this.props.messageBarType], className: this._classNames.icon })));
    }
    _renderMultiLine() {
        return (React.createElement("div", { className: this._classNames.root, "aria-live": this._getAnnouncementPriority() },
            React.createElement("div", { className: this._classNames.content },
                this._getIconSpan(),
                this._renderInnerText(),
                this._getDismissDiv()),
            this._getActionsDiv()));
    }
    _renderSingleLine() {
        return (React.createElement("div", { className: this._classNames.root },
            React.createElement("div", { className: this._classNames.content },
                this._getIconSpan(),
                this._renderInnerText(),
                this._getExpandSingleLine(),
                this._getActionsDiv(),
                this._getDismissSingleLine())));
    }
    _renderInnerText() {
        return (React.createElement("div", { className: this._classNames.text, id: this.state.labelId },
            React.createElement("span", { className: this._classNames.innerText, role: "status", "aria-live": this._getAnnouncementPriority() },
                React.createElement(DelayedRender, null,
                    React.createElement("span", null, this.props.children)))));
    }
    _getClassNames() {
        const { theme, className, messageBarType, onDismiss, actions, truncated, isMultiline } = this.props;
        const { expandSingleLine } = this.state;
        return getClassNames(this.props.styles, {
            theme: theme,
            messageBarType: messageBarType || MessageBarType.info,
            onDismiss: onDismiss !== undefined,
            actions: actions !== undefined,
            truncated: truncated,
            isMultiline: isMultiline,
            expandSingleLine: expandSingleLine,
            className
        });
    }
    _getAnnouncementPriority() {
        switch (this.props.messageBarType) {
            case MessageBarType.blocked:
            case MessageBarType.error:
            case MessageBarType.severeWarning:
                return 'assertive';
        }
        return 'polite';
    }
}
MessageBarBase.defaultProps = {
    messageBarType: MessageBarType.info,
    onDismiss: undefined,
    isMultiline: true
};
