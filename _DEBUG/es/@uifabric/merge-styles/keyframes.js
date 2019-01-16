import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';
export function keyframes(timeline) {
    const stylesheet = Stylesheet.getInstance();
    const name = stylesheet.getClassName();
    const rulesArray = [];
    for (const prop in timeline) {
        if (timeline.hasOwnProperty(prop)) {
            rulesArray.push(prop, '{', serializeRuleEntries(timeline[prop]), '}');
        }
    }
    const rules = rulesArray.join('');
    stylesheet.insertRule(`@keyframes ${name}{${rules}}`, true);
    stylesheet.cacheClassName(name, rules, [], ['keyframes', rules]);
    return name;
}
