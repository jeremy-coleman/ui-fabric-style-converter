import * as React from 'react';
import { concatStyleSets } from '@uifabric/merge-styles';
import { Customizations } from './Customizations';
import { CustomizerContext } from './Customizer';
const DefaultFields = ['theme', 'styles'];
export function styled(Component, baseStyles, getProps, customizable) {
    customizable = customizable || { scope: '', fields: undefined };
    const { scope, fields = DefaultFields } = customizable;
    class Wrapped extends React.Component {
        constructor() {
            super(...arguments);
            this._inCustomizerContext = false;
            this._onSettingsChanged = () => this.forceUpdate();
        }
        render() {
            return (React.createElement(CustomizerContext.Consumer, null, (context) => {
                this._inCustomizerContext = !!context.customizations.inCustomizerContext;
                const settings = Customizations.getSettings(fields, scope, context.customizations);
                const { styles: customizedStyles, ...rest } = settings;
                const styles = (styleProps) => _resolve(styleProps, baseStyles, customizedStyles, this.props.styles);
                const additionalProps = getProps ? getProps(this.props) : undefined;
                return React.createElement(Component, Object.assign({}, rest, additionalProps, this.props, { styles: styles }));
            }));
        }
        componentDidMount() {
            if (!this._inCustomizerContext) {
                Customizations.observe(this._onSettingsChanged);
            }
        }
        componentWillUnmount() {
            if (!this._inCustomizerContext) {
                Customizations.unobserve(this._onSettingsChanged);
            }
        }
    }
    Wrapped.displayName = `Styled${Component.displayName || Component.name}`;
    return Wrapped;
}
function _resolve(styleProps, ...allStyles) {
    const result = [];
    for (const styles of allStyles) {
        if (styles) {
            result.push(typeof styles === 'function' ? styles(styleProps) : styles);
        }
    }
    if (result.length) {
        return concatStyleSets(...result);
    }
    return undefined;
}
