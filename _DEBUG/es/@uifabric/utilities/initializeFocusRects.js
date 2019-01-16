import { getWindow } from './dom';
import { isDirectionalKeyCode } from './keyboard';
export const IsFocusVisibleClassName = 'ms-Fabric--isFocusVisible';
export function initializeFocusRects(window) {
    const win = (window || getWindow());
    if (win && !win.__hasInitializeFocusRects__) {
        win.__hasInitializeFocusRects__ = true;
        win.addEventListener('mousedown', _onMouseDown, true);
        win.addEventListener('keydown', _onKeyDown, true);
    }
}
function _onMouseDown(ev) {
    const win = getWindow(ev.target);
    if (win) {
        const { classList } = win.document.body;
        if (classList.contains(IsFocusVisibleClassName)) {
            classList.remove(IsFocusVisibleClassName);
        }
    }
}
function _onKeyDown(ev) {
    const win = getWindow(ev.target);
    if (win) {
        const { classList } = win.document.body;
        if (isDirectionalKeyCode(ev.which) && !classList.contains(IsFocusVisibleClassName)) {
            classList.add(IsFocusVisibleClassName);
        }
    }
}
