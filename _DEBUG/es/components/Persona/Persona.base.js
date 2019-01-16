import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { TooltipHost, TooltipOverflowMode, DirectionalHint } from '../../Tooltip';
import { PersonaCoin } from './PersonaCoin/PersonaCoin';
import { PersonaPresence as PersonaPresenceEnum, PersonaSize } from './Persona.types';
const getClassNames = classNamesFunction();
export class PersonaBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._warnDeprecations({ primaryText: 'text' });
    }
    render() {
        const _onRenderPrimaryText = this._onRenderText(this._getText()), _onRenderSecondaryText = this._onRenderText(this.props.secondaryText), _onRenderTertiaryText = this._onRenderText(this.props.tertiaryText), _onRenderOptionalText = this._onRenderText(this.props.optionalText);
        const { hidePersonaDetails, onRenderOptionalText = _onRenderOptionalText, onRenderPrimaryText = _onRenderPrimaryText, onRenderSecondaryText = _onRenderSecondaryText, onRenderTertiaryText = _onRenderTertiaryText } = this.props;
        const size = this.props.size;
        const { allowPhoneInitials, className, coinProps, showUnknownPersonaCoin, coinSize, styles, imageAlt, imageInitials, imageShouldFadeIn, imageShouldStartVisible, imageUrl, initialsColor, onPhotoLoadingStateChange, onRenderCoin, onRenderInitials, presence, showInitialsUntilImageLoads, showSecondaryText, theme } = this.props;
        const personaCoinProps = {
            allowPhoneInitials,
            showUnknownPersonaCoin,
            coinSize,
            imageAlt,
            imageInitials,
            imageShouldFadeIn,
            imageShouldStartVisible,
            imageUrl,
            initialsColor,
            onPhotoLoadingStateChange,
            onRenderCoin,
            onRenderInitials,
            presence,
            showInitialsUntilImageLoads,
            size,
            text: this._getText(),
            ...coinProps
        };
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            showSecondaryText,
            presence,
            size
        });
        const divProps = getNativeProps(this.props, divProperties);
        const personaDetails = (React.createElement("div", { className: classNames.details },
            this._renderElement(classNames.primaryText, onRenderPrimaryText, _onRenderPrimaryText),
            this._renderElement(classNames.secondaryText, onRenderSecondaryText, _onRenderSecondaryText),
            this._renderElement(classNames.tertiaryText, onRenderTertiaryText, _onRenderTertiaryText),
            this._renderElement(classNames.optionalText, onRenderOptionalText, _onRenderOptionalText),
            this.props.children));
        return (React.createElement("div", Object.assign({}, divProps, { className: classNames.root, style: coinSize ? { height: coinSize, minWidth: coinSize } : undefined }),
            React.createElement(PersonaCoin, Object.assign({}, personaCoinProps)),
            (!hidePersonaDetails || (size === PersonaSize.size10 || size === PersonaSize.tiny)) && personaDetails));
    }
    _renderElement(classNames, renderFunction, defaultRenderFunction) {
        return React.createElement("div", { className: classNames }, renderFunction && renderFunction(this.props, defaultRenderFunction));
    }
    _getText() {
        return this.props.text || this.props.primaryText || '';
    }
    _onRenderText(text) {
        return text
            ? () => {
                return (React.createElement(TooltipHost, { content: text, overflowMode: TooltipOverflowMode.Parent, directionalHint: DirectionalHint.topLeftEdge }, text));
            }
            : undefined;
    }
}
PersonaBase.defaultProps = {
    size: PersonaSize.size48,
    presence: PersonaPresenceEnum.none,
    imageAlt: ''
};
