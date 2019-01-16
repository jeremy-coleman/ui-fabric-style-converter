import * as React from 'react';
import { mergeStyleSets } from '@uifabric/styling';
import { Customizations, CustomizerContext } from '@uifabric/utilities';
const { assign } = Object;
-'state';
export function createComponent(component) {
    const result = (componentProps) => {
        return (React.createElement(CustomizerContext.Consumer, null, (context) => {
            const settings = _getCustomizations(component.displayName, context, component.fields);
            const renderView = (viewProps) => {
                const mergedProps = viewProps
                    ? {
                        ...componentProps,
                        ...viewProps
                    }
                    : componentProps;
                const { styles: settingsStyles, ...settingsRest } = settings;
                const styledProps = { ...settingsRest, ...mergedProps };
                const viewComponentProps = {
                    ...mergedProps,
                    ...{
                        classNames: mergeStyleSets(_evaluateStyle(styledProps, component.styles), _evaluateStyle(styledProps, settingsStyles), _evaluateStyle(styledProps, mergedProps.styles))
                    }
                };
                return component.view(viewComponentProps);
            };
            return component.state ? React.createElement(component.state, Object.assign({}, componentProps, { renderView: renderView })) : renderView();
        }));
    };
    result.displayName = component.displayName;
    assign(result, component.statics);
    return result;
}
export function createStatelessComponent(component) {
    return createComponent(component);
}
function _evaluateStyle(props, styles) {
    if (typeof styles === 'function') {
        return styles(props);
    }
    return styles;
}
function _getCustomizations(displayName, context, fields) {
    const DefaultFields = ['theme', 'styles', 'styleVariables'];
    return Customizations.getSettings(fields || DefaultFields, displayName, context.customizations);
}
