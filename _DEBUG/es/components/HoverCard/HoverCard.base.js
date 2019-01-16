import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps, getId, KeyCodes, getDocument, createRef, classNamesFunction } from '../../Utilities';
import { OpenCardMode, HoverCardType } from './HoverCard.types';
import { ExpandingCard } from './ExpandingCard';
import { ExpandingCardMode } from './ExpandingCard.types';
import { PlainCard } from './PlainCard/PlainCard';
const getClassNames = classNamesFunction();
export class HoverCardBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._hoverCard = createRef();
        this._cardOpen = (ev) => {
            if (this._shouldBlockHoverCard() || (ev.type === 'keydown' && !(ev.which === this.props.openHotKey))) {
                return;
            }
            this._async.clearTimeout(this._dismissTimerId);
            if (ev.type === 'mouseenter') {
                this._currentMouseTarget = ev.currentTarget;
            }
            this._executeCardOpen(ev);
        };
        this._executeCardOpen = (ev) => {
            this._async.clearTimeout(this._openTimerId);
            this._openTimerId = this._async.setTimeout(() => {
                this.setState((prevState) => {
                    if (!prevState.isHoverCardVisible) {
                        return {
                            isHoverCardVisible: true,
                            mode: ExpandingCardMode.compact,
                            openMode: ev.type === 'keydown' ? OpenCardMode.hotKey : OpenCardMode.hover
                        };
                    }
                    return prevState;
                });
            }, this.props.cardOpenDelay);
        };
        this._cardDismiss = (ev) => {
            if (ev.type === 'keydown' && ev.which !== KeyCodes.escape) {
                return;
            }
            if (!this.props.sticky && (this._currentMouseTarget === ev.currentTarget || ev.which === KeyCodes.escape)) {
                this._executeCardDismiss();
            }
        };
        this._executeCardDismiss = () => {
            this._async.clearTimeout(this._openTimerId);
            this._async.clearTimeout(this._dismissTimerId);
            this._dismissTimerId = this._async.setTimeout(() => {
                this.setState({
                    isHoverCardVisible: false,
                    mode: ExpandingCardMode.compact,
                    openMode: OpenCardMode.hover
                });
            }, this.props.cardDismissDelay);
        };
        this._instantOpenAsExpanded = (ev) => {
            this._async.clearTimeout(this._dismissTimerId);
            this.setState((prevState) => {
                if (!prevState.isHoverCardVisible) {
                    return {
                        isHoverCardVisible: true,
                        mode: ExpandingCardMode.expanded
                    };
                }
                return prevState;
            });
        };
        this.state = {
            isHoverCardVisible: false,
            mode: ExpandingCardMode.compact,
            openMode: OpenCardMode.hover
        };
    }
    componentDidMount() {
        const target = this._getTargetElement();
        this._events.on(target, 'mouseenter', this._cardOpen);
        this._events.on(target, 'mouseleave', this._cardDismiss);
        if (this.props.trapFocus) {
            this._events.on(target, 'keydown', this._cardOpen);
        }
        else {
            this._events.on(target, 'focus', this._cardOpen);
            this._events.on(target, 'blur', this._cardDismiss);
        }
        if (this.props.instantOpenOnClick) {
            this._events.on(target, 'click', this._instantOpenAsExpanded);
        }
        else {
            this._events.on(target, 'mousedown', this._cardDismiss);
            this._events.on(target, 'keydown', this._cardDismiss);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isHoverCardVisible !== this.state.isHoverCardVisible) {
            if (this.state.isHoverCardVisible) {
                this._async.setTimeout(() => {
                    this.setState({
                        mode: ExpandingCardMode.expanded
                    }, () => {
                        this.props.onCardExpand && this.props.onCardExpand();
                    });
                }, this.props.expandedCardOpenDelay);
                this.props.onCardVisible && this.props.onCardVisible();
            }
            else {
                this.setState({
                    mode: ExpandingCardMode.compact
                });
                this.props.onCardHide && this.props.onCardHide();
            }
        }
    }
    render() {
        const { expandingCardProps, children, id, setAriaDescribedBy = true, styles: customStyles, theme, className, type, plainCardProps, trapFocus, setInitialFocus } = this.props;
        const { isHoverCardVisible, mode, openMode } = this.state;
        const hoverCardId = id || getId('hoverCard');
        this._classNames = getClassNames(customStyles, {
            theme: theme,
            className
        });
        const commonCardProps = {
            ...getNativeProps(this.props, divProperties),
            id: hoverCardId,
            trapFocus: !!trapFocus,
            firstFocus: setInitialFocus || openMode === OpenCardMode.hotKey,
            targetElement: this._getTargetElement(),
            onEnter: this._cardOpen,
            onLeave: this._executeCardDismiss
        };
        const finalExpandedCardProps = { ...expandingCardProps, ...commonCardProps, mode };
        const finalPlainCardProps = { ...plainCardProps, ...commonCardProps };
        return (React.createElement("div", { className: this._classNames.host, ref: this._hoverCard, "aria-describedby": setAriaDescribedBy && isHoverCardVisible ? hoverCardId : undefined, "data-is-focusable": !Boolean(this.props.target) },
            children,
            isHoverCardVisible &&
                (type === HoverCardType.expanding ? React.createElement(ExpandingCard, Object.assign({}, finalExpandedCardProps)) : React.createElement(PlainCard, Object.assign({}, finalPlainCardProps)))));
    }
    _getTargetElement() {
        const { target } = this.props;
        switch (typeof target) {
            case 'string':
                return getDocument().querySelector(target);
            case 'object':
                return target;
            default:
                return this._hoverCard.current || undefined;
        }
    }
    _shouldBlockHoverCard() {
        return !!(this.props.shouldBlockHoverCard && this.props.shouldBlockHoverCard());
    }
}
HoverCardBase.defaultProps = {
    cardOpenDelay: 500,
    cardDismissDelay: 100,
    expandedCardOpenDelay: 1500,
    instantOpenOnClick: false,
    setInitialFocus: false,
    openHotKey: KeyCodes.c,
    type: HoverCardType.expanding
};
