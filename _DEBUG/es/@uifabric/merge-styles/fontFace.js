import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';
export function fontFace(font) {
    Stylesheet.getInstance().insertRule(`@font-face{${serializeRuleEntries(font)}}`, true);
}
