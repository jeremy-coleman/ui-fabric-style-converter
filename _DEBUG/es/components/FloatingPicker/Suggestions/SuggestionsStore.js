import * as tslib_1 from "tslib";
import { autobind } from '../../../Utilities';
export class SuggestionsStore {
    constructor() {
        this.suggestions = [];
    }
    updateSuggestions(newSuggestions) {
        if (newSuggestions && newSuggestions.length > 0) {
            this.suggestions = this.convertSuggestionsToSuggestionItems(newSuggestions);
        }
        else {
            this.suggestions = [];
        }
    }
    getSuggestions() {
        return this.suggestions;
    }
    getSuggestionAtIndex(index) {
        return this.suggestions[index];
    }
    removeSuggestion(index) {
        this.suggestions.splice(index, 1);
    }
    convertSuggestionsToSuggestionItems(suggestions) {
        return Array.isArray(suggestions) ? suggestions.map(this._ensureSuggestionModel) : [];
    }
    _isSuggestionModel(value) {
        return value.item !== undefined;
    }
    _ensureSuggestionModel(suggestion) {
        if (this._isSuggestionModel(suggestion)) {
            return suggestion;
        }
        else {
            return {
                item: suggestion,
                selected: false,
                ariaLabel: suggestion.name || suggestion.primaryText
            };
        }
    }
}
tslib_1.__decorate([
    autobind
], SuggestionsStore.prototype, "_isSuggestionModel", null);
tslib_1.__decorate([
    autobind
], SuggestionsStore.prototype, "_ensureSuggestionModel", null);
