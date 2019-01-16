import * as React from 'react';
import { BaseSelectedItemsList } from '../BaseSelectedItemsList';
import { ExtendedSelectedItem } from './Items/ExtendedSelectedItem';
import { SelectedItemWithContextMenu } from './Items/SelectedItemWithContextMenu';
import { EditingItem } from './Items/EditingItem';
export class BasePeopleSelectedItemsList extends BaseSelectedItemsList {
}
export class SelectedPeopleList extends BasePeopleSelectedItemsList {
    constructor() {
        super(...arguments);
        this.replaceItem = (itemToReplace, itemsToReplaceWith) => {
            const { items } = this.state;
            const index = items.indexOf(itemToReplace);
            if (index > -1) {
                const newItems = items
                    .slice(0, index)
                    .concat(itemsToReplaceWith)
                    .concat(items.slice(index + 1));
                this.updateItems(newItems);
            }
        };
        this.renderItems = () => {
            const { items } = this.state;
            return items.map((item, index) => this._renderItem(item, index));
        };
        this._beginEditing = (item) => {
            item.isEditing = true;
            this.forceUpdate();
        };
        this._completeEditing = (oldItem, newItem) => {
            oldItem.isEditing = false;
            this.replaceItem(oldItem, newItem);
        };
    }
    _renderItem(item, index) {
        const { removeButtonAriaLabel } = this.props;
        const props = {
            item,
            index,
            key: item.key ? item.key : index,
            selected: this.selection.isIndexSelected(index),
            onRemoveItem: () => this.removeItem(item),
            onItemChange: this.onItemChange,
            removeButtonAriaLabel: removeButtonAriaLabel,
            onCopyItem: (itemToCopy) => this.copyItems([itemToCopy]),
            onExpandItem: this.props.onExpandGroup ? () => this.props.onExpandGroup(item) : undefined,
            menuItems: this._createMenuItems(item)
        };
        const hasContextMenu = props.menuItems.length > 0;
        if (item.isEditing && hasContextMenu) {
            return (React.createElement(EditingItem, Object.assign({}, props, { onRenderFloatingPicker: this.props.onRenderFloatingPicker, floatingPickerProps: this.props.floatingPickerProps, onEditingComplete: this._completeEditing, getEditingItemText: this.props.getEditingItemText })));
        }
        else {
            const onRenderItem = this.props.onRenderItem;
            const renderedItem = onRenderItem(props);
            return hasContextMenu ? (React.createElement(SelectedItemWithContextMenu, { renderedItem: renderedItem, beginEditing: this._beginEditing, menuItems: this._createMenuItems(props.item), item: props.item })) : (renderedItem);
        }
    }
    _createMenuItems(item) {
        const menuItems = [];
        if (this.props.editMenuItemText && this.props.getEditingItemText) {
            menuItems.push({
                key: 'Edit',
                text: this.props.editMenuItemText,
                onClick: (ev, menuItem) => {
                    this._beginEditing(menuItem.data);
                },
                data: item
            });
        }
        if (this.props.removeMenuItemText) {
            menuItems.push({
                key: 'Remove',
                text: this.props.removeMenuItemText,
                onClick: (ev, menuItem) => {
                    this.removeItem(menuItem.data);
                },
                data: item
            });
        }
        if (this.props.copyMenuItemText) {
            menuItems.push({
                key: 'Copy',
                text: this.props.copyMenuItemText,
                onClick: (ev, menuItem) => {
                    if (this.props.onCopyItems) {
                        this.copyItems([menuItem.data]);
                    }
                },
                data: item
            });
        }
        return menuItems;
    }
}
SelectedPeopleList.defaultProps = {
    onRenderItem: (props) => React.createElement(ExtendedSelectedItem, Object.assign({}, props))
};
