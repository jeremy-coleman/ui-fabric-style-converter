import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, css, autobind } from '../../../Utilities';
import { SuggestionsItem } from '../../../Pickers';
let styles;
export class SuggestionsCore extends BaseComponent {
    constructor(suggestionsProps) {
        super(suggestionsProps);
        this.SuggestionsItemOfProperType = SuggestionsItem;
        this.currentIndex = -1;
    }
    nextSuggestion() {
        const { suggestions } = this.props;
        if (suggestions && suggestions.length > 0) {
            if (this.currentIndex === -1) {
                this.setSelectedSuggestion(0);
                return true;
            }
            else if (this.currentIndex < suggestions.length - 1) {
                this.setSelectedSuggestion(this.currentIndex + 1);
                return true;
            }
            else if (this.props.shouldLoopSelection && this.currentIndex === suggestions.length - 1) {
                this.setSelectedSuggestion(0);
                return true;
            }
        }
        return false;
    }
    previousSuggestion() {
        const { suggestions } = this.props;
        if (suggestions && suggestions.length > 0) {
            if (this.currentIndex === -1) {
                this.setSelectedSuggestion(suggestions.length - 1);
                return true;
            }
            else if (this.currentIndex > 0) {
                this.setSelectedSuggestion(this.currentIndex - 1);
                return true;
            }
            else if (this.props.shouldLoopSelection && this.currentIndex === 0) {
                this.setSelectedSuggestion(suggestions.length - 1);
                return true;
            }
        }
        return false;
    }
    get selectedElement() {
        return this._selectedElement;
    }
    getCurrentItem() {
        return this.props.suggestions[this.currentIndex];
    }
    getSuggestionAtIndex(index) {
        return this.props.suggestions[index];
    }
    hasSuggestionSelected() {
        return this.currentIndex !== -1 && this.currentIndex < this.props.suggestions.length;
    }
    removeSuggestion(index) {
        this.props.suggestions.splice(index, 1);
    }
    deselectAllSuggestions() {
        if (this.currentIndex > -1 && this.props.suggestions[this.currentIndex]) {
            this.props.suggestions[this.currentIndex].selected = false;
            this.currentIndex = -1;
            this.forceUpdate();
        }
    }
    setSelectedSuggestion(index) {
        const { suggestions } = this.props;
        if (index > suggestions.length - 1 || index < 0) {
            this.currentIndex = 0;
            this.currentSuggestion.selected = false;
            this.currentSuggestion = suggestions[0];
            this.currentSuggestion.selected = true;
        }
        else {
            if (this.currentIndex > -1 && suggestions[this.currentIndex]) {
                suggestions[this.currentIndex].selected = false;
            }
            suggestions[index].selected = true;
            this.currentIndex = index;
            this.currentSuggestion = suggestions[index];
        }
        this.forceUpdate();
    }
    componentDidUpdate() {
        this.scrollSelected();
    }
    render() {
        const { onRenderSuggestion, suggestionsItemClassName, resultsMaximumNumber, showRemoveButtons, suggestionsContainerAriaLabel } = this.props;
        const TypedSuggestionsItem = this.SuggestionsItemOfProperType;
        let { suggestions } = this.props;
        if (resultsMaximumNumber) {
            suggestions = suggestions.slice(0, resultsMaximumNumber);
        }
        return (React.createElement("div", { className: css('ms-Suggestions-container', styles.suggestionsContainer), id: "suggestion-list", role: "list", "aria-label": suggestionsContainerAriaLabel }, suggestions.map((suggestion, index) => (React.createElement("div", { ref: this._resolveRef(suggestion.selected || index === this.currentIndex ? '_selectedElement' : ''), key: suggestion.item['key'] ? suggestion.item['key'] : index, id: 'sug-' + index, role: "listitem", "aria-label": suggestion.ariaLabel },
            React.createElement(TypedSuggestionsItem, { id: 'sug-item' + index, suggestionModel: suggestion, RenderSuggestion: onRenderSuggestion, onClick: this._onClickTypedSuggestionsItem(suggestion.item, index), className: suggestionsItemClassName, showRemoveButton: showRemoveButtons, onRemoveItem: this._onRemoveTypedSuggestionsItem(suggestion.item, index), isSelectedOverride: index === this.currentIndex }))))));
    }
    scrollSelected() {
        if (this._selectedElement && this._selectedElement.scrollIntoView !== undefined) {
            this._selectedElement.scrollIntoView(false);
        }
    }
    _onClickTypedSuggestionsItem(item, index) {
        return (ev) => {
            this.props.onSuggestionClick(ev, item, index);
        };
    }
    _onRemoveTypedSuggestionsItem(item, index) {
        return (ev) => {
            const onSuggestionRemove = this.props.onSuggestionRemove;
            onSuggestionRemove(ev, item, index);
            ev.stopPropagation();
        };
    }
}
tslib_1.__decorate([
    autobind
], SuggestionsCore.prototype, "_onClickTypedSuggestionsItem", null);
tslib_1.__decorate([
    autobind
], SuggestionsCore.prototype, "_onRemoveTypedSuggestionsItem", null);
