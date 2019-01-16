import * as tslib_1 from "tslib";
import * as React from 'react';
import { Autofill } from '../Autofill/index';
import { BaseComponent, css, customizable, divProperties, findElementRecursive, findIndex, focusAsync, getId, getNativeProps, isIOS, isMac, KeyCodes, shallowCompare } from '../../Utilities';
import { Callout } from '../../Callout';
import { Checkbox } from '../../Checkbox';
import { CommandButton, IconButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { getCaretDownButtonStyles, getOptionStyles, getStyles } from './ComboBox.styles';
import { getClassNames, getComboBoxOptionClassNames } from './ComboBox.classNames';
import { KeytipData } from '../../KeytipData';
import { Label } from '../../Label';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
var SearchDirection;
(function (SearchDirection) {
    SearchDirection[SearchDirection["backward"] = -1] = "backward";
    SearchDirection[SearchDirection["none"] = 0] = "none";
    SearchDirection[SearchDirection["forward"] = 1] = "forward";
})(SearchDirection || (SearchDirection = {}));
var HoverStatus;
(function (HoverStatus) {
    HoverStatus[HoverStatus["clearAll"] = -2] = "clearAll";
    HoverStatus[HoverStatus["default"] = -1] = "default";
})(HoverStatus || (HoverStatus = {}));
const ScrollIdleDelay = 250;
const TouchIdleDelay = 500;
const ReadOnlyPendingAutoCompleteTimeout = 1000;
class ComboBoxOptionWrapper extends React.Component {
    render() {
        return this.props.render();
    }
    shouldComponentUpdate(newProps) {
        return !shallowCompare({ ...this.props, render: undefined }, { ...newProps, render: undefined });
    }
}
let ComboBox = class ComboBox extends BaseComponent {
    constructor(props) {
        super(props);
        this._root = React.createRef();
        this._autofill = React.createRef();
        this._comboBoxWrapper = React.createRef();
        this._comboBoxMenu = React.createRef();
        this._selectedElement = React.createRef();
        this.focus = (shouldOpenOnFocus, useFocusAsync) => {
            if (this._autofill.current) {
                if (useFocusAsync) {
                    focusAsync(this._autofill.current);
                }
                else {
                    this._autofill.current.focus();
                }
                if (shouldOpenOnFocus) {
                    this.setState({
                        isOpen: true
                    });
                }
            }
        };
        this.dismissMenu = () => {
            const { isOpen } = this.state;
            isOpen && this.setState({ isOpen: false });
        };
        this._onUpdateValueInAutofillWillReceiveProps = () => {
            const comboBox = this._autofill.current;
            if (!comboBox) {
                return null;
            }
            if (comboBox.value === null || comboBox.value === undefined) {
                return null;
            }
            const visibleValue = this._normalizeToString(this._currentVisibleValue);
            if (comboBox.value !== visibleValue) {
                return visibleValue || '​';
            }
            return comboBox.value;
        };
        this._onShouldSelectFullInputValueInAutofillComponentDidUpdate = () => {
            return this._currentVisibleValue === this.state.suggestedDisplayValue;
        };
        this._getVisibleValue = () => {
            const { text, value, allowFreeform, autoComplete } = this.props;
            const { selectedIndices, currentPendingValueValidIndex, currentOptions, currentPendingValue, suggestedDisplayValue, isOpen, focused } = this.state;
            const currentPendingIndexValid = this._indexWithinBounds(currentOptions, currentPendingValueValidIndex);
            if (!(isOpen && currentPendingIndexValid) && (text && (currentPendingValue === null || currentPendingValue === undefined))) {
                return text;
            }
            if (!(isOpen && currentPendingIndexValid) && (value && (currentPendingValue === null || currentPendingValue === undefined))) {
                return value;
            }
            const displayValues = [];
            if (this.props.multiSelect) {
                if (focused) {
                    let index = -1;
                    if (autoComplete === 'on' && currentPendingIndexValid) {
                        index = currentPendingValueValidIndex;
                    }
                    displayValues.push(currentPendingValue !== null && currentPendingValue !== undefined
                        ? currentPendingValue
                        : this._indexWithinBounds(currentOptions, index)
                            ? currentOptions[index].text
                            : '');
                }
                else {
                    for (let idx = 0; selectedIndices && idx < selectedIndices.length; idx++) {
                        const index = selectedIndices[idx];
                        displayValues.push(this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : this._normalizeToString(suggestedDisplayValue));
                    }
                }
            }
            else {
                let index = this._getFirstSelectedIndex();
                if (allowFreeform) {
                    if (autoComplete === 'on' && currentPendingIndexValid) {
                        index = currentPendingValueValidIndex;
                    }
                    displayValues.push(currentPendingValue !== null && currentPendingValue !== undefined
                        ? currentPendingValue
                        : this._indexWithinBounds(currentOptions, index)
                            ? currentOptions[index].text
                            : '');
                }
                else {
                    if (currentPendingIndexValid && autoComplete === 'on') {
                        index = currentPendingValueValidIndex;
                        displayValues.push(this._normalizeToString(currentPendingValue));
                    }
                    else {
                        displayValues.push(this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : this._normalizeToString(suggestedDisplayValue));
                    }
                }
            }
            let displayString = '';
            for (let idx = 0; idx < displayValues.length; idx++) {
                if (idx > 0) {
                    displayString += ', ';
                }
                displayString += displayValues[idx];
            }
            return displayString;
        };
        this._onInputChange = (updatedValue) => {
            if (this.props.disabled) {
                this._handleInputWhenDisabled(null);
                return;
            }
            this.props.allowFreeform ? this._processInputChangeWithFreeform(updatedValue) : this._processInputChangeWithoutFreeform(updatedValue);
        };
        this._select = () => {
            if (this._autofill.current && this._autofill.current.inputElement) {
                this._autofill.current.inputElement.select();
            }
            if (!this.state.focused) {
                this.setState({ focused: true });
            }
        };
        this._onResolveOptions = () => {
            if (this.props.onResolveOptions) {
                const newOptions = this.props.onResolveOptions({ ...this.state.currentOptions });
                if (Array.isArray(newOptions)) {
                    this.setState({
                        currentOptions: newOptions
                    });
                }
                else if (newOptions && newOptions.then) {
                    const promise = (this._currentPromise = newOptions);
                    promise.then((newOptionsFromPromise) => {
                        if (promise === this._currentPromise) {
                            this.setState({
                                currentOptions: newOptionsFromPromise
                            });
                        }
                    });
                }
            }
        };
        this._onBlur = (event) => {
            let relatedTarget = event.relatedTarget;
            if (event.relatedTarget === null) {
                relatedTarget = document.activeElement;
            }
            if (relatedTarget &&
                ((this._root.current && this._root.current.contains(relatedTarget)) ||
                    (this._comboBoxMenu.current &&
                        (this._comboBoxMenu.current.contains(relatedTarget) ||
                            findElementRecursive(this._comboBoxMenu.current, element => element === relatedTarget))))) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            if (this.state.focused) {
                this.setState({ focused: false });
                if (!this.props.multiSelect) {
                    this._submitPendingValue(event);
                }
            }
        };
        this._onRenderContainer = (props) => {
            const { onRenderList, calloutProps, dropdownWidth, dropdownMaxWidth, onRenderLowerContent = this._onRenderLowerContent, useComboBoxAsMenuWidth } = props;
            const comboBoxMenuWidth = useComboBoxAsMenuWidth && this._comboBoxWrapper.current ? this._comboBoxWrapper.current.clientWidth + 2 : undefined;
            return (React.createElement(Callout, Object.assign({ isBeakVisible: false, gapSpace: 0, doNotLayer: false, directionalHint: DirectionalHint.bottomLeftEdge, directionalHintFixed: false }, calloutProps, { onLayerMounted: this._onLayerMounted, className: css(this._classNames.callout, calloutProps ? calloutProps.className : undefined), target: this._comboBoxWrapper.current, onDismiss: this._onDismiss, onScroll: this._onScroll, setInitialFocus: false, calloutWidth: useComboBoxAsMenuWidth && this._comboBoxWrapper.current ? comboBoxMenuWidth && comboBoxMenuWidth : dropdownWidth, calloutMaxWidth: dropdownMaxWidth ? dropdownMaxWidth : comboBoxMenuWidth }),
                React.createElement("div", { className: this._classNames.optionsContainerWrapper, ref: this._comboBoxMenu }, onRenderList({ ...props }, this._onRenderList)),
                onRenderLowerContent(this.props, this._onRenderLowerContent)));
        };
        this._onLayerMounted = () => {
            this._gotMouseMove = false;
            if (this.props.calloutProps && this.props.calloutProps.onLayerMounted) {
                this.props.calloutProps.onLayerMounted();
            }
        };
        this._onRenderList = (props) => {
            const { onRenderItem, options } = props;
            const id = this._id;
            return (React.createElement("div", { id: id + '-list', className: this._classNames.optionsContainer, "aria-labelledby": id + '-label', role: "listbox" }, options.map(item => onRenderItem(item, this._onRenderItem))));
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
        this._onRenderLowerContent = () => {
            return null;
        };
        this._renderOption = (item) => {
            const { onRenderOption = this._onRenderOptionContent } = this.props;
            const id = this._id;
            const isSelected = this._isOptionSelected(item.index);
            const optionStyles = this._getCurrentOptionStyles(item);
            const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
            const checkboxStyles = () => {
                return optionStyles;
            };
            const title = this._getPreviewText(item);
            const getOptionComponent = () => {
                return !this.props.multiSelect ? (React.createElement(CommandButton, { id: id + '-list' + item.index, key: item.key, "data-index": item.index, styles: this._getCurrentOptionStyles(item), checked: isSelected, className: 'ms-ComboBox-option', onClick: this._onItemClick(item), onMouseEnter: this._onOptionMouseEnter.bind(this, item.index), onMouseMove: this._onOptionMouseMove.bind(this, item.index), onMouseLeave: this._onOptionMouseLeave, role: "option", "aria-selected": isSelected ? 'true' : 'false', ariaLabel: item.ariaLabel, disabled: item.disabled, title: title },
                    ' ',
                    React.createElement("span", { className: optionClassNames.optionTextWrapper, ref: isSelected ? this._selectedElement : undefined }, onRenderOption(item, this._onRenderOptionContent)))) : (React.createElement(Checkbox, { id: id + '-list' + item.index, ariaLabel: item.ariaLabel, key: item.key, "data-index": item.index, styles: checkboxStyles, className: 'ms-ComboBox-option', "data-is-focusable": true, onChange: this._onItemClick(item), label: item.text, role: "option", "aria-selected": isSelected ? 'true' : 'false', checked: isSelected, title: title }, onRenderOption(item, this._onRenderOptionContent)));
            };
            return (React.createElement(ComboBoxOptionWrapper, { key: item.key, index: item.index, disabled: item.disabled, isSelected: isSelected, text: item.text, render: getOptionComponent }));
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
            }, ScrollIdleDelay);
        };
        this._onRenderOptionContent = (item) => {
            const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
            return React.createElement("span", { className: optionClassNames.optionText }, item.text);
        };
        this._onDismiss = () => {
            this._setOpenStateAndFocusOnClose(false, false);
            this._resetSelectedIndex();
        };
        this._onAfterClearPendingInfo = () => {
            this._processingClearPendingInfo = false;
        };
        this._onInputKeyDown = (ev) => {
            const { disabled, allowFreeform, autoComplete } = this.props;
            const { isOpen, currentOptions, currentPendingValueValidIndexOnHover } = this.state;
            this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);
            if (disabled) {
                this._handleInputWhenDisabled(ev);
                return;
            }
            let index = this._getPendingSelectedIndex(false);
            switch (ev.which) {
                case KeyCodes.enter:
                    if (this._autofill.current && this._autofill.current.inputElement) {
                        this._autofill.current.inputElement.select();
                    }
                    this._submitPendingValue(ev);
                    if (this.props.multiSelect && isOpen) {
                        this.setState({
                            currentPendingValueValidIndex: index
                        });
                    }
                    else {
                        if (isOpen ||
                            ((!allowFreeform ||
                                this.state.currentPendingValue === undefined ||
                                this.state.currentPendingValue === null ||
                                this.state.currentPendingValue.length <= 0) &&
                                this.state.currentPendingValueValidIndex < 0)) {
                            this.setState({
                                isOpen: !isOpen
                            });
                        }
                    }
                    break;
                case KeyCodes.tab:
                    if (!this.props.multiSelect) {
                        this._submitPendingValue(ev);
                    }
                    if (isOpen) {
                        this._setOpenStateAndFocusOnClose(!isOpen, false);
                    }
                    return;
                case KeyCodes.escape:
                    this._resetSelectedIndex();
                    if (isOpen) {
                        this.setState({
                            isOpen: false
                        });
                    }
                    else {
                        return;
                    }
                    break;
                case KeyCodes.up:
                    if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
                        index = this.state.currentOptions.length;
                    }
                    if (ev.altKey || ev.metaKey) {
                        if (isOpen) {
                            this._setOpenStateAndFocusOnClose(!isOpen, true);
                            break;
                        }
                        return;
                    }
                    this._setPendingInfoFromIndexAndDirection(index, SearchDirection.backward);
                    break;
                case KeyCodes.down:
                    if (ev.altKey || ev.metaKey) {
                        this._setOpenStateAndFocusOnClose(true, true);
                    }
                    else {
                        if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
                            index = -1;
                        }
                        this._setPendingInfoFromIndexAndDirection(index, SearchDirection.forward);
                    }
                    break;
                case KeyCodes.home:
                case KeyCodes.end:
                    if (allowFreeform) {
                        return;
                    }
                    index = -1;
                    let directionToSearch = SearchDirection.forward;
                    if (ev.which === KeyCodes.end) {
                        index = currentOptions.length;
                        directionToSearch = SearchDirection.backward;
                    }
                    this._setPendingInfoFromIndexAndDirection(index, directionToSearch);
                    break;
                case KeyCodes.space:
                    if (!allowFreeform && autoComplete === 'off') {
                        break;
                    }
                default:
                    if (ev.which >= 112 && ev.which <= 123) {
                        return;
                    }
                    if (ev.keyCode === KeyCodes.alt || ev.key === 'Meta') {
                        return;
                    }
                    if (!allowFreeform && autoComplete === 'on') {
                        this._onInputChange(String.fromCharCode(ev.which));
                        break;
                    }
                    return;
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onInputKeyUp = (ev) => {
            const { disabled, allowFreeform, autoComplete } = this.props;
            const isOpen = this.state.isOpen;
            const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
            this._lastKeyDownWasAltOrMeta = false;
            const shouldHandleKey = keyPressIsAltOrMetaAlone && !(isMac() || isIOS());
            if (disabled) {
                this._handleInputWhenDisabled(ev);
                return;
            }
            switch (ev.which) {
                case KeyCodes.space:
                    if (!allowFreeform && autoComplete === 'off') {
                        this._setOpenStateAndFocusOnClose(!isOpen, !!isOpen);
                        return;
                    }
                    break;
                default:
                    if (shouldHandleKey && isOpen) {
                        this._setOpenStateAndFocusOnClose(!isOpen, true);
                    }
                    return;
            }
            ev.stopPropagation();
            ev.preventDefault();
        };
        this._onOptionMouseLeave = () => {
            if (this._shouldIgnoreMouseEvent()) {
                return;
            }
            this.setState({
                currentPendingValueValidIndexOnHover: HoverStatus.clearAll
            });
        };
        this._onComboBoxClick = () => {
            const { disabled } = this.props;
            const { isOpen } = this.state;
            if (!disabled) {
                this._setOpenStateAndFocusOnClose(!isOpen, false);
                this.setState({ focused: true });
            }
        };
        this._onAutofillClick = () => {
            if (this.props.allowFreeform) {
                this.focus(this.state.isOpen || this._processingTouch);
            }
            else {
                this._onComboBoxClick();
            }
        };
        this._onTouchStart = () => {
            if (this._comboBoxWrapper.current && !('onpointerdown' in this._comboBoxWrapper)) {
                this._handleTouchAndPointerEvent();
            }
        };
        this._onPointerDown = (ev) => {
            if (ev.pointerType === 'touch') {
                this._handleTouchAndPointerEvent();
                ev.preventDefault();
                ev.stopImmediatePropagation();
            }
        };
        this._warnMutuallyExclusive({
            defaultSelectedKey: 'selectedKey',
            text: 'defaultSelectedKey',
            value: 'defaultSelectedKey',
            selectedKey: 'value',
            dropdownWidth: 'useComboBoxAsMenuWidth'
        });
        this._warnDeprecations({
            value: 'text',
            onChanged: 'onChange'
        });
        this._id = props.id || getId('ComboBox');
        const selectedKeys = this._buildDefaultSelectedKeys(props.defaultSelectedKey, props.selectedKey);
        this._isScrollIdle = true;
        this._processingTouch = false;
        this._gotMouseMove = false;
        this._processingClearPendingInfo = false;
        const initialSelectedIndices = this._getSelectedIndices(props.options, selectedKeys);
        this.state = {
            isOpen: false,
            selectedIndices: initialSelectedIndices,
            focused: false,
            suggestedDisplayValue: undefined,
            currentOptions: this.props.options,
            currentPendingValueValidIndex: -1,
            currentPendingValue: undefined,
            currentPendingValueValidIndexOnHover: HoverStatus.default
        };
    }
    componentDidMount() {
        if (this._comboBoxWrapper.current) {
            this._events.on(this._comboBoxWrapper.current, 'focus', this._onResolveOptions, true);
            if ('onpointerdown' in this._comboBoxWrapper.current) {
                this._events.on(this._comboBoxWrapper.current, 'pointerdown', this._onPointerDown, true);
            }
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.selectedKey !== this.props.selectedKey ||
            newProps.text !== this.props.text ||
            newProps.value !== this.props.value ||
            newProps.options !== this.props.options) {
            const selectedKeys = this._buildSelectedKeys(newProps.selectedKey);
            const indices = this._getSelectedIndices(newProps.options, selectedKeys);
            this.setState({
                selectedIndices: indices,
                currentOptions: newProps.options
            });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { allowFreeform, text, value, onMenuOpen, onMenuDismissed } = this.props;
        const { isOpen, focused, selectedIndices, currentPendingValueValidIndex } = this.state;
        if (isOpen && (!prevState.isOpen || prevState.currentPendingValueValidIndex !== currentPendingValueValidIndex)) {
            this._async.setTimeout(() => this._scrollIntoView(), 0);
        }
        if (focused &&
            (isOpen ||
                (prevState.isOpen &&
                    !isOpen &&
                    this._focusInputAfterClose &&
                    this._autofill.current &&
                    document.activeElement !== this._autofill.current.inputElement))) {
            this.focus(undefined, true);
        }
        if (this._focusInputAfterClose &&
            ((prevState.isOpen && !isOpen) ||
                (focused &&
                    ((!isOpen &&
                        !this.props.multiSelect &&
                        prevState.selectedIndices &&
                        selectedIndices &&
                        prevState.selectedIndices[0] !== selectedIndices[0]) ||
                        !allowFreeform ||
                        text !== prevProps.text ||
                        value !== prevProps.value)))) {
            this._select();
        }
        this._notifyPendingValueChanged(prevState);
        if (isOpen && !prevState.isOpen && onMenuOpen) {
            onMenuOpen();
        }
        if (!isOpen && prevState.isOpen && onMenuDismissed) {
            onMenuDismissed();
        }
    }
    componentWillUnmount() {
        super.componentWillUnmount();
        this._events.off(this._comboBoxWrapper.current);
    }
    render() {
        const id = this._id;
        const { className, label, disabled, ariaLabel, required, errorMessage, onRenderContainer = this._onRenderContainer, onRenderList = this._onRenderList, onRenderItem = this._onRenderItem, onRenderOption = this._onRenderOptionContent, allowFreeform, buttonIconProps, isButtonAriaHidden = true, styles: customStyles, theme, title, keytipProps, placeholder } = this.props;
        const { isOpen, focused, suggestedDisplayValue } = this.state;
        this._currentVisibleValue = this._getVisibleValue();
        const divProps = getNativeProps(this.props, divProperties, ['onChange', 'value']);
        const hasErrorMessage = errorMessage && errorMessage.length > 0 ? true : false;
        this._classNames = this.props.getClassNames
            ? this.props.getClassNames(theme, !!isOpen, !!disabled, !!required, !!focused, !!allowFreeform, !!hasErrorMessage, className)
            : getClassNames(getStyles(theme, customStyles), className, !!isOpen, !!disabled, !!required, !!focused, !!allowFreeform, !!hasErrorMessage);
        return (React.createElement("div", Object.assign({}, divProps, { ref: this._root, className: this._classNames.container }),
            label && (React.createElement(Label, { id: id + '-label', disabled: disabled, required: required, htmlFor: id + '-input', className: this._classNames.label }, label)),
            React.createElement(KeytipData, { keytipProps: keytipProps, disabled: disabled }, (keytipAttributes) => (React.createElement("div", { "data-ktp-target": keytipAttributes['data-ktp-target'], ref: this._comboBoxWrapper, id: id + 'wrapper', className: this._classNames.root },
                React.createElement(Autofill, { "data-ktp-execute-target": keytipAttributes['data-ktp-execute-target'], "data-is-interactable": !disabled, componentRef: this._autofill, id: id + '-input', className: this._classNames.input, type: "text", onFocus: this._select, onBlur: this._onBlur, onKeyDown: this._onInputKeyDown, onKeyUp: this._onInputKeyUp, onClick: this._onAutofillClick, onTouchStart: this._onTouchStart, onInputValueChange: this._onInputChange, "aria-expanded": isOpen, "aria-autocomplete": this._getAriaAutoCompleteValue(), role: "combobox", readOnly: disabled || !allowFreeform, "aria-labelledby": label && !ariaLabel ? id + '-label' : undefined, "aria-label": ariaLabel, "aria-describedby": keytipAttributes['aria-describedby'], "aria-activedescendant": this._getAriaActiveDescentValue(), "aria-disabled": disabled, "aria-owns": isOpen ? id + '-list' : undefined, spellCheck: false, defaultVisibleValue: this._currentVisibleValue, suggestedDisplayValue: suggestedDisplayValue, updateValueInWillReceiveProps: this._onUpdateValueInAutofillWillReceiveProps, shouldSelectFullInputValueInComponentDidUpdate: this._onShouldSelectFullInputValueInAutofillComponentDidUpdate, title: title, preventValueSelection: !focused, placeholder: placeholder }),
                React.createElement(IconButton, { className: 'ms-ComboBox-CaretDown-button', styles: this._getCaretButtonStyles(), role: "presentation", "aria-hidden": isButtonAriaHidden, "data-is-focusable": false, tabIndex: -1, onClick: this._onComboBoxClick, iconProps: buttonIconProps, disabled: disabled, checked: isOpen })))),
            isOpen &&
                onRenderContainer({
                    ...this.props,
                    onRenderList,
                    onRenderItem,
                    onRenderOption,
                    options: this.state.currentOptions.map((item, index) => ({ ...item, index: index }))
                }, this._onRenderContainer),
            errorMessage && React.createElement("div", { className: this._classNames.errorMessage }, errorMessage)));
    }
    _indexWithinBounds(options, index) {
        if (!options) {
            return false;
        }
        return index >= 0 && index < options.length;
    }
    _processInputChangeWithFreeform(updatedValue) {
        const { currentOptions } = this.state;
        updatedValue = this._removeZeroWidthSpaces(updatedValue);
        let newCurrentPendingValueValidIndex = -1;
        if (updatedValue === '') {
            const items = currentOptions
                .map((item, index) => {
                return { ...item, index };
            })
                .filter(option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider)
                .filter(option => this._getPreviewText(option) === updatedValue);
            if (items.length === 1) {
                newCurrentPendingValueValidIndex = items[0].index;
            }
            this._setPendingInfo(updatedValue, newCurrentPendingValueValidIndex, updatedValue);
            return;
        }
        const originalUpdatedValue = updatedValue;
        updatedValue = updatedValue.toLocaleLowerCase();
        let newSuggestedDisplayValue = '';
        if (this.props.autoComplete === 'on') {
            const items = currentOptions
                .map((item, index) => {
                return { ...item, index };
            })
                .filter(option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider)
                .filter(option => this._getPreviewText(option)
                .toLocaleLowerCase()
                .indexOf(updatedValue) === 0);
            if (items.length > 0) {
                const text = this._getPreviewText(items[0]);
                newSuggestedDisplayValue = text.toLocaleLowerCase() !== updatedValue ? text : '';
                newCurrentPendingValueValidIndex = items[0].index;
            }
        }
        else {
            const items = currentOptions
                .map((item, index) => {
                return { ...item, index };
            })
                .filter(option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider)
                .filter(option => this._getPreviewText(option).toLocaleLowerCase() === updatedValue);
            if (items.length === 1) {
                newCurrentPendingValueValidIndex = items[0].index;
            }
        }
        this._setPendingInfo(originalUpdatedValue, newCurrentPendingValueValidIndex, newSuggestedDisplayValue);
    }
    _processInputChangeWithoutFreeform(updatedValue) {
        const { currentPendingValue, currentPendingValueValidIndex, currentOptions } = this.state;
        updatedValue = this._removeZeroWidthSpaces(updatedValue);
        if (this.props.autoComplete === 'on') {
            if (updatedValue !== '') {
                if (this._lastReadOnlyAutoCompleteChangeTimeoutId !== undefined) {
                    this._async.clearTimeout(this._lastReadOnlyAutoCompleteChangeTimeoutId);
                    this._lastReadOnlyAutoCompleteChangeTimeoutId = undefined;
                    updatedValue = this._normalizeToString(currentPendingValue) + updatedValue;
                }
                const originalUpdatedValue = updatedValue;
                updatedValue = updatedValue.toLocaleLowerCase();
                const items = currentOptions
                    .map((item, i) => {
                    return { ...item, index: i };
                })
                    .filter(option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider)
                    .filter(option => option.text.toLocaleLowerCase().indexOf(updatedValue) === 0);
                if (items.length > 0) {
                    this._setPendingInfo(originalUpdatedValue, items[0].index, this._getPreviewText(items[0]));
                }
                this._lastReadOnlyAutoCompleteChangeTimeoutId = this._async.setTimeout(() => {
                    this._lastReadOnlyAutoCompleteChangeTimeoutId = undefined;
                }, ReadOnlyPendingAutoCompleteTimeout);
                return;
            }
        }
        const index = currentPendingValueValidIndex >= 0 ? currentPendingValueValidIndex : this._getFirstSelectedIndex();
        this._setPendingInfoFromIndex(index);
    }
    _getFirstSelectedIndex() {
        return this.state.selectedIndices && this.state.selectedIndices.length > 0 ? this.state.selectedIndices[0] : -1;
    }
    _getNextSelectableIndex(index, searchDirection) {
        const { currentOptions } = this.state;
        let newIndex = index + searchDirection;
        newIndex = Math.max(0, Math.min(currentOptions.length - 1, newIndex));
        if (!this._indexWithinBounds(currentOptions, newIndex)) {
            return -1;
        }
        const option = currentOptions[newIndex];
        if (option.itemType === SelectableOptionMenuItemType.Header || option.itemType === SelectableOptionMenuItemType.Divider) {
            if (searchDirection !== SearchDirection.none &&
                ((newIndex > 0 && searchDirection < SearchDirection.none) ||
                    (newIndex >= 0 && newIndex < currentOptions.length && searchDirection > SearchDirection.none))) {
                newIndex = this._getNextSelectableIndex(newIndex, searchDirection);
            }
            else {
                return index;
            }
        }
        return newIndex;
    }
    _setSelectedIndex(index, submitPendingValueEvent, searchDirection = SearchDirection.none) {
        const { onChange, onChanged, onPendingValueChanged } = this.props;
        const { currentOptions } = this.state;
        let { selectedIndices } = this.state;
        if (!selectedIndices) {
            selectedIndices = [];
        }
        index = this._getNextSelectableIndex(index, searchDirection);
        if (!this._indexWithinBounds(currentOptions, index)) {
            return;
        }
        if (this.props.multiSelect || selectedIndices.length < 1 || (selectedIndices.length === 1 && selectedIndices[0] !== index)) {
            const option = currentOptions[index];
            if (!option) {
                return;
            }
            if (this.props.multiSelect) {
                option.selected = option.selected !== undefined ? !option.selected : selectedIndices.indexOf(index) < 0;
                if (option.selected && selectedIndices.indexOf(index) < 0) {
                    selectedIndices.push(index);
                }
                else if (!option.selected && selectedIndices.indexOf(index) >= 0) {
                    selectedIndices = selectedIndices.filter((value) => value !== index);
                }
            }
            else {
                selectedIndices[0] = index;
            }
            this.setState({
                selectedIndices: selectedIndices
            });
            if (this._hasPendingValue && onPendingValueChanged) {
                onPendingValueChanged();
                this._hasPendingValue = false;
            }
            if (onChange) {
                onChange(submitPendingValueEvent, option, index, undefined);
            }
            if (onChanged) {
                onChanged(option, index, undefined, submitPendingValueEvent);
            }
            this._clearPendingInfo();
        }
    }
    _submitPendingValue(submitPendingValueEvent) {
        const { onChange, onChanged, allowFreeform, autoComplete } = this.props;
        const { currentPendingValue, currentPendingValueValidIndex, currentOptions, currentPendingValueValidIndexOnHover } = this.state;
        let { selectedIndices } = this.state;
        if (this._processingClearPendingInfo) {
            return;
        }
        if (allowFreeform) {
            if (currentPendingValue === null || currentPendingValue === undefined) {
                if (currentPendingValueValidIndexOnHover >= 0) {
                    this._setSelectedIndex(currentPendingValueValidIndexOnHover, submitPendingValueEvent);
                    this._clearPendingInfo();
                }
                return;
            }
            if (this._indexWithinBounds(currentOptions, currentPendingValueValidIndex)) {
                const pendingOptionText = this._getPreviewText(currentOptions[currentPendingValueValidIndex]).toLocaleLowerCase();
                if (currentPendingValue.toLocaleLowerCase() === pendingOptionText ||
                    ((autoComplete &&
                        pendingOptionText.indexOf(currentPendingValue.toLocaleLowerCase()) === 0 &&
                        (this._autofill.current &&
                            this._autofill.current.isValueSelected &&
                            currentPendingValue.length + (this._autofill.current.selectionEnd - this._autofill.current.selectionStart) ===
                                pendingOptionText.length)) ||
                        (this._autofill.current &&
                            this._autofill.current.inputElement &&
                            this._autofill.current.inputElement.value.toLocaleLowerCase() === pendingOptionText))) {
                    this._setSelectedIndex(currentPendingValueValidIndex, submitPendingValueEvent);
                    this._clearPendingInfo();
                    return;
                }
            }
            if (onChange || onChanged) {
                if (onChange) {
                    onChange(submitPendingValueEvent, undefined, undefined, currentPendingValue);
                }
                if (onChanged) {
                    onChanged(undefined, undefined, currentPendingValue, submitPendingValueEvent);
                }
            }
            else {
                const newOption = {
                    key: currentPendingValue || getId(),
                    text: this._normalizeToString(currentPendingValue)
                };
                const newOptions = [...currentOptions, newOption];
                if (selectedIndices) {
                    if (!this.props.multiSelect) {
                        selectedIndices = [];
                    }
                    selectedIndices.push(newOptions.length - 1);
                }
                this.setState({
                    currentOptions: newOptions,
                    selectedIndices: selectedIndices
                });
            }
        }
        else if (currentPendingValueValidIndex >= 0) {
            this._setSelectedIndex(currentPendingValueValidIndex, submitPendingValueEvent);
        }
        else if (currentPendingValueValidIndexOnHover >= 0) {
            this._setSelectedIndex(currentPendingValueValidIndexOnHover, submitPendingValueEvent);
        }
        this._clearPendingInfo();
    }
    _renderSeparator(item) {
        const { index, key } = item;
        if (index && index > 0) {
            return React.createElement("div", { role: "separator", key: key, className: this._classNames.divider });
        }
        return null;
    }
    _renderHeader(item) {
        const { onRenderOption = this._onRenderOptionContent } = this.props;
        return (React.createElement("div", { key: item.key, className: this._classNames.header }, onRenderOption(item, this._onRenderOptionContent)));
    }
    _isOptionSelected(index) {
        const { currentPendingValueValidIndexOnHover } = this.state;
        if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
            return false;
        }
        if (!this.props.multiSelect && this._getPendingSelectedIndex(true) === index) {
            return true;
        }
        let idxOfSelectedIndex = -1;
        if (this.props.multiSelect && index !== undefined && this.state.selectedIndices) {
            idxOfSelectedIndex = this.state.selectedIndices.indexOf(index);
        }
        return idxOfSelectedIndex >= 0;
    }
    _getPendingSelectedIndex(includeCurrentPendingValue) {
        const { currentPendingValueValidIndexOnHover, currentPendingValueValidIndex, currentPendingValue } = this.state;
        return currentPendingValueValidIndexOnHover >= 0
            ? currentPendingValueValidIndexOnHover
            : currentPendingValueValidIndex >= 0 ||
                (includeCurrentPendingValue && (currentPendingValue !== null && currentPendingValue !== undefined))
                ? currentPendingValueValidIndex
                : this.props.multiSelect
                    ? 0
                    : this._getFirstSelectedIndex();
    }
    _scrollIntoView() {
        const { onScrollToItem, scrollSelectedToTop } = this.props;
        const { currentPendingValueValidIndex, currentPendingValue } = this.state;
        if (onScrollToItem) {
            onScrollToItem(currentPendingValueValidIndex >= 0 || currentPendingValue !== '' ? currentPendingValueValidIndex : this._getFirstSelectedIndex());
        }
        else if (this._selectedElement.current && this._selectedElement.current.offsetParent) {
            if (scrollSelectedToTop) {
                this._selectedElement.current.offsetParent.scrollIntoView(true);
            }
            else {
                let alignToTop = true;
                if (this._comboBoxMenu.current && this._comboBoxMenu.current.offsetParent) {
                    const scrollableParentRect = this._comboBoxMenu.current.offsetParent.getBoundingClientRect();
                    const selectedElementRect = this._selectedElement.current.offsetParent.getBoundingClientRect();
                    if (scrollableParentRect.top <= selectedElementRect.top &&
                        scrollableParentRect.top + scrollableParentRect.height >= selectedElementRect.top + selectedElementRect.height) {
                        return;
                    }
                    if (scrollableParentRect.top + scrollableParentRect.height <= selectedElementRect.top + selectedElementRect.height) {
                        alignToTop = false;
                    }
                }
                this._selectedElement.current.offsetParent.scrollIntoView(alignToTop);
            }
        }
    }
    _onItemClick(item) {
        const { onItemClick } = this.props;
        const { index } = item;
        return (ev) => {
            onItemClick && onItemClick(ev, item, index);
            this._setSelectedIndex(index, ev);
            if (!this.props.multiSelect) {
                this.setState({
                    isOpen: false
                });
            }
        };
    }
    _getSelectedIndices(options, selectedKeys) {
        const selectedIndices = [];
        if (options === undefined || selectedKeys === undefined) {
            return selectedIndices;
        }
        for (const selectedKey of selectedKeys) {
            const index = findIndex(options, option => option.selected || option.key === selectedKey);
            if (index > -1) {
                selectedIndices.push(index);
            }
        }
        return selectedIndices;
    }
    _resetSelectedIndex() {
        const { currentOptions } = this.state;
        this._clearPendingInfo();
        const selectedIndex = this._getFirstSelectedIndex();
        if (selectedIndex > 0 && selectedIndex < currentOptions.length) {
            this.setState({
                suggestedDisplayValue: currentOptions[selectedIndex].text
            });
        }
        else if (this.props.text || this.props.value) {
            this.setState({
                suggestedDisplayValue: this.props.text || this.props.value
            });
        }
    }
    _clearPendingInfo() {
        this._processingClearPendingInfo = true;
        this.setState({
            currentPendingValue: undefined,
            currentPendingValueValidIndex: -1,
            suggestedDisplayValue: undefined,
            currentPendingValueValidIndexOnHover: HoverStatus.default
        }, this._onAfterClearPendingInfo);
    }
    _setPendingInfo(currentPendingValue, currentPendingValueValidIndex = -1, suggestedDisplayValue) {
        if (this._processingClearPendingInfo) {
            return;
        }
        this.setState({
            currentPendingValue: currentPendingValue && this._removeZeroWidthSpaces(currentPendingValue),
            currentPendingValueValidIndex: currentPendingValueValidIndex,
            suggestedDisplayValue: suggestedDisplayValue,
            currentPendingValueValidIndexOnHover: HoverStatus.default
        });
    }
    _setPendingInfoFromIndex(index) {
        const { currentOptions } = this.state;
        if (index >= 0 && index < currentOptions.length) {
            const option = currentOptions[index];
            this._setPendingInfo(this._getPreviewText(option), index, this._getPreviewText(option));
        }
        else {
            this._clearPendingInfo();
        }
    }
    _setPendingInfoFromIndexAndDirection(index, searchDirection) {
        const { currentOptions } = this.state;
        if (searchDirection === SearchDirection.forward && index >= currentOptions.length - 1) {
            index = -1;
        }
        else if (searchDirection === SearchDirection.backward && index <= 0) {
            index = currentOptions.length;
        }
        const indexUpdate = this._getNextSelectableIndex(index, searchDirection);
        if (index === indexUpdate) {
            if (searchDirection === SearchDirection.forward) {
                index = this._getNextSelectableIndex(-1, searchDirection);
            }
            else if (searchDirection === SearchDirection.backward) {
                index = this._getNextSelectableIndex(currentOptions.length, searchDirection);
            }
        }
        else {
            index = indexUpdate;
        }
        if (this._indexWithinBounds(currentOptions, index)) {
            this._setPendingInfoFromIndex(index);
        }
    }
    _notifyPendingValueChanged(prevState) {
        const { onPendingValueChanged } = this.props;
        if (!onPendingValueChanged) {
            return;
        }
        const { currentPendingValue, currentOptions, currentPendingValueValidIndex, currentPendingValueValidIndexOnHover } = this.state;
        let newPendingIndex = undefined;
        let newPendingValue = undefined;
        if (currentPendingValueValidIndexOnHover !== prevState.currentPendingValueValidIndexOnHover &&
            this._indexWithinBounds(currentOptions, currentPendingValueValidIndexOnHover)) {
            newPendingIndex = currentPendingValueValidIndexOnHover;
        }
        else if (currentPendingValueValidIndex !== prevState.currentPendingValueValidIndex &&
            this._indexWithinBounds(currentOptions, currentPendingValueValidIndex)) {
            newPendingIndex = currentPendingValueValidIndex;
        }
        else if (currentPendingValue !== prevState.currentPendingValue && currentPendingValue !== '') {
            newPendingValue = currentPendingValue;
        }
        if (newPendingIndex !== undefined || newPendingValue !== undefined || this._hasPendingValue) {
            onPendingValueChanged(newPendingIndex !== undefined ? currentOptions[newPendingIndex] : undefined, newPendingIndex, newPendingValue);
            this._hasPendingValue = newPendingIndex !== undefined || newPendingValue !== undefined;
        }
    }
    _setOpenStateAndFocusOnClose(isOpen, focusInputAfterClose) {
        this._focusInputAfterClose = focusInputAfterClose;
        this.setState({
            isOpen: isOpen
        });
    }
    _isAltOrMeta(ev) {
        return ev.which === KeyCodes.alt || ev.key === 'Meta';
    }
    _onOptionMouseEnter(index) {
        if (this._shouldIgnoreMouseEvent()) {
            return;
        }
        this.setState({
            currentPendingValueValidIndexOnHover: index
        });
    }
    _onOptionMouseMove(index) {
        this._gotMouseMove = true;
        if (!this._isScrollIdle || this.state.currentPendingValueValidIndexOnHover === index) {
            return;
        }
        this.setState({
            currentPendingValueValidIndexOnHover: index
        });
    }
    _shouldIgnoreMouseEvent() {
        return !this._isScrollIdle || !this._gotMouseMove;
    }
    _handleInputWhenDisabled(ev) {
        if (this.props.disabled) {
            if (this.state.isOpen) {
                this.setState({ isOpen: false });
            }
            if (ev !== null &&
                ev.which !== KeyCodes.tab &&
                ev.which !== KeyCodes.escape &&
                (ev.which < 112 || ev.which > 123)) {
                ev.stopPropagation();
                ev.preventDefault();
            }
        }
    }
    _handleTouchAndPointerEvent() {
        if (this._lastTouchTimeoutId !== undefined) {
            this._async.clearTimeout(this._lastTouchTimeoutId);
            this._lastTouchTimeoutId = undefined;
        }
        this._processingTouch = true;
        this._lastTouchTimeoutId = this._async.setTimeout(() => {
            this._processingTouch = false;
            this._lastTouchTimeoutId = undefined;
        }, TouchIdleDelay);
    }
    _getCaretButtonStyles() {
        const { caretDownButtonStyles: customCaretDownButtonStyles } = this.props;
        return getCaretDownButtonStyles(this.props.theme, customCaretDownButtonStyles);
    }
    _getCurrentOptionStyles(item) {
        const { comboBoxOptionStyles: customStylesForAllOptions } = this.props;
        const { styles: customStylesForCurrentOption } = item;
        return getOptionStyles(this.props.theme, customStylesForAllOptions, customStylesForCurrentOption, this._isPendingOption(item));
    }
    _getAriaActiveDescentValue() {
        let descendantText = this.state.isOpen && this.state.selectedIndices && this.state.selectedIndices.length >= 0
            ? this._id + '-list' + this.state.selectedIndices[0]
            : undefined;
        if (this.state.isOpen && this.state.focused && this.state.currentPendingValueValidIndex !== -1) {
            descendantText = this._id + '-list' + this.state.currentPendingValueValidIndex;
        }
        return descendantText;
    }
    _getAriaAutoCompleteValue() {
        const autoComplete = !this.props.disabled && this.props.autoComplete === 'on';
        return autoComplete ? (this.props.allowFreeform ? 'inline' : 'both') : 'none';
    }
    _isPendingOption(item) {
        return item && item.index === this.state.currentPendingValueValidIndex;
    }
    _buildDefaultSelectedKeys(defaultSelectedKey, selectedKey) {
        const selectedKeys = this._buildSelectedKeys(defaultSelectedKey);
        if (selectedKeys.length) {
            return selectedKeys;
        }
        return this._buildSelectedKeys(selectedKey);
    }
    _buildSelectedKeys(selectedKey) {
        if (selectedKey === undefined) {
            return [];
        }
        return (selectedKey instanceof Array ? selectedKey : [selectedKey]);
    }
    _getPreviewText(item) {
        return item.useAriaLabelAsText && item.ariaLabel ? item.ariaLabel : item.text;
    }
    _normalizeToString(value) {
        return value || '';
    }
    _removeZeroWidthSpaces(value) {
        return value.replace(RegExp('​', 'g'), '');
    }
};
ComboBox.defaultProps = {
    options: [],
    allowFreeform: false,
    autoComplete: 'on',
    buttonIconProps: { iconName: 'ChevronDown' }
};
ComboBox = tslib_1.__decorate([
    customizable('ComboBox', ['theme', 'styles'], true)
], ComboBox);
export { ComboBox };
