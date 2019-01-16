import * as React from 'react';
import { BaseComponent, KeyCodes, divProperties, doesElementContainFocus, getDocument, getNativeProps } from '../../Utilities';
export class Popup extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._onKeyDown = (ev) => {
            switch (ev.which) {
                case KeyCodes.escape:
                    if (this.props.onDismiss) {
                        this.props.onDismiss(ev);
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                    break;
            }
        };
        this.state = { needsVerticalScrollBar: false };
    }
    componentWillMount() {
        this._originalFocusedElement = getDocument().activeElement;
    }
    componentDidMount() {
        if (!this._root.current) {
            return;
        }
        this._events.on(this._root.current, 'focus', this._onFocus, true);
        this._events.on(this._root.current, 'blur', this._onBlur, true);
        if (doesElementContainFocus(this._root.current)) {
            this._containsFocus = true;
        }
        this._updateScrollBarAsync();
    }
    componentDidUpdate() {
        this._updateScrollBarAsync();
    }
    componentWillUnmount() {
        if (this.props.shouldRestoreFocus &&
            this._originalFocusedElement &&
            this._containsFocus &&
            this._originalFocusedElement !== window) {
            if (this._originalFocusedElement) {
                this._originalFocusedElement.focus();
            }
        }
    }
    render() {
        const { role, className, ariaLabel, ariaLabelledBy, ariaDescribedBy, style } = this.props;
        return (React.createElement("div", Object.assign({ ref: this._root }, getNativeProps(this.props, divProperties), { className: className, role: role, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown, style: { overflowY: this.state.needsVerticalScrollBar ? 'scroll' : undefined, ...style } }), this.props.children));
    }
    _updateScrollBarAsync() {
        this._async.requestAnimationFrame(() => {
            this._getScrollBar();
        });
    }
    _getScrollBar() {
        if (this.props.style && this.props.style.overflowY) {
            return;
        }
        let needsVerticalScrollBar = false;
        if (this._root && this._root.current && this._root.current.firstElementChild) {
            const rootHeight = this._root.current.clientHeight;
            const firstChildHeight = this._root.current.firstElementChild.clientHeight;
            if (rootHeight > 0 && firstChildHeight > rootHeight) {
                needsVerticalScrollBar = firstChildHeight - rootHeight > 1;
            }
        }
        if (this.state.needsVerticalScrollBar !== needsVerticalScrollBar) {
            this.setState({
                needsVerticalScrollBar: needsVerticalScrollBar
            });
        }
    }
    _onFocus() {
        this._containsFocus = true;
    }
    _onBlur(ev) {
        if (this._root.current && this._root.current.contains(ev.relatedTarget)) {
            this._containsFocus = false;
        }
    }
}
Popup.defaultProps = {
    shouldRestoreFocus: true
};
