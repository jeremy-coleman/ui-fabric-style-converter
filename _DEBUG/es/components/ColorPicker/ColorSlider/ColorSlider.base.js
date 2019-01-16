import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
const getClassNames = classNamesFunction();
export class ColorSliderBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._onMouseDown = (ev) => {
            this._events.on(window, 'mousemove', this._onMouseMove, true);
            this._events.on(window, 'mouseup', this._onMouseUp, true);
            this._onMouseMove(ev);
        };
        this._onMouseMove = (ev) => {
            if (!this._root.current) {
                return;
            }
            const { onChange, onChanged, minValue, maxValue } = this.props;
            const rectSize = this._root.current.getBoundingClientRect();
            const currentPercentage = (ev.clientX - rectSize.left) / rectSize.width;
            const newValue = Math.min(maxValue, Math.max(minValue, currentPercentage * maxValue));
            this.setState({
                isAdjusting: true,
                currentValue: newValue
            });
            if (onChange) {
                onChange(ev, newValue);
            }
            if (onChanged) {
                onChanged(newValue);
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
        this._warnDeprecations({
            onChanged: 'onChange'
        });
        const { value } = this.props;
        this.state = {
            isAdjusting: false,
            origin: undefined,
            currentValue: value
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps && newProps.value) {
            this.setState({ currentValue: newProps.value });
        }
    }
    render() {
        const { isAlpha, minValue, maxValue, overlayStyle, theme, className, styles } = this.props;
        const { currentValue } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        const currentPercentage = (100 * (currentValue - minValue)) / (maxValue - minValue);
        const hueStyle = {
            background: 'linear-gradient(to left,red 0,#f09 10%,#cd00ff 20%,#3200ff 30%,#06f 40%,#00fffd 50%,#0f6 60%,#35ff00 70%,#cdff00 80%,#f90 90%,red 100%)'
        };
        const alphaStyle = {
            backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJUlEQVQYV2N89erVfwY0ICYmxoguxjgUFKI7GsTH5m4M3w1ChQC1/Ca8i2n1WgAAAABJRU5ErkJggg==)'
        };
        const sliderStyle = isAlpha ? alphaStyle : hueStyle;
        return (React.createElement("div", { ref: this._root, className: classNames.root, onMouseDown: this._onMouseDown, style: sliderStyle },
            React.createElement("div", { className: classNames.sliderOverlay, style: overlayStyle }),
            React.createElement("div", { className: classNames.sliderThumb, style: { left: currentPercentage + '%' } })));
    }
}
ColorSliderBase.defaultProps = {
    minValue: 0,
    maxValue: 100,
    thumbColor: 'inherit',
    value: 0
};
