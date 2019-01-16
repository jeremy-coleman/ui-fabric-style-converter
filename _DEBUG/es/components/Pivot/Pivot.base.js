import * as React from 'react';
import { BaseComponent, KeyCodes, getId, getNativeProps, divProperties, classNamesFunction, warn } from '../../Utilities';
import { CommandButton } from '../../Button';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { PivotItem } from './PivotItem';
import { PivotLinkFormat } from './Pivot.types';
import { PivotLinkSize } from './Pivot.types';
import { Icon } from '../../Icon';
const getClassNames = classNamesFunction();
const PivotItemType = React.createElement(PivotItem, null).type;
export class PivotBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.focusZone = React.createRef();
        this._renderPivotLink = (link) => {
            const { itemKey, headerButtonProps } = link;
            const tabId = this._keyToTabIds[itemKey];
            const { onRenderItemLink } = link;
            let linkContent;
            const isSelected = this.state.selectedKey === itemKey;
            if (onRenderItemLink) {
                linkContent = onRenderItemLink(link, this._renderLinkContent);
            }
            else {
                linkContent = this._renderLinkContent(link);
            }
            return (React.createElement(CommandButton, Object.assign({}, headerButtonProps, { id: tabId, key: itemKey, className: isSelected ? this._classNames.linkIsSelected : this._classNames.link, onClick: this._onLinkClick.bind(this, itemKey), onKeyPress: this._onKeyPress.bind(this, itemKey), ariaLabel: link.ariaLabel, role: "tab", "aria-selected": this.state.selectedKey === itemKey, name: link.headerText, keytipProps: link.keytipProps }), linkContent));
        };
        this._renderLinkContent = (link) => {
            const { itemCount, itemIcon, headerText } = link;
            return (React.createElement("span", { className: this._classNames.linkContent },
                itemIcon !== undefined && (React.createElement("span", { className: this._classNames.icon },
                    React.createElement(Icon, { iconName: itemIcon }))),
                headerText !== undefined && React.createElement("span", { className: this._classNames.text },
                    " ",
                    link.headerText),
                itemCount !== undefined && React.createElement("span", { className: this._classNames.count },
                    " (",
                    itemCount,
                    ")")));
        };
        this._renderPivotItem = () => {
            if (this.props.headersOnly) {
                return null;
            }
            const itemKey = this.state.selectedKey;
            const index = this._keyToIndexMapping[itemKey];
            const { selectedTabId } = this.state;
            return (React.createElement("div", { role: "tabpanel", "aria-labelledby": selectedTabId }, React.Children.toArray(this.props.children)[index]));
        };
        this._pivotId = getId('Pivot');
        const links = this._getPivotLinks(this.props);
        let selectedKey;
        if (props.initialSelectedKey) {
            selectedKey = props.initialSelectedKey;
        }
        else if (props.initialSelectedIndex) {
            selectedKey = links[props.initialSelectedIndex].itemKey;
        }
        else if (props.selectedKey) {
            selectedKey = props.selectedKey;
        }
        else if (links.length) {
            selectedKey = links[0].itemKey;
        }
        this.state = {
            links,
            selectedKey: selectedKey,
            selectedTabId: this._keyToTabIds[selectedKey]
        };
        this._renderPivotLink = this._renderPivotLink.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const links = this._getPivotLinks(nextProps);
        this.setState((prevState, props) => {
            let selectedKey;
            if (this._isKeyValid(nextProps.selectedKey)) {
                selectedKey = nextProps.selectedKey;
            }
            else if (this._isKeyValid(prevState.selectedKey)) {
                selectedKey = prevState.selectedKey;
            }
            else if (links.length) {
                selectedKey = links[0].itemKey;
            }
            return {
                links: links,
                selectedKey,
                selectedTabId: this._keyToTabIds[selectedKey]
            };
        });
    }
    focus() {
        if (this.focusZone.current) {
            this.focusZone.current.focus();
        }
    }
    render() {
        const divProps = getNativeProps(this.props, divProperties);
        this._classNames = this._getClassNames(this.props);
        return (React.createElement("div", Object.assign({}, divProps),
            this._renderPivotLinks(),
            this._renderPivotItem()));
    }
    _renderPivotLinks() {
        const items = this.state.links.map(this._renderPivotLink);
        return (React.createElement(FocusZone, { componentRef: this.focusZone, direction: FocusZoneDirection.horizontal },
            React.createElement("div", { className: this._classNames.root, role: "tablist" }, items)));
    }
    _getPivotLinks(props) {
        const links = [];
        this._keyToIndexMapping = {};
        this._keyToTabIds = {};
        React.Children.map(props.children, (child, index) => {
            if (typeof child === 'object' && child.type === PivotItemType) {
                const pivotItem = child;
                const itemKey = pivotItem.props.itemKey || index.toString();
                links.push({
                    headerText: pivotItem.props.headerText || pivotItem.props.linkText,
                    headerButtonProps: pivotItem.props.headerButtonProps,
                    ariaLabel: pivotItem.props.ariaLabel,
                    itemKey: itemKey,
                    itemCount: pivotItem.props.itemCount,
                    itemIcon: pivotItem.props.itemIcon,
                    onRenderItemLink: pivotItem.props.onRenderItemLink,
                    keytipProps: pivotItem.props.keytipProps
                });
                this._keyToIndexMapping[itemKey] = index;
                this._keyToTabIds[itemKey] = this._getTabId(itemKey, index);
            }
            else {
                warn('The children of a Pivot component must be of type PivotItem to be rendered.');
            }
        });
        return links;
    }
    _getTabId(itemKey, index) {
        if (this.props.getTabId) {
            return this.props.getTabId(itemKey, index);
        }
        return this._pivotId + `-Tab${index}`;
    }
    _isKeyValid(itemKey) {
        return itemKey !== undefined && this._keyToIndexMapping[itemKey] !== undefined;
    }
    _onLinkClick(itemKey, ev) {
        ev.preventDefault();
        this._updateSelectedItem(itemKey, ev);
    }
    _onKeyPress(itemKey, ev) {
        if (ev.which === KeyCodes.enter) {
            ev.preventDefault();
            this._updateSelectedItem(itemKey);
        }
    }
    _updateSelectedItem(itemKey, ev) {
        this.setState({
            selectedKey: itemKey,
            selectedTabId: this._keyToTabIds[itemKey]
        });
        if (this.props.onLinkClick && this._keyToIndexMapping[itemKey] >= 0) {
            const index = this._keyToIndexMapping[itemKey];
            const item = React.Children.toArray(this.props.children)[index];
            if (typeof item === 'object' && item.type === PivotItemType) {
                this.props.onLinkClick(item, ev);
            }
        }
    }
    _getClassNames(props) {
        const { theme } = props;
        const rootIsLarge = props.linkSize === PivotLinkSize.large;
        const rootIsTabs = props.linkFormat === PivotLinkFormat.tabs;
        return getClassNames(props.styles, {
            theme: theme,
            rootIsLarge,
            rootIsTabs
        });
    }
}
