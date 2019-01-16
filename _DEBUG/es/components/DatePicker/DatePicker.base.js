import * as React from 'react';
import { BaseComponent, KeyCodes, classNamesFunction, getId, getNativeProps, divProperties, css } from '../../Utilities';
import { Calendar, DayOfWeek } from '../../Calendar';
import { FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { TextField } from '../../TextField';
import { compareDates, compareDatePart } from '../../utilities/dateMath/DateMath';
import { FocusTrapZone } from '../../FocusTrapZone';
const getClassNames = classNamesFunction();
const DEFAULT_STRINGS = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker'
};
export class DatePickerBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._calendar = React.createRef();
        this._datePickerDiv = React.createRef();
        this._textField = React.createRef();
        this._onSelectDate = (date) => {
            const { formatDate, onSelectDate } = this.props;
            if (this.props.calendarProps && this.props.calendarProps.onSelectDate) {
                this.props.calendarProps.onSelectDate(date);
            }
            this.setState({
                selectedDate: date,
                formattedDate: formatDate && date ? formatDate(date) : ''
            });
            if (onSelectDate) {
                onSelectDate(date);
            }
            this._calendarDismissed();
        };
        this._onCalloutPositioned = () => {
            if (this._calendar.current && !this.props.disableAutoFocus) {
                this._calendar.current.focus();
            }
        };
        this._onTextFieldFocus = (ev) => {
            if (this.props.disableAutoFocus) {
                return;
            }
            if (!this.props.allowTextInput) {
                if (!this._preventFocusOpeningPicker) {
                    this._showDatePickerPopup();
                }
                else {
                    this._preventFocusOpeningPicker = false;
                }
            }
        };
        this._onTextFieldBlur = (ev) => {
            this._validateTextInput();
        };
        this._onTextFieldChanged = (ev, newValue) => {
            if (this.props.allowTextInput) {
                if (this.state.isDatePickerShown) {
                    this._dismissDatePickerPopup();
                }
                const { isRequired, value, strings } = this.props;
                this.setState({
                    errorMessage: isRequired && !value ? strings.isRequiredErrorMessage || ' ' : undefined,
                    formattedDate: newValue
                });
            }
        };
        this._onTextFieldKeyDown = (ev) => {
            switch (ev.which) {
                case KeyCodes.enter:
                    ev.preventDefault();
                    ev.stopPropagation();
                    if (!this.state.isDatePickerShown) {
                        this._validateTextInput();
                        this._showDatePickerPopup();
                    }
                    else {
                        if (this.props.allowTextInput) {
                            this._dismissDatePickerPopup();
                        }
                    }
                    break;
                case KeyCodes.escape:
                    this._handleEscKey(ev);
                    break;
                default:
                    break;
            }
        };
        this._onTextFieldClick = (ev) => {
            if (!this.state.isDatePickerShown && !this.props.disabled) {
                this._showDatePickerPopup();
            }
            else {
                if (this.props.allowTextInput) {
                    this.setState({
                        isDatePickerShown: false
                    });
                }
            }
        };
        this._onIconClick = (ev) => {
            ev.stopPropagation();
            this._onTextFieldClick(ev);
        };
        this._dismissDatePickerPopup = () => {
            if (this.state.isDatePickerShown) {
                this.setState({
                    isDatePickerShown: false
                }, () => {
                    this._validateTextInput();
                });
            }
        };
        this._calendarDismissed = () => {
            this._preventFocusOpeningPicker = true;
            this._dismissDatePickerPopup();
        };
        this._handleEscKey = (ev) => {
            ev.stopPropagation();
            this._calendarDismissed();
        };
        this._validateTextInput = () => {
            const { isRequired, allowTextInput, strings, parseDateFromString, onSelectDate, formatDate, minDate, maxDate } = this.props;
            const inputValue = this.state.formattedDate;
            if (this.state.isDatePickerShown) {
                return;
            }
            if (allowTextInput) {
                let date = null;
                if (inputValue) {
                    if (this.state.selectedDate && formatDate && formatDate(this.state.selectedDate) === inputValue) {
                        date = this.state.selectedDate;
                    }
                    else {
                        date = parseDateFromString(inputValue);
                        if (!date || isNaN(date.getTime())) {
                            if (formatDate) {
                                date = this.state.selectedDate;
                                this.setState({
                                    formattedDate: formatDate(date).toString()
                                });
                            }
                            this.setState({
                                errorMessage: strings.invalidInputErrorMessage || ' '
                            });
                        }
                        else {
                            if (this._isDateOutOfBounds(date, minDate, maxDate)) {
                                this.setState({
                                    errorMessage: strings.isOutOfBoundsErrorMessage || ' '
                                });
                            }
                            else {
                                this.setState({
                                    selectedDate: date,
                                    errorMessage: ''
                                });
                                if (formatDate && formatDate(date) !== inputValue) {
                                    this.setState({
                                        formattedDate: formatDate(date).toString()
                                    });
                                }
                            }
                        }
                    }
                }
                else {
                    this.setState({
                        errorMessage: isRequired ? strings.isRequiredErrorMessage || ' ' : ''
                    });
                }
                if (onSelectDate) {
                    onSelectDate(date);
                }
            }
            else if (isRequired && !inputValue) {
                this.setState({
                    errorMessage: strings.isRequiredErrorMessage || ' '
                });
            }
        };
        this.state = this._getDefaultState();
        this._id = props.id || getId('DatePicker');
        this._preventFocusOpeningPicker = false;
    }
    componentWillReceiveProps(nextProps) {
        const { formatDate, isRequired, strings, value, minDate, maxDate } = nextProps;
        if (compareDates(this.props.minDate, nextProps.minDate) &&
            compareDates(this.props.maxDate, nextProps.maxDate) &&
            this.props.isRequired === nextProps.isRequired &&
            compareDates(this.state.selectedDate, value) &&
            this.props.formatDate === formatDate) {
            return;
        }
        let errorMessage = isRequired && !value ? strings.isRequiredErrorMessage || ' ' : undefined;
        if (!errorMessage && value) {
            errorMessage = this._isDateOutOfBounds(value, minDate, maxDate) ? strings.isOutOfBoundsErrorMessage || ' ' : undefined;
        }
        this._id = nextProps.id || this._id;
        this.setState({
            errorMessage: errorMessage
        });
        const oldValue = this.state.selectedDate;
        if (!compareDates(oldValue, value) || this.props.formatDate !== formatDate) {
            this.setState({
                selectedDate: value || undefined,
                formattedDate: formatDate && value ? formatDate(value) : ''
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isDatePickerShown && !this.state.isDatePickerShown) {
            if (this.props.allowTextInput) {
                this._async.requestAnimationFrame(() => this.focus());
            }
            if (this.props.onAfterMenuDismiss) {
                this.props.onAfterMenuDismiss();
            }
        }
    }
    render() {
        const { firstDayOfWeek, strings, label, theme, className, styles, initialPickerDate, isRequired, disabled, ariaLabel, pickerAriaLabel, placeholder, allowTextInput, borderless, minDate, maxDate, showCloseButton, calendarProps, calloutProps, underlined, allFocusable, calendarAs: CalendarType = Calendar, tabIndex } = this.props;
        const { isDatePickerShown, formattedDate, selectedDate, errorMessage } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            disabled,
            label: !!label,
            isDatePickerShown
        });
        const calloutId = getId('DatePicker-Callout');
        const nativeProps = getNativeProps(this.props, divProperties, ['value']);
        return (React.createElement("div", Object.assign({}, nativeProps, { className: classNames.root }),
            React.createElement("div", { ref: this._datePickerDiv, role: "combobox", "aria-expanded": isDatePickerShown, "aria-haspopup": "true", "aria-owns": calloutId },
                React.createElement(TextField, { id: this._id + '-label', label: label, ariaLabel: ariaLabel, "aria-controls": isDatePickerShown ? calloutId : undefined, required: isRequired, disabled: disabled, onKeyDown: this._onTextFieldKeyDown, onFocus: this._onTextFieldFocus, onBlur: this._onTextFieldBlur, onClick: this._onTextFieldClick, onChange: this._onTextFieldChanged, errorMessage: errorMessage, placeholder: placeholder, borderless: borderless, iconProps: {
                        iconName: 'Calendar',
                        onClick: this._onIconClick,
                        className: classNames.icon
                    }, readOnly: !allowTextInput, value: formattedDate, componentRef: this._textField, underlined: underlined, tabIndex: tabIndex })),
            isDatePickerShown && (React.createElement(Callout, Object.assign({ id: calloutId, role: "dialog", ariaLabel: pickerAriaLabel, isBeakVisible: false, gapSpace: 0, doNotLayer: false, target: this._datePickerDiv.current, directionalHint: DirectionalHint.bottomLeftEdge }, calloutProps, { className: css(classNames.callout, calloutProps && calloutProps.className), onDismiss: this._calendarDismissed, onPositioned: this._onCalloutPositioned }),
                React.createElement(FocusTrapZone, { isClickableOutsideFocusTrap: true, disableFirstFocus: this.props.disableAutoFocus },
                    React.createElement(CalendarType, Object.assign({}, calendarProps, { onSelectDate: this._onSelectDate, onDismiss: this._calendarDismissed, isMonthPickerVisible: this.props.isMonthPickerVisible, showMonthPickerAsOverlay: this.props.showMonthPickerAsOverlay, today: this.props.today, value: selectedDate || initialPickerDate, firstDayOfWeek: firstDayOfWeek, strings: strings, highlightCurrentMonth: this.props.highlightCurrentMonth, highlightSelectedMonth: this.props.highlightSelectedMonth, showWeekNumbers: this.props.showWeekNumbers, firstWeekOfYear: this.props.firstWeekOfYear, showGoToToday: this.props.showGoToToday, dateTimeFormatter: this.props.dateTimeFormatter, minDate: minDate, maxDate: maxDate, componentRef: this._calendar, showCloseButton: showCloseButton, allFocusable: allFocusable })))))));
    }
    focus() {
        if (this._textField.current) {
            this._textField.current.focus();
        }
    }
    reset() {
        this.setState(this._getDefaultState());
    }
    _showDatePickerPopup() {
        if (!this.state.isDatePickerShown) {
            this._preventFocusOpeningPicker = true;
            this.setState({
                isDatePickerShown: true,
                errorMessage: ''
            });
        }
    }
    _getDefaultState(props = this.props) {
        return {
            selectedDate: props.value || undefined,
            formattedDate: props.formatDate && props.value ? props.formatDate(props.value) : '',
            isDatePickerShown: false,
            errorMessage: undefined
        };
    }
    _isDateOutOfBounds(date, minDate, maxDate) {
        return (!!minDate && compareDatePart(minDate, date) > 0) || (!!maxDate && compareDatePart(maxDate, date) < 0);
    }
}
DatePickerBase.defaultProps = {
    allowTextInput: false,
    formatDate: (date) => {
        if (date) {
            return date.toDateString();
        }
        return '';
    },
    parseDateFromString: (dateStr) => {
        const date = Date.parse(dateStr);
        if (date) {
            return new Date(date);
        }
        return null;
    },
    firstDayOfWeek: DayOfWeek.Sunday,
    initialPickerDate: new Date(),
    isRequired: false,
    isMonthPickerVisible: true,
    showMonthPickerAsOverlay: false,
    strings: DEFAULT_STRINGS,
    highlightCurrentMonth: false,
    highlightSelectedMonth: false,
    borderless: false,
    pickerAriaLabel: 'Calendar',
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    showGoToToday: true,
    dateTimeFormatter: undefined,
    showCloseButton: false,
    underlined: false,
    allFocusable: false
};
