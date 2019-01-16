import { InjectionMode, Stylesheet } from './Stylesheet';
export function renderStatic(onRender, namespace) {
    const stylesheet = Stylesheet.getInstance();
    stylesheet.setConfig({
        injectionMode: InjectionMode.none,
        namespace
    });
    stylesheet.reset();
    return {
        html: onRender(),
        css: stylesheet.getRules(true)
    };
}
