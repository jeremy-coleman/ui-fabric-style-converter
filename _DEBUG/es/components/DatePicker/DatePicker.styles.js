import { normalize, getGlobalClassNames, FontSizes } from '../../Styling';
const GlobalClassNames = {
    root: 'ms-DatePicker',
    callout: 'ms-DatePicker-callout',
    withLabel: 'ms-DatePicker-event--with-label',
    withoutLabel: 'ms-DatePicker-event--without-label',
    disabled: 'msDatePickerDisabled '
};
export const styles = (props) => {
    const { className, theme, disabled, label, isDatePickerShown } = props;
    const { palette } = theme;
    const classNames = getGlobalClassNames(GlobalClassNames, theme);
    const DatePickerEvent = {
        color: palette.neutralSecondary,
        fontSize: FontSizes.icon,
        lineHeight: '18px',
        pointerEvents: 'none',
        position: 'absolute',
        right: '9px'
    };
    return {
        root: [classNames.root, theme.fonts.medium, isDatePickerShown && 'is-open', normalize, className],
        textField: [
            {
                position: 'relative',
                selectors: {
                    '& input[readonly]': {
                        cursor: 'pointer'
                    },
                    input: {
                        selectors: {
                            '::-ms-clear': {
                                display: 'none'
                            }
                        }
                    }
                }
            }
        ],
        callout: [classNames.callout],
        icon: [
            DatePickerEvent,
            !label && [classNames.withoutLabel, { top: '7px' }],
            label && [classNames.withLabel, { bottom: '5px' }],
            !disabled && [
                classNames.disabled,
                {
                    pointerEvents: 'initial',
                    cursor: 'pointer'
                }
            ]
        ]
    };
};
