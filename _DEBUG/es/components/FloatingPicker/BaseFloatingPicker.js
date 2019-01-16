import * as React from 'react';
import { BaseComponent, css, KeyCodes } from '../../Utilities';
import { Callout, DirectionalHint } from '../../Callout';
import { SuggestionsControl } from './Suggestions/SuggestionsControl';
let styles;
export class BaseFloatingPicker extends BaseComponent {
    constructor(basePickerProps) {
        super(basePickerProps);
        this.root = React.createRef();
        this.SuggestionsControlOfProperType = SuggestionsControl;
        this.onQueryStringChanged = (queryString) => {
            if (queryString !== this.state.queryString) {
                this.setState({
                    queryString: queryString
                });
                if (this.props.onInputChanged) {
                    this.props.onInputChanged(queryString);
                }
                this.updateValue(queryString);
            }
        };
        this.hidePicker = () => {
            if (this.props.onSuggestionsHidden && this.isSuggestionsShown) {
                this.props.onSuggestionsHidden();
            }
            this.setState({
                suggestionsVisible: false
            });
        };
        this.showPicker = (updateValue = false) => {
            if (this.props.onSuggestionsShown && !this.isSuggestionsShown) {
                this.props.onSuggestionsShown();
            }
            this.setState({
                suggestionsVisible: true
            });
            const value = this.props.inputElement ? this.props.inputElement.value : '';
            if (updateValue) {
                this.updateValue(value);
            }
        };
        this.completeSuggestion = () => {
            if (this.suggestionsControl && this.suggestionsControl.hasSuggestionSelected()) {
                this.onChange(this.suggestionsControl.currentSuggestion.item);
            }
        };
        this.onSuggestionClick = (ev, item, index) => {
            this.onChange(item);
            this._updateSuggestionsVisible(false);
        };
        this.onSuggestionRemove = (ev, item, index) => {
            if (this.props.onRemoveSuggestion) {
                this.props.onRemoveSuggestion(item);
            }
            if (this.suggestionsControl) {
                this.suggestionsControl.removeSuggestion(index);
            }
        };
        this.onKeyDown = (ev) => {
            if (!this.state.suggestionsVisible ||
                (this.props.inputElement && !this.props.inputElement.contains(ev.target))) {
                return;
            }
            const keyCode = ev.which;
            switch (keyCode) {
                case KeyCodes.escape:
                    this.hidePicker();
                    ev.preventDefault();
                    ev.stopPropagation();
                    break;
                case KeyCodes.tab:
                case KeyCodes.enter:
                    if (!ev.shiftKey && !ev.ctrlKey && this.suggestionsControl && this.suggestionsControl.handleKeyDown(keyCode)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                    else {
                        this._onValidateInput();
                    }
                    break;
                case KeyCodes.del:
                    if (this.props.onRemoveSuggestion &&
                        this.suggestionsControl &&
                        this.suggestionsControl.hasSuggestionSelected &&
                        this.suggestionsControl.currentSuggestion &&
                        ev.shiftKey) {
                        this.props.onRemoveSuggestion(this.suggestionsControl.currentSuggestion.item);
                        this.suggestionsControl.removeSuggestion();
                        this.forceUpdate();
                        ev.stopPropagation();
                    }
                    break;
                case KeyCodes.up:
                    if (this.suggestionsControl && this.suggestionsControl.handleKeyDown(keyCode)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        this._updateActiveDescendant();
                    }
                    break;
                case KeyCodes.down:
                    if (this.suggestionsControl && this.suggestionsControl.handleKeyDown(keyCode)) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        this._updateActiveDescendant();
                    }
                    break;
            }
        };
        this._onValidateInput = () => {
            if (this.state.queryString && this.props.onValidateInput && this.props.createGenericItem) {
                const itemToConvert = this.props.createGenericItem(this.state.queryString, this.props.onValidateInput(this.state.queryString));
                const convertedItems = this.suggestionStore.convertSuggestionsToSuggestionItems([itemToConvert]);
                this.onChange(convertedItems[0].item);
            }
        };
        this.suggestionStore = basePickerProps.suggestionsStore;
        this.state = {
            queryString: '',
            didBind: false
        };
    }
    get inputText() {
        return this.state.queryString;
    }
    get suggestions() {
        return this.suggestionStore.suggestions;
    }
    forceResolveSuggestion() {
        if (this.suggestionsControl && this.suggestionsControl.hasSuggestionSelected()) {
            this.completeSuggestion();
        }
        else {
            this._onValidateInput();
        }
    }
    get currentSelectedSuggestionIndex() {
        return this.suggestionsControl ? this.suggestionsControl.currentSuggestionIndex : -1;
    }
    get isSuggestionsShown() {
        return this.state.suggestionsVisible === undefined ? false : this.state.suggestionsVisible;
    }
    componentDidMount() {
        this._bindToInputElement();
        this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
    }
    componentDidUpdate() {
        this._bindToInputElement();
    }
    componentWillUnmount() {
        this._unbindFromInputElement();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.suggestionItems) {
            this.updateSuggestions(newProps.suggestionItems);
        }
    }
    updateSuggestions(suggestions, forceUpdate = false) {
        this.suggestionStore.updateSuggestions(suggestions);
        if (forceUpdate) {
            this.forceUpdate();
        }
    }
    render() {
        const { className } = this.props;
        return (React.createElement("div", { ref: this.root, className: css('ms-BasePicker ms-BaseFloatingPicker', className ? className : '') }, this.renderSuggestions()));
    }
    renderSuggestions() {
        const TypedSuggestionsControl = this.SuggestionsControlOfProperType;
        return this.state.suggestionsVisible ? (React.createElement(Callout, { className: styles.callout, isBeakVisible: false, gapSpace: 5, target: this.props.inputElement, onDismiss: this.hidePicker, directionalHint: DirectionalHint.bottomLeftEdge, directionalHintForRTL: DirectionalHint.bottomRightEdge, calloutWidth: this.props.calloutWidth ? this.props.calloutWidth : 0 },
            React.createElement(TypedSuggestionsControl, Object.assign({ onRenderSuggestion: this.props.onRenderSuggestionsItem, onSuggestionClick: this.onSuggestionClick, onSuggestionRemove: this.onSuggestionRemove, suggestions: this.suggestionStore.getSuggestions(), ref: this._resolveRef('suggestionsControl'), completeSuggestion: this.completeSuggestion, shouldLoopSelection: false }, this.props.pickerSuggestionsProps)))) : null;
    }
    onSelectionChange() {
        this.forceUpdate();
    }
    updateValue(updatedValue) {
        if (updatedValue === '') {
            this.updateSuggestionWithZeroState();
        }
        else {
            this._onResolveSuggestions(updatedValue);
        }
    }
    updateSuggestionWithZeroState() {
        if (this.props.onZeroQuerySuggestion) {
            const onEmptyInputFocus = this.props.onZeroQuerySuggestion;
            const suggestions = onEmptyInputFocus(this.props.selectedItems);
            this.updateSuggestionsList(suggestions);
        }
        else {
            this.hidePicker();
        }
    }
    updateSuggestionsList(suggestions) {
        const suggestionsArray = suggestions;
        const suggestionsPromiseLike = suggestions;
        if (Array.isArray(suggestionsArray)) {
            this.updateSuggestions(suggestionsArray, true);
        }
        else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
            const promise = (this.currentPromise = suggestionsPromiseLike);
            promise.then((newSuggestions) => {
                if (promise === this.currentPromise) {
                    this.updateSuggestions(newSuggestions, true);
                }
            });
        }
    }
    onChange(item) {
        if (this.props.onChange) {
            this.props.onChange(item);
        }
    }
    _updateActiveDescendant() {
        if (this.props.inputElement && this.suggestionsControl && this.suggestionsControl.selectedElement) {
            const selectedElId = this.suggestionsControl.selectedElement.getAttribute('id');
            if (selectedElId) {
                this.props.inputElement.setAttribute('aria-activedescendant', selectedElId);
            }
        }
    }
    _onResolveSuggestions(updatedValue) {
        const suggestions = this.props.onResolveSuggestions(updatedValue, this.props.selectedItems);
        this._updateSuggestionsVisible(true);
        if (suggestions !== null) {
            this.updateSuggestionsList(suggestions);
        }
    }
    _updateSuggestionsVisible(shouldShow) {
        if (shouldShow) {
            this.showPicker();
        }
        else {
            this.hidePicker();
        }
    }
    _bindToInputElement() {
        if (this.props.inputElement && !this.state.didBind) {
            this.props.inputElement.addEventListener('keydown', this.onKeyDown);
            this.setState({ didBind: true });
        }
    }
    _unbindFromInputElement() {
        if (this.props.inputElement && this.state.didBind) {
            this.props.inputElement.removeEventListener('keydown', this.onKeyDown);
            this.setState({ didBind: false });
        }
    }
}
