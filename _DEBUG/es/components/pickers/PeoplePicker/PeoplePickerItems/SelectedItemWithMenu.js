import * as React from 'react';
import { BaseComponent, css, createRef } from '../../../../Utilities';
import { Persona, PersonaPresence } from '../../../../Persona';
import { ContextualMenu, DirectionalHint } from '../../../../ContextualMenu';
import { IconButton } from '../../../../Button';
import { FocusZone } from '../../../../FocusZone';
let styles;
export class SelectedItemWithMenu extends BaseComponent {
    constructor(props) {
        super(props);
        this._ellipsisRef = createRef();
        this._onContextualMenu = (ev) => {
            this.setState({ contextualMenuVisible: true });
        };
        this._onCloseContextualMenu = (ev) => {
            this.setState({ contextualMenuVisible: false });
        };
        this.state = { contextualMenuVisible: false };
    }
    render() {
        const { item, onRemoveItem, removeButtonAriaLabel } = this.props;
        return (React.createElement("div", { "data-is-focusable": true, className: css('ms-PickerItem-container', styles.itemContainer) },
            React.createElement(FocusZone, { className: css('ms-PickerPersona-container', styles.personaContainer) },
                React.createElement("div", { className: css('ms-PickerItem-content', styles.itemContent) },
                    React.createElement(Persona, Object.assign({}, item, { presence: item.presence !== undefined ? item.presence : PersonaPresence.none }))),
                React.createElement("div", { ref: this._ellipsisRef, className: css('ms-PickerItem-content', styles.itemContent) },
                    React.createElement(IconButton, { iconProps: { iconName: 'More' }, onClick: this._onContextualMenu })),
                React.createElement("div", { className: css('ms-PickerItem-content', styles.itemContent) },
                    React.createElement(IconButton, { iconProps: { iconName: 'Cancel' }, onClick: onRemoveItem, ariaLabel: removeButtonAriaLabel })),
                this.state.contextualMenuVisible ? (React.createElement(ContextualMenu, { items: item.menuItems, shouldFocusOnMount: true, target: this._ellipsisRef.current, onDismiss: this._onCloseContextualMenu, directionalHint: DirectionalHint.bottomAutoEdge })) : null)));
    }
}
