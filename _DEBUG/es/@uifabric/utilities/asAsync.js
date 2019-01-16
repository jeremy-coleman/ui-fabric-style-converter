import * as React from 'react';
const _syncModuleCache = typeof WeakMap !== 'undefined'
    ?
        new WeakMap()
    : undefined;
export function asAsync(options) {
    class Async extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                Component: _syncModuleCache ? _syncModuleCache.get(options.load) : undefined
            };
        }
        render() {
            const { forwardedRef, asyncPlaceholder: Placeholder, ...rest } = this.props;
            const { Component } = this.state;
            return Component ? React.createElement(Component, Object.assign({ ref: forwardedRef }, rest)) : Placeholder ? React.createElement(Placeholder, null) : null;
        }
        componentDidMount() {
            let { Component } = this.state;
            if (!Component) {
                options
                    .load()
                    .then((LoadedComponent) => {
                    if (LoadedComponent) {
                        _syncModuleCache && _syncModuleCache.set(options.load, LoadedComponent);
                        this.setState({
                            Component: LoadedComponent
                        }, options.onLoad);
                    }
                })
                    .catch(options.onError);
            }
        }
    }
    return React.forwardRef((props, ref) => (React.createElement(Async, Object.assign({}, props, { forwardedRef: ref }))));
}
