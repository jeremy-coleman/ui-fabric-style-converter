import * as React from 'react';
import { BaseComponent, getNativeProps, divProperties } from '../../Utilities';
export class PivotItem extends BaseComponent {
    render() {
        return React.createElement("div", Object.assign({}, getNativeProps(this.props, divProperties)), this.props.children);
    }
}
