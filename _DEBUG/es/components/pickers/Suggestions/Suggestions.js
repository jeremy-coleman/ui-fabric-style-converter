import * as React from 'react';
import { BaseComponent, KeyCodes, classNamesFunction, css, styled } from '../../../Utilities';
import { CommandButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { SuggestionActionType } from './Suggestions.types';
import { SuggestionsItem } from './SuggestionsItem';
import { getStyles as suggestionsItemStyles } from './SuggestionsItem.styles';
let legacyStyles;
let styles;
const getClassNames = classNamesFunction();
export class Suggestions extends BaseComponent {
    constructor(suggestionsProps) {
        super(suggestionsProps);
        this._forceResolveButton = React.createRef();
        this._searchForMoreButton = React.createRef();
        this._selectedElement = React.createRef();
        this.SuggestionsItemOfProperType = SuggestionsItem;
        this.tryHandleKeyDown = (keyCode, currentSuggestionIndex) => {
            let isEventHandled = false;
            let newSelectedActionType = null;
            const currentSelectedAction = this.state.selectedActionType;
            const suggestionLength = this.props.suggestions.length;
            if (keyCode === KeyCodes.down) {
                switch (currentSelectedAction) {
                    case SuggestionActionType.forceResolve:
                        if (suggestionLength > 0) {
                            this._refocusOnSuggestions(keyCode);
                            newSelectedActionType = SuggestionActionType.none;
                        }
                        else if (this._searchForMoreButton.current) {
                            newSelectedActionType = SuggestionActionType.searchMore;
                        }
                        else {
                            newSelectedActionType = SuggestionActionType.forceResolve;
                        }
                        break;
                    case SuggestionActionType.searchMore:
                        if (this._forceResolveButton.current) {
                            newSelectedActionType = SuggestionActionType.forceResolve;
                        }
                        else if (suggestionLength > 0) {
                            this._refocusOnSuggestions(keyCode);
                            newSelectedActionType = SuggestionActionType.none;
                        }
                        else {
                            newSelectedActionType = SuggestionActionType.searchMore;
                        }
                        break;
                    case SuggestionActionType.none:
                        if (currentSuggestionIndex === -1 && this._forceResolveButton.current) {
                            newSelectedActionType = SuggestionActionType.forceResolve;
                        }
                        break;
                }
            }
            else if (keyCode === KeyCodes.up) {
                switch (currentSelectedAction) {
                    case SuggestionActionType.forceResolve:
                        if (this._searchForMoreButton.current) {
                            newSelectedActionType = SuggestionActionType.searchMore;
                        }
                        else if (suggestionLength > 0) {
                            this._refocusOnSuggestions(keyCode);
                            newSelectedActionType = SuggestionActionType.none;
                        }
                        break;
                    case SuggestionActionType.searchMore:
                        if (suggestionLength > 0) {
                            this._refocusOnSuggestions(keyCode);
                            newSelectedActionType = SuggestionActionType.none;
                        }
                        else if (this._forceResolveButton.current) {
                            newSelectedActionType = SuggestionActionType.forceResolve;
                        }
                        break;
                    case SuggestionActionType.none:
                        if (currentSuggestionIndex === -1 && this._searchForMoreButton.current) {
                            newSelectedActionType = SuggestionActionType.searchMore;
                        }
                        break;
                }
            }
            if (newSelectedActionType !== null) {
                this.setState({ selectedActionType: newSelectedActionType });
                isEventHandled = true;
            }
            return isEventHandled;
        };
        this._getMoreResults = () => {
            if (this.props.onGetMoreResults) {
                this.props.onGetMoreResults();
            }
        };
        this._forceResolve = () => {
            if (this.props.createGenericItem) {
                this.props.createGenericItem();
            }
        };
        this._shouldShowForceResolve = () => {
            return this.props.showForceResolve ? this.props.showForceResolve() : false;
        };
        this._onClickTypedSuggestionsItem = (item, index) => {
            return (ev) => {
                this.props.onSuggestionClick(ev, item, index);
            };
        };
        this._refocusOnSuggestions = (keyCode) => {
            if (typeof this.props.refocusSuggestions === 'function') {
                this.props.refocusSuggestions(keyCode);
            }
        };
        this._onRemoveTypedSuggestionsItem = (item, index) => {
            return (ev) => {
                const onSuggestionRemove = this.props.onSuggestionRemove;
                onSuggestionRemove(ev, item, index);
                ev.stopPropagation();
            };
        };
        this.state = {
            selectedActionType: SuggestionActionType.none
        };
    }
    componentDidMount() {
        this.scrollSelected();
        this.activeSelectedElement = this._selectedElement ? this._selectedElement.current : null;
    }
    componentDidUpdate() {
        if (this._selectedElement.current && this.activeSelectedElement !== this._selectedElement.current) {
            this.scrollSelected();
            this.activeSelectedElement = this._selectedElement.current;
        }
    }
    render() {
        const { forceResolveText, mostRecentlyUsedHeaderText, searchForMoreText, className, moreSuggestionsAvailable, noResultsFoundText, suggestions, isLoading, isSearching, loadingText, onRenderNoResultFound, searchingText, isMostRecentlyUsedVisible, resultsMaximumNumber, resultsFooterFull, resultsFooter, isResultsFooterVisible = true, suggestionsAvailableAlertText, suggestionsHeaderText, suggestionsClassName, theme, styles } = this.props;
        this._classNames = styles
            ? getClassNames(styles, {
                theme: theme,
                className,
                suggestionsClassName,
                forceResolveButtonSelected: this.state.selectedActionType === SuggestionActionType.forceResolve,
                searchForMoreButtonSelected: this.state.selectedActionType === SuggestionActionType.searchMore
            })
            : {
                root: css('ms-Suggestions', className, legacyStyles.root),
                title: css('ms-Suggestions-title', legacyStyles.suggestionsTitle),
                searchForMoreButton: css('ms-SearchMore-button', legacyStyles.actionButton, {
                    ['is-selected ' + legacyStyles.buttonSelected]: this.state.selectedActionType === SuggestionActionType.searchMore
                }),
                forceResolveButton: css('ms-forceResolve-button', legacyStyles.actionButton, {
                    ['is-selected ' + legacyStyles.buttonSelected]: this.state.selectedActionType === SuggestionActionType.forceResolve
                }),
                suggestionsAvailable: css('ms-Suggestions-suggestionsAvailable', legacyStyles.suggestionsAvailable),
                suggestionsContainer: css('ms-Suggestions-container', legacyStyles.suggestionsContainer, suggestionsClassName),
                noSuggestions: css('ms-Suggestions-none', legacyStyles.suggestionsNone)
            };
        const spinnerStyles = this._classNames.subComponentStyles
            ? this._classNames.subComponentStyles.spinner
            : undefined;
        const spinnerClassNameOrStyles = styles
            ? { styles: spinnerStyles }
            : { className: css('ms-Suggestions-spinner', legacyStyles.suggestionsSpinner) };
        const noResults = () => {
            return noResultsFoundText ? (React.createElement("div", { role: "alert", className: this._classNames.noSuggestions }, noResultsFoundText)) : null;
        };
        let headerText = suggestionsHeaderText;
        if (isMostRecentlyUsedVisible && mostRecentlyUsedHeaderText) {
            headerText = mostRecentlyUsedHeaderText;
        }
        let footerTitle = undefined;
        if (isResultsFooterVisible) {
            footerTitle = suggestions.length >= resultsMaximumNumber ? resultsFooterFull : resultsFooter;
        }
        const hasNoSuggestions = (!suggestions || !suggestions.length) && !isLoading;
        return (React.createElement("div", { className: this._classNames.root },
            headerText ? React.createElement("div", { className: this._classNames.title }, headerText) : null,
            forceResolveText && this._shouldShowForceResolve() && (React.createElement(CommandButton, { componentRef: this._forceResolveButton, className: this._classNames.forceResolveButton, onClick: this._forceResolve }, forceResolveText)),
            isLoading && React.createElement(Spinner, Object.assign({}, spinnerClassNameOrStyles, { label: loadingText })),
            hasNoSuggestions ? (onRenderNoResultFound ? onRenderNoResultFound(undefined, noResults) : noResults()) : this._renderSuggestions(),
            searchForMoreText && moreSuggestionsAvailable && (React.createElement(CommandButton, { componentRef: this._searchForMoreButton, className: this._classNames.searchForMoreButton, iconProps: { iconName: 'Search' }, onClick: this._getMoreResults }, searchForMoreText)),
            isSearching ? React.createElement(Spinner, Object.assign({}, spinnerClassNameOrStyles, { label: searchingText })) : null,
            footerTitle && !moreSuggestionsAvailable && !isMostRecentlyUsedVisible && !isSearching ? (React.createElement("div", { className: this._classNames.title }, footerTitle(this.props))) : null,
            React.createElement("span", { role: "alert", "aria-live": "polite", className: this._classNames.suggestionsAvailable }, !isLoading && !isSearching && suggestions && suggestions.length > 0 && suggestionsAvailableAlertText
                ? suggestionsAvailableAlertText
                : null)));
    }
    hasSuggestedAction() {
        return this._searchForMoreButton.current !== undefined || this._forceResolveButton.current !== undefined;
    }
    hasSuggestedActionSelected() {
        return this.state.selectedActionType !== SuggestionActionType.none;
    }
    executeSelectedAction() {
        switch (this.state.selectedActionType) {
            case SuggestionActionType.forceResolve:
                this._forceResolve();
                break;
            case SuggestionActionType.searchMore:
                this._getMoreResults();
                break;
        }
    }
    focusAboveSuggestions() {
        if (this._forceResolveButton.current) {
            this.setState({ selectedActionType: SuggestionActionType.forceResolve });
        }
        else if (this._searchForMoreButton.current) {
            this.setState({ selectedActionType: SuggestionActionType.searchMore });
        }
    }
    focusBelowSuggestions() {
        if (this._searchForMoreButton.current) {
            this.setState({ selectedActionType: SuggestionActionType.searchMore });
        }
        else if (this._forceResolveButton.current) {
            this.setState({ selectedActionType: SuggestionActionType.forceResolve });
        }
    }
    focusSearchForMoreButton() {
        if (this._searchForMoreButton.current) {
            this._searchForMoreButton.current.focus();
        }
    }
    scrollSelected() {
        if (this._selectedElement.current && this._selectedElement.current.scrollIntoView !== undefined) {
            this._selectedElement.current.scrollIntoView(false);
        }
    }
    _renderSuggestions() {
        const { onRenderSuggestion, removeSuggestionAriaLabel, suggestionsItemClassName, resultsMaximumNumber, showRemoveButtons, suggestionsContainerAriaLabel, suggestionsListId } = this.props;
        let { suggestions } = this.props;
        const TypedSuggestionsItem = this.SuggestionsItemOfProperType;
        const StyledTypedSuggestionsItem = styled(TypedSuggestionsItem, suggestionsItemStyles, undefined, {
            scope: 'SuggestionItem'
        });
        if (resultsMaximumNumber) {
            suggestions = suggestions.slice(0, resultsMaximumNumber);
        }
        if (suggestions.length === 0) {
            return null;
        }
        return (React.createElement("div", { className: this._classNames.suggestionsContainer, id: suggestionsListId, role: "listbox", "aria-label": suggestionsContainerAriaLabel }, suggestions.map((suggestion, index) => (React.createElement("div", { ref: suggestion.selected ? this._selectedElement : '', key: suggestion.item['key'] ? suggestion.item['key'] : index, id: 'sug-' + index, "aria-selected": suggestion.selected, role: "option", "aria-label": suggestion.ariaLabel },
            React.createElement(StyledTypedSuggestionsItem, { suggestionModel: suggestion, RenderSuggestion: onRenderSuggestion, onClick: this._onClickTypedSuggestionsItem(suggestion.item, index), className: suggestionsItemClassName, showRemoveButton: showRemoveButtons, removeButtonAriaLabel: removeSuggestionAriaLabel, onRemoveItem: this._onRemoveTypedSuggestionsItem(suggestion.item, index) }))))));
    }
}
