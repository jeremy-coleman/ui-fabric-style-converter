import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ComboBox } from './ComboBox';
import { List } from '../../List';
export class VirtualizedComboBox extends BaseComponent {
    constructor() {
        super(...arguments);
        this._comboBox = React.createRef();
        this._list = React.createRef();
        this._onRenderList = (props) => {
            const { onRenderItem } = props;
            return (React.createElement(List, { componentRef: this._list, role: "listbox", items: props.options, onRenderCell: onRenderItem ? (item) => onRenderItem(item) : () => null }));
        };
        this._onScrollToItem = (itemIndex) => {
            this._list.current && this._list.current.scrollToIndex(itemIndex);
        };
    }
    dismissMenu() {
        if (this._comboBox.current) {
            return this._comboBox.current.dismissMenu();
        }
    }
    focus() {
        if (this._comboBox.current) {
            this._comboBox.current.focus();
            return true;
        }
        return false;
    }
    render() {
        return (React.createElement(ComboBox, Object.assign({}, this.props, { componentRef: this._comboBox, onRenderList: this._onRenderList, onScrollToItem: this._onScrollToItem })));
    }
}
