import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getInitials, getNativeProps, getRTL } from '../../../Utilities';
import { mergeStyles } from '../../../Styling';
import { PersonaPresence } from '../PersonaPresence/index';
import { Icon } from '../../../Icon';
import { Image, ImageFit, ImageLoadState } from '../../../Image';
import { PersonaPresence as PersonaPresenceEnum, PersonaSize } from '../Persona.types';
import { initialsColorPropToColorCode } from '../PersonaInitialsColor';
import { sizeToPixels } from '../PersonaConsts';
const getClassNames = classNamesFunction();
export class PersonaCoinBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderCoin = (props) => {
            const { coinSize, styles, imageUrl, imageAlt, imageShouldFadeIn, imageShouldStartVisible, theme, showUnknownPersonaCoin } = this.props;
            if (!imageUrl) {
                return null;
            }
            const size = this.props.size;
            const classNames = getClassNames(styles, {
                theme: theme,
                size,
                showUnknownPersonaCoin
            });
            const dimension = coinSize || sizeToPixels[size];
            return (React.createElement(Image, { className: classNames.image, imageFit: ImageFit.cover, src: imageUrl, width: dimension, height: dimension, alt: imageAlt, shouldFadeIn: imageShouldFadeIn, shouldStartVisible: imageShouldStartVisible, onLoadingStateChange: this._onPhotoLoadingStateChange }));
        };
        this._onRenderInitials = (props) => {
            let { imageInitials } = props;
            const { allowPhoneInitials, showUnknownPersonaCoin } = props;
            if (showUnknownPersonaCoin) {
                return React.createElement(Icon, { iconName: "Help" });
            }
            const isRTL = getRTL();
            imageInitials = imageInitials || getInitials(this._getText(), isRTL, allowPhoneInitials);
            return imageInitials !== '' ? React.createElement("span", null, imageInitials) : React.createElement(Icon, { iconName: "Contact" });
        };
        this._onPhotoLoadingStateChange = (loadState) => {
            this.setState({
                isImageLoaded: loadState === ImageLoadState.loaded,
                isImageError: loadState === ImageLoadState.error
            });
            this.props.onPhotoLoadingStateChange && this.props.onPhotoLoadingStateChange(loadState);
        };
        this._warnDeprecations({ primaryText: 'text' });
        this.state = {
            isImageLoaded: false,
            isImageError: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.imageUrl !== this.props.imageUrl) {
            this.setState({
                isImageLoaded: false,
                isImageError: false
            });
        }
    }
    render() {
        const { className, coinProps, showUnknownPersonaCoin, coinSize, styles, imageUrl, onRenderCoin = this._onRenderCoin, onRenderInitials = this._onRenderInitials, presence, showInitialsUntilImageLoads, theme } = this.props;
        const size = this.props.size;
        const divProps = getNativeProps(this.props, divProperties);
        const divCoinProps = getNativeProps(coinProps || {}, divProperties);
        const coinSizeStyle = coinSize ? { width: coinSize, height: coinSize } : undefined;
        const hideImage = showUnknownPersonaCoin;
        const personaPresenceProps = {
            coinSize,
            presence,
            size,
            theme
        };
        const classNames = getClassNames(styles, {
            theme: theme,
            className: coinProps && coinProps.className ? coinProps.className : className,
            size,
            coinSize,
            showUnknownPersonaCoin
        });
        const shouldRenderInitials = Boolean(!this.state.isImageLoaded && ((showInitialsUntilImageLoads && imageUrl) || !imageUrl || this.state.isImageError || hideImage));
        return (React.createElement("div", Object.assign({}, divProps, { className: classNames.coin }),
            size !== PersonaSize.size10 && size !== PersonaSize.tiny ? (React.createElement("div", Object.assign({}, divCoinProps, { className: classNames.imageArea, style: coinSizeStyle }),
                shouldRenderInitials && (React.createElement("div", { className: mergeStyles(classNames.initials, !showUnknownPersonaCoin && { backgroundColor: initialsColorPropToColorCode(this.props) }), style: coinSizeStyle, "aria-hidden": "true" }, onRenderInitials(this.props, this._onRenderInitials))),
                !hideImage && onRenderCoin(this.props, this._onRenderCoin),
                React.createElement(PersonaPresence, Object.assign({}, personaPresenceProps)))) :
                this.props.presence ? (React.createElement(PersonaPresence, Object.assign({}, personaPresenceProps))) : (React.createElement(Icon, { iconName: "Contact", className: classNames.size10WithoutPresenceIcon })),
            this.props.children));
    }
    _getText() {
        return this.props.text || this.props.primaryText || '';
    }
}
PersonaCoinBase.defaultProps = {
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
};
