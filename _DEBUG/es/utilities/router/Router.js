import * as React from 'react';
import { BaseComponent } from '../../Utilities';
export class Router extends BaseComponent {
    componentDidMount() {
        this._events.on(window, 'hashchange', () => this.forceUpdate());
    }
    render() {
        return this._resolveRoute();
    }
    _getPath() {
        let path = location.hash;
        const hashIndex = path.lastIndexOf('#'), questionMarkIndex = path.indexOf('?');
        if (questionMarkIndex > -1) {
            path = path.substr(0, questionMarkIndex);
        }
        if (hashIndex > 0) {
            path = path.substr(0, hashIndex);
        }
        return path;
    }
    _resolveRoute(path, children) {
        path = path || this._getPath();
        children = children || this.props.children;
        const routes = React.Children.toArray(children);
        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            if (_match(path, route)) {
                const { getComponent } = route.props;
                let { component } = route.props;
                if (getComponent) {
                    let asynchronouslyResolved = false;
                    if (getComponent.component) {
                        component = getComponent.component;
                    }
                    else {
                        getComponent((resolved) => {
                            component = getComponent.component = resolved;
                            if (asynchronouslyResolved) {
                                this.forceUpdate();
                            }
                        });
                    }
                    asynchronouslyResolved = true;
                }
                if (component) {
                    const componentChildren = this._resolveRoute(path, route.props.children || []);
                    if (componentChildren) {
                        return React.createElement(component, { key: route.key }, componentChildren);
                    }
                    else {
                        return React.createElement(component, { key: route.key });
                    }
                }
                else if (getComponent) {
                    return null;
                }
            }
        }
        return null;
    }
}
function _match(currentPath, child) {
    if (child.props) {
        let { path } = child.props;
        path = path || '';
        currentPath = currentPath || '';
        return !path || path.toLowerCase() === currentPath.toLowerCase();
    }
    return false;
}
