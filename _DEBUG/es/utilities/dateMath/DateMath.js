import { DayOfWeek, MonthOfYear, FirstWeekOfYear, DateRangeType } from '../dateValues/DateValues';
import TimeConstants from '../dateValues/TimeConstants';
import { assertNever } from '../../Utilities';
export function addDays(date, days) {
    const result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
}
export function addWeeks(date, weeks) {
    return addDays(date, weeks * TimeConstants.DaysInOneWeek);
}
export function addMonths(date, months) {
    let result = new Date(date.getTime());
    const newMonth = result.getMonth() + months;
    result.setMonth(newMonth);
    if (result.getMonth() !== ((newMonth % TimeConstants.MonthInOneYear) + TimeConstants.MonthInOneYear) % TimeConstants.MonthInOneYear) {
        result = addDays(result, -result.getDate());
    }
    return result;
}
export function addYears(date, years) {
    let result = new Date(date.getTime());
    result.setFullYear(date.getFullYear() + years);
    if (result.getMonth() !==
        ((date.getMonth() % TimeConstants.MonthInOneYear) + TimeConstants.MonthInOneYear) % TimeConstants.MonthInOneYear) {
        result = addDays(result, -result.getDate());
    }
    return result;
}
export function getMonthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}
export function getMonthEnd(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0, 0);
}
export function getYearStart(date) {
    return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}
export function getYearEnd(date) {
    return new Date(date.getFullYear() + 1, 0, 0, 0, 0, 0, 0);
}
export function setMonth(date, month) {
    return addMonths(date, month - date.getMonth());
}
export function compareDates(date1, date2) {
    if (!date1 && !date2) {
        return true;
    }
    else if (!date1 || !date2) {
        return false;
    }
    else {
        return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
    }
}
export function compareDatePart(date1, date2) {
    return getDatePartHashValue(date1) - getDatePartHashValue(date2);
}
export function getDateRangeArray(date, dateRangeType, firstDayOfWeek, workWeekDays) {
    const datesArray = new Array();
    let startDate;
    let endDate = null;
    if (!workWeekDays) {
        workWeekDays = [DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday];
    }
    switch (dateRangeType) {
        case DateRangeType.Day:
            startDate = getDatePart(date);
            endDate = addDays(startDate, 1);
            break;
        case DateRangeType.Week:
        case DateRangeType.WorkWeek:
            startDate = getStartDateOfWeek(getDatePart(date), firstDayOfWeek);
            endDate = addDays(startDate, TimeConstants.DaysInOneWeek);
            break;
        case DateRangeType.Month:
            startDate = new Date(date.getFullYear(), date.getMonth(), 1);
            endDate = addMonths(startDate, 1);
            break;
        default:
            return assertNever(dateRangeType);
    }
    let nextDate = startDate;
    do {
        if (dateRangeType !== DateRangeType.WorkWeek) {
            datesArray.push(nextDate);
        }
        else if (workWeekDays.includes(nextDate.getDay())) {
            datesArray.push(nextDate);
        }
        nextDate = addDays(nextDate, 1);
    } while (!compareDates(nextDate, endDate));
    return datesArray;
}
export function isInDateRangeArray(date, dateRange) {
    for (const dateInRange of dateRange) {
        if (compareDates(date, dateInRange)) {
            return true;
        }
    }
    return false;
}
export function getWeekNumbersInMonth(weeksInMonth, firstDayOfWeek, firstWeekOfYear, navigatedDate) {
    const selectedYear = navigatedDate.getFullYear();
    const selectedMonth = navigatedDate.getMonth();
    let dayOfMonth = 1;
    const fistDayOfMonth = new Date(selectedYear, selectedMonth, dayOfMonth);
    const endOfFirstWeek = dayOfMonth + (firstDayOfWeek + TimeConstants.DaysInOneWeek - 1) - adjustWeekDay(firstDayOfWeek, fistDayOfMonth.getDay());
    let endOfWeekRange = new Date(selectedYear, selectedMonth, endOfFirstWeek);
    dayOfMonth = endOfWeekRange.getDate();
    const weeksArray = [];
    for (let i = 0; i < weeksInMonth; i++) {
        weeksArray.push(getWeekNumber(endOfWeekRange, firstDayOfWeek, firstWeekOfYear));
        dayOfMonth += TimeConstants.DaysInOneWeek;
        endOfWeekRange = new Date(selectedYear, selectedMonth, dayOfMonth);
    }
    return weeksArray;
}
export function getWeekNumber(date, firstDayOfWeek, firstWeekOfYear) {
    const fourDayWeek = 4;
    switch (firstWeekOfYear) {
        case FirstWeekOfYear.FirstFullWeek:
            return getWeekOfYearFullDays(date, firstDayOfWeek, TimeConstants.DaysInOneWeek);
        case FirstWeekOfYear.FirstFourDayWeek:
            return getWeekOfYearFullDays(date, firstDayOfWeek, fourDayWeek);
        default:
            return getFirstDayWeekOfYear(date, firstDayOfWeek);
    }
}
function getDatePart(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function getStartDateOfWeek(date, firstDayOfWeek) {
    let daysOffset = firstDayOfWeek - date.getDay();
    if (daysOffset > 0) {
        daysOffset -= TimeConstants.DaysInOneWeek;
    }
    return addDays(date, daysOffset);
}
function getDatePartHashValue(date) {
    return date.getDate() + (date.getMonth() << 5) + (date.getFullYear() << 9);
}
function getWeekOfYearFullDays(date, firstDayOfWeek, numberOfFullDays) {
    const dayOfYear = getDayOfYear(date) - 1;
    let num = date.getDay() - (dayOfYear % TimeConstants.DaysInOneWeek);
    const lastDayOfPrevYear = new Date(date.getFullYear() - 1, MonthOfYear.December, 31);
    const daysInYear = getDayOfYear(lastDayOfPrevYear) - 1;
    let num2 = (firstDayOfWeek - num + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;
    if (num2 !== 0 && num2 >= numberOfFullDays) {
        num2 -= TimeConstants.DaysInOneWeek;
    }
    let num3 = dayOfYear - num2;
    if (num3 < 0) {
        num -= daysInYear % TimeConstants.DaysInOneWeek;
        num2 = (firstDayOfWeek - num + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;
        if (num2 !== 0 && num2 + 1 >= numberOfFullDays) {
            num2 -= TimeConstants.DaysInOneWeek;
        }
        num3 = daysInYear - num2;
    }
    return Math.floor(num3 / TimeConstants.DaysInOneWeek + 1);
}
function getFirstDayWeekOfYear(date, firstDayOfWeek) {
    const num = getDayOfYear(date) - 1;
    const num2 = date.getDay() - (num % TimeConstants.DaysInOneWeek);
    const num3 = (num2 - firstDayOfWeek + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;
    return Math.floor((num + num3) / TimeConstants.DaysInOneWeek + 1);
}
function adjustWeekDay(firstDayOfWeek, dateWeekDay) {
    return firstDayOfWeek !== DayOfWeek.Sunday && dateWeekDay < firstDayOfWeek ? dateWeekDay + TimeConstants.DaysInOneWeek : dateWeekDay;
}
function getDayOfYear(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    let daysUntilDate = 0;
    for (let i = 0; i < month; i++) {
        daysUntilDate += daysInMonth(i + 1, year);
    }
    daysUntilDate += date.getDate();
    return daysUntilDate;
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
