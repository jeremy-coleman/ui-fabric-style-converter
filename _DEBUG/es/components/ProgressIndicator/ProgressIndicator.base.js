import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
const ZERO_THRESHOLD = 0.01;
export class ProgressIndicatorBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._onRenderProgress = (props) => {
            const { ariaValueText, barHeight, className, styles, theme } = this.props;
            const percentComplete = typeof this.props.percentComplete === 'number' ? Math.min(100, Math.max(0, this.props.percentComplete * 100)) : undefined;
            const classNames = getClassNames(styles, {
                theme: theme,
                className,
                barHeight,
                indeterminate: percentComplete === undefined ? true : false
            });
            const progressBarStyles = {
                width: percentComplete !== undefined ? percentComplete + '%' : undefined,
                transition: percentComplete !== undefined && percentComplete < ZERO_THRESHOLD ? 'none' : undefined
            };
            const ariaValueMin = percentComplete !== undefined ? 0 : undefined;
            const ariaValueMax = percentComplete !== undefined ? 100 : undefined;
            const ariaValueNow = percentComplete !== undefined ? Math.floor(percentComplete) : undefined;
            return (React.createElement("div", { className: classNames.itemProgress },
                React.createElement("div", { className: classNames.progressTrack }),
                React.createElement("div", { className: classNames.progressBar, style: progressBarStyles, role: "progressbar", "aria-valuemin": ariaValueMin, "aria-valuemax": ariaValueMax, "aria-valuenow": ariaValueNow, "aria-valuetext": ariaValueText })));
        };
        this._warnDeprecations({
            title: 'label'
        });
    }
    render() {
        const { barHeight, className, label = this.props.title, description, styles, theme, progressHidden, onRenderProgress = this._onRenderProgress } = this.props;
        const percentComplete = typeof this.props.percentComplete === 'number' ? Math.min(100, Math.max(0, this.props.percentComplete * 100)) : undefined;
        const classNames = getClassNames(styles, {
            theme: theme,
            className,
            barHeight,
            indeterminate: percentComplete === undefined ? true : false
        });
        return (React.createElement("div", { className: classNames.root },
            label ? React.createElement("div", { className: classNames.itemName }, label) : null,
            !progressHidden
                ? onRenderProgress({
                    ...this.props,
                    percentComplete: percentComplete
                }, this._onRenderProgress)
                : null,
            description ? React.createElement("div", { className: classNames.itemDescription }, description) : null));
    }
}
ProgressIndicatorBase.defaultProps = {
    label: '',
    description: '',
    width: 180
};
