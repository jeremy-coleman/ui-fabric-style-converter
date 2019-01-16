import * as React from 'react';
import { BaseComponent, assign, classNamesFunction } from '../../../Utilities';
import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE, getFullColorString, hsv2hex } from '../../../utilities/color/colors';
const getClassNames = classNamesFunction();
export class ColorRectangleBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._onMouseDown = (ev) => {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'mouseup', this._onMouseUp, true);
            this._onMouseMove(ev);
        };
        this._onMouseMove = (ev) => {
            const { color, onSVChanged } = this.props;
            if (!this._root.current) {
                return;
            }
            const rectSize = this._root.current.getBoundingClientRect();
            const sPercentage = (ev.clientX - rectSize.left) / rectSize.width;
            const vPercentage = (ev.clientY - rectSize.top) / rectSize.height;
            const newColor = assign({}, color, {
                s: Math.min(MAX_COLOR_SATURATION, Math.max(0, sPercentage * MAX_COLOR_SATURATION)),
                v: Math.min(MAX_COLOR_VALUE, Math.max(0, MAX_COLOR_VALUE - vPercentage * MAX_COLOR_VALUE))
            });
            newColor.hex = hsv2hex(newColor.h, newColor.s, newColor.v);
            newColor.str = newColor.a === 100 ? '#' + newColor.hex : `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a / 100})`;
            this.setState({
                isAdjusting: true,
                color: newColor
            });
            if (onSVChanged) {
                onSVChanged(newColor.s, newColor.v);
            }
            ev.preventDefault();
            ev.stopPropagation();
        };
        this._onMouseUp = (ev) => {
            this._events.off();
            this.setState({
                isAdjusting: false,
                origin: undefined
            });
        };
        const { color } = this.props;
        this.state = {
            isAdjusting: false,
            origin: undefined,
            color: color,
            fullColorString: getFullColorString(color)
        };
    }
    componentWillUnmount() {
        this._events.dispose();
    }
    componentWillReceiveProps(newProps) {
        const { color } = newProps;
        this.setState({
            color: color,
            fullColorString: getFullColorString(color)
        });
    }
    render() {
        const { minSize, theme, className, styles } = this.props;
        const { color, fullColorString } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        return (React.createElement("div", { ref: this._root, className: classNames.root, style: { minWidth: minSize, minHeight: minSize, backgroundColor: fullColorString }, onMouseDown: this._onMouseDown },
            React.createElement("div", { className: classNames.light }),
            React.createElement("div", { className: classNames.dark }),
            React.createElement("div", { className: classNames.thumb, style: { left: color.s + '%', top: MAX_COLOR_VALUE - color.v + '%', backgroundColor: color.str } })));
    }
}
ColorRectangleBase.defaultProps = {
    minSize: 220
};
