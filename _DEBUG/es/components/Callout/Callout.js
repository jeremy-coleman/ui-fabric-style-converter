import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { CalloutContent } from './CalloutContent';
import { Layer } from '../../Layer';
export class Callout extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { layerProps, ...rest } = this.props;
        const content = React.createElement(CalloutContent, Object.assign({}, rest));
        return this.props.doNotLayer ? content : React.createElement(Layer, Object.assign({}, layerProps), content);
    }
}
