import * as React from 'react';
import { Image } from '../../../Image';
import { Icon } from '../../../Icon';
import { BaseComponent, classNamesFunction, getNativeProps, inputProperties, css } from '../../../Utilities';
const getClassNames = classNamesFunction();
export class ChoiceGroupOptionBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._inputElement = React.createRef();
        this._onRenderField = (props) => {
            const { onRenderLabel = this._onRenderLabel, id, imageSrc, imageAlt, selectedImageSrc, iconProps } = props;
            const imageSize = props.imageSize ? props.imageSize : { width: 32, height: 32 };
            return (React.createElement("label", { htmlFor: id, className: this._classNames.field },
                imageSrc && (React.createElement("div", { className: this._classNames.innerField, style: { height: imageSize.height, width: imageSize.width } },
                    React.createElement("div", { className: this._classNames.imageWrapper },
                        React.createElement(Image, { src: imageSrc, alt: imageAlt ? imageAlt : '', width: imageSize.width, height: imageSize.height })),
                    React.createElement("div", { className: this._classNames.selectedImageWrapper },
                        React.createElement(Image, { src: selectedImageSrc, alt: imageAlt ? imageAlt : '', width: imageSize.width, height: imageSize.height })))),
                iconProps ? (React.createElement("div", { className: this._classNames.innerField },
                    React.createElement("div", { className: this._classNames.iconWrapper },
                        React.createElement(Icon, Object.assign({}, iconProps))))) : null,
                imageSrc || iconProps ? (React.createElement("div", { className: this._classNames.labelWrapper, style: { maxWidth: imageSize.width * 2 } }, onRenderLabel(props))) : (onRenderLabel(props))));
        };
        this._onRenderLabel = (props) => {
            return (React.createElement("span", { id: props.labelId, className: "ms-ChoiceFieldLabel" }, props.text));
        };
    }
    render() {
        const { ariaLabel, focused, required, theme, iconProps, imageSrc, imageSize = { width: 32, height: 32 }, disabled, checked, id, styles, name, onRenderField = this._onRenderField } = this.props;
        this._classNames = getClassNames(styles, {
            theme: theme,
            hasIcon: !!iconProps,
            hasImage: !!imageSrc,
            checked,
            disabled,
            imageIsLarge: !!imageSrc && (imageSize.width > 71 || imageSize.height > 71),
            focused
        });
        const { className, ...nativeProps } = getNativeProps(this.props, inputProperties);
        return (React.createElement("div", { className: this._classNames.root },
            React.createElement("div", { className: this._classNames.choiceFieldWrapper },
                React.createElement("input", Object.assign({ "aria-label": ariaLabel ? ariaLabel : undefined, ref: this._inputElement, id: id, className: css(this._classNames.input, className), type: "radio", name: name, disabled: disabled, checked: checked, required: required, onChange: this._onChange.bind(this, this.props), onFocus: this._onFocus.bind(this, this.props), onBlur: this._onBlur.bind(this, this.props) }, nativeProps)),
                onRenderField(this.props, this._onRenderField))));
    }
    _onChange(props, evt) {
        const { onChange } = props;
        if (onChange) {
            onChange(evt, props);
        }
    }
    _onBlur(props, evt) {
        const { onBlur } = props;
        if (onBlur) {
            onBlur(evt, props);
        }
    }
    _onFocus(props, evt) {
        const { onFocus } = props;
        if (onFocus) {
            onFocus(evt, props);
        }
    }
}
