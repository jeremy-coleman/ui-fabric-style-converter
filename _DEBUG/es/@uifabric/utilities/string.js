const FORMAT_ARGS_REGEX = /[\{\}]/g;
const FORMAT_REGEX = /\{\d+\}/g;
export function format(s, ...values) {
    let args = values;
    function replace_func(match) {
        let replacement = args[match.replace(FORMAT_ARGS_REGEX, '')];
        if (replacement === null || replacement === undefined) {
            replacement = '';
        }
        return replacement;
    }
    return s.replace(FORMAT_REGEX, replace_func);
}
