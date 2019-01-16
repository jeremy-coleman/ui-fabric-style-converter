import * as React from 'react';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { CalendarDay } from './CalendarDay';
import { CalendarMonth } from './CalendarMonth';
import { compareDates, getDateRangeArray } from '../../utilities/dateMath/DateMath';
import { css, BaseComponent, KeyCodes, getNativeProps, divProperties } from '../../Utilities';
let styles;
const leftArrow = 'Up';
const rightArrow = 'Down';
const closeIcon = 'CalculatorMultiply';
const iconStrings = {
    leftNavigation: leftArrow,
    rightNavigation: rightArrow,
    closeIcon: closeIcon
};
const defaultWorkWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];
const dateTimeFormatterCallbacks = {
    formatMonthDayYear: (date, strings) => strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
    formatMonthYear: (date, strings) => strings.months[date.getMonth()] + ' ' + date.getFullYear(),
    formatDay: (date) => date.getDate().toString(),
    formatYear: (date) => date.getFullYear().toString()
};
export class Calendar extends BaseComponent {
    constructor(props) {
        super(props);
        this._dayPicker = React.createRef();
        this._monthPicker = React.createRef();
        this._navigateDayPickerDay = (date) => {
            this.setState({
                navigatedDayDate: date,
                navigatedMonthDate: date
            });
        };
        this._navigateMonthPickerDay = (date) => {
            this.setState({
                navigatedMonthDate: date
            });
        };
        this._onNavigateDayDate = (date, focusOnNavigatedDay) => {
            this._navigateDayPickerDay(date);
            this._focusOnUpdate = focusOnNavigatedDay;
        };
        this._onNavigateMonthDate = (date, focusOnNavigatedDay) => {
            if (!focusOnNavigatedDay) {
                this._navigateMonthPickerDay(date);
                this._focusOnUpdate = focusOnNavigatedDay;
                return;
            }
            const monthPickerOnly = !this.props.showMonthPickerAsOverlay && !this.props.isDayPickerVisible;
            if (monthPickerOnly) {
                this._onSelectDate(date);
            }
            this._navigateDayPickerDay(date);
        };
        this._onSelectDate = (date, selectedDateRangeArray) => {
            const { onSelectDate } = this.props;
            this.setState({
                selectedDate: date
            });
            if (onSelectDate) {
                onSelectDate(date, selectedDateRangeArray);
            }
        };
        this._onHeaderSelect = (focus) => {
            this.setState({
                isDayPickerVisible: !this.state.isDayPickerVisible,
                isMonthPickerVisible: !this.state.isMonthPickerVisible
            });
            if (focus) {
                this._focusOnUpdate = true;
            }
        };
        this._onGotoToday = () => {
            const { dateRangeType, firstDayOfWeek, today, workWeekDays, selectDateOnClick } = this.props;
            if (selectDateOnClick) {
                const dates = getDateRangeArray(today, dateRangeType, firstDayOfWeek, workWeekDays);
                this._onSelectDate(today, dates);
            }
            this._navigateDayPickerDay(today);
        };
        this._onGotoTodayClick = (ev) => {
            this._onGotoToday();
        };
        this._onGotoTodayKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                ev.preventDefault();
                this._onGotoToday();
            }
        };
        this._onDatePickerPopupKeyDown = (ev) => {
            switch (ev.which) {
                case KeyCodes.enter:
                    ev.preventDefault();
                    break;
                case KeyCodes.backspace:
                    ev.preventDefault();
                    break;
                case KeyCodes.escape:
                    this._handleEscKey(ev);
                    break;
                default:
                    break;
            }
        };
        this._handleEscKey = (ev) => {
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        };
        const currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : props.today || new Date();
        this.state = {
            selectedDate: currentDate,
            navigatedDayDate: currentDate,
            navigatedMonthDate: currentDate,
            isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
            isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible
        };
        this._focusOnUpdate = false;
    }
    componentWillReceiveProps(nextProps) {
        const { autoNavigateOnSelection, value, today = new Date() } = nextProps;
        const overrideNavigatedDate = autoNavigateOnSelection && !compareDates(value, this.props.value);
        if (overrideNavigatedDate) {
            this.setState({
                navigatedMonthDate: value,
                navigatedDayDate: value
            });
        }
        this.setState({
            selectedDate: value || today
        });
    }
    componentDidUpdate() {
        if (this._focusOnUpdate) {
            this.focus();
            this._focusOnUpdate = false;
        }
    }
    render() {
        const rootClass = 'ms-DatePicker';
        const { firstDayOfWeek, dateRangeType, strings, showMonthPickerAsOverlay, autoNavigateOnSelection, showGoToToday, highlightCurrentMonth, highlightSelectedMonth, navigationIcons, minDate, maxDate, restrictedDates, className, showCloseButton, allFocusable, yearPickerHidden, today } = this.props;
        const nativeProps = getNativeProps(this.props, divProperties, ['value']);
        const { selectedDate, navigatedDayDate, navigatedMonthDate, isMonthPickerVisible, isDayPickerVisible } = this.state;
        const onHeaderSelect = showMonthPickerAsOverlay ? this._onHeaderSelect : undefined;
        const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
        const overlayedWithButton = showMonthPickerAsOverlay && showGoToToday;
        let goTodayEnabled = showGoToToday;
        if (goTodayEnabled && navigatedDayDate && navigatedMonthDate && today) {
            goTodayEnabled =
                navigatedDayDate.getFullYear() !== today.getFullYear() ||
                    navigatedDayDate.getMonth() !== today.getMonth() ||
                    navigatedMonthDate.getFullYear() !== today.getFullYear() ||
                    navigatedMonthDate.getMonth() !== today.getMonth();
        }
        return (React.createElement("div", { className: css(rootClass, styles.root, className), role: "application" },
            React.createElement("div", Object.assign({}, nativeProps, { className: css('ms-DatePicker-picker ms-DatePicker-picker--opened ms-DatePicker-picker--focused', styles.picker, styles.pickerIsOpened, styles.pickerIsFocused, isMonthPickerVisible && 'ms-DatePicker-monthPickerVisible ' + styles.monthPickerVisible, isMonthPickerVisible && isDayPickerVisible && 'ms-DatePicker-calendarsInline ' + styles.calendarsInline, monthPickerOnly && 'ms-DatePicker-monthPickerOnly ' + styles.monthPickerOnly, showMonthPickerAsOverlay && 'ms-DatePicker-monthPickerAsOverlay ' + styles.monthPickerAsOverlay) }),
                React.createElement("div", { className: css('ms-DatePicker-holder ms-slideDownIn10', styles.holder, overlayedWithButton && styles.holderWithButton), onKeyDown: this._onDatePickerPopupKeyDown },
                    React.createElement("div", { className: css('ms-DatePicker-frame', styles.frame) },
                        React.createElement("div", { className: css('ms-DatePicker-wrap', styles.wrap, showGoToToday && styles.goTodaySpacing) },
                            isDayPickerVisible && (React.createElement(CalendarDay, { selectedDate: selectedDate, navigatedDate: navigatedDayDate, today: this.props.today, onSelectDate: this._onSelectDate, onNavigateDate: this._onNavigateDayDate, onDismiss: this.props.onDismiss, firstDayOfWeek: firstDayOfWeek, dateRangeType: dateRangeType, autoNavigateOnSelection: autoNavigateOnSelection, strings: strings, onHeaderSelect: onHeaderSelect, navigationIcons: navigationIcons, showWeekNumbers: this.props.showWeekNumbers, firstWeekOfYear: this.props.firstWeekOfYear, dateTimeFormatter: this.props.dateTimeFormatter, showSixWeeksByDefault: this.props.showSixWeeksByDefault, minDate: minDate, maxDate: maxDate, restrictedDates: restrictedDates, workWeekDays: this.props.workWeekDays, componentRef: this._dayPicker, showCloseButton: showCloseButton, allFocusable: allFocusable })),
                            isDayPickerVisible && isMonthPickerVisible && React.createElement("div", { className: styles.divider }),
                            isMonthPickerVisible && (React.createElement(CalendarMonth, { navigatedDate: navigatedMonthDate, selectedDate: navigatedDayDate, strings: strings, onNavigateDate: this._onNavigateMonthDate, today: this.props.today, highlightCurrentMonth: highlightCurrentMonth, highlightSelectedMonth: highlightSelectedMonth, onHeaderSelect: onHeaderSelect, navigationIcons: navigationIcons, dateTimeFormatter: this.props.dateTimeFormatter, minDate: minDate, maxDate: maxDate, componentRef: this._monthPicker, yearPickerHidden: yearPickerHidden || showMonthPickerAsOverlay })),
                            showGoToToday && (React.createElement("button", { role: "button", className: css('ms-DatePicker-goToday js-goToday', styles.goToday, {
                                    [styles.goTodayInlineMonth]: isMonthPickerVisible,
                                    [styles.goToTodayIsDisabled]: !goTodayEnabled
                                }), onClick: this._onGotoTodayClick, onKeyDown: this._onGotoTodayKeyDown, tabIndex: 0, disabled: !goTodayEnabled }, strings.goToToday))))))));
    }
    focus() {
        if (this.state.isDayPickerVisible && this._dayPicker.current) {
            this._dayPicker.current.focus();
        }
        else if (this.state.isMonthPickerVisible && this._monthPicker.current) {
            this._monthPicker.current.focus();
        }
    }
}
Calendar.defaultProps = {
    onSelectDate: undefined,
    onDismiss: undefined,
    isMonthPickerVisible: true,
    isDayPickerVisible: true,
    showMonthPickerAsOverlay: false,
    value: undefined,
    today: new Date(),
    firstDayOfWeek: DayOfWeek.Sunday,
    dateRangeType: DateRangeType.Day,
    autoNavigateOnSelection: false,
    showGoToToday: true,
    strings: null,
    highlightCurrentMonth: false,
    highlightSelectedMonth: false,
    navigationIcons: iconStrings,
    showWeekNumbers: false,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    dateTimeFormatter: dateTimeFormatterCallbacks,
    showSixWeeksByDefault: false,
    workWeekDays: defaultWorkWeekDays,
    showCloseButton: false,
    allFocusable: false
};
