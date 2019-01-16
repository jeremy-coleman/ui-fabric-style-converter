import { BaseComponent } from '../../Utilities';
import { Selection } from '../../Selection';
export class BaseSelectedItemsList extends BaseComponent {
    constructor(basePickerProps) {
        super(basePickerProps);
        this.addItems = (items) => {
            const processedItems = this.props.onItemSelected ? this.props.onItemSelected(items) : items;
            const processedItemObjects = processedItems;
            const processedItemPromiseLikes = processedItems;
            if (processedItemPromiseLikes && processedItemPromiseLikes.then) {
                processedItemPromiseLikes.then((resolvedProcessedItems) => {
                    const newItems = this.state.items.concat(resolvedProcessedItems);
                    this.updateItems(newItems);
                });
            }
            else {
                const newItems = this.state.items.concat(processedItemObjects);
                this.updateItems(newItems);
            }
        };
        this.removeItemAt = (index) => {
            const { items } = this.state;
            if (this._canRemoveItem(items[index])) {
                if (index > -1) {
                    if (this.props.onItemsDeleted) {
                        this.props.onItemsDeleted([items[index]]);
                    }
                    const newItems = items.slice(0, index).concat(items.slice(index + 1));
                    this.updateItems(newItems);
                }
            }
        };
        this.removeItem = (item) => {
            const { items } = this.state;
            const index = items.indexOf(item);
            this.removeItemAt(index);
        };
        this.removeItems = (itemsToRemove) => {
            const { items } = this.state;
            const itemsCanRemove = itemsToRemove.filter((item) => this._canRemoveItem(item));
            const newItems = items.filter((item) => itemsCanRemove.indexOf(item) === -1);
            const firstItemToRemove = itemsCanRemove[0];
            const index = items.indexOf(firstItemToRemove);
            if (this.props.onItemsDeleted) {
                this.props.onItemsDeleted(itemsCanRemove);
            }
            this.updateItems(newItems, index);
        };
        this.onCopy = (ev) => {
            if (this.props.onCopyItems && this.selection.getSelectedCount() > 0) {
                const selectedItems = this.selection.getSelection();
                this.copyItems(selectedItems);
            }
        };
        this.renderItems = () => {
            const { removeButtonAriaLabel } = this.props;
            const onRenderItem = this.props.onRenderItem;
            const { items } = this.state;
            return items.map((item, index) => onRenderItem({
                item,
                index,
                key: item.key ? item.key : index,
                selected: this.selection.isIndexSelected(index),
                onRemoveItem: () => this.removeItem(item),
                onItemChange: this.onItemChange,
                removeButtonAriaLabel: removeButtonAriaLabel,
                onCopyItem: (itemToCopy) => this.copyItems([itemToCopy])
            }));
        };
        this.onSelectionChanged = () => {
            this.forceUpdate();
        };
        this.onItemChange = (changedItem, index) => {
            const { items } = this.state;
            if (index >= 0) {
                const newItems = items;
                newItems[index] = changedItem;
                this.updateItems(newItems);
            }
        };
        const items = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
        this.state = {
            items: items
        };
        this.selection = this.props.selection
            ? this.props.selection
            : new Selection({ onSelectionChanged: this.onSelectionChanged });
    }
    get items() {
        return this.state.items;
    }
    removeSelectedItems() {
        if (this.state.items.length && this.selection.getSelectedCount() > 0) {
            this.removeItems(this.selection.getSelection());
        }
    }
    updateItems(items, focusIndex) {
        if (this.props.selectedItems) {
            this.onChange(items);
        }
        else {
            this.setState({ items: items }, () => {
                this._onSelectedItemsUpdated(items, focusIndex);
            });
        }
    }
    hasSelectedItems() {
        return this.selection.getSelectedCount() > 0;
    }
    unselectAll() {
        this.selection.setAllSelected(false);
    }
    highlightedItems() {
        return this.selection.getSelection();
    }
    componentWillUpdate(newProps, newState) {
        if (newState.items && newState.items !== this.state.items) {
            this.selection.setItems(newState.items);
        }
    }
    componentDidMount() {
        this.selection.setItems(this.state.items);
    }
    componentWillReceiveProps(newProps) {
        const newItems = newProps.selectedItems;
        if (newItems) {
            this.setState({ items: newProps.selectedItems });
        }
        if (newProps.selection) {
            this.selection = newProps.selection;
        }
    }
    render() {
        return this.renderItems();
    }
    onChange(items) {
        if (this.props.onChange) {
            this.props.onChange(items);
        }
    }
    copyItems(items) {
        if (this.props.onCopyItems) {
            const copyText = this.props.onCopyItems(items);
            const copyInput = document.createElement('input');
            document.body.appendChild(copyInput);
            try {
                copyInput.value = copyText;
                copyInput.select();
                if (!document.execCommand('copy')) {
                    throw new Error();
                }
            }
            catch (err) {
            }
            finally {
                document.body.removeChild(copyInput);
            }
        }
    }
    _onSelectedItemsUpdated(items, focusIndex) {
        this.onChange(items);
    }
    _canRemoveItem(item) {
        return !this.props.canRemoveItem || this.props.canRemoveItem(item);
    }
}
