export function buildKeytipConfigMap(config) {
    const configMap = {};
    for (const keytip of config.keytips) {
        constructKeytip(configMap, [], keytip);
    }
    return configMap;
}
export function constructKeytip(configMap, parentSequence, keytip) {
    const sequence = keytip.sequence ? keytip.sequence : keytip.content.toLocaleLowerCase();
    const keytipSequence = parentSequence.concat(sequence);
    const keytipProps = { ...keytip.optionalProps, keySequences: keytipSequence, content: keytip.content };
    configMap[keytip.id] = keytipProps;
    if (keytip.children) {
        for (const child of keytip.children) {
            constructKeytip(configMap, keytipSequence, child);
        }
    }
}
