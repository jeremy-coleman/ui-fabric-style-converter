import * as React from 'react';
import { BaseComponent, classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';
const TRANSITION_ANIMATION_INTERVAL = 200;
const getClassNames = classNamesFunction();
export class ShimmerBase extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            contentLoaded: props.isDataLoaded
        };
    }
    componentWillReceiveProps(nextProps) {
        const { isDataLoaded } = nextProps;
        if (this._lastTimeoutId !== undefined) {
            this._async.clearTimeout(this._lastTimeoutId);
            this._lastTimeoutId = undefined;
        }
        if (isDataLoaded) {
            this._lastTimeoutId = this._async.setTimeout(() => {
                this.setState({
                    contentLoaded: isDataLoaded
                });
                this._lastTimeoutId = undefined;
            }, TRANSITION_ANIMATION_INTERVAL);
        }
        else {
            this.setState({
                contentLoaded: isDataLoaded
            });
        }
    }
    render() {
        const { styles, shimmerElements, children, isDataLoaded, width, className, customElementsGroup, theme, ariaLabel } = this.props;
        const { contentLoaded } = this.state;
        this._classNames = getClassNames(styles, {
            theme: theme,
            isDataLoaded,
            className,
            transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL
        });
        const divProps = getNativeProps(this.props, divProperties);
        return (React.createElement("div", Object.assign({}, divProps, { className: this._classNames.root }),
            !contentLoaded && (React.createElement("div", { style: { width: width ? width : '100%' }, className: this._classNames.shimmerWrapper }, customElementsGroup ? customElementsGroup : React.createElement(ShimmerElementsGroup, { shimmerElements: shimmerElements }))),
            children && React.createElement("div", { className: this._classNames.dataWrapper }, children),
            ariaLabel && !isDataLoaded && (React.createElement("div", { role: "status", "aria-live": "polite" },
                React.createElement(DelayedRender, null,
                    React.createElement("div", { className: this._classNames.screenReaderText }, ariaLabel))))));
    }
}
ShimmerBase.defaultProps = {
    isDataLoaded: false
};
