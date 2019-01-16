import * as React from 'react';
import { BaseComponent, buttonProperties, classNamesFunction, getId, getNativeProps } from '../../Utilities';
import { OverflowButtonType } from './Facepile.types';
import { FacepileButton } from './FacepileButton';
import { Icon } from '../../Icon';
import { Persona } from '../../Persona';
import { PersonaCoin, PersonaSize, PersonaInitialsColor } from '../../PersonaCoin';
const getClassNames = classNamesFunction();
export class FacepileBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._classNames = getClassNames(this.props.styles, {
            theme: this.props.theme,
            className: this.props.className
        });
        this._ariaDescriptionId = getId();
    }
    render() {
        let { overflowButtonProps } = this.props;
        const { chevronButtonProps, maxDisplayablePersonas, personas, overflowPersonas, showAddButton } = this.props;
        const { _classNames } = this;
        const numPersonasToShow = Math.min(personas.length, maxDisplayablePersonas || personas.length);
        if (chevronButtonProps && !overflowButtonProps) {
            overflowButtonProps = chevronButtonProps;
        }
        const hasOverflowPersonas = overflowPersonas && overflowPersonas.length > 0;
        const personasPrimary = hasOverflowPersonas ? personas : personas.slice(0, numPersonasToShow);
        const personasOverflow = (hasOverflowPersonas ? overflowPersonas : personas.slice(numPersonasToShow)) || [];
        return (React.createElement("div", { className: _classNames.root },
            this.onRenderAriaDescription(),
            React.createElement("div", { className: _classNames.itemContainer },
                showAddButton ? this._getAddNewElement() : null,
                React.createElement("ul", { className: _classNames.members }, this._onRenderVisiblePersonas(personasPrimary, personasOverflow.length === 0 && personas.length === 1)),
                overflowButtonProps ? this._getOverflowElement(personasOverflow) : null)));
    }
    onRenderAriaDescription() {
        const { ariaDescription } = this.props;
        const { _classNames } = this;
        return (ariaDescription && (React.createElement("span", { className: _classNames.screenReaderOnly, id: this._ariaDescriptionId }, ariaDescription)));
    }
    _onRenderVisiblePersonas(personas, singlePersona) {
        return personas.map((persona, index) => {
            const personaControl = singlePersona ? this._getPersonaControl(persona) : this._getPersonaCoinControl(persona);
            return (React.createElement("li", { key: `${singlePersona ? 'persona' : 'personaCoin'}-${index}`, className: this._classNames.member }, persona.onClick
                ? this._getElementWithOnClickEvent(personaControl, persona, index)
                : this._getElementWithoutOnClickEvent(personaControl, persona, index)));
        });
    }
    _getPersonaControl(persona) {
        const { getPersonaProps, personaSize } = this.props;
        const personaStyles = {
            details: {
                flex: '1 0 auto'
            }
        };
        return (React.createElement(Persona, Object.assign({ imageInitials: persona.imageInitials, imageUrl: persona.imageUrl, initialsColor: persona.initialsColor, allowPhoneInitials: persona.allowPhoneInitials, text: persona.personaName, size: personaSize }, (getPersonaProps ? getPersonaProps(persona) : null), { styles: personaStyles })));
    }
    _getPersonaCoinControl(persona) {
        const { getPersonaProps, personaSize } = this.props;
        return (React.createElement(PersonaCoin, Object.assign({ imageInitials: persona.imageInitials, imageUrl: persona.imageUrl, initialsColor: persona.initialsColor, allowPhoneInitials: persona.allowPhoneInitials, text: persona.personaName, size: personaSize }, (getPersonaProps ? getPersonaProps(persona) : null))));
    }
    _getElementWithOnClickEvent(personaControl, persona, index) {
        const { keytipProps } = persona;
        return (React.createElement(FacepileButton, Object.assign({}, getNativeProps(persona, buttonProperties), this._getElementProps(persona, index), { keytipProps: keytipProps, onClick: this._onPersonaClick.bind(this, persona) }), personaControl));
    }
    _getElementWithoutOnClickEvent(personaControl, persona, index) {
        return (React.createElement("div", Object.assign({}, getNativeProps(persona, buttonProperties), this._getElementProps(persona, index)), personaControl));
    }
    _getElementProps(persona, index) {
        const { _classNames } = this;
        return {
            key: (!!persona.imageUrl ? 'i' : '') + index,
            'data-is-focusable': true,
            role: 'option',
            className: _classNames.itemButton,
            title: persona.personaName,
            onMouseMove: this._onPersonaMouseMove.bind(this, persona),
            onMouseOut: this._onPersonaMouseOut.bind(this, persona)
        };
    }
    _getOverflowElement(personasOverflow) {
        switch (this.props.overflowButtonType) {
            case OverflowButtonType.descriptive:
                return this._getDescriptiveOverflowElement(personasOverflow);
            case OverflowButtonType.downArrow:
                return this._getIconElement('ChevronDown');
            case OverflowButtonType.more:
                return this._getIconElement('More');
            default:
                return null;
        }
    }
    _getDescriptiveOverflowElement(personasOverflow) {
        const { personaSize } = this.props;
        if (!personasOverflow || personasOverflow.length < 1) {
            return null;
        }
        const personaNames = personasOverflow.map((p) => p.personaName).join(', ');
        const overflowButtonProps = { ...{ title: personaNames }, ...this.props.overflowButtonProps };
        const numPersonasNotPictured = Math.max(personasOverflow.length, 0);
        const { _classNames } = this;
        return (React.createElement(FacepileButton, Object.assign({}, overflowButtonProps, { ariaDescription: overflowButtonProps.title, className: _classNames.descriptiveOverflowButton }),
            React.createElement(PersonaCoin, { size: personaSize, onRenderInitials: this._renderInitialsNotPictured(numPersonasNotPictured), initialsColor: PersonaInitialsColor.transparent })));
    }
    _getIconElement(icon) {
        const { overflowButtonProps, personaSize } = this.props;
        const overflowInitialsIcon = true;
        const { _classNames } = this;
        return (React.createElement(FacepileButton, Object.assign({}, overflowButtonProps, { className: _classNames.overflowButton }),
            React.createElement(PersonaCoin, { size: personaSize, onRenderInitials: this._renderInitials(icon, overflowInitialsIcon), initialsColor: PersonaInitialsColor.transparent })));
    }
    _getAddNewElement() {
        const { addButtonProps, personaSize } = this.props;
        const { _classNames } = this;
        return (React.createElement(FacepileButton, Object.assign({}, addButtonProps, { className: _classNames.addButton }),
            React.createElement(PersonaCoin, { size: personaSize, onRenderInitials: this._renderInitials('AddFriend') })));
    }
    _onPersonaClick(persona, ev) {
        persona.onClick(ev, persona);
        ev.preventDefault();
        ev.stopPropagation();
    }
    _onPersonaMouseMove(persona, ev) {
        if (!!persona.onMouseMove) {
            persona.onMouseMove(ev, persona);
        }
    }
    _onPersonaMouseOut(persona, ev) {
        if (!!persona.onMouseOut) {
            persona.onMouseOut(ev, persona);
        }
    }
    _renderInitials(iconName, overflowButton) {
        const { _classNames } = this;
        return () => {
            return React.createElement(Icon, { iconName: iconName, className: overflowButton ? _classNames.overflowInitialsIcon : '' });
        };
    }
    _renderInitialsNotPictured(numPersonasNotPictured) {
        const { _classNames } = this;
        return () => {
            return React.createElement("span", { className: _classNames.overflowInitialsIcon }, '+' + numPersonasNotPictured);
        };
    }
}
FacepileBase.defaultProps = {
    maxDisplayablePersonas: 5,
    personas: [],
    overflowPersonas: [],
    personaSize: PersonaSize.size32
};
