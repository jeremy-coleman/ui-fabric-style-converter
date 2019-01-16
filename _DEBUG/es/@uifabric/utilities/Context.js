import * as React from 'react';
export function provideContext(contextTypes, mapPropsToContext) {
    class Provider extends React.Component {
        getChildContext() {
            return mapPropsToContext(this.props);
        }
        render() {
            return React.Children.only(this.props.children);
        }
    }
    Provider.childContextTypes = contextTypes;
    return Provider;
}
