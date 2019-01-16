export function hasHorizontalOverflow(element) {
    return element.clientWidth < element.scrollWidth;
}
export function hasVerticalOverflow(element) {
    return element.clientHeight < element.scrollHeight;
}
export function hasOverflow(element) {
    return hasHorizontalOverflow(element) || hasVerticalOverflow(element);
}
