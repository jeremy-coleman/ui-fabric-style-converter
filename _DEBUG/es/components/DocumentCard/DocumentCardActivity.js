import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { PersonaSize } from '../../Persona';
import { PersonaCoin } from '../../PersonaCoin';
let styles;
export class DocumentCardActivity extends BaseComponent {
    render() {
        const { activity, people } = this.props;
        if (!people || people.length === 0) {
            return null;
        }
        return (React.createElement("div", { className: css('ms-DocumentCardActivity', styles.activity, {
                ['ms-DocumentCardActivity--multiplePeople ' + styles.activityIsMultiplePeople]: people.length > 1
            }) },
            this._renderAvatars(people),
            React.createElement("div", { className: css('ms-DocumentCardActivity-details', styles.activityDetails) },
                React.createElement("span", { className: css('ms-DocumentCardActivity-name', styles.name) }, this._getNameString(people)),
                React.createElement("span", { className: css('ms-DocumentCardActivity-activity', styles.activityActivity) }, activity))));
    }
    _renderAvatars(people) {
        return (React.createElement("div", { className: css('ms-DocumentCardActivity-avatars', styles.avatars) },
            people.length > 1 ? this._renderAvatar(people[1]) : null,
            this._renderAvatar(people[0])));
    }
    _renderAvatar(person) {
        return (React.createElement("div", { className: css('ms-DocumentCardActivity-avatar', styles.avatar) },
            React.createElement(PersonaCoin, { imageInitials: person.initials, text: person.name, imageUrl: person.profileImageSrc, initialsColor: person.initialsColor, allowPhoneInitials: person.allowPhoneInitials, role: "presentation", size: PersonaSize.size32 })));
    }
    _getNameString(people) {
        let nameString = people[0].name;
        if (people.length >= 2) {
            nameString += ' +' + (people.length - 1);
        }
        return nameString;
    }
}
