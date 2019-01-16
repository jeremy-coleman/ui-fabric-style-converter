import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
let styles;
export class DocumentCardLocation extends BaseComponent {
    render() {
        const { location, locationHref, ariaLabel, onClick } = this.props;
        return (React.createElement("a", { className: css('ms-DocumentCardLocation', styles.location), href: locationHref, onClick: onClick, "aria-label": ariaLabel }, location));
    }
}
