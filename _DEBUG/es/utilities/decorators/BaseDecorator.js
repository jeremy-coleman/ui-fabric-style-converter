import { BaseComponent, hoistMethods, unhoistMethods } from '../../Utilities';
export class BaseDecorator extends BaseComponent {
    constructor(props) {
        super(props);
        this._skipComponentRefResolution = true;
        this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
    }
    _updateComposedComponentRef(composedComponentInstance) {
        this._composedComponentInstance = composedComponentInstance;
        if (composedComponentInstance) {
            this._hoisted = hoistMethods(this, composedComponentInstance);
        }
        else if (this._hoisted) {
            unhoistMethods(this, this._hoisted);
        }
    }
}
