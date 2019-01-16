import * as React from 'react';
import { BaseComponent, KeyCodes, getId, getNativeProps, inputProperties, css } from '../../../../Utilities';
let styles;
export class EditingItem extends BaseComponent {
    constructor(props) {
        super(props);
        this._editingFloatingPicker = React.createRef();
        this._renderEditingSuggestions = () => {
            const onRenderFloatingPicker = this._onRenderFloatingPicker;
            return onRenderFloatingPicker({
                componentRef: this._editingFloatingPicker,
                onChange: this._onSuggestionSelected,
                inputElement: this._editingInput,
                selectedItems: [],
                ...this._floatingPickerProps
            });
        };
        this._resolveInputRef = (ref) => {
            this._editingInput = ref;
            this.forceUpdate(() => {
                this._editingInput.focus();
            });
        };
        this._onInputClick = () => {
            this._editingFloatingPicker.current && this._editingFloatingPicker.current.showPicker(true);
        };
        this._onInputBlur = (ev) => {
            if (this._editingFloatingPicker.current && ev.relatedTarget !== null) {
                const target = ev.relatedTarget;
                if (target.className.indexOf('ms-Suggestions-itemButton') === -1 && target.className.indexOf('ms-Suggestions-sectionButton') === -1) {
                    this._editingFloatingPicker.current.forceResolveSuggestion();
                }
            }
        };
        this._onInputChange = (ev) => {
            const value = ev.target.value;
            if (value === '') {
                if (this.props.onRemoveItem) {
                    this.props.onRemoveItem();
                }
            }
            else {
                this._editingFloatingPicker.current && this._editingFloatingPicker.current.onQueryStringChanged(value);
            }
        };
        this._onSuggestionSelected = (item) => {
            this.props.onEditingComplete(this.props.item, item);
        };
        this.state = { contextualMenuVisible: false };
        this._onRenderFloatingPicker = this.props.onRenderFloatingPicker;
        this._floatingPickerProps = this.props.floatingPickerProps;
    }
    componentDidMount() {
        const getEditingItemText = this.props.getEditingItemText;
        const itemText = getEditingItemText(this.props.item);
        this._editingFloatingPicker.current && this._editingFloatingPicker.current.onQueryStringChanged(itemText);
        this._editingInput.value = itemText;
        this._editingInput.focus();
    }
    render() {
        const itemId = getId();
        const nativeProps = getNativeProps(this.props, inputProperties);
        return (React.createElement("div", { "aria-labelledby": 'editingItemPersona-' + itemId, className: css('ms-EditingItem', styles.editingContainer) },
            React.createElement("input", Object.assign({}, nativeProps, { ref: this._resolveInputRef, autoCapitalize: 'off', autoComplete: 'off', onChange: this._onInputChange, onKeyDown: this._onInputKeyDown, onBlur: this._onInputBlur, onClick: this._onInputClick, "data-lpignore": true, className: styles.editingInput, id: itemId })),
            this._renderEditingSuggestions()));
    }
    _onInputKeyDown(ev) {
        if (ev.which === KeyCodes.backspace || ev.which === KeyCodes.del) {
            ev.stopPropagation();
        }
    }
}
