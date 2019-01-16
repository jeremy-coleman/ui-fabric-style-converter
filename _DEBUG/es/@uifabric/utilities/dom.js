export const DATA_PORTAL_ATTRIBUTE = 'data-portal-element';
export function setVirtualParent(child, parent) {
    let virtualChild = child;
    let virtualParent = parent;
    if (!virtualChild._virtual) {
        virtualChild._virtual = {
            children: []
        };
    }
    let oldParent = virtualChild._virtual.parent;
    if (oldParent && oldParent !== parent) {
        let index = oldParent._virtual.children.indexOf(virtualChild);
        if (index > -1) {
            oldParent._virtual.children.splice(index, 1);
        }
    }
    virtualChild._virtual.parent = virtualParent || undefined;
    if (virtualParent) {
        if (!virtualParent._virtual) {
            virtualParent._virtual = {
                children: []
            };
        }
        virtualParent._virtual.children.push(virtualChild);
    }
}
export function getVirtualParent(child) {
    let parent;
    if (child && isVirtualElement(child)) {
        parent = child._virtual.parent;
    }
    return parent;
}
export function getParent(child, allowVirtualParents = true) {
    return child && ((allowVirtualParents && getVirtualParent(child)) || (child.parentNode && child.parentNode));
}
export function getChildren(parent, allowVirtualChildren = true) {
    const children = [];
    if (parent) {
        for (let i = 0; i < parent.children.length; i++) {
            children.push(parent.children.item(i));
        }
        if (allowVirtualChildren && isVirtualElement(parent)) {
            children.push(...parent._virtual.children);
        }
    }
    return children;
}
export function elementContains(parent, child, allowVirtualParents = true) {
    let isContained = false;
    if (parent && child) {
        if (allowVirtualParents) {
            isContained = false;
            while (child) {
                let nextParent = getParent(child);
                if (nextParent === parent) {
                    isContained = true;
                    break;
                }
                child = nextParent;
            }
        }
        else if (parent.contains) {
            isContained = parent.contains(child);
        }
    }
    return isContained;
}
let _isSSR = false;
export function setSSR(isEnabled) {
    _isSSR = isEnabled;
}
export function getWindow(rootElement) {
    if (_isSSR || typeof window === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument && rootElement.ownerDocument.defaultView
            ? rootElement.ownerDocument.defaultView
            : window;
    }
}
export function getDocument(rootElement) {
    if (_isSSR || typeof document === 'undefined') {
        return undefined;
    }
    else {
        return rootElement && rootElement.ownerDocument ? rootElement.ownerDocument : document;
    }
}
export function getRect(element) {
    let rect;
    if (element) {
        if (element === window) {
            rect = {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                right: window.innerWidth,
                bottom: window.innerHeight
            };
        }
        else if (element.getBoundingClientRect) {
            rect = element.getBoundingClientRect();
        }
    }
    return rect;
}
export function setPortalAttribute(element) {
    element.setAttribute(DATA_PORTAL_ATTRIBUTE, 'true');
}
export function portalContainsElement(target, parent) {
    const elementMatch = findElementRecursive(target, (testElement) => parent === testElement || testElement.hasAttribute(DATA_PORTAL_ATTRIBUTE));
    return elementMatch !== null && elementMatch.hasAttribute(DATA_PORTAL_ATTRIBUTE);
}
export function findElementRecursive(element, matchFunction) {
    if (!element || element === document.body) {
        return null;
    }
    return matchFunction(element) ? element : findElementRecursive(getParent(element), matchFunction);
}
export function elementContainsAttribute(element, attribute) {
    let elementMatch = findElementRecursive(element, (testElement) => testElement.hasAttribute(attribute));
    return elementMatch && elementMatch.getAttribute(attribute);
}
function isVirtualElement(element) {
    return element && !!element._virtual;
}
