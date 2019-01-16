import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { getClassNames } from './ActivityItem.classNames';
import { getStyles } from './ActivityItem.styles';
import { PersonaSize, PersonaCoin } from '../../Persona';
export class ActivityItem extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderIcon = (props) => {
            if (props.activityPersonas) {
                return this._onRenderPersonaArray(props);
            }
            else {
                return this.props.activityIcon;
            }
        };
        this._onRenderActivityDescription = (props) => {
            const classNames = this._getClassNames(props);
            const activityDescription = props.activityDescription || props.activityDescriptionText;
            if (activityDescription) {
                return React.createElement("span", { className: classNames.activityText }, activityDescription);
            }
            return null;
        };
        this._onRenderComments = (props) => {
            const classNames = this._getClassNames(props);
            const comments = props.comments || props.commentText;
            if (!props.isCompact && comments) {
                return React.createElement("div", { className: classNames.commentText }, comments);
            }
            return null;
        };
        this._onRenderTimeStamp = (props) => {
            const classNames = this._getClassNames(props);
            if (!props.isCompact && props.timeStamp) {
                return React.createElement("div", { className: classNames.timeStamp }, props.timeStamp);
            }
            return null;
        };
        this._onRenderPersonaArray = (props) => {
            const classNames = this._getClassNames(props);
            let personaElement = null;
            const activityPersonas = props.activityPersonas;
            if (activityPersonas[0].imageUrl || activityPersonas[0].imageInitials) {
                const personaList = [];
                const showSize16Personas = activityPersonas.length > 1 || props.isCompact;
                const personaLimit = props.isCompact ? 3 : 4;
                let style = undefined;
                if (props.isCompact) {
                    style = {
                        display: 'inline-block',
                        width: '10px',
                        minWidth: '10px',
                        overflow: 'visible'
                    };
                }
                activityPersonas
                    .filter((person, index) => index < personaLimit)
                    .forEach((person, index) => {
                    personaList.push(React.createElement(PersonaCoin, Object.assign({}, person, { key: person['key'] ? person['key'] : index, className: classNames.activityPersona, size: showSize16Personas ? PersonaSize.size16 : PersonaSize.size32, style: style })));
                });
                personaElement = React.createElement("div", { className: classNames.personaContainer }, personaList);
            }
            return personaElement;
        };
    }
    render() {
        const { onRenderIcon = this._onRenderIcon, onRenderActivityDescription = this._onRenderActivityDescription, onRenderComments = this._onRenderComments, onRenderTimeStamp = this._onRenderTimeStamp, animateBeaconSignal, isCompact } = this.props;
        const classNames = this._getClassNames(this.props);
        return (React.createElement("div", { className: classNames.root, style: this.props.style },
            (this.props.activityPersonas || this.props.activityIcon || this.props.onRenderIcon) && (React.createElement("div", { className: classNames.activityTypeIcon },
                animateBeaconSignal && isCompact && React.createElement("div", { className: classNames.pulsingBeacon }),
                onRenderIcon(this.props))),
            React.createElement("div", { className: classNames.activityContent },
                onRenderActivityDescription(this.props, this._onRenderActivityDescription),
                onRenderComments(this.props, this._onRenderComments),
                onRenderTimeStamp(this.props, this._onRenderTimeStamp))));
    }
    _getClassNames(props) {
        return getClassNames(getStyles(undefined, props.styles, props.animateBeaconSignal, props.beaconColorOne, props.beaconColorTwo, props.isCompact), props.className, props.activityPersonas, props.isCompact);
    }
}
