import * as React from 'react';
import { BaseComponent, css, KeyCodes } from '../../../Utilities';
import { SuggestionsCore } from './SuggestionsCore';
var styles;
export var SuggestionItemType;
(function (SuggestionItemType) {
    SuggestionItemType[SuggestionItemType["header"] = 0] = "header";
    SuggestionItemType[SuggestionItemType["suggestion"] = 1] = "suggestion";
    SuggestionItemType[SuggestionItemType["footer"] = 2] = "footer";
})(SuggestionItemType || (SuggestionItemType = {}));
export class SuggestionsHeaderFooterItem extends BaseComponent {
    render() {
        const { renderItem, onExecute, isSelected, id } = this.props;
        return onExecute ? (React.createElement("div", { id: id, onClick: onExecute, className: css('ms-Suggestions-sectionButton', styles.actionButton, {
                ['is-selected ' + styles.buttonSelected]: isSelected
            }) }, renderItem())) : (React.createElement("div", { id: id, className: css('ms-Suggestions-section', styles.suggestionsTitle) }, renderItem()));
    }
}
export class SuggestionsControl extends BaseComponent {
    constructor(suggestionsProps) {
        super(suggestionsProps);
        this.SuggestionsOfProperType = SuggestionsCore;
        this.state = {
            selectedHeaderIndex: -1,
            selectedFooterIndex: -1,
            suggestions: suggestionsProps.suggestions
        };
    }
    componentDidMount() {
        this.resetSelectedItem();
    }
    componentDidUpdate() {
        this.scrollSelected();
    }
    componentWillReceiveProps(newProps) {
        if (newProps.suggestions) {
            this.setState({ suggestions: newProps.suggestions }, () => {
                this.resetSelectedItem();
            });
        }
    }
    componentWillUnmount() {
        this._suggestions.deselectAllSuggestions();
    }
    render() {
        const { className, headerItemsProps, footerItemsProps } = this.props;
        return (React.createElement("div", { className: css('ms-Suggestions', className ? className : '', styles.root) },
            headerItemsProps && this.renderHeaderItems(),
            this._renderSuggestions(),
            footerItemsProps && this.renderFooterItems()));
    }
    get currentSuggestion() {
        return this._suggestions && this._suggestions.getCurrentItem();
    }
    get currentSuggestionIndex() {
        return this._suggestions ? this._suggestions.currentIndex : -1;
    }
    get selectedElement() {
        return this._selectedElement ? this._selectedElement : this._suggestions.selectedElement;
    }
    hasSuggestionSelected() {
        return this._suggestions && this._suggestions.hasSuggestionSelected();
    }
    hasSelection() {
        const { selectedHeaderIndex, selectedFooterIndex } = this.state;
        return selectedHeaderIndex !== -1 || this.hasSuggestionSelected() || selectedFooterIndex !== -1;
    }
    executeSelectedAction() {
        const { headerItemsProps, footerItemsProps } = this.props;
        const { selectedHeaderIndex, selectedFooterIndex } = this.state;
        if (headerItemsProps && selectedHeaderIndex !== -1 && selectedHeaderIndex < headerItemsProps.length) {
            const selectedHeaderItem = headerItemsProps[selectedHeaderIndex];
            if (selectedHeaderItem.onExecute) {
                selectedHeaderItem.onExecute();
            }
        }
        else if (this._suggestions.hasSuggestionSelected()) {
            this.props.completeSuggestion();
        }
        else if (footerItemsProps && selectedFooterIndex !== -1 && selectedFooterIndex < footerItemsProps.length) {
            const selectedFooterItem = footerItemsProps[selectedFooterIndex];
            if (selectedFooterItem.onExecute) {
                selectedFooterItem.onExecute();
            }
        }
    }
    removeSuggestion(index) {
        this._suggestions.removeSuggestion(index ? index : this._suggestions.currentIndex);
    }
    handleKeyDown(keyCode) {
        const { selectedHeaderIndex, selectedFooterIndex } = this.state;
        let isKeyDownHandled = false;
        if (keyCode === KeyCodes.down) {
            if (selectedHeaderIndex === -1 && !this._suggestions.hasSuggestionSelected() && selectedFooterIndex === -1) {
                this.selectFirstItem();
            }
            else if (selectedHeaderIndex !== -1) {
                this.selectNextItem(SuggestionItemType.header);
                isKeyDownHandled = true;
            }
            else if (this._suggestions.hasSuggestionSelected()) {
                this.selectNextItem(SuggestionItemType.suggestion);
                isKeyDownHandled = true;
            }
            else if (selectedFooterIndex !== -1) {
                this.selectNextItem(SuggestionItemType.footer);
                isKeyDownHandled = true;
            }
        }
        else if (keyCode === KeyCodes.up) {
            if (selectedHeaderIndex === -1 && !this._suggestions.hasSuggestionSelected() && selectedFooterIndex === -1) {
                this.selectLastItem();
            }
            else if (selectedHeaderIndex !== -1) {
                this.selectPreviousItem(SuggestionItemType.header);
                isKeyDownHandled = true;
            }
            else if (this._suggestions.hasSuggestionSelected()) {
                this.selectPreviousItem(SuggestionItemType.suggestion);
                isKeyDownHandled = true;
            }
            else if (selectedFooterIndex !== -1) {
                this.selectPreviousItem(SuggestionItemType.footer);
                isKeyDownHandled = true;
            }
        }
        else if (keyCode === KeyCodes.enter || keyCode === KeyCodes.tab) {
            if (this.hasSelection()) {
                this.executeSelectedAction();
                isKeyDownHandled = true;
            }
        }
        return isKeyDownHandled;
    }
    scrollSelected() {
        if (this._selectedElement) {
            this._selectedElement.scrollIntoView(false);
        }
    }
    renderHeaderItems() {
        const { headerItemsProps, suggestionsHeaderContainerAriaLabel } = this.props;
        const { selectedHeaderIndex } = this.state;
        return headerItemsProps ? (React.createElement("div", { className: css('ms-Suggestions-headerContainer', styles.suggestionsContainer), id: "suggestionHeader-list", role: "list", "aria-label": suggestionsHeaderContainerAriaLabel }, headerItemsProps.map((headerItemProps, index) => {
            const isSelected = selectedHeaderIndex !== -1 && selectedHeaderIndex === index;
            return headerItemProps.shouldShow() ? (React.createElement("div", { ref: this._resolveRef(isSelected ? '_selectedElement' : ''), id: 'sug-header' + index, key: 'sug-header' + index, role: "listitem", "aria-label": headerItemProps.ariaLabel },
                React.createElement(SuggestionsHeaderFooterItem, { id: 'sug-header-item' + index, isSelected: isSelected, renderItem: headerItemProps.renderItem, onExecute: headerItemProps.onExecute, className: headerItemProps.className }))) : null;
        }))) : null;
    }
    renderFooterItems() {
        const { footerItemsProps, suggestionsFooterContainerAriaLabel } = this.props;
        const { selectedFooterIndex } = this.state;
        return footerItemsProps ? (React.createElement("div", { className: css('ms-Suggestions-footerContainer', styles.suggestionsContainer), id: "suggestionFooter-list", role: "list", "aria-label": suggestionsFooterContainerAriaLabel }, footerItemsProps.map((footerItemProps, index) => {
            const isSelected = selectedFooterIndex !== -1 && selectedFooterIndex === index;
            return footerItemProps.shouldShow() ? (React.createElement("div", { ref: this._resolveRef(isSelected ? '_selectedElement' : ''), id: 'sug-footer' + index, key: 'sug-footer' + index, role: "listitem", "aria-label": footerItemProps.ariaLabel },
                React.createElement(SuggestionsHeaderFooterItem, { id: 'sug-footer-item' + index, isSelected: isSelected, renderItem: footerItemProps.renderItem, onExecute: footerItemProps.onExecute, className: footerItemProps.className }))) : null;
        }))) : null;
    }
    _renderSuggestions() {
        const TypedSuggestions = this.SuggestionsOfProperType;
        return (React.createElement(TypedSuggestions, Object.assign({ ref: this._resolveRef('_suggestions') }, this.props, { suggestions: this.state.suggestions })));
    }
    selectNextItem(itemType, originalItemType) {
        if (itemType === originalItemType) {
            this._selectNextItemOfItemType(itemType);
            return;
        }
        const startedItemType = originalItemType !== undefined ? originalItemType : itemType;
        const selectionChanged = this._selectNextItemOfItemType(itemType, startedItemType === itemType ? this._getCurrentIndexForType(itemType) : undefined);
        if (!selectionChanged) {
            this.selectNextItem(this._getNextItemSectionType(itemType), startedItemType);
        }
    }
    selectPreviousItem(itemType, originalItemType) {
        if (itemType === originalItemType) {
            this._selectPreviousItemOfItemType(itemType);
            return;
        }
        const startedItemType = originalItemType !== undefined ? originalItemType : itemType;
        const selectionChanged = this._selectPreviousItemOfItemType(itemType, startedItemType === itemType ? this._getCurrentIndexForType(itemType) : undefined);
        if (!selectionChanged) {
            this.selectPreviousItem(this._getPreviousItemSectionType(itemType), startedItemType);
        }
    }
    resetSelectedItem() {
        this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
        this._suggestions.deselectAllSuggestions();
        if (this.props.shouldSelectFirstItem === undefined || this.props.shouldSelectFirstItem()) {
            this.selectFirstItem();
        }
    }
    selectFirstItem() {
        if (this._selectNextItemOfItemType(SuggestionItemType.header)) {
            return;
        }
        if (this._selectNextItemOfItemType(SuggestionItemType.suggestion)) {
            return;
        }
        this._selectNextItemOfItemType(SuggestionItemType.footer);
    }
    selectLastItem() {
        if (this._selectPreviousItemOfItemType(SuggestionItemType.footer)) {
            return;
        }
        if (this._selectPreviousItemOfItemType(SuggestionItemType.suggestion)) {
            return;
        }
        this._selectPreviousItemOfItemType(SuggestionItemType.header);
    }
    _selectNextItemOfItemType(itemType, currentIndex = -1) {
        if (itemType === SuggestionItemType.suggestion) {
            if (this.state.suggestions.length > currentIndex + 1) {
                this._suggestions.setSelectedSuggestion(currentIndex + 1);
                this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
                return true;
            }
        }
        else {
            const isHeader = itemType === SuggestionItemType.header;
            const itemProps = isHeader ? this.props.headerItemsProps : this.props.footerItemsProps;
            if (itemProps && itemProps.length > currentIndex + 1) {
                for (let i = currentIndex + 1; i < itemProps.length; i++) {
                    const item = itemProps[i];
                    if (item.onExecute && item.shouldShow()) {
                        this.setState({ selectedHeaderIndex: isHeader ? i : -1 });
                        this.setState({ selectedFooterIndex: isHeader ? -1 : i });
                        this._suggestions.deselectAllSuggestions();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    _selectPreviousItemOfItemType(itemType, currentIndex) {
        if (itemType === SuggestionItemType.suggestion) {
            const index = currentIndex !== undefined ? currentIndex : this.state.suggestions.length;
            if (index > 0) {
                this._suggestions.setSelectedSuggestion(index - 1);
                this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
                return true;
            }
        }
        else {
            const isHeader = itemType === SuggestionItemType.header;
            const itemProps = isHeader ? this.props.headerItemsProps : this.props.footerItemsProps;
            if (itemProps) {
                const index = currentIndex !== undefined ? currentIndex : itemProps.length;
                if (index > 0) {
                    for (let i = index - 1; i >= 0; i--) {
                        const item = itemProps[i];
                        if (item.onExecute && item.shouldShow()) {
                            this.setState({ selectedHeaderIndex: isHeader ? i : -1 });
                            this.setState({ selectedFooterIndex: isHeader ? -1 : i });
                            this._suggestions.deselectAllSuggestions();
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    _getCurrentIndexForType(itemType) {
        switch (itemType) {
            case SuggestionItemType.header:
                return this.state.selectedHeaderIndex;
            case SuggestionItemType.suggestion:
                return this._suggestions.currentIndex;
            case SuggestionItemType.footer:
                return this.state.selectedFooterIndex;
        }
    }
    _getNextItemSectionType(itemType) {
        switch (itemType) {
            case SuggestionItemType.header:
                return SuggestionItemType.suggestion;
            case SuggestionItemType.suggestion:
                return SuggestionItemType.footer;
            case SuggestionItemType.footer:
                return SuggestionItemType.header;
        }
    }
    _getPreviousItemSectionType(itemType) {
        switch (itemType) {
            case SuggestionItemType.header:
                return SuggestionItemType.footer;
            case SuggestionItemType.suggestion:
                return SuggestionItemType.header;
            case SuggestionItemType.footer:
                return SuggestionItemType.suggestion;
        }
    }
}
