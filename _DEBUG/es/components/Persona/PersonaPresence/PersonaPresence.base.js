import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { PersonaPresence as PersonaPresenceEnum } from '../Persona.types';
import { sizeBoolean } from '../PersonaConsts';
const coinSizeFontScaleFactor = 6;
const coinSizePresenceScaleFactor = 3;
const presenceMaxSize = 40;
const presenceFontMaxSize = 20;
const getClassNames = classNamesFunction();
export class PersonaPresenceBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderIcon = (className, style) => (React.createElement(Icon, { className: className, iconName: this._determineIcon(), style: style }));
        this._determineIcon = () => {
            const { presence } = this.props;
            if (presence !== PersonaPresenceEnum.none) {
                let userPresence = PersonaPresenceEnum[presence];
                switch (userPresence) {
                    case 'online':
                        userPresence = 'SkypeCheck';
                        break;
                    case 'away':
                        userPresence = 'SkypeClock';
                        break;
                    case 'dnd':
                        userPresence = 'SkypeMinus';
                        break;
                    default:
                        userPresence = '';
                }
                return userPresence;
            }
        };
    }
    render() {
        const { coinSize, styles, presence, theme } = this.props;
        const size = sizeBoolean(this.props.size);
        const renderIcon = !(size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32) && (coinSize ? coinSize > 32 : true);
        const presenceHeightWidth = coinSize
            ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize
                ? coinSize / coinSizePresenceScaleFactor + 'px'
                : presenceMaxSize + 'px'
            : '';
        const presenceFontSize = coinSize
            ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize
                ? coinSize / coinSizeFontScaleFactor + 'px'
                : presenceFontMaxSize + 'px'
            : '';
        const coinSizeWithPresenceIconStyle = coinSize ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth } : undefined;
        const coinSizeWithPresenceStyle = coinSize ? { width: presenceHeightWidth, height: presenceHeightWidth } : undefined;
        const classNames = getClassNames(styles, {
            theme: theme,
            presence,
            size: this.props.size
        });
        if (presence === PersonaPresenceEnum.none) {
            return null;
        }
        return (React.createElement("div", { className: classNames.presence, style: coinSizeWithPresenceStyle }, renderIcon && this._onRenderIcon(classNames.presenceIcon, coinSizeWithPresenceIconStyle)));
    }
}
