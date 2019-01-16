import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { findScrollableParent, getRect, createRef, getWindow } from '../../Utilities';
const RESIZE_DELAY = 500;
const MAX_RESIZE_ATTEMPTS = 3;
export function withViewport(ComposedComponent) {
    return class WithViewportComponent extends BaseDecorator {
        constructor(props) {
            super(props);
            this._root = createRef();
            this._updateViewport = (withForceUpdate) => {
                const { viewport } = this.state;
                const viewportElement = this._root.current;
                const scrollElement = findScrollableParent(viewportElement);
                const scrollRect = getRect(scrollElement);
                const clientRect = getRect(viewportElement);
                const updateComponent = () => {
                    if (withForceUpdate && this._composedComponentInstance) {
                        this._composedComponentInstance.forceUpdate();
                    }
                };
                const isSizeChanged = (clientRect && clientRect.width) !== viewport.width || (scrollRect && scrollRect.height) !== viewport.height;
                if (isSizeChanged && this._resizeAttempts < MAX_RESIZE_ATTEMPTS && clientRect && scrollRect) {
                    this._resizeAttempts++;
                    this.setState({
                        viewport: {
                            width: clientRect.width,
                            height: scrollRect.height
                        }
                    }, () => {
                        this._updateViewport(withForceUpdate);
                    });
                }
                else {
                    this._resizeAttempts = 0;
                    updateComponent();
                }
            };
            this._resizeAttempts = 0;
            this.state = {
                viewport: {
                    width: 0,
                    height: 0
                }
            };
        }
        componentDidMount() {
            const { skipViewportMeasures } = this.props;
            this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
                leading: false
            });
            const window = getWindow();
            const viewportElement = this._root.current;
            if (!skipViewportMeasures && window && window.ResizeObserver) {
                this._viewportResizeObserver = new window.ResizeObserver(this._onAsyncResize);
                this._viewportResizeObserver.observe(viewportElement);
            }
            else {
                this._events.on(window, 'resize', this._onAsyncResize);
            }
            if (!skipViewportMeasures) {
                this._updateViewport();
            }
        }
        componentWillUnmount() {
            this._events.dispose();
            if (this._viewportResizeObserver) {
                this._viewportResizeObserver.disconnect();
            }
        }
        render() {
            const { viewport } = this.state;
            const { skipViewportMeasures } = this.props;
            const isViewportVisible = skipViewportMeasures || (viewport.width > 0 && viewport.height > 0);
            return (React.createElement("div", { className: "ms-Viewport", ref: this._root, style: { minWidth: 1, minHeight: 1 } }, isViewportVisible && React.createElement(ComposedComponent, Object.assign({ ref: this._updateComposedComponentRef, viewport: viewport }, this.props))));
        }
        forceUpdate() {
            this._updateViewport(true);
        }
        _onAsyncResize() {
            this._updateViewport();
        }
    };
}
