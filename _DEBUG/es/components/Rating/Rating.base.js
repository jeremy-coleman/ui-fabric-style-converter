import * as React from 'react';
import { BaseComponent, classNamesFunction, css, format, getId } from '../../Utilities';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { RatingSize } from './Rating.types';
const getClassNames = classNamesFunction();
const RatingStar = (props) => {
    const icon = props.icon || 'FavoriteStarFill';
    return (React.createElement("div", { className: props.classNames.ratingStar, key: props.id },
        React.createElement(Icon, { className: props.classNames.ratingStarBack, iconName: icon }),
        !props.disabled && (React.createElement(Icon, { className: props.classNames.ratingStarFront, iconName: icon, style: { width: props.fillPercentage + '%' } }))));
};
export class RatingBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._warnDeprecations({
            onChanged: 'onChange'
        });
        this._id = getId('Rating');
        this._min = this.props.allowZeroStars ? 0 : 1;
        if (this.props.min !== undefined && this.props.min !== 1) {
            this._min = this.props.min;
        }
        this._labelId = getId('RatingLabel');
        this.state = {
            rating: this._getInitialValue(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.rating !== 'undefined' && nextProps.rating !== this.state.rating) {
            this.setState({
                rating: this._getClampedRating(nextProps.rating)
            });
        }
    }
    render() {
        const id = this._id;
        const stars = [];
        const starIds = [];
        const { disabled, getAriaLabel, styles, max, rating, readOnly, size, theme, icon, unselectedIcon = icon } = this.props;
        this._classNames = getClassNames(styles, {
            disabled,
            readOnly,
            theme: theme
        });
        for (let i = this._min; i <= max; i++) {
            if (i !== 0) {
                const fillPercentage = this._getFillingPercentage(i);
                const ratingStarProps = {
                    fillPercentage,
                    disabled: disabled ? true : false,
                    readOnly: readOnly ? true : false,
                    classNames: this._classNames,
                    icon: fillPercentage > 0 ? icon : unselectedIcon
                };
                starIds.push(this._getStarId(i - 1));
                stars.push(React.createElement("button", Object.assign({ className: css(this._classNames.ratingButton, {
                        [this._classNames.ratingStarIsLarge]: size === RatingSize.Large,
                        [this._classNames.ratingStarIsSmall]: size !== RatingSize.Large
                    }), id: starIds[i - 1], key: i }, (i === Math.ceil(this.state.rating) ? { 'data-is-current': true } : {}), { onFocus: this._onFocus.bind(this, i), onClick: this._onFocus.bind(this, i), disabled: disabled || readOnly ? true : false, role: "presentation", type: "button" }),
                    this._getLabel(i),
                    React.createElement(RatingStar, Object.assign({ key: i + 'rating' }, ratingStarProps))));
            }
        }
        return (React.createElement("div", { className: css('ms-Rating-star', this._classNames.root, {
                [this._classNames.rootIsLarge]: size === RatingSize.Large,
                [this._classNames.rootIsSmall]: size !== RatingSize.Large
            }), "aria-label": getAriaLabel ? getAriaLabel(this.state.rating ? this.state.rating : 0, this.props.max) : '', id: id },
            React.createElement(FocusZone, { direction: FocusZoneDirection.horizontal, tabIndex: readOnly ? 0 : -1, className: css(this._classNames.ratingFocusZone, {
                    [this._classNames.rootIsLarge]: size === RatingSize.Large,
                    [this._classNames.rootIsSmall]: size !== RatingSize.Large
                }), "data-is-focusable": readOnly ? true : false, defaultActiveElement: rating ? starIds[rating - 1] && '#' + starIds[rating - 1] : undefined }, stars)));
    }
    _getStarId(index) {
        return this._id + '-star-' + index;
    }
    _onFocus(value, ev) {
        if (this.state.rating !== value) {
            this.setState({
                rating: value
            });
            const { onChange, onChanged } = this.props;
            if (onChange) {
                onChange(ev, value);
            }
            if (onChanged) {
                onChanged(value);
            }
        }
    }
    _getLabel(rating) {
        const text = this.props.ariaLabelFormat || '';
        return (React.createElement("span", { id: `${this._labelId}-${rating}`, className: this._classNames.labelText }, format(text, rating, this.props.max)));
    }
    _getInitialValue(props) {
        if (typeof props.rating === 'undefined') {
            return this._min;
        }
        if (props.rating === null) {
            return undefined;
        }
        return this._getClampedRating(props.rating);
    }
    _getClampedRating(rating) {
        return Math.min(Math.max(rating, this._min), this.props.max);
    }
    _getFillingPercentage(starPosition) {
        const ceilValue = Math.ceil(this.state.rating);
        let fillPercentage = 100;
        if (starPosition === this.state.rating) {
            fillPercentage = 100;
        }
        else if (starPosition === ceilValue) {
            fillPercentage = 100 * (this.state.rating % 1);
        }
        else if (starPosition > ceilValue) {
            fillPercentage = 0;
        }
        return fillPercentage;
    }
}
RatingBase.defaultProps = {
    min: 1,
    max: 5
};
