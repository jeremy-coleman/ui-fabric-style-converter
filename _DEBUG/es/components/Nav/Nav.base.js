import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, getNativeProps } from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ActionButton } from '../../Button';
import { Icon } from '../../Icon';
import { buttonStyles } from './Nav.styles';
const _indentationSize = 14;
const _baseIndent = 3;
let _urlResolver;
export function isRelativeUrl(url) {
    return !!url && !/^[a-z0-9+-.]:\/\//i.test(url);
}
const getClassNames = classNamesFunction();
export class NavBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderLink = (link) => {
            const { styles, groups, theme } = this.props;
            const classNames = getClassNames(styles, { theme: theme, groups });
            return React.createElement("div", { className: classNames.linkText }, link.name);
        };
        this._renderGroup = (group, groupIndex) => {
            const { styles, groups, theme, onRenderGroupHeader = this._renderGroupHeader } = this.props;
            const classNames = getClassNames(styles, {
                theme: theme,
                isGroup: true,
                isExpanded: !this.state.isGroupCollapsed[group.name],
                groups
            });
            return (React.createElement("div", { key: groupIndex, className: classNames.group },
                group.name ? onRenderGroupHeader(group, this._renderGroupHeader) : null,
                React.createElement("div", { className: classNames.groupContent }, this._renderLinks(group.links, 0))));
        };
        this._renderGroupHeader = (group) => {
            const { styles, groups, theme, expandButtonAriaLabel } = this.props;
            const classNames = getClassNames(styles, {
                theme: theme,
                isGroup: true,
                isExpanded: !this.state.isGroupCollapsed[group.name],
                groups
            });
            return (React.createElement("button", { className: classNames.chevronButton, onClick: this._onGroupHeaderClicked.bind(this, group), "aria-label": expandButtonAriaLabel, "aria-expanded": !this.state.isGroupCollapsed[group.name] },
                React.createElement(Icon, { className: classNames.chevronIcon, iconName: "ChevronDown" }),
                group.name));
        };
        this.state = {
            isGroupCollapsed: {},
            isLinkExpandStateChanged: false,
            selectedKey: props.initialSelectedKey || props.selectedKey
        };
        if (props.groups) {
            for (const group of props.groups) {
                if (group.collapseByDefault && group.name) {
                    this.state.isGroupCollapsed[group.name] = true;
                }
            }
        }
    }
    componentWillReceiveProps(newProps) {
        const newGroups = newProps.groups || [];
        const isGroupCollapsed = this.state.isGroupCollapsed;
        let hasUpdated = false;
        for (const newGroup of newGroups) {
            if (newGroup.name && newGroup.collapseByDefault && !isGroupCollapsed.hasOwnProperty(newGroup.name)) {
                isGroupCollapsed[newGroup.name] = true;
                hasUpdated = true;
            }
        }
        if (hasUpdated) {
            this.setState({
                isGroupCollapsed: isGroupCollapsed
            });
        }
    }
    render() {
        const { styles, groups, className, isOnTop, theme } = this.props;
        if (!groups) {
            return null;
        }
        const groupElements = groups.map(this._renderGroup);
        const classNames = getClassNames(styles, { theme: theme, className, isOnTop, groups });
        return (React.createElement(FocusZone, { direction: FocusZoneDirection.vertical },
            React.createElement("nav", { role: "navigation", className: classNames.root, "aria-label": this.props.ariaLabel }, groupElements)));
    }
    get selectedKey() {
        return this.state.selectedKey;
    }
    _renderNavLink(link, linkIndex, nestingLevel) {
        const { styles, groups, theme, onRenderLink = this._onRenderLink, linkAs: LinkAs = ActionButton } = this.props;
        const classNames = getClassNames(styles, {
            theme: theme,
            isSelected: this._isLinkSelected(link),
            isButtonEntry: link.onClick && !link.forceAnchor,
            leftPadding: _indentationSize * nestingLevel + _baseIndent,
            groups
        });
        const rel = link.url && link.target && !isRelativeUrl(link.url) ? 'noopener noreferrer' : undefined;
        return (React.createElement(LinkAs, { className: classNames.link, styles: buttonStyles, href: link.url || (link.forceAnchor ? 'javascript:' : undefined), iconProps: link.iconProps || { iconName: link.icon || '' }, onClick: link.onClick ? this._onNavButtonLinkClicked.bind(this, link) : this._onNavAnchorLinkClicked.bind(this, link), title: link.title || link.name, target: link.target, rel: rel, "aria-label": link.ariaLabel }, onRenderLink(link, this._onRenderLink)));
    }
    _renderCompositeLink(link, linkIndex, nestingLevel) {
        const divProps = { ...getNativeProps(link, divProperties, ['onClick']) };
        const { styles, groups, theme } = this.props;
        const classNames = getClassNames(styles, {
            theme: theme,
            isExpanded: !!link.isExpanded,
            isSelected: this._isLinkSelected(link),
            isLink: true,
            position: _indentationSize * nestingLevel + 1,
            groups
        });
        return (React.createElement("div", Object.assign({}, divProps, { key: link.key || linkIndex, className: classNames.compositeLink }),
            link.links && link.links.length > 0 ? (React.createElement("button", { className: classNames.chevronButton, onClick: this._onLinkExpandClicked.bind(this, link), "aria-label": this.props.expandButtonAriaLabel, "aria-expanded": link.isExpanded ? 'true' : 'false' },
                React.createElement(Icon, { className: classNames.chevronIcon, iconName: "ChevronDown" }))) : null,
            this._renderNavLink(link, linkIndex, nestingLevel)));
    }
    _renderLink(link, linkIndex, nestingLevel) {
        const { styles, groups, theme } = this.props;
        const classNames = getClassNames(styles, { theme: theme, groups });
        return (React.createElement("li", { key: link.key || linkIndex, role: "listitem", className: classNames.navItem },
            this._renderCompositeLink(link, linkIndex, nestingLevel),
            link.isExpanded ? this._renderLinks(link.links, ++nestingLevel) : null));
    }
    _renderLinks(links, nestingLevel) {
        if (!links || !links.length) {
            return null;
        }
        const linkElements = links.map((link, linkIndex) => this._renderLink(link, linkIndex, nestingLevel));
        const { styles, groups, theme } = this.props;
        const classNames = getClassNames(styles, { theme: theme, groups });
        return (React.createElement("ul", { role: "list", className: classNames.navItems }, linkElements));
    }
    _onGroupHeaderClicked(group, ev) {
        const { isGroupCollapsed } = this.state;
        const groupKey = group.name;
        const isCollapsed = !isGroupCollapsed[groupKey];
        if (group.onHeaderClick) {
            group.onHeaderClick(ev, isCollapsed);
        }
        isGroupCollapsed[groupKey] = isCollapsed;
        this.setState({ isGroupCollapsed: isGroupCollapsed });
        ev.preventDefault();
        ev.stopPropagation();
    }
    _onLinkExpandClicked(link, ev) {
        const { onLinkExpandClick } = this.props;
        if (onLinkExpandClick) {
            onLinkExpandClick(ev, link);
        }
        if (!ev.defaultPrevented) {
            link.isExpanded = !link.isExpanded;
            this.setState({ isLinkExpandStateChanged: true });
        }
        ev.preventDefault();
        ev.stopPropagation();
    }
    _onNavAnchorLinkClicked(link, ev) {
        if (this.props.onLinkClick) {
            this.props.onLinkClick(ev, link);
        }
        if (!link.url && link.links && link.links.length > 0) {
            this._onLinkExpandClicked(link, ev);
        }
        this.setState({ selectedKey: link.key });
    }
    _onNavButtonLinkClicked(link, ev) {
        if (link.onClick) {
            link.onClick(ev, link);
        }
        if (!link.url && link.links && link.links.length > 0) {
            this._onLinkExpandClicked(link, ev);
        }
        this.setState({ selectedKey: link.key });
    }
    _isLinkSelected(link) {
        if (this.props.selectedKey !== undefined) {
            return link.key === this.props.selectedKey;
        }
        else if (this.state.selectedKey !== undefined && link.key === this.state.selectedKey) {
            return true;
        }
        if (typeof window === 'undefined') {
            return false;
        }
        if (!link.url) {
            return false;
        }
        _urlResolver = _urlResolver || document.createElement('a');
        _urlResolver.href = link.url || '';
        const target = _urlResolver.href;
        if (location.href === target) {
            return true;
        }
        if (location.protocol + '//' + location.host + location.pathname === target) {
            return true;
        }
        if (location.hash) {
            if (location.hash === link.url) {
                return true;
            }
            _urlResolver.href = location.hash.substring(1);
            return _urlResolver.href === target;
        }
        return false;
    }
}
NavBase.defaultProps = {
    groups: null
};
