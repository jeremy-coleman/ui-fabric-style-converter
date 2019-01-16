import * as React from 'react';
import { BaseComponent } from '../../../../Utilities';
import { ContextualMenu, DirectionalHint } from '../../../../ContextualMenu';
export class SelectedItemWithContextMenu extends BaseComponent {
    constructor(props) {
        super(props);
        this.itemElement = React.createRef();
        this._onClick = (ev) => {
            ev.preventDefault();
            if (this.props.beginEditing && !this.props.item.isValid) {
                this.props.beginEditing(this.props.item);
            }
            else {
                this.setState({ contextualMenuVisible: true });
            }
        };
        this._onCloseContextualMenu = (ev) => {
            this.setState({ contextualMenuVisible: false });
        };
        this.state = { contextualMenuVisible: false };
    }
    render() {
        return (React.createElement("div", { ref: this.itemElement, onContextMenu: this._onClick },
            this.props.renderedItem,
            this.state.contextualMenuVisible ? (React.createElement(ContextualMenu, { items: this.props.menuItems, shouldFocusOnMount: true, target: this.itemElement.current, onDismiss: this._onCloseContextualMenu, directionalHint: DirectionalHint.bottomLeftEdge })) : null));
    }
}
