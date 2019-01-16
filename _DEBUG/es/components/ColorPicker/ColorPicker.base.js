import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { TextField } from '../../TextField';
import { ColorRectangle } from './ColorRectangle/ColorRectangle';
import { ColorSlider } from './ColorSlider/ColorSlider';
import { MAX_COLOR_HUE, getColorFromString, getColorFromRGBA, updateA, updateH, updateSV } from '../../utilities/color/colors';
const getClassNames = classNamesFunction();
export class ColorPickerBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._hexText = React.createRef();
        this._rText = React.createRef();
        this._gText = React.createRef();
        this._bText = React.createRef();
        this._aText = React.createRef();
        this._onSVChanged = (s, v) => {
            this._updateColor(updateSV(this.state.color, s, v));
        };
        this._onHChanged = (ev, h) => {
            this._updateColor(updateH(this.state.color, h));
        };
        this._onAChanged = (ev, a) => {
            this._updateColor(updateA(this.state.color, a));
        };
        this._onHexChanged = () => {
            if (this._hexText.current) {
                this._updateColor(getColorFromString('#' + this._hexText.current.value));
            }
        };
        this._onRGBAChanged = () => {
            if (!this._rText.current || !this._gText.current || !this._bText.current || !this._aText.current) {
                return;
            }
            this._updateColor(getColorFromRGBA({
                r: Number(this._rText.current.value),
                g: Number(this._gText.current.value),
                b: Number(this._bText.current.value),
                a: Number(this._aText.current.value || 100)
            }));
        };
        this.state = {
            color: getColorFromString(props.color)
        };
    }
    componentWillReceiveProps(newProps) {
        if (newProps.color) {
            this._updateColor(getColorFromString(newProps.color));
        }
    }
    render() {
        const { theme, className, styles } = this.props;
        const { color } = this.state;
        const classNames = getClassNames(styles, {
            theme: theme,
            className
        });
        return (React.createElement("div", { className: classNames.root },
            React.createElement("div", { className: classNames.panel },
                React.createElement(ColorRectangle, { color: color, onSVChanged: this._onSVChanged }),
                React.createElement(ColorSlider, { className: "is-hue", minValue: 0, maxValue: MAX_COLOR_HUE, value: color.h, onChange: this._onHChanged }),
                !this.props.alphaSliderHidden && (React.createElement(ColorSlider, { className: "is-alpha", isAlpha: true, overlayStyle: { background: `linear-gradient(to right, transparent 0, #${color.hex} 100%)` }, minValue: 0, maxValue: 100, value: color.a, onChange: this._onAChanged })),
                React.createElement("table", { className: classNames.table, cellPadding: "0", cellSpacing: "0" },
                    React.createElement("thead", null,
                        React.createElement("tr", { className: classNames.tableHeader },
                            React.createElement("td", { className: classNames.tableHexCell }, this.props.hexLabel),
                            React.createElement("td", null, this.props.redLabel),
                            React.createElement("td", null, this.props.greenLabel),
                            React.createElement("td", null, this.props.blueLabel),
                            !this.props.alphaSliderHidden && React.createElement("td", null, this.props.alphaLabel))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(TextField, { className: classNames.input, value: color.hex, componentRef: this._hexText, onBlur: this._onHexChanged, spellCheck: false, ariaLabel: this.props.hexLabel })),
                            React.createElement("td", { style: { width: '18%' } },
                                React.createElement(TextField, { className: classNames.input, onBlur: this._onRGBAChanged, value: String(color.r), componentRef: this._rText, spellCheck: false, ariaLabel: this.props.redLabel })),
                            React.createElement("td", { style: { width: '18%' } },
                                React.createElement(TextField, { className: classNames.input, onBlur: this._onRGBAChanged, value: String(color.g), componentRef: this._gText, spellCheck: false, ariaLabel: this.props.greenLabel })),
                            React.createElement("td", { style: { width: '18%' } },
                                React.createElement(TextField, { className: classNames.input, onBlur: this._onRGBAChanged, value: String(color.b), componentRef: this._bText, spellCheck: false, ariaLabel: this.props.blueLabel })),
                            !this.props.alphaSliderHidden && (React.createElement("td", { style: { width: '18%' } },
                                React.createElement(TextField, { className: classNames.input, onBlur: this._onRGBAChanged, value: String(color.a ? color.a.toPrecision(3) : color.a), componentRef: this._aText, spellCheck: false, ariaLabel: this.props.alphaLabel })))))))));
    }
    _updateColor(newColor) {
        if (!newColor) {
            return;
        }
        const { onColorChanged } = this.props;
        const { color } = this.state;
        const hasColorStringChanged = newColor.str !== color.str;
        if (newColor.h !== color.h || hasColorStringChanged) {
            this.setState({
                color: newColor
            }, () => {
                if (hasColorStringChanged && onColorChanged) {
                    onColorChanged(newColor.str, newColor);
                }
            });
        }
    }
}
ColorPickerBase.defaultProps = {
    hexLabel: 'Hex',
    redLabel: 'Red',
    greenLabel: 'Green',
    blueLabel: 'Blue',
    alphaLabel: 'Alpha'
};
