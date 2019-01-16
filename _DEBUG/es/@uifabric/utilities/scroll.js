import { getDocument } from './dom';
import { mergeStyles } from '@uifabric/merge-styles';
let _scrollbarWidth;
let _bodyScrollDisabledCount = 0;
const DisabledScrollClassName = mergeStyles({
    overflow: 'hidden !important'
});
export const DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';
const _makeElementScrollAllower = () => {
    let _previousClientY = 0;
    let _element = null;
    const _saveClientY = (event) => {
        if (event.targetTouches.length === 1) {
            _previousClientY = event.targetTouches[0].clientY;
        }
    };
    const _preventOverscrolling = (event) => {
        if (event.targetTouches.length !== 1) {
            return;
        }
        event.stopPropagation();
        if (!_element) {
            return;
        }
        const clientY = event.targetTouches[0].clientY - _previousClientY;
        if (_element.scrollTop === 0 && clientY > 0) {
            event.preventDefault();
        }
        if (_element.scrollHeight - _element.scrollTop <= _element.clientHeight && clientY < 0) {
            event.preventDefault();
        }
    };
    return (element, events) => {
        if (!element) {
            return;
        }
        events.on(element, 'touchstart', _saveClientY);
        events.on(element, 'touchmove', _preventOverscrolling);
        _element = element;
    };
};
export const allowScrollOnElement = _makeElementScrollAllower();
const _disableIosBodyScroll = (event) => {
    event.preventDefault();
};
export function disableBodyScroll() {
    let doc = getDocument();
    if (doc && doc.body && !_bodyScrollDisabledCount) {
        doc.body.classList.add(DisabledScrollClassName);
        doc.body.addEventListener('touchmove', _disableIosBodyScroll, { passive: false, capture: false });
    }
    _bodyScrollDisabledCount++;
}
export function enableBodyScroll() {
    if (_bodyScrollDisabledCount > 0) {
        let doc = getDocument();
        if (doc && doc.body && _bodyScrollDisabledCount === 1) {
            doc.body.classList.remove(DisabledScrollClassName);
            doc.body.removeEventListener('touchmove', _disableIosBodyScroll);
        }
        _bodyScrollDisabledCount--;
    }
}
export function getScrollbarWidth() {
    if (_scrollbarWidth === undefined) {
        let scrollDiv = document.createElement('div');
        scrollDiv.style.setProperty('width', '100px');
        scrollDiv.style.setProperty('height', '100px');
        scrollDiv.style.setProperty('overflow', 'scroll');
        scrollDiv.style.setProperty('position', 'absolute');
        scrollDiv.style.setProperty('top', '-9999px');
        document.body.appendChild(scrollDiv);
        _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
    }
    return _scrollbarWidth;
}
export function findScrollableParent(startingElement) {
    let el = startingElement;
    while (el && el !== document.body) {
        if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
            return el;
        }
        el = el.parentElement;
    }
    el = startingElement;
    while (el && el !== document.body) {
        if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
            const computedStyles = getComputedStyle(el);
            let overflowY = computedStyles ? computedStyles.getPropertyValue('overflow-y') : '';
            if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
                return el;
            }
        }
        el = el.parentElement;
    }
    if (!el || el === document.body) {
        el = window;
    }
    return el;
}
