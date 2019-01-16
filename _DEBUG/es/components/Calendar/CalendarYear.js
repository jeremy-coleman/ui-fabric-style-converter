import * as React from 'react';
import { KeyCodes, css, getRTL } from '../../Utilities';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
let styles;
const CELL_COUNT = 12;
const DefaultCalendarYearStrings = {
    prevRangeAriaLabel: undefined,
    nextRangeAriaLabel: undefined
};
const DefaultNavigationIcons = {
    leftNavigation: 'Up',
    rightNavigation: 'Down',
    closeIcon: 'CalculatorMultiply'
};
class CalendarYearGridCell extends React.Component {
    constructor() {
        super(...arguments);
        this._buttonRef = React.createRef();
        this._onRenderYear = () => {
            const { year, onRenderYear } = this.props;
            if (onRenderYear) {
                return onRenderYear(year);
            }
            return year;
        };
        this._onClick = () => {
            if (this.props.onSelectYear) {
                this.props.onSelectYear(this.props.year);
            }
        };
        this._onKeyDown = (ev) => {
            if (this.props.onSelectYear && ev.which === KeyCodes.enter) {
                this.props.onSelectYear(this.props.year);
            }
        };
    }
    focus() {
        if (this._buttonRef.current) {
            this._buttonRef.current.focus();
        }
    }
    render() {
        const { year, selected, disabled, onSelectYear } = this.props;
        return (React.createElement("button", { className: css('ms-DatePicker-yearOption', styles.yearOption, {
                ['ms-DatePicker-day--highlighted ' + styles.yearIsHighlighted]: selected,
                ['ms-DatePicker-yearOption--disabled ' + styles.yearOptionIsDisabled]: disabled
            }), type: "button", role: "gridcell", onClick: !disabled && onSelectYear ? this._onClick : undefined, onKeyDown: !disabled && onSelectYear ? this._onKeyDown : undefined, disabled: disabled, "aria-label": String(year), "aria-selected": selected, ref: this._buttonRef }, this._onRenderYear()));
    }
}
class CalendarYearGrid extends React.Component {
    constructor() {
        super(...arguments);
        this._selectedCellRef = React.createRef();
        this._currentCellRef = React.createRef();
        this._renderCell = (year) => {
            const selected = year === this.props.selectedYear;
            const { minYear, maxYear, onSelectYear } = this.props;
            const disabled = (minYear !== undefined && year < minYear) || (maxYear !== undefined && year > maxYear);
            const current = year === new Date().getFullYear();
            return (React.createElement(CalendarYearGridCell, { key: year, year: year, selected: selected, current: current, disabled: disabled, onSelectYear: onSelectYear, ref: selected ? this._selectedCellRef : current ? this._currentCellRef : undefined }));
        };
    }
    focus() {
        if (this._selectedCellRef.current) {
            this._selectedCellRef.current.focus();
        }
        else if (this._currentCellRef.current) {
            this._currentCellRef.current.focus();
        }
    }
    render() {
        const { fromYear, toYear } = this.props;
        let year = fromYear;
        const cells = [];
        while (year <= toYear) {
            cells.push(this._renderCell(year));
            year++;
        }
        return (React.createElement(FocusZone, null,
            React.createElement("div", { className: css('ms-DatePicker-optionGrid', styles.optionGrid), role: "grid" },
                React.createElement("div", { role: "row" }, cells))));
    }
}
class CalendarYearNavPrev extends React.Component {
    constructor() {
        super(...arguments);
        this._onSelectPrev = () => {
            if (!this.isDisabled && this.props.onSelectPrev) {
                this.props.onSelectPrev();
            }
        };
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onSelectPrev();
            }
        };
    }
    render() {
        const iconStrings = this.props.navigationIcons || DefaultNavigationIcons;
        const strings = this.props.strings || DefaultCalendarYearStrings;
        const prevRangeAriaLabel = strings.prevRangeAriaLabel || strings.rangeAriaLabel;
        const prevAriaLabel = prevRangeAriaLabel
            ? typeof prevRangeAriaLabel === 'string'
                ? prevRangeAriaLabel
                : prevRangeAriaLabel(this.props)
            : undefined;
        const disabled = this.isDisabled;
        const { onSelectPrev } = this.props;
        return (React.createElement("button", { className: css('ms-DatePicker-prevDecade', styles.prevDecade, {
                ['ms-DatePicker-prevDecade--disabled ' + styles.prevDecadeIsDisabled]: disabled
            }), onClick: !disabled && onSelectPrev ? this._onSelectPrev : undefined, onKeyDown: !disabled && onSelectPrev ? this._onKeyDown : undefined, type: "button", tabIndex: 0, "aria-label": prevAriaLabel, disabled: disabled },
            React.createElement(Icon, { iconName: getRTL() ? iconStrings.rightNavigation : iconStrings.leftNavigation })));
    }
    get isDisabled() {
        const { minYear } = this.props;
        return minYear !== undefined && this.props.fromYear < minYear;
    }
}
class CalendarYearNavNext extends React.Component {
    constructor() {
        super(...arguments);
        this._onSelectNext = () => {
            if (!this.isDisabled && this.props.onSelectNext) {
                this.props.onSelectNext();
            }
        };
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.enter) {
                this._onSelectNext();
            }
        };
    }
    render() {
        const iconStrings = this.props.navigationIcons || DefaultNavigationIcons;
        const strings = this.props.strings || DefaultCalendarYearStrings;
        const nextRangeAriaLabel = strings.nextRangeAriaLabel || strings.rangeAriaLabel;
        const nextAriaLabel = nextRangeAriaLabel
            ? typeof nextRangeAriaLabel === 'string'
                ? nextRangeAriaLabel
                : nextRangeAriaLabel(this.props)
            : undefined;
        const { onSelectNext } = this.props;
        const disabled = this.isDisabled;
        return (React.createElement("button", { className: css('ms-DatePicker-nextDecade', styles.nextDecade, {
                ['ms-DatePicker-nextDecade--disabled ' + styles.nextDecadeIsDisabled]: disabled
            }), onClick: !disabled && onSelectNext ? this._onSelectNext : undefined, onKeyDown: !disabled && onSelectNext ? this._onKeyDown : undefined, type: "button", tabIndex: 0, "aria-label": nextAriaLabel, disabled: this.isDisabled },
            React.createElement(Icon, { iconName: getRTL() ? iconStrings.leftNavigation : iconStrings.rightNavigation })));
    }
    get isDisabled() {
        const { maxYear } = this.props;
        return maxYear !== undefined && this.props.fromYear + CELL_COUNT > maxYear;
    }
}
class CalendarYearNav extends React.Component {
    render() {
        return (React.createElement("div", { className: css('ms-DatePicker-decadeComponents', styles.decadeComponents) },
            React.createElement("div", { className: css('ms-DatePicker-navContainer', styles.navContainer) },
                React.createElement(CalendarYearNavPrev, Object.assign({}, this.props)),
                React.createElement(CalendarYearNavNext, Object.assign({}, this.props)))));
    }
}
class CalendarYearTitle extends React.Component {
    constructor() {
        super(...arguments);
        this._onHeaderSelect = () => {
            if (this.props.onHeaderSelect) {
                this.props.onHeaderSelect(true);
            }
        };
        this._onHeaderKeyDown = (ev) => {
            if (this.props.onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
                this.props.onHeaderSelect(true);
            }
        };
        this._onRenderYear = (year) => {
            if (this.props.onRenderYear) {
                return this.props.onRenderYear(year);
            }
            return year;
        };
    }
    render() {
        const { fromYear, toYear, onHeaderSelect } = this.props;
        if (onHeaderSelect) {
            const strings = this.props.strings || DefaultCalendarYearStrings;
            const rangeAriaLabel = strings.rangeAriaLabel;
            const ariaLabel = rangeAriaLabel
                ? typeof rangeAriaLabel === 'string'
                    ? rangeAriaLabel
                    : rangeAriaLabel(this.props)
                : undefined;
            return (React.createElement("div", { className: css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade, styles.headerToggleView), onClick: this._onHeaderSelect, onKeyDown: this._onHeaderKeyDown, "aria-label": ariaLabel, role: "button", tabIndex: 0 },
                this._onRenderYear(fromYear),
                " - ",
                this._onRenderYear(toYear)));
        }
        return (React.createElement("div", { className: css('ms-DatePicker-currentDecade js-showYearPicker', styles.currentDecade) },
            this._onRenderYear(fromYear),
            " - ",
            this._onRenderYear(toYear)));
    }
}
class CalendarYearHeader extends React.Component {
    constructor() {
        super(...arguments);
        this._onRenderTitle = () => {
            if (this.props.onRenderTitle) {
                return this.props.onRenderTitle(this.props);
            }
            return React.createElement(CalendarYearTitle, Object.assign({}, this.props));
        };
        this._onRenderNav = () => {
            return React.createElement(CalendarYearNav, Object.assign({}, this.props));
        };
    }
    render() {
        return (React.createElement("div", { className: css('ms-DatePicker-header', styles.header) },
            this._onRenderTitle(),
            this._onRenderNav()));
    }
}
export class CalendarYear extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            fromYear: 0
        };
        this._gridRef = React.createRef();
        this._onNavNext = () => {
            this.setState({ fromYear: this.state.fromYear + CELL_COUNT });
        };
        this._onNavPrev = () => {
            this.setState({ fromYear: this.state.fromYear - CELL_COUNT });
        };
        this._renderHeader = () => {
            return (React.createElement(CalendarYearHeader, Object.assign({}, this.props, { fromYear: this.state.fromYear, toYear: this.state.fromYear + CELL_COUNT - 1, onSelectPrev: this._onNavPrev, onSelectNext: this._onNavNext })));
        };
        this._renderGrid = () => {
            return (React.createElement(CalendarYearGrid, Object.assign({}, this.props, { fromYear: this.state.fromYear, toYear: this.state.fromYear + CELL_COUNT - 1, ref: this._gridRef })));
        };
    }
    static getDerivedStateFromProps(nextProps) {
        const { selectedYear, navigatedYear } = nextProps;
        const rangeYear = selectedYear || navigatedYear || new Date().getFullYear();
        const fromYear = Math.floor(rangeYear / 10) * 10;
        return {
            fromYear: fromYear,
            navigatedYear: navigatedYear,
            selectedYear: selectedYear
        };
    }
    focus() {
        if (this._gridRef.current) {
            this._gridRef.current.focus();
        }
    }
    render() {
        return (React.createElement("div", { className: css('ms-DatePicker-yearPicker', styles.yearPicker) },
            this._renderHeader(),
            this._renderGrid()));
    }
}
