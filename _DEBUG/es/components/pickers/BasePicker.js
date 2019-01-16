import * as React from 'react';
import { BaseComponent, KeyCodes, css, elementContains, getId, classNamesFunction, styled } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Callout, DirectionalHint } from '../../Callout';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { getStyles as suggestionsStyles } from './Suggestions/Suggestions.styles';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { ValidationState } from './BasePicker.types';
import { Autofill } from '../Autofill/index';
let legacyStyles;
let styles;
const getClassNames = classNamesFunction();
export class BasePicker extends BaseComponent {
    constructor(basePickerProps) {
        super(basePickerProps);
        this.root = React.createRef();
        this.input = React.createRef();
        this.focusZone = React.createRef();
        this.suggestionElement = React.createRef();
        this.SuggestionOfProperType = Suggestions;
        this.dismissSuggestions = (ev) => {
            const selectItemFunction = () => {
                if (this.props.onDismiss) {
                    this.props.onDismiss(ev, this.suggestionStore.currentSuggestion ? this.suggestionStore.currentSuggestion.item : undefined);
                }
                if (!ev || (ev && !ev.defaultPrevented)) {
                    if (this.canAddItems() && this.suggestionStore.hasSelectedSuggestion() && this.state.suggestedDisplayValue) {
                        this.addItemByIndex(0);
                    }
                }
            };
            if (this.currentPromise) {
                this.currentPromise.then(() => selectItemFunction());
            }
            else {
                selectItemFunction();
            }
            this.setState({ suggestionsVisible: false });
        };
        this.refocusSuggestions = (keyCode) => {
            this.resetFocus();
            if (this.suggestionStore.suggestions && this.suggestionStore.suggestions.length > 0) {
                if (keyCode === KeyCodes.up) {
                    this.suggestionStore.setSelectedSuggestion(this.suggestionStore.suggestions.length - 1);
                }
                else if (keyCode === KeyCodes.down) {
                    this.suggestionStore.setSelectedSuggestion(0);
                }
            }
        };
        this.onInputChange = (value) => {
            this.updateValue(value);
            this.setState({
                moreSuggestionsAvailable: true,
                isMostRecentlyUsedVisible: false
            });
        };
        this.onSuggestionClick = (ev, item, index) => {
            this.addItemByIndex(index);
            this.setState({ suggestionsVisible: false });
        };
        this.onSuggestionRemove = (ev, item, index) => {
            if (this.props.onRemoveSuggestion) {
                this.props.onRemoveSuggestion(item);
            }
            this.suggestionStore.removeSuggestion(index);
        };
        this.onInputFocus = (ev) => {
            if (!this.state.isFocused) {
                this.setState({ isFocused: true });
                this.selection.setAllSelected(false);
                if (this.input.current && this.input.current.value === '' && this.props.onEmptyInputFocus) {
                    this.onEmptyInputFocus();
                    this.setState({
                        isMostRecentlyUsedVisible: true,
                        moreSuggestionsAvailable: false,
                        suggestionsVisible: true
                    });
                }
                else if (this.input.current && this.input.current.value) {
                    this.setState({
                        isMostRecentlyUsedVisible: false,
                        suggestionsVisible: true
                    });
                }
                if (this.props.inputProps && this.props.inputProps.onFocus) {
                    this.props.inputProps.onFocus(ev);
                }
            }
        };
        this.onInputBlur = (ev) => {
            if (this.props.inputProps && this.props.inputProps.onBlur) {
                this.props.inputProps.onBlur(ev);
            }
            let relatedTarget = ev.relatedTarget;
            if (ev.relatedTarget === null) {
                relatedTarget = document.activeElement;
            }
            if (relatedTarget && !elementContains(this.root.current, relatedTarget)) {
                this.setState({ isFocused: false });
                if (this.props.onBlur) {
                    this.props.onBlur(ev);
                }
            }
        };
        this.onKeyDown = (ev) => {
            const keyCode = ev.which;
            switch (keyCode) {
                case KeyCodes.escape:
                    if (this.state.suggestionsVisible) {
                        this.setState({ suggestionsVisible: false });
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                    break;
                case KeyCodes.tab:
                case KeyCodes.enter:
                    if (this.suggestionElement.current && this.suggestionElement.current.hasSuggestedActionSelected()) {
                        this.suggestionElement.current.executeSelectedAction();
                    }
                    else if (!ev.shiftKey && this.suggestionStore.hasSelectedSuggestion() && this.state.suggestionsVisible) {
                        this.completeSuggestion();
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                    else {
                        this._onValidateInput();
                    }
                    break;
                case KeyCodes.backspace:
                    if (!this.props.disabled) {
                        this.onBackspace(ev);
                    }
                    ev.stopPropagation();
                    break;
                case KeyCodes.del:
                    if (!this.props.disabled) {
                        if (this.input.current &&
                            ev.target === this.input.current.inputElement &&
                            this.state.suggestionsVisible &&
                            this.suggestionStore.currentIndex !== -1) {
                            if (this.props.onRemoveSuggestion) {
                                this.props.onRemoveSuggestion(this.suggestionStore.currentSuggestion.item);
                            }
                            this.suggestionStore.removeSuggestion(this.suggestionStore.currentIndex);
                            this.forceUpdate();
                        }
                        else {
                            this.onBackspace(ev);
                        }
                    }
                    ev.stopPropagation();
                    break;
                case KeyCodes.up:
                    if (this.input.current && ev.target === this.input.current.inputElement && this.state.suggestionsVisible) {
                        if (this.suggestionElement.current &&
                            this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)) {
                            ev.preventDefault();
                            ev.stopPropagation();
                        }
                        else {
                            if (this.suggestionElement.current &&
                                this.suggestionElement.current.hasSuggestedAction() &&
                                this.suggestionStore.currentIndex === 0) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.suggestionElement.current.focusAboveSuggestions();
                                this.suggestionStore.deselectAllSuggestions();
                                this.forceUpdate();
                            }
                            else {
                                if (this.suggestionStore.previousSuggestion()) {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    this.onSuggestionSelect();
                                }
                            }
                        }
                    }
                    break;
                case KeyCodes.down:
                    if (this.input.current && ev.target === this.input.current.inputElement && this.state.suggestionsVisible) {
                        if (this.suggestionElement.current &&
                            this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)) {
                            ev.preventDefault();
                            ev.stopPropagation();
                        }
                        else {
                            if (this.suggestionElement.current &&
                                this.suggestionElement.current.hasSuggestedAction() &&
                                this.suggestionStore.currentIndex + 1 === this.suggestionStore.suggestions.length) {
                                ev.preventDefault();
                                ev.stopPropagation();
                                this.suggestionElement.current.focusBelowSuggestions();
                                this.suggestionStore.deselectAllSuggestions();
                                this.forceUpdate();
                            }
                            else {
                                if (this.suggestionStore.nextSuggestion()) {
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    this.onSuggestionSelect();
                                }
                            }
                        }
                    }
                    break;
            }
        };
        this.onItemChange = (changedItem, index) => {
            const { items } = this.state;
            if (index >= 0) {
                const newItems = items;
                newItems[index] = changedItem;
                this._updateSelectedItems(newItems);
            }
        };
        this.onGetMoreResults = () => {
            this.setState({
                isSearching: true
            }, () => {
                if (this.props.onGetMoreResults && this.input.current) {
                    const suggestions = this.props.onGetMoreResults(this.input.current.value, this.state.items);
                    const suggestionsArray = suggestions;
                    const suggestionsPromiseLike = suggestions;
                    if (Array.isArray(suggestionsArray)) {
                        this.updateSuggestions(suggestionsArray);
                        this.setState({ isSearching: false });
                    }
                    else if (suggestionsPromiseLike.then) {
                        suggestionsPromiseLike.then((newSuggestions) => {
                            this.updateSuggestions(newSuggestions);
                            this.setState({ isSearching: false });
                        });
                    }
                }
                else {
                    this.setState({ isSearching: false });
                }
                if (this.input.current) {
                    this.input.current.focus();
                }
                this.setState({
                    moreSuggestionsAvailable: false,
                    isResultsFooterVisible: true
                });
            });
        };
        this.addItemByIndex = (index) => {
            this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
            if (this.input.current) {
                this.input.current.clear();
            }
            this.updateValue('');
        };
        this.addItem = (item) => {
            const processedItem = this.props.onItemSelected ? this.props.onItemSelected(item) : item;
            if (processedItem === null) {
                return;
            }
            const processedItemObject = processedItem;
            const processedItemPromiseLike = processedItem;
            if (processedItemPromiseLike && processedItemPromiseLike.then) {
                processedItemPromiseLike.then((resolvedProcessedItem) => {
                    const newItems = this.state.items.concat([resolvedProcessedItem]);
                    this._updateSelectedItems(newItems);
                });
            }
            else {
                const newItems = this.state.items.concat([processedItemObject]);
                this._updateSelectedItems(newItems);
            }
            this.setState({ suggestedDisplayValue: '' });
        };
        this.removeItem = (item, focusNextItem) => {
            const { items } = this.state;
            const index = items.indexOf(item);
            if (index >= 0) {
                const newItems = items.slice(0, index).concat(items.slice(index + 1));
                this._updateSelectedItems(newItems, focusNextItem ? index : undefined);
            }
        };
        this.removeItems = (itemsToRemove) => {
            const { items } = this.state;
            const newItems = items.filter((item) => itemsToRemove.indexOf(item) === -1);
            const firstItemToRemove = itemsToRemove[0];
            const index = items.indexOf(firstItemToRemove);
            this._updateSelectedItems(newItems, index);
        };
        this._isFocusZoneInnerKeystroke = (ev) => {
            if (this.state.suggestionsVisible) {
                switch (ev.which) {
                    case KeyCodes.up:
                    case KeyCodes.down:
                        return true;
                }
            }
            if (ev.which === KeyCodes.enter) {
                return true;
            }
            return false;
        };
        const items = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
        this._id = getId();
        this._ariaMap = {
            selectedItems: `selected-items-${this._id}`,
            selectedSuggestionAlert: `selected-suggestion-alert-${this._id}`,
            suggestionList: `suggestion-list-${this._id}`
        };
        this.suggestionStore = new SuggestionsController();
        this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
        this.selection.setItems(items);
        this.state = {
            items: items,
            suggestedDisplayValue: '',
            isMostRecentlyUsedVisible: false,
            moreSuggestionsAvailable: false,
            isFocused: false,
            isSearching: false,
            selectedIndices: []
        };
    }
    get items() {
        return this.state.items;
    }
    componentWillUpdate(newProps, newState) {
        if (newState.items && newState.items !== this.state.items) {
            this.selection.setItems(newState.items);
        }
    }
    componentDidMount() {
        this.selection.setItems(this.state.items);
        this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
    }
    componentWillReceiveProps(newProps) {
        const newItems = newProps.selectedItems;
        if (newItems) {
            let focusIndex;
            if (newItems.length < this.state.items.length) {
                focusIndex = this.state.items.indexOf(this.selection.getSelection()[0]);
            }
            this.setState({
                items: newProps.selectedItems
            }, () => {
                if (this.state.isFocused) {
                    this.resetFocus(focusIndex);
                }
            });
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.currentPromise) {
            this.currentPromise = undefined;
        }
    }
    focus() {
        if (this.focusZone.current) {
            this.focusZone.current.focus();
        }
    }
    focusInput() {
        if (this.input.current) {
            this.input.current.focus();
        }
    }
    completeSuggestion() {
        if (this.suggestionStore.hasSelectedSuggestion() && this.input.current) {
            this.addItem(this.suggestionStore.currentSuggestion.item);
            this.updateValue('');
            this.input.current.clear();
        }
    }
    render() {
        const { suggestedDisplayValue, isFocused } = this.state;
        const { className, inputProps, disabled, theme, styles } = this.props;
        const selectedSuggestionAlertId = this.props.enableSelectedSuggestionAlert ? this._ariaMap.selectedSuggestionAlert : '';
        const suggestionsAvailable = this.state.suggestionsVisible ? this._ariaMap.suggestionList : '';
        const classNames = styles
            ? getClassNames(styles, {
                theme,
                className,
                isFocused,
                inputClassName: inputProps && inputProps.className
            })
            : {
                root: css('ms-BasePicker', className ? className : ''),
                text: css('ms-BasePicker-text', legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
                itemsWrapper: legacyStyles.pickerItems,
                input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
                screenReaderText: legacyStyles.screenReaderOnly
            };
        return (React.createElement("div", { ref: this.root, className: classNames.root, onKeyDown: this.onKeyDown },
            React.createElement(FocusZone, { componentRef: this.focusZone, direction: FocusZoneDirection.bidirectional, isInnerZoneKeystroke: this._isFocusZoneInnerKeystroke },
                this.getSuggestionsAlert(classNames.screenReaderText),
                React.createElement(SelectionZone, { selection: this.selection, selectionMode: SelectionMode.multiple },
                    React.createElement("div", { className: classNames.text },
                        React.createElement("span", { id: this._ariaMap.selectedItems, className: classNames.itemsWrapper, role: 'list' }, this.renderItems()),
                        this.canAddItems() && (React.createElement(Autofill, Object.assign({ spellCheck: false }, inputProps, { className: classNames.input, componentRef: this.input, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onInputValueChange: this.onInputChange, suggestedDisplayValue: suggestedDisplayValue, "aria-activedescendant": this.getActiveDescendant(), "aria-expanded": !!this.state.suggestionsVisible, "aria-haspopup": "true", "aria-describedby": this._ariaMap.selectedItems, autoCapitalize: "off", autoComplete: "off", role: 'combobox', disabled: disabled, "aria-controls": `${suggestionsAvailable} ${selectedSuggestionAlertId}` || undefined, "aria-owns": suggestionsAvailable || undefined, "aria-autocomplete": 'both', onInputChange: this.props.onInputChange })))))),
            this.renderSuggestions()));
    }
    canAddItems() {
        const { items } = this.state;
        const { itemLimit } = this.props;
        return itemLimit === undefined || items.length < itemLimit;
    }
    renderSuggestions() {
        const TypedSuggestions = this.SuggestionOfProperType;
        const StyledTypedSuggestions = styled(TypedSuggestions, suggestionsStyles, undefined, { scope: 'Suggestions' });
        return this.state.suggestionsVisible && this.input ? (React.createElement(Callout, Object.assign({ isBeakVisible: false, gapSpace: 5, target: this.input.current ? this.input.current.inputElement : undefined, onDismiss: this.dismissSuggestions, directionalHint: DirectionalHint.bottomLeftEdge, directionalHintForRTL: DirectionalHint.bottomRightEdge }, this.props.pickerCalloutProps),
            React.createElement(StyledTypedSuggestions, Object.assign({ onRenderSuggestion: this.props.onRenderSuggestionsItem, onSuggestionClick: this.onSuggestionClick, onSuggestionRemove: this.onSuggestionRemove, suggestions: this.suggestionStore.getSuggestions(), componentRef: this.suggestionElement, onGetMoreResults: this.onGetMoreResults, moreSuggestionsAvailable: this.state.moreSuggestionsAvailable, isLoading: this.state.suggestionsLoading, isSearching: this.state.isSearching, isMostRecentlyUsedVisible: this.state.isMostRecentlyUsedVisible, isResultsFooterVisible: this.state.isResultsFooterVisible, refocusSuggestions: this.refocusSuggestions, removeSuggestionAriaLabel: this.props.removeButtonAriaLabel, suggestionsListId: this._ariaMap.suggestionList }, this.props.pickerSuggestionsProps)))) : null;
    }
    renderItems() {
        const { disabled, removeButtonAriaLabel } = this.props;
        const onRenderItem = this.props.onRenderItem;
        const { items, selectedIndices } = this.state;
        return items.map((item, index) => onRenderItem({
            item,
            index,
            key: item.key ? item.key : index,
            selected: selectedIndices.indexOf(index) !== -1,
            onRemoveItem: () => this.removeItem(item, true),
            disabled: disabled,
            onItemChange: this.onItemChange,
            removeButtonAriaLabel: removeButtonAriaLabel
        }));
    }
    resetFocus(index) {
        const { items } = this.state;
        if (items.length && index >= 0) {
            const newEl = this.root.current &&
                this.root.current.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)];
            if (newEl && this.focusZone.current) {
                this.focusZone.current.focusElement(newEl);
            }
        }
        else if (!this.canAddItems()) {
            this.resetFocus(items.length - 1);
        }
        else {
            if (this.input.current) {
                this.input.current.focus();
            }
        }
    }
    onSuggestionSelect() {
        if (this.suggestionStore.currentSuggestion) {
            const currentValue = this.input.current ? this.input.current.value : '';
            const itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);
            this.setState({ suggestedDisplayValue: itemValue });
        }
    }
    onSelectionChange() {
        this.setState({
            selectedIndices: this.selection.getSelectedIndices()
        });
    }
    updateSuggestions(suggestions) {
        this.suggestionStore.updateSuggestions(suggestions, 0);
        this.forceUpdate();
    }
    onEmptyInputFocus() {
        const onEmptyInputFocus = this.props.onEmptyInputFocus;
        const suggestions = onEmptyInputFocus(this.state.items);
        this.updateSuggestionsList(suggestions);
    }
    updateValue(updatedValue) {
        this._onResolveSuggestions(updatedValue);
    }
    updateSuggestionsList(suggestions, updatedValue) {
        const suggestionsArray = suggestions;
        const suggestionsPromiseLike = suggestions;
        if (Array.isArray(suggestionsArray)) {
            this._updateAndResolveValue(updatedValue, suggestionsArray);
        }
        else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
            this.setState({
                suggestionsLoading: true
            });
            this.suggestionStore.updateSuggestions([]);
            if (updatedValue !== undefined) {
                this.setState({
                    suggestionsVisible: this.input.current
                        ? this.input.current.value !== '' && this.input.current.inputElement === document.activeElement
                        : false
                });
            }
            else {
                this.setState({
                    suggestionsVisible: this.input.current ? this.input.current.inputElement === document.activeElement : false
                });
            }
            const promise = (this.currentPromise = suggestionsPromiseLike);
            promise.then((newSuggestions) => {
                if (promise === this.currentPromise) {
                    this._updateAndResolveValue(updatedValue, newSuggestions);
                }
            });
        }
    }
    resolveNewValue(updatedValue, suggestions) {
        this.updateSuggestions(suggestions);
        let itemValue = undefined;
        if (this.suggestionStore.currentSuggestion) {
            itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
        }
        this.setState({
            suggestedDisplayValue: itemValue,
            suggestionsVisible: this.input.current
                ? this.input.current.value !== '' && this.input.current.inputElement === document.activeElement
                : false
        }, () => this.setState({ suggestionsLoading: false }));
    }
    onChange(items) {
        if (this.props.onChange) {
            this.props.onChange(items);
        }
    }
    onBackspace(ev) {
        if ((this.state.items.length && !this.input.current) ||
            (this.input.current && (!this.input.current.isValueSelected && this.input.current.cursorLocation === 0))) {
            if (this.selection.getSelectedCount() > 0) {
                this.removeItems(this.selection.getSelection());
            }
            else {
                this.removeItem(this.state.items[this.state.items.length - 1]);
            }
        }
    }
    getActiveDescendant() {
        const currentIndex = this.suggestionStore.currentIndex;
        return currentIndex > -1 && !this.state.suggestionsLoading ? 'sug-' + currentIndex : undefined;
    }
    getSuggestionsAlert(suggestionAlertClassName = legacyStyles.screenReaderOnly) {
        const currentIndex = this.suggestionStore.currentIndex;
        if (this.props.enableSelectedSuggestionAlert) {
            const selectedSuggestion = currentIndex > -1 ? this.suggestionStore.getSuggestionAtIndex(this.suggestionStore.currentIndex) : undefined;
            const selectedSuggestionAlertText = selectedSuggestion ? selectedSuggestion.ariaLabel : undefined;
            return (React.createElement("div", { className: suggestionAlertClassName, role: "alert", id: this._ariaMap.selectedSuggestionAlert, "aria-live": "assertive" },
                selectedSuggestionAlertText,
                ' '));
        }
    }
    _updateAndResolveValue(updatedValue, newSuggestions) {
        if (updatedValue !== undefined) {
            this.resolveNewValue(updatedValue, newSuggestions);
        }
        else {
            this.suggestionStore.updateSuggestions(newSuggestions, -1);
            if (this.state.suggestionsLoading) {
                this.setState({
                    suggestionsLoading: false
                });
            }
        }
    }
    _updateSelectedItems(items, focusIndex) {
        if (this.props.selectedItems) {
            this.onChange(items);
        }
        else {
            this.setState({ items: items }, () => {
                this._onSelectedItemsUpdated(items, focusIndex);
            });
        }
    }
    _onSelectedItemsUpdated(items, focusIndex) {
        this.resetFocus(focusIndex);
        this.onChange(items);
    }
    _onResolveSuggestions(updatedValue) {
        const suggestions = this.props.onResolveSuggestions(updatedValue, this.state.items);
        if (suggestions !== null) {
            this.updateSuggestionsList(suggestions, updatedValue);
        }
    }
    _onValidateInput() {
        if (this.props.onValidateInput &&
            this.input.current &&
            this.props.onValidateInput(this.input.current.value) !== ValidationState.invalid &&
            this.props.createGenericItem) {
            const itemToConvert = this.props.createGenericItem(this.input.current.value, this.props.onValidateInput(this.input.current.value));
            this.suggestionStore.createGenericSuggestion(itemToConvert);
            this.completeSuggestion();
        }
    }
    _getTextFromItem(item, currentValue) {
        if (this.props.getTextFromItem) {
            return this.props.getTextFromItem(item, currentValue);
        }
        else {
            return '';
        }
    }
}
export class BasePickerListBelow extends BasePicker {
    render() {
        const { suggestedDisplayValue, isFocused } = this.state;
        const { className, inputProps, disabled, theme, styles } = this.props;
        const selectedSuggestionAlertId = this.props.enableSelectedSuggestionAlert
            ? this._ariaMap.selectedSuggestionAlert
            : '';
        const suggestionsAvailable = this.state.suggestionsVisible ? this._ariaMap.suggestionList : '';
        const classNames = styles
            ? getClassNames(styles, {
                theme,
                className,
                isFocused,
                inputClassName: inputProps && inputProps.className
            })
            : {
                root: css('ms-BasePicker', className ? className : ''),
                text: css('ms-BasePicker-text', legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
                input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
                screenReaderText: legacyStyles.screenReaderOnly
            };
        return (React.createElement("div", { ref: this.root },
            React.createElement("div", { className: classNames.root, onKeyDown: this.onKeyDown },
                this.getSuggestionsAlert(classNames.screenReaderText),
                React.createElement("div", { className: classNames.text },
                    React.createElement(Autofill, Object.assign({}, inputProps, { className: classNames.input, componentRef: this.input, onFocus: this.onInputFocus, onBlur: this.onInputBlur, onInputValueChange: this.onInputChange, suggestedDisplayValue: suggestedDisplayValue, "aria-activedescendant": this.getActiveDescendant(), "aria-expanded": !!this.state.suggestionsVisible, "aria-haspopup": "true", autoCapitalize: "off", autoComplete: "off", role: "combobox", disabled: disabled, "aria-controls": `${suggestionsAvailable} ${selectedSuggestionAlertId}` || undefined, "aria-owns": suggestionsAvailable || undefined, onInputChange: this.props.onInputChange })))),
            this.renderSuggestions(),
            React.createElement(SelectionZone, { selection: this.selection, selectionMode: SelectionMode.single },
                React.createElement(FocusZone, { componentRef: this.focusZone, className: "ms-BasePicker-selectedItems", isCircularNavigation: true, direction: FocusZoneDirection.bidirectional, isInnerZoneKeystroke: this._isFocusZoneInnerKeystroke, id: this._ariaMap.selectedItems }, this.renderItems()))));
    }
    onBackspace(ev) {
    }
}
