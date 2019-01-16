import * as React from 'react';
import { AutoScroll, BaseComponent, classNamesFunction, findScrollableParent, getDistanceBetweenPoints, getRTL } from '../../Utilities';
const getClassNames = classNamesFunction();
const MIN_DRAG_DISTANCE = 5;
export class MarqueeSelectionBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._onMouseDown = (ev) => {
            const { isEnabled, onShouldStartSelection } = this.props;
            if (this._isMouseEventOnScrollbar(ev)) {
                return;
            }
            if (this._isInSelectionToggle(ev)) {
                return;
            }
            if (!this._isTouch && isEnabled && !this._isDragStartInSelection(ev) && (!onShouldStartSelection || onShouldStartSelection(ev))) {
                if (this._scrollableSurface && ev.button === 0 && this._root.current) {
                    this._selectedIndicies = {};
                    this._preservedIndicies = undefined;
                    this._events.on(window, 'mousemove', this._onAsyncMouseMove);
                    this._events.on(this._scrollableParent, 'scroll', this._onAsyncMouseMove);
                    this._events.on(window, 'click', this._onMouseUp, true);
                    this._autoScroll = new AutoScroll(this._root.current);
                    this._scrollTop = this._scrollableSurface.scrollTop;
                    this._rootRect = this._root.current.getBoundingClientRect();
                    this._onMouseMove(ev);
                }
            }
        };
        this._onTouchStart = (ev) => {
            this._isTouch = true;
            this._async.setTimeout(() => {
                this._isTouch = false;
            }, 0);
        };
        this._onPointerDown = (ev) => {
            if (ev.pointerType === 'touch') {
                this._isTouch = true;
                this._async.setTimeout(() => {
                    this._isTouch = false;
                }, 0);
            }
        };
        this.state = {
            dragRect: undefined
        };
    }
    componentDidMount() {
        this._scrollableParent = findScrollableParent(this._root.current);
        this._scrollableSurface = this._scrollableParent === window ? document.body : this._scrollableParent;
        const hitTarget = this.props.isDraggingConstrainedToRoot ? this._root.current : this._scrollableSurface;
        this._events.on(hitTarget, 'mousedown', this._onMouseDown);
        this._events.on(hitTarget, 'touchstart', this._onTouchStart, true);
        this._events.on(hitTarget, 'pointerdown', this._onPointerDown, true);
    }
    componentWillUnmount() {
        if (this._autoScroll) {
            this._autoScroll.dispose();
        }
    }
    render() {
        const { rootProps, children, theme, className, styles } = this.props;
        const { dragRect } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        return (React.createElement("div", Object.assign({}, rootProps, { className: classNames.root, ref: this._root }),
            children,
            dragRect && React.createElement("div", { className: classNames.dragMask }),
            dragRect && (React.createElement("div", { className: classNames.box, style: dragRect },
                React.createElement("div", { className: classNames.boxFill })))));
    }
    _isMouseEventOnScrollbar(ev) {
        const targetElement = ev.target;
        const targetScrollbarWidth = targetElement.offsetWidth - targetElement.clientWidth;
        if (targetScrollbarWidth) {
            const targetRect = targetElement.getBoundingClientRect();
            if (getRTL()) {
                if (ev.clientX < targetRect.left + targetScrollbarWidth) {
                    return true;
                }
            }
            else {
                if (ev.clientX > targetRect.left + targetElement.clientWidth) {
                    return true;
                }
            }
            if (ev.clientY > targetRect.top + targetElement.clientHeight) {
                return true;
            }
        }
        return false;
    }
    _getRootRect() {
        return {
            left: this._rootRect.left,
            top: this._rootRect.top + (this._scrollTop - this._scrollableSurface.scrollTop),
            width: this._rootRect.width,
            height: this._rootRect.height
        };
    }
    _onAsyncMouseMove(ev) {
        this._async.requestAnimationFrame(() => {
            this._onMouseMove(ev);
        });
        ev.stopPropagation();
        ev.preventDefault();
    }
    _onMouseMove(ev) {
        if (!this._autoScroll) {
            return;
        }
        if (ev.clientX !== undefined) {
            this._lastMouseEvent = ev;
        }
        const rootRect = this._getRootRect();
        const currentPoint = { x: ev.clientX - rootRect.left, y: ev.clientY - rootRect.top };
        if (!this._dragOrigin) {
            this._dragOrigin = currentPoint;
        }
        if (ev.buttons !== undefined && ev.buttons === 0) {
            this._onMouseUp(ev);
        }
        else {
            if (this.state.dragRect || getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
                if (!this.state.dragRect) {
                    const { selection } = this.props;
                    this._preservedIndicies = selection && selection.getSelectedIndices && selection.getSelectedIndices();
                }
                const constrainedPoint = this.props.isDraggingConstrainedToRoot
                    ? {
                        x: Math.max(0, Math.min(rootRect.width, this._lastMouseEvent.clientX - rootRect.left)),
                        y: Math.max(0, Math.min(rootRect.height, this._lastMouseEvent.clientY - rootRect.top))
                    }
                    : {
                        x: this._lastMouseEvent.clientX - rootRect.left,
                        y: this._lastMouseEvent.clientY - rootRect.top
                    };
                const dragRect = {
                    left: Math.min(this._dragOrigin.x, constrainedPoint.x),
                    top: Math.min(this._dragOrigin.y, constrainedPoint.y),
                    width: Math.abs(constrainedPoint.x - this._dragOrigin.x),
                    height: Math.abs(constrainedPoint.y - this._dragOrigin.y)
                };
                this._evaluateSelection(dragRect, rootRect);
                this.setState({ dragRect });
            }
        }
        return false;
    }
    _onMouseUp(ev) {
        this._events.off(window);
        this._events.off(this._scrollableParent, 'scroll');
        if (this._autoScroll) {
            this._autoScroll.dispose();
        }
        this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = this._itemRectCache = undefined;
        if (this.state.dragRect) {
            this.setState({
                dragRect: undefined
            });
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    _isPointInRectangle(rectangle, point) {
        return rectangle.top < point.y && rectangle.bottom > point.y && rectangle.left < point.x && rectangle.right > point.x;
    }
    _isDragStartInSelection(ev) {
        const selection = this.props.selection;
        if (!this._root.current || (selection && selection.getSelectedCount() === 0)) {
            return false;
        }
        const allElements = this._root.current.querySelectorAll('[data-selection-index]');
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];
            const index = Number(element.getAttribute('data-selection-index'));
            if (selection.isIndexSelected(index)) {
                const itemRect = element.getBoundingClientRect();
                if (this._isPointInRectangle(itemRect, { x: ev.clientX, y: ev.clientY })) {
                    return true;
                }
            }
        }
        return false;
    }
    _isInSelectionToggle(ev) {
        let element = ev.target;
        while (element && element !== this._root.current) {
            if (element.getAttribute('data-selection-toggle') === 'true') {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    }
    _evaluateSelection(dragRect, rootRect) {
        if (!dragRect || !this._root.current) {
            return;
        }
        const { selection } = this.props;
        const allElements = this._root.current.querySelectorAll('[data-selection-index]');
        if (!this._itemRectCache) {
            this._itemRectCache = {};
        }
        selection.setChangeEvents(false);
        selection.setAllSelected(false);
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];
            const index = element.getAttribute('data-selection-index');
            let itemRect = this._itemRectCache[index];
            if (!itemRect) {
                itemRect = element.getBoundingClientRect();
                itemRect = {
                    left: itemRect.left - rootRect.left,
                    top: itemRect.top - rootRect.top,
                    width: itemRect.width,
                    height: itemRect.height,
                    right: itemRect.left - rootRect.left + itemRect.width,
                    bottom: itemRect.top - rootRect.top + itemRect.height
                };
                if (itemRect.width > 0 && itemRect.height > 0) {
                    this._itemRectCache[index] = itemRect;
                }
            }
            if (itemRect.top < dragRect.top + dragRect.height &&
                itemRect.bottom > dragRect.top &&
                itemRect.left < dragRect.left + dragRect.width &&
                itemRect.right > dragRect.left) {
                this._selectedIndicies[index] = true;
            }
            else {
                delete this._selectedIndicies[index];
            }
        }
        for (const index in this._selectedIndicies) {
            if (this._selectedIndicies.hasOwnProperty(index)) {
                selection.setIndexSelected(Number(index), true, false);
            }
        }
        if (this._preservedIndicies) {
            for (const index of this._preservedIndicies) {
                selection.setIndexSelected(index, true, false);
            }
        }
        selection.setChangeEvents(true);
    }
}
MarqueeSelectionBase.defaultProps = {
    rootTagName: 'div',
    rootProps: {},
    isEnabled: true
};
