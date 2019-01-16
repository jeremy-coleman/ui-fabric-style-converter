import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { notifyHostChanged } from './Layer.notification';
export class LayerHost extends BaseComponent {
    shouldComponentUpdate() {
        return false;
    }
    componentDidMount() {
        notifyHostChanged(this.props.id);
    }
    componentWillUnmount() {
        notifyHostChanged(this.props.id);
    }
    render() {
        return React.createElement("div", Object.assign({}, this.props, { className: css('ms-LayerHost', this.props.className) }));
    }
}
