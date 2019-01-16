import * as React from 'react';
import { SpinnerType, SpinnerSize } from './Spinner.types';
import { BaseComponent, classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';
const getClassNames = classNamesFunction();
export class SpinnerBase extends BaseComponent {
    render() {
        const { type, size, ariaLabel, ariaLive, styles, label, theme, className, labelPosition } = this.props;
        const statusMessage = ariaLabel || label;
        const nativeProps = getNativeProps(this.props, divProperties, ['size']);
        let styleSize = size;
        if (styleSize === undefined && type !== undefined) {
            styleSize = type === SpinnerType.large ? SpinnerSize.large : SpinnerSize.medium;
        }
        const classNames = getClassNames(styles, {
            theme: theme,
            size: styleSize,
            className,
            labelPosition
        });
        return (React.createElement("div", Object.assign({}, nativeProps, { className: classNames.root }),
            React.createElement("div", { className: classNames.circle }),
            label && React.createElement("div", { className: classNames.label }, label),
            statusMessage && (React.createElement("div", { role: "status", "aria-live": ariaLive },
                React.createElement(DelayedRender, null,
                    React.createElement("div", { className: classNames.screenReaderText }, statusMessage))))));
    }
}
SpinnerBase.defaultProps = {
    size: SpinnerSize.medium,
    ariaLive: 'polite',
    labelPosition: 'bottom'
};
