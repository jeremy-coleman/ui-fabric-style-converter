import { memoizeFunction } from '../../Utilities';
import { mergeStyles } from '../../Styling';
import { Position } from '../../utilities/positioning';
export const getClassNames = memoizeFunction((styles, disabled, isFocused, keyboardSpinDirection, labelPosition = Position.start, className = undefined) => {
    return {
        root: mergeStyles(styles.root, className),
        labelWrapper: mergeStyles(styles.labelWrapper, _getStyleForLabelBasedOnPosition(labelPosition, styles)),
        icon: mergeStyles(styles.icon, disabled && styles.iconDisabled),
        label: mergeStyles(styles.label, disabled && styles.labelDisabled),
        spinButtonWrapper: mergeStyles(styles.spinButtonWrapper, _getStyleForRootBasedOnPosition(labelPosition, styles), !disabled && [
            {
                selectors: {
                    ':hover': styles.spinButtonWrapperHovered
                }
            },
            isFocused && {
                selectors: {
                    '&&': styles.spinButtonWrapperFocused
                }
            }
        ], disabled && styles.spinButtonWrapperDisabled),
        input: mergeStyles('ms-spinButton-input', styles.input, !disabled && {
            selectors: {
                '::selection': styles.inputTextSelected
            }
        }, disabled && styles.inputDisabled),
        arrowBox: mergeStyles(styles.arrowButtonsContainer, disabled && styles.arrowButtonsContainerDisabled)
    };
});
function _getStyleForLabelBasedOnPosition(labelPosition, styles) {
    switch (labelPosition) {
        case Position.start:
            return styles.labelWrapperStart;
        case Position.end:
            return styles.labelWrapperEnd;
        case Position.top:
            return styles.labelWrapperTop;
        case Position.bottom:
            return styles.labelWrapperBottom;
    }
}
function _getStyleForRootBasedOnPosition(labelPosition, styles) {
    switch (labelPosition) {
        case Position.top:
        case Position.bottom:
            return styles.spinButtonWrapperTopBottom;
        default:
            return {};
    }
}
