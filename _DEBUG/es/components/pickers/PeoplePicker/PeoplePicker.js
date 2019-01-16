import * as React from 'react';
import { getRTL, getInitials, styled } from '../../../Utilities';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { ValidationState } from '../BasePicker.types';
import { PeoplePickerItem } from './PeoplePickerItems/PeoplePickerItem';
import { PeoplePickerItemSuggestion } from './PeoplePickerItems/PeoplePickerItemSuggestion';
import { getStyles } from '../BasePicker.styles';
export class BasePeoplePicker extends BasePicker {
}
export class MemberListPeoplePicker extends BasePickerListBelow {
}
export class NormalPeoplePickerBase extends BasePeoplePicker {
}
NormalPeoplePickerBase.defaultProps = {
    onRenderItem: (props) => React.createElement(PeoplePickerItem, Object.assign({}, props)),
    onRenderSuggestionsItem: (personaProps, suggestionsProps) => (React.createElement(PeoplePickerItemSuggestion, { personaProps: personaProps, suggestionsProps: suggestionsProps })),
    createGenericItem: createGenericItem
};
export class CompactPeoplePickerBase extends BasePeoplePicker {
}
CompactPeoplePickerBase.defaultProps = {
    onRenderItem: (props) => React.createElement(PeoplePickerItem, Object.assign({}, props)),
    onRenderSuggestionsItem: (personaProps, suggestionsProps) => (React.createElement(PeoplePickerItemSuggestion, { personaProps: personaProps, suggestionsProps: suggestionsProps, compact: true })),
    createGenericItem: createGenericItem
};
export class ListPeoplePickerBase extends MemberListPeoplePicker {
}
ListPeoplePickerBase.defaultProps = {
    onRenderItem: (props) => React.createElement(PeoplePickerItem, Object.assign({}, props)),
    onRenderSuggestionsItem: (personaProps, suggestionsProps) => (React.createElement(PeoplePickerItemSuggestion, { personaProps: personaProps, suggestionsProps: suggestionsProps })),
    createGenericItem: createGenericItem
};
export function createGenericItem(name, currentValidationState) {
    const personaToConvert = {
        key: name,
        primaryText: name,
        imageInitials: '!',
        ValidationState: currentValidationState
    };
    if (currentValidationState !== ValidationState.warning) {
        personaToConvert.imageInitials = getInitials(name, getRTL());
    }
    return personaToConvert;
}
export const NormalPeoplePicker = styled(NormalPeoplePickerBase, getStyles, undefined, {
    scope: 'NormalPeoplePicker'
});
export const CompactPeoplePicker = styled(CompactPeoplePickerBase, getStyles, undefined, {
    scope: 'CompactPeoplePicker'
});
export const ListPeoplePicker = styled(ListPeoplePickerBase, getStyles, undefined, {
    scope: 'ListPeoplePickerBase'
});
