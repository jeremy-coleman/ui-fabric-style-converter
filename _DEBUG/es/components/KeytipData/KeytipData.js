import { BaseComponent, mergeAriaAttributeValues } from '../../Utilities';
import { KeytipManager } from '../../utilities/keytips/KeytipManager';
import { mergeOverflows, sequencesToID, getAriaDescribedBy } from '../../utilities/keytips/KeytipUtils';
export class KeytipData extends BaseComponent {
    constructor() {
        super(...arguments);
        this._keytipManager = KeytipManager.getInstance();
    }
    componentDidMount() {
        if (this.props.keytipProps) {
            this._uniqueId = this._keytipManager.register(this._getKtpProps());
        }
    }
    componentWillUnmount() {
        this.props.keytipProps && this._keytipManager.unregister(this._getKtpProps(), this._uniqueId);
    }
    componentDidUpdate() {
        this.props.keytipProps && this._keytipManager.update(this._getKtpProps(), this._uniqueId);
    }
    render() {
        const { children, keytipProps, ariaDescribedBy } = this.props;
        let nativeKeytipProps = {};
        if (keytipProps) {
            nativeKeytipProps = this._getKtpAttrs(keytipProps, ariaDescribedBy);
        }
        return children(nativeKeytipProps);
    }
    _getKtpProps() {
        return {
            disabled: this.props.disabled,
            ...this.props.keytipProps
        };
    }
    _getKtpAttrs(keytipProps, describedByPrepend) {
        if (keytipProps) {
            const newKeytipProps = this._keytipManager.addParentOverflow(keytipProps);
            const ariaDescribedBy = getAriaDescribedBy(newKeytipProps.keySequences);
            let keySequences = [...newKeytipProps.keySequences];
            if (newKeytipProps.overflowSetSequence) {
                keySequences = mergeOverflows(keySequences, newKeytipProps.overflowSetSequence);
            }
            const ktpId = sequencesToID(keySequences);
            return {
                'aria-describedby': mergeAriaAttributeValues(describedByPrepend, ariaDescribedBy),
                'data-ktp-target': ktpId,
                'data-ktp-execute-target': ktpId
            };
        }
        return undefined;
    }
}
