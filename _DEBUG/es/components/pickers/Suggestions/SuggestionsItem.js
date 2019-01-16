import * as React from 'react';
import { classNamesFunction, BaseComponent, css } from '../../../Utilities';
import { CommandButton, IconButton } from '../../../Button';
let legacyStyles;
let styles;
const getClassNames = classNamesFunction();
export class SuggestionsItem extends BaseComponent {
    render() {
        const { suggestionModel, RenderSuggestion, onClick, className, onRemoveItem, isSelectedOverride, removeButtonAriaLabel, styles, theme } = this.props;
        const classNames = styles
            ? getClassNames(styles, {
                theme: theme,
                className,
                suggested: suggestionModel.selected || isSelectedOverride
            })
            : {
                root: css('ms-Suggestions-item', legacyStyles.suggestionsItem, {
                    ['is-suggested ' + legacyStyles.suggestionsItemIsSuggested]: suggestionModel.selected || isSelectedOverride
                }, className),
                itemButton: css('ms-Suggestions-itemButton', legacyStyles.itemButton),
                closeButton: css('ms-Suggestions-closeButton', legacyStyles.closeButton)
            };
        return (React.createElement("div", { className: classNames.root },
            React.createElement(CommandButton, { onClick: onClick, className: classNames.itemButton }, RenderSuggestion(suggestionModel.item, this.props)),
            this.props.showRemoveButton ? (React.createElement(IconButton, { iconProps: { iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }, title: removeButtonAriaLabel, ariaLabel: removeButtonAriaLabel, onClick: onRemoveItem, className: classNames.closeButton })) : null));
    }
}
