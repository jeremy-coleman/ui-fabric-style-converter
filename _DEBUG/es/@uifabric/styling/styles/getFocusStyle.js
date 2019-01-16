import { HighContrastSelector } from './CommonStyles';
import { IsFocusVisibleClassName } from '@uifabric/utilities';
import { ZIndexes } from './zIndexes';
export function getFocusStyle(theme, inset = 0, position = 'relative', highContrastStyle = undefined, borderColor = theme.palette.white, outlineColor = theme.palette.neutralSecondary, isFocusedOnly = true) {
    return {
        outline: 'transparent',
        position,
        selectors: {
            '::-moz-focus-inner': {
                border: '0'
            },
            [`.${IsFocusVisibleClassName} &${isFocusedOnly ? ':focus' : ''}:after`]: {
                content: '""',
                position: 'absolute',
                left: inset + 1,
                top: inset + 1,
                bottom: inset + 1,
                right: inset + 1,
                border: '1px solid ' + borderColor,
                outline: '1px solid ' + outlineColor,
                zIndex: ZIndexes.FocusStyle,
                selectors: {
                    [HighContrastSelector]: highContrastStyle
                }
            }
        }
    };
}
export function focusClear() {
    return {
        selectors: {
            '&::-moz-focus-inner': {
                border: 0
            },
            '&': {
                outline: 'transparent'
            }
        }
    };
}
