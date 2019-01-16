import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { BaseComponent, classNamesFunction, divProperties, elementContains, focusFirstChild, getNativeProps } from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
const getClassNames = classNamesFunction();
export class OverflowSetBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._focusZone = React.createRef();
        this._persistedKeytips = {};
        this._keytipManager = KeytipManager.getInstance();
        this._divContainer = React.createRef();
        this._onRenderItems = (items) => {
            return items.map((item, i) => {
                const wrapperDivProps = {
                    className: this._classNames.item
                };
                return (React.createElement("div", Object.assign({ key: item.key }, wrapperDivProps), this.props.onRenderItem(item)));
            });
        };
        this._onRenderOverflowButtonWrapper = (items) => {
            const wrapperDivProps = {
                className: this._classNames.overflowButton
            };
            const overflowKeytipSequences = this.props.keytipSequences;
            let newOverflowItems = [];
            if (overflowKeytipSequences) {
                items.forEach(overflowItem => {
                    const keytip = overflowItem.keytipProps;
                    if (keytip) {
                        const persistedKeytip = {
                            content: keytip.content,
                            keySequences: keytip.keySequences,
                            disabled: keytip.disabled || !!(overflowItem.disabled || overflowItem.isDisabled)
                        };
                        if (keytip.hasDynamicChildren || this._getSubMenuForItem(overflowItem)) {
                            persistedKeytip.onExecute = this._keytipManager.menuExecute.bind(this._keytipManager, overflowKeytipSequences, overflowItem.keytipProps.keySequences);
                        }
                        else {
                            persistedKeytip.onExecute = keytip.onExecute;
                        }
                        this._persistedKeytips[persistedKeytip.content] = persistedKeytip;
                        const newOverflowItem = {
                            ...overflowItem,
                            keytipProps: {
                                ...keytip,
                                overflowSetSequence: overflowKeytipSequences
                            }
                        };
                        newOverflowItems.push(newOverflowItem);
                    }
                    else {
                        newOverflowItems.push(overflowItem);
                    }
                });
            }
            else {
                newOverflowItems = items;
            }
            return React.createElement("div", Object.assign({}, wrapperDivProps), this.props.onRenderOverflowButton(newOverflowItems));
        };
        if (props.doNotContainWithinFocusZone) {
            this._warnMutuallyExclusive({
                doNotContainWithinFocusZone: 'focusZoneProps'
            });
        }
    }
    render() {
        const { items, overflowItems, className, focusZoneProps, styles, vertical, role, doNotContainWithinFocusZone } = this.props;
        this._classNames = getClassNames(styles, { className, vertical });
        let Tag;
        let uniqueComponentProps;
        if (doNotContainWithinFocusZone) {
            Tag = 'div';
            uniqueComponentProps = {
                ...getNativeProps(this.props, divProperties),
                ref: this._divContainer
            };
        }
        else {
            Tag = FocusZone;
            uniqueComponentProps = {
                ...getNativeProps(this.props, divProperties),
                ...focusZoneProps,
                componentRef: this._focusZone,
                direction: vertical ? FocusZoneDirection.vertical : FocusZoneDirection.horizontal
            };
        }
        return (React.createElement(Tag, Object.assign({}, uniqueComponentProps, { className: this._classNames.root, role: role }),
            items && this._onRenderItems(items),
            overflowItems && overflowItems.length > 0 && this._onRenderOverflowButtonWrapper(overflowItems)));
    }
    focus(forceIntoFirstElement) {
        let focusSucceeded = false;
        if (this.props.doNotContainWithinFocusZone) {
            if (this._divContainer.current) {
                focusSucceeded = focusFirstChild(this._divContainer.current);
            }
        }
        else if (this._focusZone.current) {
            focusSucceeded = this._focusZone.current.focus(forceIntoFirstElement);
        }
        return focusSucceeded;
    }
    focusElement(childElement) {
        let focusSucceeded = false;
        if (!childElement) {
            return false;
        }
        if (this.props.doNotContainWithinFocusZone) {
            if (this._divContainer.current && elementContains(this._divContainer.current, childElement)) {
                childElement.focus();
                focusSucceeded = document.activeElement === childElement;
            }
        }
        else if (this._focusZone.current) {
            focusSucceeded = this._focusZone.current.focusElement(childElement);
        }
        return focusSucceeded;
    }
    componentDidMount() {
        this._registerPersistedKeytips();
    }
    componentWillUnmount() {
        this._unregisterPersistedKeytips();
    }
    componentWillUpdate() {
        this._unregisterPersistedKeytips();
    }
    componentDidUpdate() {
        this._registerPersistedKeytips();
    }
    _registerPersistedKeytips() {
        Object.keys(this._persistedKeytips).forEach((key) => {
            const keytip = this._persistedKeytips[key];
            const uniqueID = this._keytipManager.register(keytip, true);
            this._persistedKeytips[uniqueID] = keytip;
            delete this._persistedKeytips[key];
        });
    }
    _unregisterPersistedKeytips() {
        Object.keys(this._persistedKeytips).forEach((uniqueID) => {
            this._keytipManager.unregister(this._persistedKeytips[uniqueID], uniqueID, true);
        });
        this._persistedKeytips = {};
    }
    _getSubMenuForItem(item) {
        if (this.props.itemSubMenuProvider) {
            return this.props.itemSubMenuProvider(item);
        }
        if (item.subMenuProps) {
            return item.subMenuProps.items;
        }
        return undefined;
    }
}
OverflowSetBase.defaultProps = {
    vertical: false,
    role: 'menubar'
};
