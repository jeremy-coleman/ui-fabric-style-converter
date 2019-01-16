import * as tslib_1 from "tslib";
import * as React from 'react';
import { BaseComponent, classNamesFunction, divProperties, findIndex, getDocument, getFirstFocusable, getId, getLastFocusable, getNativeProps, isIOS, isMac, KeyCodes, mergeAriaAttributeValues } from '../../Utilities';
import { Callout } from '../../Callout';
import { Checkbox } from '../../Checkbox';
import { CommandButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { DropdownMenuItemType } from './Dropdown.types';
import { DropdownSizePosCache } from './utilities/DropdownSizePosCache';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import { KeytipData } from '../../KeytipData';
import { Panel } from '../../Panel';
import { ResponsiveMode, withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
const getClassNames = classNamesFunction();
var styles;
let DropdownBase = class DropdownBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._host = React.createRef();
        this._focusZone = React.createRef();
        this._dropDown = React.createRef();
        this._scrollIdleDelay = 250;
        this._sizePosCache = new DropdownSizePosCache();
        this._onRenderTitle = (item) => {
            const { multiSelectDelimiter = ', ' } = this.props;
            const displayTxt = item.map(i => i.text).join(multiSelectDelimiter);
            return React.createElement("span", null, displayTxt);
        };
        this._onRenderPlaceholder = (props) => {
            if (!this._placeholder) {
                return null;
            }
            return React.createElement("span", null, this._placeholder);
        };
        this._onRenderContainer = (props) => {
            const { responsiveMode, calloutProps, panelProps, dropdownWidth } = this.props;
            const isSmall = responsiveMode <= ResponsiveMode.medium;
            return isSmall ? (React.createElement(Panel, Object.assign({ className: this._classNames.panel, isOpen: true, isLightDismiss: true, onDismissed: this._onDismiss, hasCloseButton: false }, panelProps), this._renderFocusableList(props))) : (React.createElement(Callout, Object.assign({ isBeakVisible: false, gapSpace: 0, doNotLayer: false, directionalHintFixed: false, directionalHint: DirectionalHint.bottomLeftEdge }, calloutProps, { className: this._classNames.callout, target: this._dropDown.current, onDismiss: this._onDismiss, onScroll: this._onScroll, onPositioned: this._onPositioned, calloutWidth: dropdownWidth || (this._dropDown.current ? this._dropDown.current.clientWidth : 0) }), this._renderFocusableList(props)));
        };
        this._onRenderCaretDown = (props) => {
            return React.createElement(Icon, { className: this._classNames.caretDown, iconName: "ChevronDown" });
        };
        this._onRenderList = (props) => {
            const { onRenderItem = this._onRenderItem } = this.props;
            return React.createElement(React.Fragment, null, this.props.options.map((item, index) => onRenderItem({ ...item, index }, this._onRenderItem)));
        };
        this._onRenderItem = (item) => {
            switch (item.itemType) {
                case SelectableOptionMenuItemType.Divider:
                    return this._renderSeparator(item);
                case SelectableOptionMenuItemType.Header:
                    return this._renderHeader(item);
                default:
                    return this._renderOption(item);
            }
        };
        this._renderOption = (item) => {
            const { onRenderOption = this._onRenderOption } = this.props;
            const { selectedIndices = [] } = this.state;
            const id = this._id;
            const isItemSelected = item.index !== undefined && selectedIndices ? selectedIndices.indexOf(item.index) > -1 : false;
            const itemClassName = isItemSelected && item.disabled === true
                ? this._classNames.dropdownItemSelectedAndDisabled
                : isItemSelected
                    ? this._classNames.dropdownItemSelected
                    : item.disabled === true
                        ? this._classNames.dropdownItemDisabled
                        : this._classNames.dropdownItem;
            return !this.props.multiSelect ? (React.createElement(CommandButton, { id: id + '-list' + item.index, key: item.key, "data-index": item.index, "data-is-focusable": !item.disabled, disabled: item.disabled, className: itemClassName, onClick: this._onItemClick(item), onMouseEnter: this._onItemMouseEnter.bind(this, item), onMouseLeave: this._onMouseItemLeave.bind(this, item), onMouseMove: this._onItemMouseMove.bind(this, item), role: "option", "aria-selected": isItemSelected ? 'true' : 'false', ariaLabel: item.ariaLabel, title: item.title ? item.title : item.text }, onRenderOption(item, this._onRenderOption))) : (React.createElement(Checkbox, { id: id + '-list' + item.index, key: item.key, "data-index": item.index, "data-is-focusable": !item.disabled, disabled: item.disabled, onChange: this._onItemClick(item), inputProps: {
                    onMouseEnter: this._onItemMouseEnter.bind(this, item),
                    onMouseLeave: this._onMouseItemLeave.bind(this, item),
                    onMouseMove: this._onItemMouseMove.bind(this, item)
                }, label: item.text, title: item.title ? item.title : item.text, onRenderLabel: this._onRenderLabel.bind(this, item), className: itemClassName, role: "option", "aria-selected": isItemSelected ? 'true' : 'false', checked: isItemSelected }));
        };
        this._onRenderOption = (item) => {
            return React.createElement("span", { className: this._classNames.dropdownOptionText }, item.text);
        };
        this._onRenderLabel = (item) => {
            const { onRenderOption = this._onRenderOption } = this.props;
            return onRenderOption(item, this._onRenderOption);
        };
        this._onPositioned = (positions) => {
            if (this._focusZone.current) {
                this._async.requestAnimationFrame(() => {
                    const selectedIndices = this.state.selectedIndices;
                    if (selectedIndices && selectedIndices[0] && !this.props.options[selectedIndices[0]].disabled) {
                        const element = getDocument().querySelector(`#${this._id}-list${selectedIndices[0]}`);
                        this._focusZone.current.focusElement(element);
                    }
                    else {
                        this._focusZone.current.focus();
                    }
                });
            }
            if (!this.state.calloutRenderEdge || this.state.calloutRenderEdge !== positions.targetEdge) {
                this.setState({
                    calloutRenderEdge: positions.targetEdge
                });
            }
        };
        this._onItemClick = (item) => {
            return (event) => {
                if (!item.disabled) {
                    this.setSelectedIndex(event, item.index);
                    if (!this.props.multiSelect) {
                        this.setState({
                            isOpen: false
                        });
                    }
                }
            };
        };
        this._onScroll = () => {
            if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
                this._async.clearTimeout(this._scrollIdleTimeoutId);
                this._scrollIdleTimeoutId = undefined;
            }
            else {
                this._isScrollIdle = false;
            }
            this._scrollIdleTimeoutId = this._async.setTimeout(() => {
                this._isScrollIdle = true;
            }, this._scrollIdleDelay);
        };
        this._onMouseItemLeave = (item, ev) => {
            if (this._shouldIgnoreMouseEvent()) {
                return;
            }
            if (this._host.current) {
                if (this._host.current.setActive) {
                    try {
                        this._host.current.setActive();
                    }
                    catch (e) {
                    }
                }
                else {
                    this._host.current.focus();
                }
            }
        };
        this._onDismiss = () => {
            this.setState({ isOpen: false });
            if (this._dropDown.current) {
                this._dropDown.current.focus();
            }
        };
        this._onDropdownBlur = (ev) => {
            const disabled = this._isDisabled();
            if (disabled) {
                return;
            }
            this.setState({ hasFocus: false });
            if (this.state.isOpen) {
                return;
            }
            if (this.props.onBlur) {
                this.props.onBlur(ev);
            }
        };
        this._onDropdownKeyDown = (ev) => {
            const disabled = this._isDisabled();
            if (disabled) {
                return;
            }
            this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);
            if (this.props.onKeyDown) {
                this.props.onKeyDown(ev);
                if (ev.defaultPrevented) {
                    return;
                }
            }
            let newIndex;
            const selectedIndex = this.state.selectedIndices.length ? this.state.selectedIndices[0] : -1;
            const containsExpandCollapseModifier = ev.altKey || ev.metaKey;
            const isOpen = this.state.isOpen;
            switch (ev.which) {
                case KeyCodes.enter:
                    this.setState({
                        isOpen: !isOpen
                    });
                    break;
                case KeyCodes.escape:
                    if (!isOpen) {
                        return;
                    }
                    this.setState({
                        isOpen: false
                    });
                    break;
                case KeyCodes.up:
                    if (containsExpandCollapseModifier) {
                        if (isOpen) {
                            this.setState({ isOpen: false });
                            break;
                        }
                        return;
                    }
                    if (this.props.multiSelect) {
                        this.setState({ isOpen: true });
                    }
                    else if (!this._isDisabled()) {
                        newIndex = this._moveIndex(ev, -1, selectedIndex - 1, selectedIndex);
                    }
                    break;
                case KeyCodes.down:
                    if (containsExpandCollapseModifier) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                    if ((containsExpandCollapseModifier && !isOpen) || this.props.multiSelect) {
                        this.setState({ isOpen: true });
                    }
                    else if (!this._isDisabled()) {
                        newIndex = this._moveIndex(ev, 1, selectedIndex + 1, selectedIndex);
                    }
                    break;
                case KeyCodes.home:
                    if (!this.props.multiSelect) {
                        newIndex = this._moveIndex(ev, 1, 0, selectedIndex);
                    }
                    break;
                case KeyCodes.end:
                    if (!this.props.multiSelect) {
                        newIndex = this._moveIndex(ev, -1, this.props.options.length - 1, selectedIndex);
                    }
                    break;
                case KeyCodes.space:
                    break;
                default:
                    return;
            }
            if (newIndex !== selectedIndex) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        };
        this._onDropdownKeyUp = (ev) => {
            const disabled = this._isDisabled();
            if (disabled) {
                return;
            }
            const shouldHandleKey = this._shouldHandleKeyUp(ev);
            const isOpen = this.state.isOpen;
            if (this.props.onKeyUp) {
                this.props.onKeyUp(ev);
                if (ev.preventDefault) {
                    return;
                }
            }
            switch (ev.which) {
                case KeyCodes.space:
                    this.setState({
                        isOpen: !isOpen
                    });
                    break;
                default:
                    if (shouldHandleKey && isOpen) {
                        this.setState({ isOpen: false });
                    }
                    return;
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onZoneKeyDown = (ev) => {
            let elementToFocus;
            this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);
            const containsExpandCollapseModifier = ev.altKey || ev.metaKey;
            switch (ev.which) {
                case KeyCodes.up:
                    if (containsExpandCollapseModifier) {
                        this.setState({ isOpen: false });
                    }
                    else {
                        if (this._host.current) {
                            elementToFocus = getLastFocusable(this._host.current, this._host.current.lastChild, true);
                        }
                    }
                    break;
                case KeyCodes.home:
                case KeyCodes.end:
                case KeyCodes.pageUp:
                case KeyCodes.pageDown:
                    break;
                case KeyCodes.down:
                    if (!containsExpandCollapseModifier && this._host.current) {
                        elementToFocus = getFirstFocusable(this._host.current, this._host.current.firstChild, true);
                    }
                    break;
                case KeyCodes.escape:
                    this.setState({ isOpen: false });
                    break;
                case KeyCodes.tab:
                    this.setState({ isOpen: false });
                    return;
                default:
                    return;
            }
            if (elementToFocus) {
                elementToFocus.focus();
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onZoneKeyUp = (ev) => {
            const shouldHandleKey = this._shouldHandleKeyUp(ev);
            if (shouldHandleKey && this.state.isOpen) {
                this.setState({ isOpen: false });
                ev.preventDefault();
            }
        };
        this._onDropdownClick = (ev) => {
            if (this.props.onClick) {
                this.props.onClick(ev);
                if (ev.preventDefault) {
                    return;
                }
            }
            const { isOpen } = this.state;
            const disabled = this._isDisabled();
            if (!disabled) {
                this.setState({
                    isOpen: !isOpen
                });
            }
        };
        this._onFocus = (ev) => {
            const { isOpen, selectedIndices } = this.state;
            const { multiSelect } = this.props;
            const disabled = this._isDisabled();
            if (!disabled) {
                if (!isOpen && selectedIndices.length === 0 && !multiSelect) {
                    this._moveIndex(ev, 1, 0, -1);
                }
                if (this.props.onFocus) {
                    this.props.onFocus(ev);
                }
                this.setState({ hasFocus: true });
            }
        };
        this._isDisabled = () => {
            let { disabled } = this.props;
            const { isDisabled } = this.props;
            if (isDisabled !== undefined) {
                disabled = isDisabled;
            }
            return disabled;
        };
        this._warnDeprecations({
            isDisabled: 'disabled',
            onChanged: 'onChange',
            placeHolder: 'placeholder'
        });
        this._warnMutuallyExclusive({
            defaultSelectedKey: 'selectedKey',
            defaultSelectedKeys: 'selectedKeys',
            selectedKeys: 'selectedKey',
            multiSelect: 'defaultSelectedKey',
            selectedKey: 'multiSelect'
        });
        this._id = props.id || getId('Dropdown');
        this._isScrollIdle = true;
        let selectedIndices;
        if (this.props.multiSelect) {
            const selectedKeys = props.defaultSelectedKeys !== undefined ? props.defaultSelectedKeys : props.selectedKeys;
            selectedIndices = this._getSelectedIndexes(props.options, selectedKeys);
        }
        else {
            const selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;
            selectedIndices = this._getSelectedIndexes(props.options, selectedKey);
            this._sizePosCache.updateOptions(props.options);
        }
        this.state = {
            isOpen: false,
            selectedIndices,
            hasFocus: false,
            calloutRenderEdge: undefined
        };
    }
    componentWillReceiveProps(newProps) {
        let selectedKeyProp;
        const didOptionsChange = newProps.options !== this.props.options;
        if (newProps.multiSelect) {
            if (didOptionsChange && newProps.defaultSelectedKeys !== undefined) {
                selectedKeyProp = 'defaultSelectedKeys';
            }
            else {
                selectedKeyProp = 'selectedKeys';
            }
        }
        else {
            if (didOptionsChange && newProps.defaultSelectedKey !== undefined) {
                selectedKeyProp = 'defaultSelectedKey';
            }
            else {
                selectedKeyProp = 'selectedKey';
            }
        }
        if (newProps[selectedKeyProp] !== undefined && (newProps[selectedKeyProp] !== this.props[selectedKeyProp] || didOptionsChange)) {
            this.setState({
                selectedIndices: this._getSelectedIndexes(newProps.options, newProps[selectedKeyProp])
            });
        }
        if (newProps.options !== this.props.options &&
            !newProps.multiSelect) {
            this._sizePosCache.updateOptions(newProps.options);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isOpen === true && this.state.isOpen === false) {
            this._gotMouseMove = false;
            if (this._dropDown.current) {
                this._dropDown.current.focus();
            }
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        }
    }
    render() {
        const id = this._id;
        const { className, label, options, ariaLabel, required, errorMessage, multiSelect, keytipProps, styles: propStyles, theme, panelProps, calloutProps, onRenderTitle = this._onRenderTitle, onRenderContainer = this._onRenderContainer, onRenderPlaceHolder = this._onRenderPlaceholder, onRenderCaretDown = this._onRenderCaretDown } = this.props;
        const { isOpen, selectedIndices, hasFocus, calloutRenderEdge } = this.state;
        const selectedOptions = this._getAllSelectedOptions(options, selectedIndices);
        const divProps = getNativeProps(this.props, divProperties);
        const disabled = this._isDisabled();
        const optionId = id + '-option';
        const ariaAttrs = multiSelect || disabled
            ? {
                role: undefined,
                ariaActiveDescendant: undefined,
                childRole: undefined,
                ariaSetSize: undefined,
                ariaPosInSet: undefined,
                ariaSelected: undefined
            }
            :
                {
                    role: 'listbox',
                    ariaActiveDescendant: isOpen && selectedIndices.length === 1 && selectedIndices[0] >= 0 ? this._id + '-list' + selectedIndices[0] : optionId,
                    childRole: 'option',
                    ariaSetSize: this._sizePosCache.optionSetSize,
                    ariaPosInSet: this._sizePosCache.positionInSet(selectedIndices[0]),
                    ariaSelected: selectedIndices[0] === undefined ? undefined : true
                };
        this._classNames = getClassNames(propStyles, {
            theme,
            className,
            hasError: Boolean(errorMessage && errorMessage.length > 0),
            isOpen,
            required,
            disabled,
            isRenderingPlaceholder: !selectedOptions.length,
            panelClassName: !!panelProps ? panelProps.className : undefined,
            calloutClassName: !!calloutProps ? calloutProps.className : undefined,
            calloutRenderEdge: calloutRenderEdge
        });
        const labelStyles = this._classNames.subComponentStyles
            ? this._classNames.subComponentStyles.label
            : undefined;
        return (React.createElement("div", { className: this._classNames.root },
            label && (React.createElement(Label, { className: this._classNames.label, id: id + '-label', htmlFor: id, required: required, styles: labelStyles }, label)),
            React.createElement(KeytipData, { keytipProps: keytipProps, disabled: disabled }, (keytipAttributes) => (React.createElement("div", Object.assign({}, keytipAttributes, { "data-is-focusable": !disabled, ref: this._dropDown, id: id, tabIndex: disabled ? -1 : 0, "aria-expanded": isOpen ? 'true' : 'false', role: ariaAttrs.role, "aria-label": ariaLabel, "aria-labelledby": label && !ariaLabel ? id + '-label' : undefined, "aria-describedby": mergeAriaAttributeValues(optionId, keytipAttributes['aria-describedby']), "aria-activedescendant": isOpen ? ariaAttrs.ariaActiveDescendant : undefined, "aria-required": required, "aria-disabled": disabled, "aria-owns": isOpen ? id + '-list' : undefined }, divProps, { className: this._classNames.dropdown, onBlur: this._onDropdownBlur, onKeyDown: this._onDropdownKeyDown, onKeyUp: this._onDropdownKeyUp, onClick: this._onDropdownClick, onFocus: this._onFocus }),
                React.createElement("span", { id: optionId, className: this._classNames.title, "aria-atomic": true, role: ariaAttrs.childRole, "aria-live": !hasFocus || disabled || multiSelect || isOpen ? 'off' : 'assertive', "aria-label": selectedOptions.length ? selectedOptions[0].text : this._placeholder, "aria-setsize": ariaAttrs.ariaSetSize, "aria-posinset": ariaAttrs.ariaPosInSet, "aria-selected": ariaAttrs.ariaSelected }, selectedOptions.length
                    ? onRenderTitle(selectedOptions, this._onRenderTitle)
                    : onRenderPlaceHolder(this.props, this._onRenderPlaceholder)),
                React.createElement("span", { className: this._classNames.caretDownWrapper }, onRenderCaretDown(this.props, this._onRenderCaretDown))))),
            isOpen && onRenderContainer(this.props, this._onRenderContainer),
            errorMessage && errorMessage.length > 0 && React.createElement("div", { className: this._classNames.errorMessage }, errorMessage)));
    }
    focus(shouldOpenOnFocus) {
        if (this._dropDown.current && this._dropDown.current.tabIndex !== -1) {
            this._dropDown.current.focus();
            if (shouldOpenOnFocus) {
                this.setState({
                    isOpen: true
                });
            }
        }
    }
    setSelectedIndex(event, index) {
        const { onChange, onChanged, options, selectedKey, selectedKeys, multiSelect, notifyOnReselect } = this.props;
        const { selectedIndices = [] } = this.state;
        const checked = selectedIndices ? selectedIndices.indexOf(index) > -1 : false;
        index = Math.max(0, Math.min(options.length - 1, index));
        if (!multiSelect && !notifyOnReselect && index === selectedIndices[0]) {
            return;
        }
        else if (!multiSelect && selectedKey === undefined) {
            this.setState({
                selectedIndices: [index]
            });
        }
        else if (multiSelect && selectedKeys === undefined) {
            const newIndexes = selectedIndices ? this._copyArray(selectedIndices) : [];
            if (checked) {
                const position = newIndexes.indexOf(index);
                if (position > -1) {
                    newIndexes.splice(position, 1);
                }
            }
            else {
                newIndexes.push(index);
            }
            this.setState({
                selectedIndices: newIndexes
            });
        }
        if (onChange) {
            const changedOpt = multiSelect ? { ...options[index], selected: !checked } : options[index];
            onChange(event, changedOpt, index);
        }
        if (onChanged) {
            const changedOpt = multiSelect ? { ...options[index], selected: !checked } : options[index];
            onChanged(changedOpt, index);
        }
    }
    get _placeholder() {
        return this.props.placeholder || this.props.placeHolder;
    }
    _copyArray(array) {
        const newArray = [];
        for (const element of array) {
            newArray.push(element);
        }
        return newArray;
    }
    _moveIndex(event, stepValue, index, selectedIndex) {
        const { options } = this.props;
        if (selectedIndex === index || options.length === 0) {
            return selectedIndex;
        }
        if (index < 0) {
            index = 0;
        }
        if (index >= options.length) {
            index = options.length - 1;
        }
        let stepCounter = 0;
        while (options[index].itemType === DropdownMenuItemType.Header ||
            options[index].itemType === DropdownMenuItemType.Divider ||
            options[index].disabled) {
            if (stepCounter >= options.length) {
                return selectedIndex;
            }
            if (index + stepValue < 0) {
                index = options.length;
            }
            else if (index + stepValue >= options.length) {
                index = -1;
            }
            index = index + stepValue;
            stepCounter++;
        }
        this.setSelectedIndex(event, index);
        return index;
    }
    _renderFocusableList(props) {
        const { onRenderList = this._onRenderList, label } = props;
        const id = this._id;
        return (React.createElement("div", { className: this._classNames.dropdownItemsWrapper, onKeyDown: this._onZoneKeyDown, onKeyUp: this._onZoneKeyUp, ref: this._host, tabIndex: 0 },
            React.createElement(FocusZone, { ref: this._focusZone, direction: FocusZoneDirection.vertical, id: id + '-list', className: this._classNames.dropdownItems, "aria-labelledby": label ? id + '-label' : undefined, role: "listbox" }, onRenderList(props, this._onRenderList))));
    }
    _renderSeparator(item) {
        const { index, key } = item;
        if (index > 0) {
            return React.createElement("div", { role: "separator", key: key, className: this._classNames.dropdownDivider });
        }
        return null;
    }
    _renderHeader(item) {
        const { onRenderOption = this._onRenderOption } = this.props;
        const { key } = item;
        return (React.createElement("div", { key: key, className: this._classNames.dropdownItemHeader }, onRenderOption(item, this._onRenderOption)));
    }
    _onItemMouseEnter(item, ev) {
        if (this._shouldIgnoreMouseEvent()) {
            return;
        }
        const targetElement = ev.currentTarget;
        targetElement.focus();
    }
    _onItemMouseMove(item, ev) {
        const targetElement = ev.currentTarget;
        this._gotMouseMove = true;
        if (!this._isScrollIdle || document.activeElement === targetElement) {
            return;
        }
        targetElement.focus();
    }
    _shouldIgnoreMouseEvent() {
        return !this._isScrollIdle || !this._gotMouseMove;
    }
    _getSelectedIndexes(options, selectedKey) {
        if (selectedKey === undefined) {
            if (this.props.multiSelect) {
                return this._getAllSelectedIndices(options);
            }
            const selectedIndex = this._getSelectedIndex(options, null);
            return selectedIndex !== -1 ? [selectedIndex] : [];
        }
        else if (!Array.isArray(selectedKey)) {
            return [this._getSelectedIndex(options, selectedKey)];
        }
        const selectedIndices = [];
        for (const key of selectedKey) {
            selectedIndices.push(this._getSelectedIndex(options, key));
        }
        return selectedIndices;
    }
    _getAllSelectedOptions(options, selectedIndices) {
        const selectedOptions = [];
        for (const index of selectedIndices) {
            const option = options[index];
            if (option) {
                selectedOptions.push(option);
            }
        }
        return selectedOptions;
    }
    _getAllSelectedIndices(options) {
        return options.map((option, index) => (option.selected ? index : -1)).filter(index => index !== -1);
    }
    _getSelectedIndex(options, selectedKey) {
        return findIndex(options, option => {
            if (selectedKey != null) {
                return option.key === selectedKey;
            }
            else {
                return !!option.isSelected || !!option.selected;
            }
        });
    }
    _isAltOrMeta(ev) {
        return ev.which === KeyCodes.alt || ev.key === 'Meta';
    }
    _shouldHandleKeyUp(ev) {
        const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
        this._lastKeyDownWasAltOrMeta = false;
        return !!keyPressIsAltOrMetaAlone && !(isMac() || isIOS());
    }
};
DropdownBase.defaultProps = {
    options: []
};
DropdownBase = tslib_1.__decorate([
    withResponsiveMode
], DropdownBase);
export { DropdownBase };
