import * as tslib_1 from "tslib";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Fabric } from '../../Fabric';
import { BaseComponent, classNamesFunction, customizable, getDocument, createRef, setPortalAttribute, setVirtualParent } from '../../Utilities';
import { registerLayer, getDefaultTarget, unregisterLayer } from './Layer.notification';
const getClassNames = classNamesFunction();
let LayerBase = class LayerBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._rootElement = createRef();
        this._handleRootElementRef = (ref) => {
            this._rootElement(ref);
            if (ref) {
                this._setVirtualParent();
            }
        };
        this._filterEvent = (ev) => {
            if (ev.eventPhase === Event.BUBBLING_PHASE && ev.type !== 'mouseenter' && ev.type !== 'mouseleave') {
                ev.stopPropagation();
            }
        };
        this.state = {
            hasMounted: false
        };
        this._warnDeprecations({
            onLayerMounted: 'onLayerDidMount'
        });
        if (this.props.hostId) {
            registerLayer(this.props.hostId, this);
        }
    }
    componentWillMount() {
        this._layerElement = this._getLayerElement();
    }
    componentWillUpdate() {
        if (!this._layerElement) {
            this._layerElement = this._getLayerElement();
        }
    }
    componentDidMount() {
        this.setState({ hasMounted: true });
        this._setVirtualParent();
        const { onLayerDidMount, onLayerMounted } = this.props;
        if (onLayerMounted) {
            onLayerMounted();
        }
        if (onLayerDidMount) {
            onLayerDidMount();
        }
    }
    componentWillUnmount() {
        this._removeLayerElement();
        const { onLayerWillUnmount, hostId } = this.props;
        if (onLayerWillUnmount) {
            onLayerWillUnmount();
        }
        if (hostId) {
            unregisterLayer(hostId, this);
        }
    }
    componentDidUpdate() {
        this._setVirtualParent();
    }
    render() {
        const classNames = this._getClassNames();
        const { eventBubblingEnabled } = this.props;
        const { hasMounted } = this.state;
        return (React.createElement("span", { className: "ms-layer", ref: this._handleRootElementRef }, this._layerElement &&
            hasMounted &&
            ReactDOM.createPortal(eventBubblingEnabled ? (React.createElement(Fabric, { className: classNames.content }, this.props.children)) : (React.createElement(Fabric, { className: classNames.content, onClick: this._filterEvent, onContextMenu: this._filterEvent, onDoubleClick: this._filterEvent, onDrag: this._filterEvent, onDragEnd: this._filterEvent, onDragEnter: this._filterEvent, onDragExit: this._filterEvent, onDragLeave: this._filterEvent, onDragOver: this._filterEvent, onDragStart: this._filterEvent, onDrop: this._filterEvent, onMouseDown: this._filterEvent, onMouseEnter: this._filterEvent, onMouseLeave: this._filterEvent, onMouseMove: this._filterEvent, onMouseOver: this._filterEvent, onMouseOut: this._filterEvent, onMouseUp: this._filterEvent, onKeyDown: this._filterEvent, onKeyPress: this._filterEvent, onKeyUp: this._filterEvent, onFocus: this._filterEvent, onBlur: this._filterEvent, onChange: this._filterEvent, onInput: this._filterEvent, onInvalid: this._filterEvent, onSubmit: this._filterEvent }, this.props.children)), this._layerElement)));
    }
    _getClassNames() {
        const { className, styles, theme } = this.props;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            isNotHost: !this.props.hostId
        });
        return classNames;
    }
    _setVirtualParent() {
        if (this._rootElement && this._rootElement.current && this._layerElement) {
            setVirtualParent(this._layerElement, this._rootElement.current);
        }
    }
    _getLayerElement() {
        const host = this._getHost();
        const classNames = this._getClassNames();
        if (host !== this._host) {
            this._removeLayerElement();
        }
        if (host) {
            this._host = host;
            if (!this._layerElement) {
                const doc = getDocument();
                if (!doc) {
                    return;
                }
                this._layerElement = doc.createElement('div');
                this._layerElement.className = classNames.root;
                setPortalAttribute(this._layerElement);
                host.appendChild(this._layerElement);
            }
        }
        return this._layerElement;
    }
    _removeLayerElement() {
        if (this._layerElement) {
            this.props.onLayerWillUnmount();
            const parentNode = this._layerElement.parentNode;
            if (parentNode) {
                parentNode.removeChild(this._layerElement);
            }
            this._layerElement = undefined;
        }
    }
    _getHost() {
        const { hostId } = this.props;
        const doc = getDocument();
        if (!doc) {
            return undefined;
        }
        if (hostId) {
            return doc.getElementById(hostId);
        }
        else {
            const defaultHostSelector = getDefaultTarget();
            return defaultHostSelector ? doc.querySelector(defaultHostSelector) : doc.body;
        }
    }
};
LayerBase.defaultProps = {
    onLayerDidMount: () => undefined,
    onLayerWillUnmount: () => undefined
};
LayerBase = tslib_1.__decorate([
    customizable('Layer', ['theme', 'hostId'])
], LayerBase);
export { LayerBase };
