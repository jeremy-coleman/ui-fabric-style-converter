import * as React from 'react';
import { FocusZoneDirection, FocusZoneTabbableElements } from './FocusZone.types';
import { BaseComponent, EventGroup, KeyCodes, css, htmlElementProperties, elementContains, getDocument, getId, getNextElement, getNativeProps, getParent, getPreviousElement, getRTL, isElementFocusZone, isElementFocusSubZone, isElementTabbable, shouldWrapFocus } from '../../Utilities';
const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_ENTER_DISABLED_ATTRIBUTE = 'data-disable-click-on-enter';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const TABINDEX = 'tabindex';
const NO_VERTICAL_WRAP = 'data-no-vertical-wrap';
const NO_HORIZONTAL_WRAP = 'data-no-horizontal-wrap';
const LARGE_DISTANCE_FROM_CENTER = 999999999;
const LARGE_NEGATIVE_DISTANCE_FROM_CENTER = -999999999;
const _allInstances = {};
const ALLOWED_INPUT_TYPES = ['text', 'number', 'password', 'email', 'tel', 'url', 'search'];
const ALLOW_VIRTUAL_ELEMENTS = false;
export class FocusZone extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._onFocus = (ev) => {
            const { onActiveElementChanged, doNotAllowFocusEventToPropagate, onFocusNotification } = this.props;
            if (onFocusNotification) {
                onFocusNotification();
            }
            if (this._isImmediateDescendantOfZone(ev.target)) {
                this._activeElement = ev.target;
                this._setFocusAlignment(this._activeElement);
            }
            else {
                let parentElement = ev.target;
                while (parentElement && parentElement !== this._root.current) {
                    if (isElementTabbable(parentElement) && this._isImmediateDescendantOfZone(parentElement)) {
                        this._activeElement = parentElement;
                        break;
                    }
                    parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
                }
            }
            if (onActiveElementChanged) {
                onActiveElementChanged(this._activeElement, ev);
            }
            if (doNotAllowFocusEventToPropagate) {
                ev.stopPropagation();
            }
        };
        this._onMouseDown = (ev) => {
            const { disabled } = this.props;
            if (disabled) {
                return;
            }
            let target = ev.target;
            const path = [];
            while (target && target !== this._root.current) {
                path.push(target);
                target = getParent(target, ALLOW_VIRTUAL_ELEMENTS);
            }
            while (path.length) {
                target = path.pop();
                if (target && isElementTabbable(target)) {
                    this._setActiveElement(target, true);
                }
                if (isElementFocusZone(target)) {
                    break;
                }
            }
        };
        this._onKeyDown = (ev) => {
            const { direction, disabled, isInnerZoneKeystroke } = this.props;
            if (disabled) {
                return;
            }
            if (this.props.onKeyDown) {
                this.props.onKeyDown(ev);
            }
            if (ev.isDefaultPrevented()) {
                return;
            }
            if (document.activeElement === this._root.current && this._isInnerZone) {
                return;
            }
            if (isInnerZoneKeystroke && isInnerZoneKeystroke(ev) && this._isImmediateDescendantOfZone(ev.target)) {
                const innerZone = this._getFirstInnerZone();
                if (innerZone) {
                    if (!innerZone.focus(true)) {
                        return;
                    }
                }
                else if (isElementFocusSubZone(ev.target)) {
                    if (!this.focusElement(getNextElement(ev.target, ev.target.firstChild, true))) {
                        return;
                    }
                }
                else {
                    return;
                }
            }
            else if (ev.altKey) {
                return;
            }
            else {
                switch (ev.which) {
                    case KeyCodes.space:
                        if (this._tryInvokeClickForFocusable(ev.target)) {
                            break;
                        }
                        return;
                    case KeyCodes.left:
                        if (direction !== FocusZoneDirection.vertical && this._moveFocusLeft()) {
                            break;
                        }
                        return;
                    case KeyCodes.right:
                        if (direction !== FocusZoneDirection.vertical && this._moveFocusRight()) {
                            break;
                        }
                        return;
                    case KeyCodes.up:
                        if (direction !== FocusZoneDirection.horizontal && this._moveFocusUp()) {
                            break;
                        }
                        return;
                    case KeyCodes.down:
                        if (direction !== FocusZoneDirection.horizontal && this._moveFocusDown()) {
                            break;
                        }
                        return;
                    case KeyCodes.tab:
                        if (this.props.allowTabKey ||
                            this.props.handleTabKey === FocusZoneTabbableElements.all ||
                            (this.props.handleTabKey === FocusZoneTabbableElements.inputOnly && this._isElementInput(ev.target))) {
                            let focusChanged = false;
                            this._processingTabKey = true;
                            if (direction === FocusZoneDirection.vertical ||
                                !this._shouldWrapFocus(this._activeElement, NO_HORIZONTAL_WRAP)) {
                                focusChanged = ev.shiftKey ? this._moveFocusUp() : this._moveFocusDown();
                            }
                            else if (direction === FocusZoneDirection.horizontal || direction === FocusZoneDirection.bidirectional) {
                                const tabWithDirection = getRTL() ? !ev.shiftKey : ev.shiftKey;
                                focusChanged = tabWithDirection ? this._moveFocusLeft() : this._moveFocusRight();
                            }
                            this._processingTabKey = false;
                            if (focusChanged) {
                                break;
                            }
                        }
                        return;
                    case KeyCodes.home:
                        if (this._isElementInput(ev.target) && !this._shouldInputLoseFocus(ev.target, false)) {
                            return false;
                        }
                        const firstChild = this._root.current && this._root.current.firstChild;
                        if (this._root.current && firstChild && this.focusElement(getNextElement(this._root.current, firstChild, true))) {
                            break;
                        }
                        return;
                    case KeyCodes.end:
                        if (this._isElementInput(ev.target) && !this._shouldInputLoseFocus(ev.target, true)) {
                            return false;
                        }
                        const lastChild = this._root.current && this._root.current.lastChild;
                        if (this._root.current && this.focusElement(getPreviousElement(this._root.current, lastChild, true, true, true))) {
                            break;
                        }
                        return;
                    case KeyCodes.enter:
                        if (this._tryInvokeClickForFocusable(ev.target)) {
                            break;
                        }
                        return;
                    default:
                        return;
                }
            }
            ev.preventDefault();
            ev.stopPropagation();
        };
        this._warnDeprecations({
            rootProps: undefined,
            allowTabKey: 'handleTabKey'
        });
        this._id = getId('FocusZone');
        this._focusAlignment = {
            left: 0,
            top: 0
        };
        this._processingTabKey = false;
    }
    componentDidMount() {
        _allInstances[this._id] = this;
        if (this._root.current) {
            const windowElement = this._root.current.ownerDocument.defaultView;
            let parentElement = getParent(this._root.current, ALLOW_VIRTUAL_ELEMENTS);
            while (parentElement && parentElement !== document.body && parentElement.nodeType === 1) {
                if (isElementFocusZone(parentElement)) {
                    this._isInnerZone = true;
                    break;
                }
                parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
            }
            if (!this._isInnerZone) {
                this._events.on(windowElement, 'keydown', this._onKeyDownCapture, true);
            }
            this._updateTabIndexes();
            if (this.props.defaultActiveElement) {
                this._activeElement = getDocument().querySelector(this.props.defaultActiveElement);
                this.focus();
            }
        }
    }
    componentWillUnmount() {
        delete _allInstances[this._id];
    }
    render() {
        const { rootProps, ariaDescribedBy, ariaLabelledBy, className } = this.props;
        const divProps = getNativeProps(this.props, htmlElementProperties);
        const Tag = this.props.elementType || 'div';
        return (React.createElement(Tag, Object.assign({ role: "presentation" }, divProps, rootProps, { className: css('ms-FocusZone', className), ref: this._root, "data-focuszone-id": this._id, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, onKeyDown: this._onKeyDown, onFocus: this._onFocus, onMouseDownCapture: this._onMouseDown }), this.props.children));
    }
    focus(forceIntoFirstElement = false) {
        if (this._root.current) {
            if (!forceIntoFirstElement && this._root.current.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' && this._isInnerZone) {
                const ownerZoneElement = this._getOwnerZone(this._root.current);
                if (ownerZoneElement !== this._root.current) {
                    const ownerZone = _allInstances[ownerZoneElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
                    return !!ownerZone && ownerZone.focusElement(this._root.current);
                }
                return false;
            }
            else if (!forceIntoFirstElement &&
                this._activeElement &&
                elementContains(this._root.current, this._activeElement) &&
                isElementTabbable(this._activeElement)) {
                this._activeElement.focus();
                return true;
            }
            else {
                const firstChild = this._root.current.firstChild;
                return this.focusElement(getNextElement(this._root.current, firstChild, true));
            }
        }
        return false;
    }
    focusElement(element) {
        const { onBeforeFocus } = this.props;
        if (onBeforeFocus && !onBeforeFocus(element)) {
            return false;
        }
        if (element) {
            this._setActiveElement(element);
            if (this._activeElement) {
                this._activeElement.focus();
            }
            return true;
        }
        return false;
    }
    _onKeyDownCapture(ev) {
        if (ev.which === KeyCodes.tab) {
            this._updateTabIndexes();
        }
    }
    _setActiveElement(element, forceAlignemnt) {
        const previousActiveElement = this._activeElement;
        this._activeElement = element;
        if (previousActiveElement) {
            if (isElementFocusZone(previousActiveElement)) {
                this._updateTabIndexes(previousActiveElement);
            }
            previousActiveElement.tabIndex = -1;
        }
        if (this._activeElement) {
            if (!this._focusAlignment || forceAlignemnt) {
                this._setFocusAlignment(element, true, true);
            }
            this._activeElement.tabIndex = 0;
        }
    }
    _tryInvokeClickForFocusable(target) {
        if (target === this._root.current) {
            return false;
        }
        do {
            if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return false;
            }
            if (this._isImmediateDescendantOfZone(target) &&
                target.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true' &&
                target.getAttribute(IS_ENTER_DISABLED_ATTRIBUTE) !== 'true') {
                EventGroup.raise(target, 'click', null, true);
                return true;
            }
            target = getParent(target, ALLOW_VIRTUAL_ELEMENTS);
        } while (target !== this._root.current);
        return false;
    }
    _getFirstInnerZone(rootElement) {
        rootElement = rootElement || this._activeElement || this._root.current;
        if (!rootElement) {
            return null;
        }
        if (isElementFocusZone(rootElement)) {
            return _allInstances[rootElement.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
        }
        let child = rootElement.firstElementChild;
        while (child) {
            if (isElementFocusZone(child)) {
                return _allInstances[child.getAttribute(FOCUSZONE_ID_ATTRIBUTE)];
            }
            const match = this._getFirstInnerZone(child);
            if (match) {
                return match;
            }
            child = child.nextElementSibling;
        }
        return null;
    }
    _moveFocus(isForward, getDistanceFromCenter, ev, useDefaultWrap = true) {
        let element = this._activeElement;
        let candidateDistance = -1;
        let candidateElement = undefined;
        let changedFocus = false;
        const isBidirectional = this.props.direction === FocusZoneDirection.bidirectional;
        if (!element || !this._root.current) {
            return false;
        }
        if (this._isElementInput(element)) {
            if (!this._shouldInputLoseFocus(element, isForward)) {
                return false;
            }
        }
        const activeRect = isBidirectional ? element.getBoundingClientRect() : null;
        do {
            element = (isForward ? getNextElement(this._root.current, element) : getPreviousElement(this._root.current, element));
            if (isBidirectional) {
                if (element) {
                    const targetRect = element.getBoundingClientRect();
                    const elementDistance = getDistanceFromCenter(activeRect, targetRect);
                    if (elementDistance === -1 && candidateDistance === -1) {
                        candidateElement = element;
                        break;
                    }
                    if (elementDistance > -1 && (candidateDistance === -1 || elementDistance < candidateDistance)) {
                        candidateDistance = elementDistance;
                        candidateElement = element;
                    }
                    if (candidateDistance >= 0 && elementDistance < 0) {
                        break;
                    }
                }
            }
            else {
                candidateElement = element;
                break;
            }
        } while (element);
        if (candidateElement && candidateElement !== this._activeElement) {
            changedFocus = true;
            this.focusElement(candidateElement);
        }
        else if (this.props.isCircularNavigation && useDefaultWrap) {
            if (isForward) {
                return this.focusElement(getNextElement(this._root.current, this._root.current.firstElementChild, true));
            }
            else {
                return this.focusElement(getPreviousElement(this._root.current, this._root.current.lastElementChild, true, true, true));
            }
        }
        return changedFocus;
    }
    _moveFocusDown() {
        let targetTop = -1;
        const leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(true, (activeRect, targetRect) => {
            let distance = -1;
            const targetRectTop = Math.floor(targetRect.top);
            const activeRectBottom = Math.floor(activeRect.bottom);
            if (targetRectTop < activeRectBottom) {
                if (!this._shouldWrapFocus(this._activeElement, NO_VERTICAL_WRAP)) {
                    return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
                }
                return LARGE_DISTANCE_FROM_CENTER;
            }
            if ((targetTop === -1 && targetRectTop >= activeRectBottom) || targetRectTop === targetTop) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= targetRect.left + targetRect.width) {
                    distance = 0;
                }
                else {
                    distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    }
    _moveFocusUp() {
        let targetTop = -1;
        const leftAlignment = this._focusAlignment.left;
        if (this._moveFocus(false, (activeRect, targetRect) => {
            let distance = -1;
            const targetRectBottom = Math.floor(targetRect.bottom);
            const targetRectTop = Math.floor(targetRect.top);
            const activeRectTop = Math.floor(activeRect.top);
            if (targetRectBottom > activeRectTop) {
                if (!this._shouldWrapFocus(this._activeElement, NO_VERTICAL_WRAP)) {
                    return LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
                }
                return LARGE_DISTANCE_FROM_CENTER;
            }
            if ((targetTop === -1 && targetRectBottom <= activeRectTop) || targetRectTop === targetTop) {
                targetTop = targetRectTop;
                if (leftAlignment >= targetRect.left && leftAlignment <= targetRect.left + targetRect.width) {
                    distance = 0;
                }
                else {
                    distance = Math.abs(targetRect.left + targetRect.width / 2 - leftAlignment);
                }
            }
            return distance;
        })) {
            this._setFocusAlignment(this._activeElement, false, true);
            return true;
        }
        return false;
    }
    _moveFocusLeft() {
        const shouldWrap = this._shouldWrapFocus(this._activeElement, NO_HORIZONTAL_WRAP);
        if (this._moveFocus(getRTL(), (activeRect, targetRect) => {
            let distance = -1;
            let topBottomComparison;
            if (getRTL()) {
                topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3);
            }
            else {
                topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3);
            }
            if (topBottomComparison && targetRect.right <= activeRect.right && this.props.direction !== FocusZoneDirection.vertical) {
                distance = activeRect.right - targetRect.right;
            }
            else {
                if (!shouldWrap) {
                    distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
                }
            }
            return distance;
        }, undefined, shouldWrap)) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    }
    _moveFocusRight() {
        const shouldWrap = this._shouldWrapFocus(this._activeElement, NO_HORIZONTAL_WRAP);
        if (this._moveFocus(!getRTL(), (activeRect, targetRect) => {
            let distance = -1;
            let topBottomComparison;
            if (getRTL()) {
                topBottomComparison = targetRect.bottom.toFixed(3) > activeRect.top.toFixed(3);
            }
            else {
                topBottomComparison = targetRect.top.toFixed(3) < activeRect.bottom.toFixed(3);
            }
            if (topBottomComparison && targetRect.left >= activeRect.left && this.props.direction !== FocusZoneDirection.vertical) {
                distance = targetRect.left - activeRect.left;
            }
            else if (!shouldWrap) {
                distance = LARGE_NEGATIVE_DISTANCE_FROM_CENTER;
            }
            return distance;
        }, undefined, shouldWrap)) {
            this._setFocusAlignment(this._activeElement, true, false);
            return true;
        }
        return false;
    }
    _setFocusAlignment(element, isHorizontal, isVertical) {
        if (this.props.direction === FocusZoneDirection.bidirectional && (!this._focusAlignment || isHorizontal || isVertical)) {
            const rect = element.getBoundingClientRect();
            const left = rect.left + rect.width / 2;
            const top = rect.top + rect.height / 2;
            if (!this._focusAlignment) {
                this._focusAlignment = { left, top };
            }
            if (isHorizontal) {
                this._focusAlignment.left = left;
            }
            if (isVertical) {
                this._focusAlignment.top = top;
            }
        }
    }
    _isImmediateDescendantOfZone(element) {
        return this._getOwnerZone(element) === this._root.current;
    }
    _getOwnerZone(element) {
        let parentElement = getParent(element, ALLOW_VIRTUAL_ELEMENTS);
        while (parentElement && parentElement !== this._root.current && parentElement !== document.body) {
            if (isElementFocusZone(parentElement)) {
                return parentElement;
            }
            parentElement = getParent(parentElement, ALLOW_VIRTUAL_ELEMENTS);
        }
        return this._root.current;
    }
    _updateTabIndexes(element) {
        if (!element && this._root.current) {
            this._defaultFocusElement = null;
            element = this._root.current;
            if (this._activeElement && !elementContains(element, this._activeElement)) {
                this._activeElement = null;
            }
        }
        if (this._activeElement && !isElementTabbable(this._activeElement)) {
            this._activeElement = null;
        }
        const childNodes = element && element.children;
        for (let childIndex = 0; childNodes && childIndex < childNodes.length; childIndex++) {
            const child = childNodes[childIndex];
            if (!isElementFocusZone(child)) {
                if (child.getAttribute && child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'false') {
                    child.setAttribute(TABINDEX, '-1');
                }
                if (isElementTabbable(child)) {
                    if (this.props.disabled) {
                        child.setAttribute(TABINDEX, '-1');
                    }
                    else if (!this._isInnerZone && ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)) {
                        this._defaultFocusElement = child;
                        if (child.getAttribute(TABINDEX) !== '0') {
                            child.setAttribute(TABINDEX, '0');
                        }
                    }
                    else if (child.getAttribute(TABINDEX) !== '-1') {
                        child.setAttribute(TABINDEX, '-1');
                    }
                }
                else if (child.tagName === 'svg' && child.getAttribute('focusable') !== 'false') {
                    child.setAttribute('focusable', 'false');
                }
            }
            else if (child.getAttribute(IS_FOCUSABLE_ATTRIBUTE) === 'true') {
                if (!this._isInnerZone && ((!this._activeElement && !this._defaultFocusElement) || this._activeElement === child)) {
                    this._defaultFocusElement = child;
                    if (child.getAttribute(TABINDEX) !== '0') {
                        child.setAttribute(TABINDEX, '0');
                    }
                }
                else if (child.getAttribute(TABINDEX) !== '-1') {
                    child.setAttribute(TABINDEX, '-1');
                }
            }
            this._updateTabIndexes(child);
        }
    }
    _isElementInput(element) {
        if (element && element.tagName && (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea')) {
            return true;
        }
        return false;
    }
    _shouldInputLoseFocus(element, isForward) {
        if (!this._processingTabKey && element && element.type && ALLOWED_INPUT_TYPES.indexOf(element.type.toLowerCase()) > -1) {
            const selectionStart = element.selectionStart;
            const selectionEnd = element.selectionEnd;
            const isRangeSelected = selectionStart !== selectionEnd;
            const inputValue = element.value;
            if (isRangeSelected ||
                (selectionStart > 0 && !isForward) ||
                (selectionStart !== inputValue.length && isForward) ||
                (!!this.props.handleTabKey && !(this.props.shouldInputLoseFocusOnArrowKey && this.props.shouldInputLoseFocusOnArrowKey(element)))) {
                return false;
            }
        }
        return true;
    }
    _shouldWrapFocus(element, noWrapDataAttribute) {
        return !!this.props.checkForNoWrap ? shouldWrapFocus(element, noWrapDataAttribute) : true;
    }
}
FocusZone.defaultProps = {
    isCircularNavigation: false,
    direction: FocusZoneDirection.bidirectional
};
