import * as React from 'react';
import { classNamesFunction, BaseComponent, KeyCodes } from '../../Utilities';
import { ExpandingCardMode } from './ExpandingCard.types';
import { CardCallout } from './CardCallout/CardCallout';
const getClassNames = classNamesFunction();
export class ExpandingCardBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._expandedElem = React.createRef();
        this._onKeyDown = (ev) => {
            if (ev.which === KeyCodes.escape) {
                this.props.onLeave && this.props.onLeave(ev);
            }
        };
        this._onRenderCompactCard = () => {
            return React.createElement("div", { className: this._classNames.compactCard }, this.props.onRenderCompactCard(this.props.renderData));
        };
        this._onRenderExpandedCard = () => {
            !this.state.firstFrameRendered &&
                this._async.requestAnimationFrame(() => {
                    this.setState({
                        firstFrameRendered: true
                    });
                });
            return (React.createElement("div", { className: this._classNames.expandedCard, ref: this._expandedElem },
                React.createElement("div", { className: this._classNames.expandedCardScroll }, this.props.onRenderExpandedCard && this.props.onRenderExpandedCard(this.props.renderData))));
        };
        this._checkNeedsScroll = () => {
            const { expandedCardHeight } = this.props;
            this._async.requestAnimationFrame(() => {
                if (this._expandedElem.current && this._expandedElem.current.scrollHeight >= expandedCardHeight) {
                    this.setState({
                        needsScroll: true
                    });
                }
            });
        };
        this.state = {
            firstFrameRendered: false,
            needsScroll: false
        };
    }
    componentDidMount() {
        this._checkNeedsScroll();
    }
    componentWillUnmount() {
        this._async.dispose();
    }
    render() {
        const { styles, compactCardHeight, expandedCardHeight, theme, mode, className } = this.props;
        const { needsScroll, firstFrameRendered } = this.state;
        const finalHeight = compactCardHeight + expandedCardHeight;
        this._classNames = getClassNames(styles, {
            theme: theme,
            compactCardHeight,
            className,
            expandedCardHeight,
            needsScroll: needsScroll,
            expandedCardFirstFrameRendered: mode === ExpandingCardMode.expanded && firstFrameRendered
        });
        const content = (React.createElement("div", { onMouseEnter: this.props.onEnter, onMouseLeave: this.props.onLeave, onKeyDown: this._onKeyDown },
            this._onRenderCompactCard(),
            this._onRenderExpandedCard()));
        return React.createElement(CardCallout, Object.assign({}, this.props, { content: content, finalHeight: finalHeight, className: this._classNames.root }));
    }
}
ExpandingCardBase.defaultProps = {
    compactCardHeight: 156,
    expandedCardHeight: 384,
    directionalHintFixed: true
};
