import * as React from 'react';
import { BaseComponent, divProperties, getNativeProps } from '../../Utilities';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction();
export class LabelBase extends BaseComponent {
    render() {
        const { as: RootType = 'label', children, className, disabled, styles, required, theme } = this.props;
        const classNames = getClassNames(styles, {
            className,
            disabled,
            required,
            theme: theme
        });
        return (React.createElement(RootType, Object.assign({}, getNativeProps(this.props, divProperties), { className: classNames.root }), children));
    }
}
