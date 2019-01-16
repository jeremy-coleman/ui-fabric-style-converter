import { BaseComponent } from '../../../Utilities';
export class ContextualMenuItemWrapper extends BaseComponent {
    constructor() {
        super(...arguments);
        this._onItemMouseEnter = (ev) => {
            const { item, onItemMouseEnter } = this.props;
            if (onItemMouseEnter) {
                onItemMouseEnter(item, ev, ev.currentTarget);
            }
        };
        this._onItemClick = (ev) => {
            const { item, onItemClickBase } = this.props;
            if (onItemClickBase) {
                onItemClickBase(item, ev, ev.currentTarget);
            }
        };
        this._onItemMouseLeave = (ev) => {
            const { item, onItemMouseLeave } = this.props;
            if (onItemMouseLeave) {
                onItemMouseLeave(item, ev);
            }
        };
        this._onItemKeyDown = (ev) => {
            const { item, onItemKeyDown } = this.props;
            if (onItemKeyDown) {
                onItemKeyDown(item, ev);
            }
        };
        this._onItemMouseMove = (ev) => {
            const { item, onItemMouseMove } = this.props;
            if (onItemMouseMove) {
                onItemMouseMove(item, ev, ev.currentTarget);
            }
        };
        this._getSubMenuId = (item) => {
            const { getSubMenuId } = this.props;
            if (getSubMenuId) {
                return getSubMenuId(item);
            }
        };
        this._getSubmenuTarget = () => {
            return undefined;
        };
    }
}
