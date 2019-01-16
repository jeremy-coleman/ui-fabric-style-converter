import * as React from 'react';
import { BaseComponent, KeyCodes, css, getId, getRTL, getRTLSafeKeyCode, format, findIndex } from '../../Utilities';
import { DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import { addDays, addWeeks, addMonths, compareDates, compareDatePart, getDateRangeArray, isInDateRangeArray, getWeekNumber, getWeekNumbersInMonth, getMonthStart, getMonthEnd } from '../../utilities/dateMath/DateMath';
var styles;
const DAYS_IN_WEEK = 7;
export class CalendarDay extends BaseComponent {
    constructor(props) {
        super(props);
        this.days = {};
        this._onKeyDown = (callback, ev) => {
            if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
                callback();
            }
        };
        this._onDayKeyDown = (originalDate, weekIndex, dayIndex) => {
            return (ev) => {
                if (ev.which === KeyCodes.enter) {
                    this._onSelectDate(originalDate);
                }
                else {
                    this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
                }
            };
        };
        this._onDayMouseDown = (originalDate, weekIndex, dayIndex, dateRangeType) => {
            return (ev) => {
                if (dateRangeType === DateRangeType.Month) {
                    this._applyFunctionToDayRefs((ref, day) => {
                        if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
                            ref.classList.add(styles.dayPress);
                        }
                    });
                }
                else {
                    this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
                        if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
                            ref.classList.add(styles.dayPress);
                            ref.classList.add(styles.dayIsHighlighted);
                        }
                        else if (ref) {
                            ref.classList.remove(styles.dayIsHighlighted);
                        }
                    });
                }
            };
        };
        this._onDayMouseUp = (originalDate, weekIndex, dayIndex, dateRangeType) => {
            return (ev) => {
                if (dateRangeType === DateRangeType.Month) {
                    this._applyFunctionToDayRefs((ref, day) => {
                        if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
                            ref.classList.remove(styles.dayPress);
                        }
                    });
                }
                else {
                    this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
                        if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
                            ref.classList.remove(styles.dayPress);
                        }
                    });
                }
            };
        };
        this._onDayMouseOver = (originalDate, weekIndex, dayIndex, dateRangeType) => {
            return (ev) => {
                if (dateRangeType === DateRangeType.Month) {
                    this._applyFunctionToDayRefs((ref, day) => {
                        if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
                            ref.classList.add(styles.dayHover);
                        }
                    });
                }
                else {
                    this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
                        if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
                            ref.classList.add(styles.dayHover);
                        }
                    });
                }
            };
        };
        this._onDayMouseLeave = (originalDate, weekIndex, dayIndex, dateRangeType) => {
            return (ev) => {
                if (dateRangeType === DateRangeType.Month) {
                    this._applyFunctionToDayRefs((ref, day) => {
                        if (ref && day.originalDate.getMonth() === originalDate.getMonth() && day.isInBounds) {
                            ref.classList.remove(styles.dayHover);
                        }
                    });
                }
                else {
                    this._applyFunctionToDayRefs((ref, day, dayWeekIndex) => {
                        if (ref && dayWeekIndex === weekIndex && day.isInBounds) {
                            ref.classList.remove(styles.dayHover);
                        }
                    });
                }
            };
        };
        this._onTableMouseLeave = (ev) => {
            if (ev.target.contains &&
                ev.relatedTarget &&
                ev.relatedTarget.contains &&
                ev.target.contains(ev.relatedTarget)) {
                return;
            }
            this._applyFunctionToDayRefs((ref, day) => {
                if (ref) {
                    ref.classList.remove(styles.dayHover);
                    ref.classList.remove(styles.dayPress);
                }
            });
        };
        this._onTableMouseUp = (ev) => {
            if (ev.target.contains &&
                ev.relatedTarget &&
                ev.relatedTarget.contains &&
                ev.target.contains(ev.relatedTarget)) {
                return;
            }
            this._applyFunctionToDayRefs((ref, day) => {
                if (ref) {
                    ref.classList.remove(styles.dayPress);
                }
            });
        };
        this._onSelectDate = (selectedDate) => {
            const { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection, minDate, maxDate, workWeekDays } = this.props;
            let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays);
            if (dateRangeType !== DateRangeType.Day) {
                dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
            }
            dateRange = dateRange.filter(d => {
                return !this._getIsRestrictedDate(d);
            });
            if (onSelectDate) {
                onSelectDate(selectedDate, dateRange);
            }
            if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
                const compareResult = compareDatePart(selectedDate, navigatedDate);
                if (compareResult < 0) {
                    this._onSelectPrevMonth();
                }
                else if (compareResult > 0) {
                    this._onSelectNextMonth();
                }
            }
        };
        this._onSelectNextMonth = () => {
            this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
        };
        this._onSelectPrevMonth = () => {
            this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
        };
        this._onClose = () => {
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        };
        this._onHeaderSelect = () => {
            const { onHeaderSelect } = this.props;
            if (onHeaderSelect) {
                onHeaderSelect(true);
            }
        };
        this._onHeaderKeyDown = (ev) => {
            const { onHeaderSelect } = this.props;
            if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
                onHeaderSelect(true);
            }
        };
        this._onPrevMonthKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onKeyDown(this._onSelectPrevMonth, ev);
            }
        };
        this._onNextMonthKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onKeyDown(this._onSelectNextMonth, ev);
            }
        };
        this._onCloseButtonKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onKeyDown(this._onClose, ev);
            }
        };
        this.state = {
            activeDescendantId: getId('DatePickerDay-active'),
            weeks: this._getWeeks(props)
        };
        this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
        this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
        this._onClose = this._onClose.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            weeks: this._getWeeks(nextProps)
        });
    }
    render() {
        const { activeDescendantId, weeks } = this.state;
        const { firstDayOfWeek, strings, navigatedDate, selectedDate, dateRangeType, navigationIcons, showWeekNumbers, firstWeekOfYear, dateTimeFormatter, minDate, maxDate, showCloseButton, allFocusable } = this.props;
        const dayPickerId = getId('DatePickerDay-dayPicker');
        const monthAndYearId = getId('DatePickerDay-monthAndYear');
        const leftNavigationIcon = navigationIcons.leftNavigation;
        const rightNavigationIcon = navigationIcons.rightNavigation;
        const closeNavigationIcon = navigationIcons.closeIcon;
        const weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
        const selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;
        const weekCorners = this._getWeekCornerStyles(weeks, dateRangeType);
        const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
        const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;
        return (React.createElement("div", { className: css('ms-DatePicker-dayPicker', styles.dayPicker, showWeekNumbers && 'ms-DatePicker-showWeekNumbers' && (getRTL() ? styles.showWeekNumbersRTL : styles.showWeekNumbers)), id: dayPickerId },
            React.createElement("div", { className: css('ms-DatePicker-header', styles.header) },
                React.createElement("div", { "aria-live": "polite", "aria-relevant": "text", "aria-atomic": "true", id: monthAndYearId, className: styles.monthAndYear }, this.props.onHeaderSelect ? (React.createElement("div", { className: css('ms-DatePicker-monthAndYear js-showMonthPicker', styles.headerToggleView), onClick: this._onHeaderSelect, onKeyDown: this._onHeaderKeyDown, "aria-label": dateTimeFormatter.formatMonthYear(navigatedDate, strings), role: "button", tabIndex: 0 }, dateTimeFormatter.formatMonthYear(navigatedDate, strings))) : (React.createElement("div", { className: css('ms-DatePicker-monthAndYear', styles.monthAndYear) }, dateTimeFormatter.formatMonthYear(navigatedDate, strings)))),
                React.createElement("div", { className: css('ms-DatePicker-monthComponents', styles.monthComponents) },
                    React.createElement("div", { className: css('ms-DatePicker-navContainer', styles.navContainer) },
                        React.createElement("button", { className: css('ms-DatePicker-prevMonth js-prevMonth', styles.prevMonth, {
                                ['ms-DatePicker-prevMonth--disabled ' + styles.prevMonthIsDisabled]: !prevMonthInBounds
                            }), disabled: !allFocusable && !prevMonthInBounds, "aria-disabled": !prevMonthInBounds, onClick: prevMonthInBounds ? this._onSelectPrevMonth : undefined, onKeyDown: prevMonthInBounds ? this._onPrevMonthKeyDown : undefined, "aria-controls": dayPickerId, "aria-label": strings.prevMonthAriaLabel
                                ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()]
                                : undefined, role: "button" },
                            React.createElement(Icon, { iconName: leftNavigationIcon })),
                        React.createElement("button", { className: css('ms-DatePicker-nextMonth js-nextMonth', styles.nextMonth, {
                                ['ms-DatePicker-nextMonth--disabled ' + styles.nextMonthIsDisabled]: !nextMonthInBounds
                            }), disabled: !allFocusable && !nextMonthInBounds, "aria-disabled": !nextMonthInBounds, onClick: nextMonthInBounds ? this._onSelectNextMonth : undefined, onKeyDown: nextMonthInBounds ? this._onNextMonthKeyDown : undefined, "aria-controls": dayPickerId, "aria-label": strings.nextMonthAriaLabel
                                ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()]
                                : undefined, role: "button" },
                            React.createElement(Icon, { iconName: rightNavigationIcon })),
                        showCloseButton && (React.createElement("button", { className: css('ms-DatePicker-closeButton js-closeButton', styles.closeButton), onClick: this._onClose, onKeyDown: this._onCloseButtonKeyDown, "aria-label": strings.closeButtonAriaLabel, role: "button" },
                            React.createElement(Icon, { iconName: closeNavigationIcon })))))),
            React.createElement(FocusZone, null,
                React.createElement("table", { className: css('ms-DatePicker-table', styles.table), "aria-readonly": "true", "aria-multiselectable": "false", "aria-labelledby": monthAndYearId, "aria-activedescendant": activeDescendantId, role: "grid" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            showWeekNumbers && React.createElement("th", { className: css('ms-DatePicker-weekday', styles.weekday) }),
                            strings.shortDays.map((val, index) => (React.createElement("th", { className: css('ms-DatePicker-weekday', styles.weekday), role: "gridcell", scope: "col", key: index, title: strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK], "aria-label": strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK], "data-is-focusable": allFocusable ? true : undefined }, strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK]))))),
                    React.createElement("tbody", { onMouseLeave: dateRangeType !== DateRangeType.Day ? this._onTableMouseLeave : undefined, onMouseUp: dateRangeType !== DateRangeType.Day ? this._onTableMouseUp : undefined }, weeks.map((week, weekIndex) => (React.createElement("tr", { key: weekNumbers ? weekNumbers[weekIndex] : weekIndex },
                        showWeekNumbers && weekNumbers && (React.createElement("th", { className: css('ms-DatePicker-weekNumbers', 'ms-DatePicker-weekday', styles.weekday, styles.weekNumbers), key: weekIndex, title: weekNumbers && strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex]), "aria-label": weekNumbers && strings.weekNumberFormatString && format(strings.weekNumberFormatString, weekNumbers[weekIndex]), scope: "row" },
                            React.createElement("div", { className: css('ms-DatePicker-day', styles.day, {
                                    ['ms-DatePicker-week--highlighted ' + styles.weekIsHighlighted]: selectedDateWeekNumber === weekNumbers[weekIndex]
                                }) },
                                React.createElement("span", null, weekNumbers[weekIndex])))),
                        week.map((day, dayIndex) => {
                            const isNavigatedDate = compareDates(navigatedDate, day.originalDate);
                            return (React.createElement("td", { key: day.key, className: css(styles.dayWrapper, 'ms-DatePicker-day', this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex), {
                                    ['ms-DatePicker-weekBackground ' + styles.weekBackground]: day.isSelected && (dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek),
                                    ['ms-DatePicker-dayBackground ' + styles.dayBackground]: dateRangeType === DateRangeType.Day,
                                    ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected && dateRangeType === DateRangeType.Day,
                                    ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInBounds && day.isInMonth,
                                    ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: day.isInBounds && !day.isInMonth,
                                    [styles.daySelection]: dateRangeType === DateRangeType.Day,
                                    [styles.weekSelection]: dateRangeType === DateRangeType.Week || dateRangeType === DateRangeType.WorkWeek,
                                    [styles.monthSelection]: dateRangeType === DateRangeType.Month
                                }), ref: element => this._setDayCellRef(element, day, isNavigatedDate), onMouseOver: dateRangeType !== DateRangeType.Day && day.isInBounds
                                    ? this._onDayMouseOver(day.originalDate, weekIndex, dayIndex, dateRangeType)
                                    : undefined, onMouseLeave: dateRangeType !== DateRangeType.Day && day.isInBounds
                                    ? this._onDayMouseLeave(day.originalDate, weekIndex, dayIndex, dateRangeType)
                                    : undefined, onMouseDown: dateRangeType !== DateRangeType.Day && day.isInBounds
                                    ? this._onDayMouseDown(day.originalDate, weekIndex, dayIndex, dateRangeType)
                                    : undefined, onMouseUp: dateRangeType !== DateRangeType.Day && day.isInBounds
                                    ? this._onDayMouseUp(day.originalDate, weekIndex, dayIndex, dateRangeType)
                                    : undefined, role: 'gridcell' },
                                React.createElement("button", { key: day.key + 'button', className: css(styles.day, 'ms-DatePicker-day-button', {
                                        ['ms-DatePicker-day--disabled ' + styles.dayIsDisabled]: !day.isInBounds,
                                        ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday
                                    }), role: 'button', onKeyDown: this._onDayKeyDown(day.originalDate, weekIndex, dayIndex), onClick: day.isInBounds ? day.onSelected : undefined, "aria-label": dateTimeFormatter.formatMonthDayYear(day.originalDate, strings), id: isNavigatedDate ? activeDescendantId : undefined, "aria-selected": day.isInBounds ? day.isSelected : undefined, "data-is-focusable": allFocusable || (day.isInBounds ? true : undefined), ref: element => this._setDayRef(element, day, isNavigatedDate), disabled: !allFocusable && !day.isInBounds, "aria-disabled": !day.isInBounds },
                                    React.createElement("span", { "aria-hidden": "true" }, dateTimeFormatter.formatDay(day.originalDate)))));
                        })))))))));
    }
    focus() {
        if (this.navigatedDay) {
            this.navigatedDay.tabIndex = 0;
            this.navigatedDay.focus();
        }
    }
    _setDayRef(element, day, isNavigatedDate) {
        if (isNavigatedDate) {
            this.navigatedDay = element;
        }
    }
    _setDayCellRef(element, day, isNavigatedDate) {
        this.days[day.key] = element;
    }
    _getWeekCornerStyles(weeks, dateRangeType) {
        const weekCornersStyled = {};
        switch (dateRangeType) {
            case DateRangeType.Month:
                weeks.forEach((week, weekIndex) => {
                    week.forEach((day, dayIndex) => {
                        const above = weeks[weekIndex - 1] &&
                            weeks[weekIndex - 1][dayIndex] &&
                            weeks[weekIndex - 1][dayIndex].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
                        const below = weeks[weekIndex + 1] &&
                            weeks[weekIndex + 1][dayIndex] &&
                            weeks[weekIndex + 1][dayIndex].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
                        const left = weeks[weekIndex][dayIndex - 1] &&
                            weeks[weekIndex][dayIndex - 1].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
                        const right = weeks[weekIndex][dayIndex + 1] &&
                            weeks[weekIndex][dayIndex + 1].originalDate.getMonth() === weeks[weekIndex][dayIndex].originalDate.getMonth();
                        const roundedTopLeft = !above && !left;
                        const roundedTopRight = !above && !right;
                        const roundedBottomLeft = !below && !left;
                        const roundedBottomRight = !below && !right;
                        let style = '';
                        if (roundedTopLeft) {
                            style = getRTL() ? style.concat(styles.topRightCornerDate + ' ') : style.concat(styles.topLeftCornerDate + ' ');
                        }
                        if (roundedTopRight) {
                            style = getRTL() ? style.concat(styles.topLeftCornerDate + ' ') : style.concat(styles.topRightCornerDate + ' ');
                        }
                        if (roundedBottomLeft) {
                            style = getRTL() ? style.concat(styles.bottomRightCornerDate + ' ') : style.concat(styles.bottomLeftCornerDate + ' ');
                        }
                        if (roundedBottomRight) {
                            style = getRTL() ? style.concat(styles.bottomLeftCornerDate + ' ') : style.concat(styles.bottomRightCornerDate + ' ');
                        }
                        if (!above) {
                            style = style.concat(styles.topDate + ' ');
                        }
                        if (!below) {
                            style = style.concat(styles.bottomDate + ' ');
                        }
                        if (!right) {
                            style = style.concat(styles.rightDate + ' ');
                        }
                        if (!left) {
                            style = style.concat(styles.leftdate + ' ');
                        }
                        weekCornersStyled[weekIndex + '_' + dayIndex] = style;
                    });
                });
                break;
            case DateRangeType.Week:
            case DateRangeType.WorkWeek:
                weeks.forEach((week, weekIndex) => {
                    const minIndex = findIndex(week, (item) => {
                        return item.isInBounds;
                    });
                    const maxIndex = this._findLastIndex(week, (item) => {
                        return item.isInBounds;
                    });
                    const leftStyle = styles.topLeftCornerDate + ' ' + styles.bottomLeftCornerDate;
                    const rightStyle = styles.topRightCornerDate + ' ' + styles.bottomRightCornerDate;
                    weekCornersStyled[weekIndex + '_' + minIndex] = getRTL() ? rightStyle : leftStyle;
                    weekCornersStyled[weekIndex + '_' + maxIndex] = getRTL() ? leftStyle : rightStyle;
                });
                break;
        }
        return weekCornersStyled;
    }
    _getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex) {
        const cornerStyle = weekCorners[weekIndex + '_' + dayIndex] ? weekCorners[weekIndex + '_' + dayIndex] : '';
        return cornerStyle;
    }
    _navigateMonthEdge(ev, date, weekIndex, dayIndex) {
        const { minDate, maxDate } = this.props;
        let targetDate = undefined;
        if (weekIndex === 0 && ev.which === KeyCodes.up) {
            targetDate = addWeeks(date, -1);
        }
        else if (weekIndex === this.state.weeks.length - 1 && ev.which === KeyCodes.down) {
            targetDate = addWeeks(date, 1);
        }
        else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
            targetDate = addDays(date, -1);
        }
        else if (dayIndex === DAYS_IN_WEEK - 1 && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
            targetDate = addDays(date, 1);
        }
        if (targetDate &&
            (minDate ? compareDatePart(minDate, targetDate) < 1 : true) &&
            (maxDate ? compareDatePart(targetDate, maxDate) < 1 : true)) {
            this.props.onNavigateDate(targetDate, true);
            ev.preventDefault();
        }
    }
    _applyFunctionToDayRefs(func) {
        if (this.state.weeks) {
            this.state.weeks.map((week, weekIndex) => {
                week.map(day => {
                    const ref = this.days[day.key];
                    func(ref, day, weekIndex);
                });
            });
        }
    }
    _getWeeks(propsToUse) {
        const { navigatedDate, selectedDate, dateRangeType, firstDayOfWeek, today, minDate, maxDate, showSixWeeksByDefault, workWeekDays } = propsToUse;
        const date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
        const todaysDate = today || new Date();
        const weeks = [];
        while (date.getDay() !== firstDayOfWeek) {
            date.setDate(date.getDate() - 1);
        }
        let isAllDaysOfWeekOutOfMonth = false;
        const selectedDateRangeType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;
        let selectedDates = getDateRangeArray(selectedDate, selectedDateRangeType, firstDayOfWeek, workWeekDays);
        if (dateRangeType !== DateRangeType.Day) {
            selectedDates = this._getBoundedDateRange(selectedDates, minDate, maxDate);
        }
        let shouldGetWeeks = true;
        for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
            const week = [];
            isAllDaysOfWeekOutOfMonth = true;
            for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
                const originalDate = new Date(date.toString());
                const dayInfo = {
                    key: date.toString(),
                    date: date.getDate().toString(),
                    originalDate: originalDate,
                    isInMonth: date.getMonth() === navigatedDate.getMonth(),
                    isToday: compareDates(todaysDate, date),
                    isSelected: isInDateRangeArray(date, selectedDates),
                    onSelected: this._onSelectDate.bind(this, originalDate),
                    isInBounds: (minDate ? compareDatePart(minDate, date) < 1 : true) &&
                        (maxDate ? compareDatePart(date, maxDate) < 1 : true) &&
                        !this._getIsRestrictedDate(date)
                };
                week.push(dayInfo);
                if (dayInfo.isInMonth) {
                    isAllDaysOfWeekOutOfMonth = false;
                }
                date.setDate(date.getDate() + 1);
            }
            shouldGetWeeks = showSixWeeksByDefault ? !isAllDaysOfWeekOutOfMonth || weekIndex <= 5 : !isAllDaysOfWeekOutOfMonth;
            if (shouldGetWeeks) {
                weeks.push(week);
            }
        }
        return weeks;
    }
    _getIsRestrictedDate(date) {
        const { restrictedDates } = this.props;
        if (!restrictedDates) {
            return false;
        }
        const restrictedDate = restrictedDates.find(rd => {
            return compareDates(rd, date);
        });
        return restrictedDate ? true : false;
    }
    _getBoundedDateRange(dateRange, minDate, maxDate) {
        let boundedDateRange = [...dateRange];
        if (minDate) {
            boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, minDate) >= 0);
        }
        if (maxDate) {
            boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, maxDate) <= 0);
        }
        return boundedDateRange;
    }
    _findLastIndex(items, predicate) {
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            if (predicate(item)) {
                return i;
            }
        }
        return -1;
    }
}
