import { getWindow } from './dom';
export function initializeDir(window) {
    const win = (window || getWindow());
    if (win && !win.__hasInitializedDir__) {
        win.__hasInitializedDir__ = true;
        const { documentElement } = win.document;
        if (!documentElement.hasAttribute('dir')) {
            documentElement.setAttribute('dir', 'ltr');
        }
    }
}
