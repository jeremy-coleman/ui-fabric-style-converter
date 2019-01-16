import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
export function withContainsFocus(ComposedComponent) {
    return class WithContainsFocusComponent extends BaseDecorator {
        constructor(props) {
            super(props);
            this.state = {
                containsFocus: false
            };
            this._delayedSetContainsFocus = this._async.debounce(this._setContainsFocus, 20);
            this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
            this._handleFocus = this._handleFocus.bind(this);
            this._handleBlur = this._handleBlur.bind(this);
        }
        componentWillUnmount() {
            this._async.dispose();
        }
        render() {
            const { containsFocus } = this.state;
            return (React.createElement("div", { onFocus: this._handleFocus, onBlur: this._handleBlur },
                React.createElement(ComposedComponent, Object.assign({ ref: this._updateComposedComponentRef, containsFocus: containsFocus }, this.props))));
        }
        forceUpdate() {
            this._composedComponentInstance.forceUpdate();
        }
        _handleFocus(ev) {
            this._newContainsFocus = true;
            this._delayedSetContainsFocus();
        }
        _handleBlur(ev) {
            this._newContainsFocus = false;
            this._delayedSetContainsFocus();
        }
        _setContainsFocus() {
            if (this.state.containsFocus !== this._newContainsFocus) {
                this.setState({ containsFocus: this._newContainsFocus });
            }
        }
    };
}
