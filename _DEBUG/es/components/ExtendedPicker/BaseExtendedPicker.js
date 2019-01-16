import * as React from 'react';
import { BaseComponent, KeyCodes, css } from '../../Utilities';
import { Autofill } from '../../Autofill';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Selection, SelectionMode, SelectionZone } from '../../Selection';
let styles;
export class BaseExtendedPicker extends BaseComponent {
    constructor(basePickerProps) {
        super(basePickerProps);
        this.floatingPicker = React.createRef();
        this.selectedItemsList = React.createRef();
        this.root = React.createRef();
        this.input = React.createRef();
        this.onSelectionChange = () => {
            this.forceUpdate();
        };
        this.onInputChange = (value) => {
            this.setState({ queryString: value });
            if (this.floatingPicker.current) {
                this.floatingPicker.current.onQueryStringChanged(value);
            }
        };
        this.onInputFocus = (ev) => {
            if (this.selectedItemsList.current) {
                this.selectedItemsList.current.unselectAll();
            }
            if (this.props.inputProps && this.props.inputProps.onFocus) {
                this.props.inputProps.onFocus(ev);
            }
        };
        this.onInputClick = (ev) => {
            if (this.selectedItemsList.current) {
                this.selectedItemsList.current.unselectAll();
            }
            if (this.floatingPicker.current && this.inputElement) {
                const shoudUpdateValue = this.inputElement.value === '' || this.inputElement.value !== this.floatingPicker.current.inputText;
                this.floatingPicker.current.showPicker(shoudUpdateValue);
            }
        };
        this.onBackspace = (ev) => {
            if (ev.which !== KeyCodes.backspace) {
                return;
            }
            if (this.selectedItemsList.current && this.items.length) {
                if (this.input.current &&
                    !this.input.current.isValueSelected &&
                    this.input.current.inputElement === document.activeElement &&
                    this.input.current.cursorLocation === 0) {
                    if (this.floatingPicker.current) {
                        this.floatingPicker.current.hidePicker();
                    }
                    ev.preventDefault();
                    this.selectedItemsList.current.removeItemAt(this.items.length - 1);
                    this._onSelectedItemsChanged();
                }
                else if (this.selectedItemsList.current.hasSelectedItems()) {
                    if (this.floatingPicker.current) {
                        this.floatingPicker.current.hidePicker();
                    }
                    ev.preventDefault();
                    this.selectedItemsList.current.removeSelectedItems();
                    this._onSelectedItemsChanged();
                }
            }
        };
        this.onCopy = (ev) => {
            if (this.selectedItemsList.current) {
                this.selectedItemsList.current.onCopy(ev);
            }
        };
        this.onPaste = (ev) => {
            if (this.props.onPaste) {
                const inputText = ev.clipboardData.getData('Text');
                ev.preventDefault();
                this.props.onPaste(inputText);
            }
        };
        this._onSuggestionSelected = (item) => {
            const currentRenderedQueryString = this.props.currentRenderedQueryString;
            const queryString = this.state.queryString;
            if (currentRenderedQueryString === undefined || currentRenderedQueryString === queryString) {
                const processedItem = this.props.onItemSelected ? this.props.onItemSelected(item) : item;
                if (processedItem === null) {
                    return;
                }
                const processedItemObject = processedItem;
                const processedItemPromiseLike = processedItem;
                let newItem;
                if (processedItemPromiseLike && processedItemPromiseLike.then) {
                    processedItemPromiseLike.then((resolvedProcessedItem) => {
                        newItem = resolvedProcessedItem;
                        this._addProcessedItem(newItem);
                    });
                }
                else {
                    newItem = processedItemObject;
                    this._addProcessedItem(newItem);
                }
            }
        };
        this._onSelectedItemsChanged = () => {
            this.focus();
        };
        this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
        this.state = {
            queryString: '',
            suggestionItems: this.props.suggestionItems ? this.props.suggestionItems : null,
            selectedItems: this.props.defaultSelectedItems
                ? this.props.defaultSelectedItems
                : this.props.selectedItems
                    ? this.props.selectedItems
                    : null
        };
        this.floatingPickerProps = this.props.floatingPickerProps;
        this.selectedItemsListProps = this.props.selectedItemsListProps;
    }
    get items() {
        return this.state.selectedItems
            ? this.state.selectedItems
            : this.selectedItemsList.current
                ? this.selectedItemsList.current.items
                : null;
    }
    componentDidMount() {
        this.forceUpdate();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.floatingPickerProps) {
            this.floatingPickerProps = newProps.floatingPickerProps;
        }
        if (newProps.selectedItemsListProps) {
            this.selectedItemsListProps = newProps.selectedItemsListProps;
        }
        if (newProps.selectedItems) {
            this.setState({ selectedItems: newProps.selectedItems });
        }
    }
    focus() {
        if (this.input.current) {
            this.input.current.focus();
        }
    }
    clearInput() {
        if (this.input.current) {
            this.input.current.clear();
        }
    }
    get inputElement() {
        return this.input.current && this.input.current.inputElement;
    }
    get highlightedItems() {
        return this.selectedItemsList.current ? this.selectedItemsList.current.highlightedItems() : [];
    }
    render() {
        const { className, inputProps, disabled, focusZoneProps } = this.props;
        const activeDescendant = this.floatingPicker.current && this.floatingPicker.current.currentSelectedSuggestionIndex !== -1
            ? 'sug-' + this.floatingPicker.current.currentSelectedSuggestionIndex
            : undefined;
        return (React.createElement("div", { ref: this.root, className: css('ms-BasePicker ms-BaseExtendedPicker', className ? className : ''), onKeyDown: this.onBackspace, onCopy: this.onCopy },
            React.createElement(FocusZone, Object.assign({ direction: FocusZoneDirection.bidirectional }, focusZoneProps),
                React.createElement(SelectionZone, { selection: this.selection, selectionMode: SelectionMode.multiple },
                    React.createElement("div", { className: css('ms-BasePicker-text', styles.pickerText), role: 'list' },
                        this.props.headerComponent,
                        this.renderSelectedItemsList(),
                        this.canAddItems() && (React.createElement(Autofill, Object.assign({}, inputProps, { className: css('ms-BasePicker-input', styles.pickerInput), ref: this.input, onFocus: this.onInputFocus, onClick: this.onInputClick, onInputValueChange: this.onInputChange, "aria-activedescendant": activeDescendant, "aria-owns": "suggestion-list", "aria-expanded": this.floatingPicker.current ? this.floatingPicker.current.isSuggestionsShown : false, "aria-haspopup": "true", autoCapitalize: "off", autoComplete: "off", role: "combobox", disabled: disabled, onPaste: this.onPaste })))))),
            this.renderSuggestions()));
    }
    canAddItems() {
        const { itemLimit } = this.props;
        return itemLimit === undefined || this.items.length < itemLimit;
    }
    renderSuggestions() {
        const onRenderFloatingPicker = this.props.onRenderFloatingPicker;
        return onRenderFloatingPicker({
            componentRef: this.floatingPicker,
            onChange: this._onSuggestionSelected,
            inputElement: this.input.current ? this.input.current.inputElement : undefined,
            selectedItems: this.items,
            suggestionItems: this.props.suggestionItems ? this.props.suggestionItems : undefined,
            ...this.floatingPickerProps
        });
    }
    renderSelectedItemsList() {
        const onRenderSelectedItems = this.props.onRenderSelectedItems;
        return onRenderSelectedItems({
            componentRef: this.selectedItemsList,
            selection: this.selection,
            selectedItems: this.props.selectedItems ? this.props.selectedItems : undefined,
            onItemsDeleted: this.props.selectedItems ? this.props.onItemsRemoved : undefined,
            ...this.selectedItemsListProps
        });
    }
    _addProcessedItem(newItem) {
        if (this.props.onItemAdded) {
            this.props.onItemAdded(newItem);
        }
        if (this.selectedItemsList.current) {
            this.selectedItemsList.current.addItems([newItem]);
        }
        if (this.input.current) {
            this.input.current.clear();
        }
        if (this.floatingPicker.current) {
            this.floatingPicker.current.hidePicker();
        }
        this.focus();
    }
}
