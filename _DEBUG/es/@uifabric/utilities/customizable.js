import * as React from 'react';
import { Customizations } from './Customizations';
import { hoistStatics } from './hoistStatics';
import { CustomizerContext } from './Customizer';
import { concatStyleSets } from '@uifabric/merge-styles';
export function customizable(scope, fields, concatStyles) {
    return function customizableFactory(ComposedComponent) {
        var _a;
        const resultClass = (_a = class ComponentWithInjectedProps extends React.Component {
                constructor(props) {
                    super(props);
                    this._onSettingChanged = this._onSettingChanged.bind(this);
                }
                componentDidMount() {
                    Customizations.observe(this._onSettingChanged);
                }
                componentWillUnmount() {
                    Customizations.unobserve(this._onSettingChanged);
                }
                render() {
                    return (React.createElement(CustomizerContext.Consumer, null, (context) => {
                        const defaultProps = Customizations.getSettings(fields, scope, context.customizations);
                        const componentProps = this.props;
                        if (concatStyles) {
                            const mergedStyles = concatStyleSets(defaultProps.styles, componentProps.styles);
                            return React.createElement(ComposedComponent, Object.assign({}, defaultProps, componentProps, { styles: mergedStyles }));
                        }
                        return React.createElement(ComposedComponent, Object.assign({}, defaultProps, componentProps));
                    }));
                }
                _onSettingChanged() {
                    this.forceUpdate();
                }
            },
            _a.displayName = 'Customized' + scope,
            _a);
        return hoistStatics(ComposedComponent, resultClass);
    };
}
