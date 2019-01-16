import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
let styles;
const TRUNCATION_SEPARATOR = '&hellip;';
const TRUNCATION_MINIMUM_LENGTH = 40;
const TRUNCATION_MAXIMUM_LENGTH = 90 - TRUNCATION_SEPARATOR.length;
const TRUNCATION_MINI_LENGTH_SECONDARY = 80;
const TRUNCATION_MAX_LENGTH_SECONDARY = 130 - TRUNCATION_SEPARATOR.length;
const TRUNCATION_FIRST_PIECE_LONGER_BY = 10;
const TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD = 5;
export class DocumentCardTitle extends BaseComponent {
    constructor(props) {
        super(props);
        this._titleElement = React.createRef();
        this._startTruncation = (props) => {
            const originalTitle = props.title;
            this._isTruncated = false;
            const miniLength = props.showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
            const maxLength = props.showAsSecondaryTitle ? TRUNCATION_MAX_LENGTH_SECONDARY : TRUNCATION_MAXIMUM_LENGTH;
            if (originalTitle && originalTitle.length >= miniLength) {
                if (originalTitle.length > maxLength) {
                    this._isTruncated = true;
                    this.setState({
                        truncatedTitleFirstPiece: originalTitle.slice(0, maxLength / 2 + TRUNCATION_FIRST_PIECE_LONGER_BY),
                        truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - (maxLength / 2 - TRUNCATION_FIRST_PIECE_LONGER_BY))
                    });
                }
                else {
                    this.setState({
                        truncatedTitleFirstPiece: originalTitle.slice(0, Math.ceil(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY),
                        truncatedTitleSecondPiece: originalTitle.slice(originalTitle.length - Math.floor(originalTitle.length / 2) + TRUNCATION_FIRST_PIECE_LONGER_BY)
                    });
                }
            }
            if (this._titleElement.current) {
                this._truncatedTitleAtWidth = this._titleElement.current.clientWidth;
            }
        };
        this.state = {
            truncatedTitleFirstPiece: '',
            truncatedTitleSecondPiece: ''
        };
    }
    componentDidMount() {
        const { title, shouldTruncate, showAsSecondaryTitle } = this.props;
        const miniLength = showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
        if (shouldTruncate && title && title.length > miniLength) {
            if (this._doesTitleOverflow()) {
                this._startTruncation(this.props);
            }
            this._events.on(window, 'resize', this._updateTruncation);
        }
    }
    componentWillReceiveProps(newProps) {
        this._events.off(window, 'resize');
        this._isTruncated = false;
        const miniLength = newProps.showAsSecondaryTitle ? TRUNCATION_MINI_LENGTH_SECONDARY : TRUNCATION_MINIMUM_LENGTH;
        if (newProps.shouldTruncate && newProps.title && newProps.title.length > miniLength) {
            this._startTruncation(newProps);
            this._events.on(window, 'resize', this._updateTruncation);
        }
    }
    componentDidUpdate() {
        if (this.props.shouldTruncate) {
            this._shrinkTitle();
        }
    }
    render() {
        const { title, shouldTruncate, showAsSecondaryTitle } = this.props;
        const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
        let documentCardTitle;
        if (shouldTruncate && this._isTruncated) {
            documentCardTitle = (React.createElement("div", { className: css('ms-DocumentCardTitle', showAsSecondaryTitle ? styles.secondaryTitle : styles.title), ref: this._titleElement, title: title },
                truncatedTitleFirstPiece,
                "\u2026",
                truncatedTitleSecondPiece));
        }
        else {
            documentCardTitle = (React.createElement("div", { className: css('ms-DocumentCardTitle', showAsSecondaryTitle ? styles.secondaryTitle : styles.title), ref: this._titleElement, title: title }, title));
        }
        return documentCardTitle;
    }
    _shrinkTitle() {
        if (this._doesTitleOverflow()) {
            const { truncatedTitleFirstPiece, truncatedTitleSecondPiece } = this.state;
            this._isTruncated = true;
            if (truncatedTitleFirstPiece || truncatedTitleSecondPiece) {
                this.setState({
                    truncatedTitleFirstPiece: truncatedTitleFirstPiece.slice(0, truncatedTitleFirstPiece.length - 1),
                    truncatedTitleSecondPiece: truncatedTitleSecondPiece.slice(1)
                });
            }
        }
    }
    _doesTitleOverflow() {
        const titleElement = this._titleElement.current;
        if (!titleElement) {
            return false;
        }
        return (titleElement.scrollHeight > titleElement.clientHeight + TRUNCATION_VERTICAL_OVERFLOW_THRESHOLD ||
            titleElement.scrollWidth > titleElement.clientWidth);
    }
    _updateTruncation() {
        if (this._titleElement.current && this._titleElement.current.clientWidth !== this._truncatedTitleAtWidth) {
            clearTimeout(this._scrollTimerId);
            this._scrollTimerId = this._async.setTimeout(this._startTruncation.bind(this, this.props), 250);
        }
    }
}
