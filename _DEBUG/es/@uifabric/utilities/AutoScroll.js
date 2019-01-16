import { EventGroup } from './EventGroup';
import { findScrollableParent } from './scroll';
import { getRect } from './dom';
const SCROLL_ITERATION_DELAY = 16;
const SCROLL_GUTTER_HEIGHT = 100;
const MAX_SCROLL_VELOCITY = 15;
export class AutoScroll {
    constructor(element) {
        this._events = new EventGroup(this);
        this._scrollableParent = findScrollableParent(element);
        this._incrementScroll = this._incrementScroll.bind(this);
        this._scrollRect = getRect(this._scrollableParent);
        if (this._scrollableParent === window) {
            this._scrollableParent = document.body;
        }
        if (this._scrollableParent) {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'touchmove', this._onTouchMove, true);
        }
    }
    dispose() {
        this._events.dispose();
        this._stopScroll();
    }
    _onMouseMove(ev) {
        this._computeScrollVelocity(ev.clientY);
    }
    _onTouchMove(ev) {
        if (ev.touches.length > 0) {
            this._computeScrollVelocity(ev.touches[0].clientY);
        }
    }
    _computeScrollVelocity(clientY) {
        if (!this._scrollRect) {
            return;
        }
        let scrollRectTop = this._scrollRect.top;
        let scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;
        if (clientY < scrollRectTop + SCROLL_GUTTER_HEIGHT) {
            this._scrollVelocity = Math.max(-MAX_SCROLL_VELOCITY, -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT));
        }
        else if (clientY > scrollClientBottom) {
            this._scrollVelocity = Math.min(MAX_SCROLL_VELOCITY, MAX_SCROLL_VELOCITY * ((clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT));
        }
        else {
            this._scrollVelocity = 0;
        }
        if (this._scrollVelocity) {
            this._startScroll();
        }
        else {
            this._stopScroll();
        }
    }
    _startScroll() {
        if (!this._timeoutId) {
            this._incrementScroll();
        }
    }
    _incrementScroll() {
        if (this._scrollableParent) {
            this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
        }
        this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
    }
    _stopScroll() {
        if (this._timeoutId) {
            clearTimeout(this._timeoutId);
            delete this._timeoutId;
        }
    }
}
