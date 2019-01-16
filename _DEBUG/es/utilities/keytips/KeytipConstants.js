export const KTP_PREFIX = 'ktp';
export const KTP_SEPARATOR = '-';
export const KTP_FULL_PREFIX = KTP_PREFIX + KTP_SEPARATOR;
export const DATAKTP_TARGET = 'data-ktp-target';
export const DATAKTP_EXECUTE_TARGET = 'data-ktp-execute-target';
export const KTP_LAYER_ID = 'ktp-layer-id';
export const KTP_ARIA_SEPARATOR = ', ';
export var KeytipEvents;
(function (KeytipEvents) {
    KeytipEvents.KEYTIP_ADDED = 'keytipAdded';
    KeytipEvents.KEYTIP_REMOVED = 'keytipRemoved';
    KeytipEvents.KEYTIP_UPDATED = 'keytipUpdated';
    KeytipEvents.PERSISTED_KEYTIP_ADDED = 'persistedKeytipAdded';
    KeytipEvents.PERSISTED_KEYTIP_REMOVED = 'persistedKeytipRemoved';
    KeytipEvents.PERSISTED_KEYTIP_EXECUTE = 'persistedKeytipExecute';
    KeytipEvents.ENTER_KEYTIP_MODE = 'enterKeytipMode';
    KeytipEvents.EXIT_KEYTIP_MODE = 'exitKeytipMode';
})(KeytipEvents || (KeytipEvents = {}));
