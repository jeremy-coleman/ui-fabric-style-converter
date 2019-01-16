import * as React from 'react';
import { BaseComponent, KeyCodes, css, getRTL } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { addYears, setMonth, getYearStart, getYearEnd, getMonthStart, getMonthEnd, compareDatePart } from '../../utilities/dateMath/DateMath';
import { Icon } from '../../Icon';
import { CalendarYear } from './CalendarYear';
let styles;
export class CalendarMonth extends BaseComponent {
    constructor(props) {
        super(props);
        this._onCalendarYearRef = (ref) => {
            this._calendarYearRef = ref;
        };
        this._onKeyDown = (callback, ev) => {
            if (ev.which === KeyCodes.enter) {
                callback();
            }
        };
        this._onSelectYear = (selectedYear) => {
            this._focusOnUpdate = true;
            const { navigatedDate, onNavigateDate, maxDate, minDate } = this.props;
            const navYear = navigatedDate.getFullYear();
            if (navYear !== selectedYear) {
                let newNavigationDate = new Date(navigatedDate.getTime());
                newNavigationDate.setFullYear(selectedYear);
                if (maxDate && newNavigationDate > maxDate) {
                    newNavigationDate = setMonth(newNavigationDate, maxDate.getMonth());
                }
                else if (minDate && newNavigationDate < minDate) {
                    newNavigationDate = setMonth(newNavigationDate, minDate.getMonth());
                }
                onNavigateDate(newNavigationDate, true);
            }
            this.setState({ isYearPickerVisible: false });
        };
        this._yearToString = (year) => {
            const { navigatedDate, dateTimeFormatter } = this.props;
            if (dateTimeFormatter) {
                const yearFormattingDate = new Date(navigatedDate.getTime());
                yearFormattingDate.setFullYear(year);
                return dateTimeFormatter.formatYear(yearFormattingDate);
            }
            return String(year);
        };
        this._yearRangeToString = (yearRange) => {
            return `${this._yearToString(yearRange.fromYear)} - ${this._yearToString(yearRange.toYear)}`;
        };
        this._onRenderYear = (year) => {
            return this._yearToString(year);
        };
        this._onSelectNextYear = () => {
            const { navigatedDate, onNavigateDate } = this.props;
            onNavigateDate(addYears(navigatedDate, 1), false);
        };
        this._onSelectNextYearKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onKeyDown(this._onSelectNextYear, ev);
            }
        };
        this._onSelectPrevYear = () => {
            const { navigatedDate, onNavigateDate } = this.props;
            onNavigateDate(addYears(navigatedDate, -1), false);
        };
        this._onSelectPrevYearKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onKeyDown(this._onSelectPrevYear, ev);
            }
        };
        this._onSelectMonthKeyDown = (index) => {
            return (ev) => this._onKeyDown(() => this._onSelectMonth(index), ev);
        };
        this._onSelectMonth = (newMonth) => {
            const { navigatedDate, onNavigateDate, onHeaderSelect } = this.props;
            if (onHeaderSelect) {
                onHeaderSelect(true);
            }
            onNavigateDate(setMonth(navigatedDate, newMonth), true);
        };
        this._onHeaderSelect = () => {
            const { onHeaderSelect, yearPickerHidden } = this.props;
            if (!yearPickerHidden) {
                this._focusOnUpdate = true;
                this.setState({ isYearPickerVisible: true });
            }
            else if (onHeaderSelect) {
                onHeaderSelect(true);
            }
        };
        this._onYearPickerHeaderSelect = (focus) => {
            this._focusOnUpdate = focus;
            this.setState({ isYearPickerVisible: false });
        };
        this._onHeaderKeyDown = (ev) => {
            const { onHeaderSelect } = this.props;
            if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
                onHeaderSelect(true);
            }
        };
        this._selectMonthCallbacks = [];
        props.strings.shortMonths.map((month, index) => {
            this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
        });
        this._isCurrentMonth = this._isCurrentMonth.bind(this);
        this._onSelectNextYear = this._onSelectNextYear.bind(this);
        this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
        this._onSelectMonth = this._onSelectMonth.bind(this);
        this.state = { isYearPickerVisible: false };
    }
    componentDidUpdate() {
        if (this._focusOnUpdate) {
            this.focus();
            this._focusOnUpdate = false;
        }
    }
    render() {
        const { navigatedDate, selectedDate, strings, today, highlightCurrentMonth, highlightSelectedMonth, navigationIcons, dateTimeFormatter, minDate, maxDate, yearPickerHidden } = this.props;
        if (this.state.isYearPickerVisible) {
            return (React.createElement(CalendarYear, { minYear: minDate ? minDate.getFullYear() : undefined, maxYear: maxDate ? maxDate.getFullYear() : undefined, onSelectYear: this._onSelectYear, navigationIcons: navigationIcons, onHeaderSelect: this._onYearPickerHeaderSelect, selectedYear: selectedDate ? selectedDate.getFullYear() : navigatedDate ? navigatedDate.getFullYear() : undefined, onRenderYear: this._onRenderYear, strings: {
                    rangeAriaLabel: this._yearRangeToString
                }, ref: this._onCalendarYearRef }));
        }
        const leftNavigationIcon = navigationIcons.leftNavigation;
        const rightNavigationIcon = navigationIcons.rightNavigation;
        const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
        const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;
        return (React.createElement("div", { className: css('ms-DatePicker-monthPicker', styles.monthPicker) },
            React.createElement("div", { className: css('ms-DatePicker-header', styles.header) },
                this.props.onHeaderSelect || !yearPickerHidden ? (React.createElement("div", { className: css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear, styles.headerToggleView), onClick: this._onHeaderSelect, onKeyDown: this._onHeaderKeyDown, "aria-label": dateTimeFormatter.formatYear(navigatedDate), role: "button", tabIndex: 0 }, dateTimeFormatter.formatYear(navigatedDate))) : (React.createElement("div", { className: css('ms-DatePicker-currentYear js-showYearPicker', styles.currentYear) }, dateTimeFormatter.formatYear(navigatedDate))),
                React.createElement("div", { className: css('ms-DatePicker-yearComponents', styles.yearComponents) },
                    React.createElement("div", { className: css('ms-DatePicker-navContainer', styles.navContainer) },
                        React.createElement("button", { className: css('ms-DatePicker-prevYear js-prevYear', styles.prevYear, {
                                ['ms-DatePicker-prevYear--disabled ' + styles.prevYearIsDisabled]: !isPrevYearInBounds
                            }), disabled: !isPrevYearInBounds, onClick: isPrevYearInBounds ? this._onSelectPrevYear : undefined, onKeyDown: isPrevYearInBounds ? this._onSelectPrevYearKeyDown : undefined, "aria-label": strings.prevYearAriaLabel
                                ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, -1))
                                : undefined, role: "button" },
                            React.createElement(Icon, { iconName: getRTL() ? rightNavigationIcon : leftNavigationIcon })),
                        React.createElement("button", { className: css('ms-DatePicker-nextYear js-nextYear', styles.nextYear, {
                                ['ms-DatePicker-nextYear--disabled ' + styles.nextYearIsDisabled]: !isNextYearInBounds
                            }), disabled: !isNextYearInBounds, onClick: isNextYearInBounds ? this._onSelectNextYear : undefined, onKeyDown: isNextYearInBounds ? this._onSelectNextYearKeyDown : undefined, "aria-label": strings.nextYearAriaLabel
                                ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, 1))
                                : undefined, role: "button" },
                            React.createElement(Icon, { iconName: getRTL() ? leftNavigationIcon : rightNavigationIcon }))))),
            React.createElement(FocusZone, null,
                React.createElement("div", { className: css('ms-DatePicker-optionGrid', styles.optionGrid), role: "grid", "aria-readonly": "true" },
                    React.createElement("div", { role: "row" }, strings.shortMonths.map((month, index) => {
                        const indexedMonth = setMonth(navigatedDate, index);
                        const isCurrentMonth = this._isCurrentMonth(index, navigatedDate.getFullYear(), today);
                        const isNavigatedMonth = navigatedDate.getMonth() === index;
                        const isSelectedMonth = selectedDate.getMonth() === index;
                        const isSelectedYear = selectedDate.getFullYear() === navigatedDate.getFullYear();
                        const isInBounds = (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                            (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);
                        return (React.createElement("button", { role: 'gridcell', className: css('ms-DatePicker-monthOption', styles.monthOption, {
                                ['ms-DatePicker-day--today ' + styles.monthIsCurrentMonth]: highlightCurrentMonth && isCurrentMonth,
                                ['ms-DatePicker-day--highlighted ' + styles.monthIsHighlighted]: (highlightCurrentMonth || highlightSelectedMonth) && isSelectedMonth && isSelectedYear,
                                ['ms-DatePicker-monthOption--disabled ' + styles.monthOptionIsDisabled]: !isInBounds
                            }), disabled: !isInBounds, key: index, onClick: isInBounds ? this._selectMonthCallbacks[index] : undefined, onKeyDown: isInBounds ? this._onSelectMonthKeyDown(index) : undefined, "aria-label": dateTimeFormatter.formatMonthYear(indexedMonth, strings), "aria-selected": isCurrentMonth || isNavigatedMonth, "data-is-focusable": isInBounds ? true : undefined, ref: isNavigatedMonth ? 'navigatedMonth' : undefined }, month));
                    }))))));
    }
    focus() {
        if (this._calendarYearRef) {
            this._calendarYearRef.focus();
        }
        else if (this.refs.navigatedMonth) {
            this.refs.navigatedMonth.tabIndex = 0;
            this.refs.navigatedMonth.focus();
        }
    }
    _isCurrentMonth(month, year, today) {
        return today.getFullYear() === year && today.getMonth() === month;
    }
}
