export class SuggestionsController {
    constructor() {
        this._isSuggestionModel = (value) => {
            return value.item !== undefined;
        };
        this._ensureSuggestionModel = (suggestion) => {
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
        };
        this.suggestions = [];
        this.currentIndex = -1;
    }
    updateSuggestions(newSuggestions, selectedIndex) {
        if (newSuggestions && newSuggestions.length > 0) {
            this.suggestions = this.convertSuggestionsToSuggestionItems(newSuggestions);
            this.currentIndex = selectedIndex ? selectedIndex : 0;
            if (selectedIndex === -1) {
                this.currentSuggestion = undefined;
            }
            else if (selectedIndex !== undefined) {
                this.suggestions[selectedIndex].selected = true;
                this.currentSuggestion = this.suggestions[selectedIndex];
            }
        }
        else {
            this.suggestions = [];
            this.currentIndex = -1;
            this.currentSuggestion = undefined;
        }
    }
    nextSuggestion() {
        if (this.suggestions && this.suggestions.length) {
            if (this.currentIndex < this.suggestions.length - 1) {
                this.setSelectedSuggestion(this.currentIndex + 1);
                return true;
            }
            else if (this.currentIndex === this.suggestions.length - 1) {
                this.setSelectedSuggestion(0);
                return true;
            }
        }
        return false;
    }
    previousSuggestion() {
        if (this.suggestions && this.suggestions.length) {
            if (this.currentIndex > 0) {
                this.setSelectedSuggestion(this.currentIndex - 1);
                return true;
            }
            else if (this.currentIndex === 0) {
                this.setSelectedSuggestion(this.suggestions.length - 1);
                return true;
            }
        }
        return false;
    }
    getSuggestions() {
        return this.suggestions;
    }
    getCurrentItem() {
        return this.currentSuggestion;
    }
    getSuggestionAtIndex(index) {
        return this.suggestions[index];
    }
    hasSelectedSuggestion() {
        return this.currentSuggestion ? true : false;
    }
    removeSuggestion(index) {
        this.suggestions.splice(index, 1);
    }
    createGenericSuggestion(itemToConvert) {
        const itemToAdd = this.convertSuggestionsToSuggestionItems([itemToConvert])[0];
        this.currentSuggestion = itemToAdd;
    }
    convertSuggestionsToSuggestionItems(suggestions) {
        return Array.isArray(suggestions) ? suggestions.map(this._ensureSuggestionModel) : [];
    }
    deselectAllSuggestions() {
        if (this.currentIndex > -1) {
            this.suggestions[this.currentIndex].selected = false;
            this.currentIndex = -1;
        }
    }
    setSelectedSuggestion(index) {
        if (index > this.suggestions.length - 1 || index < 0) {
            this.currentIndex = 0;
            this.currentSuggestion.selected = false;
            this.currentSuggestion = this.suggestions[0];
            this.currentSuggestion.selected = true;
        }
        else {
            if (this.currentIndex > -1) {
                this.suggestions[this.currentIndex].selected = false;
            }
            this.suggestions[index].selected = true;
            this.currentIndex = index;
            this.currentSuggestion = this.suggestions[index];
        }
    }
}
