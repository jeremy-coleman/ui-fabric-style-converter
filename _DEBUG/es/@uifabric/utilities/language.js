import { getDocument } from './dom';
import { getItem, setItem } from './localStorage';
let _language;
export function getLanguage() {
    if (_language === undefined) {
        let doc = getDocument();
        const savedLanguage = getItem('language');
        if (savedLanguage !== null) {
            _language = savedLanguage;
        }
        if (_language === undefined && doc) {
            _language = doc.documentElement.getAttribute('lang');
        }
        if (_language === undefined) {
            _language = 'en';
        }
    }
    return _language;
}
export function setLanguage(language, avoidPersisting = false) {
    let doc = getDocument();
    if (doc) {
        doc.documentElement.setAttribute('lang', language);
    }
    if (!avoidPersisting) {
        setItem('language', language);
    }
    _language = language;
}
