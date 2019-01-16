import * as React from 'react';
import { styled, classNamesFunction } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { getStyles } from './TagItem.styles';
const getClassNames = classNamesFunction();
export const TagItemBase = (props) => {
    const { theme, styles, selected, disabled, enableTagFocusInDisabledPicker, children, className, index, onRemoveItem } = props;
    const classNames = getClassNames(styles, {
        theme: theme,
        className,
        selected
    });
    return (React.createElement("div", { className: classNames.root, role: 'listitem', key: index, "data-selection-index": index, "data-is-focusable": (enableTagFocusInDisabledPicker || !disabled) && true },
        React.createElement("span", { className: classNames.text, "aria-label": children }, children),
        !disabled && (React.createElement("span", { className: classNames.close, onClick: onRemoveItem },
            React.createElement(Icon, { iconName: "Cancel" })))));
};
export const TagItem = styled(TagItemBase, getStyles, undefined, { scope: 'TagItem' });
