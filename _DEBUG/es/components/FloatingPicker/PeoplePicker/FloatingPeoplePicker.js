import { getRTL, getInitials } from '../../../Utilities';
import { BaseFloatingPicker } from '../BaseFloatingPicker';
import { SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
export class BaseFloatingPeoplePicker extends BaseFloatingPicker {
}
export class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
}
FloatingPeoplePicker.defaultProps = {
    onRenderSuggestionsItem: (props, itemProps) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createItem
};
export function createItem(name, isValid) {
    const personaToConvert = {
        key: name,
        primaryText: name,
        imageInitials: '!',
        isValid: isValid
    };
    if (!isValid) {
        personaToConvert.imageInitials = getInitials(name, getRTL());
    }
    return personaToConvert;
}
