import * as React from 'react';
import { BaseComponent, KeyCodes, elementContains, getNativeProps, divProperties, getFirstTabbable, getLastTabbable, getNextElement, focusAsync } from '../../Utilities';
export class FocusTrapZone extends BaseComponent {
    constructor() {
        super(...arguments);
        this._root = React.createRef();
        this._onFocusCapture = (ev) => {
            if (this.props.onFocusCapture) {
                this.props.onFocusCapture(ev);
            }
            if (ev.target !== ev.currentTarget) {
                this._previouslyFocusedElementInTrapZone = ev.target;
            }
        };
        this._onKeyboardHandler = (ev) => {
            if (this.props.onKeyDown) {
                this.props.onKeyDown(ev);
            }
            if (ev.isDefaultPrevented()) {
                return;
            }
            if (ev.which !== KeyCodes.tab) {
                return;
            }
            if (!this._root.current) {
                return;
            }
            const _firstTabbableChild = getFirstTabbable(this._root.current, this._root.current.firstChild, true);
            const _lastTabbableChild = getLastTabbable(this._root.current, this._root.current.lastChild, true);
            if (ev.shiftKey && _firstTabbableChild === ev.target) {
                focusAsync(_lastTabbableChild);
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (!ev.shiftKey && _lastTabbableChild === ev.target) {
                focusAsync(_firstTabbableChild);
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
    }
    componentDidMount() {
        this._bringFocusIntoZone();
        this._updateEventHandlers(this.props);
    }
    componentWillReceiveProps(nextProps) {
        const { elementToFocusOnDismiss } = nextProps;
        if (elementToFocusOnDismiss && this._previouslyFocusedElementOutsideTrapZone !== elementToFocusOnDismiss) {
            this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss;
        }
        this._updateEventHandlers(nextProps);
    }
    componentDidUpdate(prevProps) {
        const prevForceFocusInsideTrap = prevProps.forceFocusInsideTrap !== undefined ? prevProps.forceFocusInsideTrap : true;
        const newForceFocusInsideTrap = this.props.forceFocusInsideTrap !== undefined ? this.props.forceFocusInsideTrap : true;
        if (!prevForceFocusInsideTrap && newForceFocusInsideTrap) {
            this._bringFocusIntoZone();
        }
        else if (prevForceFocusInsideTrap && !newForceFocusInsideTrap) {
            this._returnFocusToInitiator();
        }
    }
    componentWillUnmount() {
        this._events.dispose();
        this._returnFocusToInitiator();
    }
    render() {
        const { className, ariaLabelledBy } = this.props;
        const divProps = getNativeProps(this.props, divProperties);
        return (React.createElement("div", Object.assign({}, divProps, { className: className, ref: this._root, "aria-labelledby": ariaLabelledBy, onKeyDown: this._onKeyboardHandler, onFocusCapture: this._onFocusCapture }), this.props.children));
    }
    focus() {
        const { focusPreviouslyFocusedInnerElement, firstFocusableSelector } = this.props;
        if (focusPreviouslyFocusedInnerElement &&
            this._previouslyFocusedElementInTrapZone &&
            elementContains(this._root.current, this._previouslyFocusedElementInTrapZone)) {
            focusAsync(this._previouslyFocusedElementInTrapZone);
            return;
        }
        const focusSelector = typeof firstFocusableSelector === 'string' ? firstFocusableSelector : firstFocusableSelector && firstFocusableSelector();
        let _firstFocusableChild;
        if (this._root.current) {
            if (focusSelector) {
                _firstFocusableChild = this._root.current.querySelector('.' + focusSelector);
            }
            else {
                _firstFocusableChild = getNextElement(this._root.current, this._root.current.firstChild, true, false, false, true);
            }
        }
        if (_firstFocusableChild) {
            focusAsync(_firstFocusableChild);
        }
    }
    _bringFocusIntoZone() {
        const { elementToFocusOnDismiss, disableFirstFocus = false } = this.props;
        FocusTrapZone._focusStack.push(this);
        this._previouslyFocusedElementOutsideTrapZone = elementToFocusOnDismiss
            ? elementToFocusOnDismiss
            : document.activeElement;
        if (!elementContains(this._root.current, this._previouslyFocusedElementOutsideTrapZone) && !disableFirstFocus) {
            this.focus();
        }
    }
    _returnFocusToInitiator() {
        const { ignoreExternalFocusing } = this.props;
        FocusTrapZone._focusStack = FocusTrapZone._focusStack.filter((value) => {
            return this !== value;
        });
        const activeElement = document.activeElement;
        if (!ignoreExternalFocusing &&
            this._previouslyFocusedElementOutsideTrapZone &&
            typeof this._previouslyFocusedElementOutsideTrapZone.focus === 'function' &&
            (elementContains(this._root.current, activeElement) || activeElement === document.body)) {
            focusAsync(this._previouslyFocusedElementOutsideTrapZone);
        }
    }
    _updateEventHandlers(newProps) {
        const { isClickableOutsideFocusTrap = false, forceFocusInsideTrap = true } = newProps;
        if (forceFocusInsideTrap && !this._hasFocusHandler) {
            this._events.on(window, 'focus', this._forceFocusInTrap, true);
        }
        else if (!forceFocusInsideTrap && this._hasFocusHandler) {
            this._events.off(window, 'focus', this._forceFocusInTrap, true);
        }
        this._hasFocusHandler = forceFocusInsideTrap;
        if (!isClickableOutsideFocusTrap && !this._hasClickHandler) {
            this._events.on(window, 'click', this._forceClickInTrap, true);
        }
        else if (isClickableOutsideFocusTrap && this._hasClickHandler) {
            this._events.off(window, 'click', this._forceClickInTrap, true);
        }
        this._hasClickHandler = !isClickableOutsideFocusTrap;
    }
    _forceFocusInTrap(ev) {
        if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
            const focusedElement = document.activeElement;
            if (!elementContains(this._root.current, focusedElement)) {
                this.focus();
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }
    _forceClickInTrap(ev) {
        if (FocusTrapZone._focusStack.length && this === FocusTrapZone._focusStack[FocusTrapZone._focusStack.length - 1]) {
            const clickedElement = ev.target;
            if (clickedElement && !elementContains(this._root.current, clickedElement)) {
                this.focus();
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    }
}
FocusTrapZone._focusStack = [];
