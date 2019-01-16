import * as React from 'react';
import { styled } from '../../../Utilities';
import { BasePicker } from '../BasePicker';
import { getStyles } from '../BasePicker.styles';
import { TagItem } from './TagItem';
import { TagItemSuggestion } from './TagItemSuggestion';
export class TagPickerBase extends BasePicker {
}
TagPickerBase.defaultProps = {
    onRenderItem: (props) => React.createElement(TagItem, Object.assign({}, props), props.item.name),
    onRenderSuggestionsItem: (props) => React.createElement(TagItemSuggestion, null, props.name)
};
export const TagPicker = styled(TagPickerBase, getStyles, undefined, {
    scope: 'TagPicker'
});
