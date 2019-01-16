import * as React from 'react';
import { BaseComponent, getNativeProps, divProperties, classNamesFunction, getWindow, isDirectionalKeyCode } from '../../Utilities';
import { getStyles } from './Fabric.styles';
const getClassNames = classNamesFunction();
export class FabricBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._rootElement = React.createRef();
        this._onMouseDown = (ev) => {
            this.setState({ isFocusVisible: false });
        };
        this._onKeyDown = (ev) => {
            if (isDirectionalKeyCode(ev.which)) {
                this.setState({ isFocusVisible: true });
            }
        };
        this.state = { isFocusVisible: false };
    }
    render() {
        const classNames = getClassNames(getStyles, {
            ...this.props,
            ...this.state
        });
        const divProps = getNativeProps(this.props, divProperties);
        return React.createElement("div", Object.assign({}, divProps, { className: classNames.root, ref: this._rootElement }));
    }
    componentDidMount() {
        const win = getWindow(this._rootElement.current);
        if (win) {
            this._events.on(win, 'mousedown', this._onMouseDown, true);
            this._events.on(win, 'keydown', this._onKeyDown, true);
        }
    }
}
