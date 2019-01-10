// Regex that finds { and } so they can be removed on a lookup for string format
const FORMAT_ARGS_REGEX = /[\{\}]/g;

// Regex that finds {#} so it can be replaced by the arguments in string format
const FORMAT_REGEX = /\{\d+\}/g;

export function format(s: string, ...values: any[]): string {
  //'use strict';

  let args = values;
  // Callback match function
  function replace_func(match: string): string {
    // looks up in the args
    // tslint:disable-next-line:no-any
    let replacement = args[match.replace(FORMAT_ARGS_REGEX, '') as any];

    // catches undefined in nondebug and null in debug and nondebug
    if (replacement === null || replacement === undefined) {
      replacement = '';
    }

    return replacement;
  }
  return s.replace(FORMAT_REGEX, replace_func);
}