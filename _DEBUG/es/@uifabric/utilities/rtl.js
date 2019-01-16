import { KeyCodes } from './KeyCodes';
import { getDocument } from './dom';
import { getItem, setItem } from './sessionStorage';
import { _msSetRTL as mergeStylesSetRTL } from '@uifabric/merge-styles';
const RTL_LOCAL_STORAGE_KEY = 'isRTL';
let _isRTL;
export function getRTL() {
    if (_isRTL === undefined) {
        let savedRTL = getItem(RTL_LOCAL_STORAGE_KEY);
        if (savedRTL !== null) {
            _isRTL = savedRTL === '1';
            setRTL(_isRTL);
        }
        let doc = getDocument();
        if (_isRTL === undefined && doc) {
            _isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
            mergeStylesSetRTL(_isRTL);
        }
    }
    return !!_isRTL;
}
export function setRTL(isRTL, persistSetting = false) {
    let doc = getDocument();
    if (doc) {
        doc.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    }
    if (persistSetting) {
        setItem(RTL_LOCAL_STORAGE_KEY, isRTL ? '1' : '0');
    }
    _isRTL = isRTL;
    mergeStylesSetRTL(_isRTL);
}
export function getRTLSafeKeyCode(key) {
    if (getRTL()) {
        if (key === KeyCodes.left) {
            key = KeyCodes.right;
        }
        else if (key === KeyCodes.right) {
            key = KeyCodes.left;
        }
    }
    return key;
}
