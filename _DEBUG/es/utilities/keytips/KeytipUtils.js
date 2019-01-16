import { KTP_SEPARATOR, KTP_PREFIX, DATAKTP_TARGET, DATAKTP_EXECUTE_TARGET, KTP_LAYER_ID } from './KeytipConstants';
import { addElementAtIndex } from '../../Utilities';
export function sequencesToID(keySequences) {
    return keySequences.reduce((prevValue, keySequence) => {
        return prevValue + KTP_SEPARATOR + keySequence.split('').join(KTP_SEPARATOR);
    }, KTP_PREFIX);
}
export function mergeOverflows(keySequences, overflowKeySequences) {
    const overflowSequenceLen = overflowKeySequences.length;
    const overflowSequence = [...overflowKeySequences].pop();
    const newKeySequences = [...keySequences];
    return addElementAtIndex(newKeySequences, overflowSequenceLen - 1, overflowSequence);
}
export function ktpTargetFromSequences(keySequences) {
    return '[' + DATAKTP_TARGET + '="' + sequencesToID(keySequences) + '"]';
}
export function ktpTargetFromId(keytipId) {
    return '[' + DATAKTP_EXECUTE_TARGET + '="' + keytipId + '"]';
}
export function getAriaDescribedBy(keySequences) {
    const describedby = ' ' + KTP_LAYER_ID;
    if (!keySequences.length) {
        return describedby;
    }
    return describedby + ' ' + sequencesToID(keySequences);
}
