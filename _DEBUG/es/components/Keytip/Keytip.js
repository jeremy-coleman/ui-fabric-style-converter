import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { mergeOverflows, ktpTargetFromSequences } from '../../utilities/keytips/KeytipUtils';
import { Callout } from '../../Callout';
import { DirectionalHint } from '../../ContextualMenu';
import { KeytipContent } from './KeytipContent';
import { getCalloutStyles, getCalloutOffsetStyles } from './Keytip.styles';
export class Keytip extends BaseComponent {
    render() {
        const { keySequences, offset, overflowSetSequence } = this.props;
        let { calloutProps } = this.props;
        let keytipTarget;
        if (overflowSetSequence) {
            keytipTarget = ktpTargetFromSequences(mergeOverflows(keySequences, overflowSetSequence));
        }
        else {
            keytipTarget = ktpTargetFromSequences(keySequences);
        }
        if (offset) {
            calloutProps = {
                ...calloutProps,
                coverTarget: true,
                directionalHint: DirectionalHint.topLeftEdge
            };
        }
        if (!calloutProps || calloutProps.directionalHint === undefined) {
            calloutProps = {
                ...calloutProps,
                directionalHint: DirectionalHint.bottomCenter
            };
        }
        return (React.createElement(Callout, Object.assign({}, calloutProps, { isBeakVisible: false, doNotLayer: true, minPagePadding: 0, styles: offset ? getCalloutOffsetStyles(offset) : getCalloutStyles, preventDismissOnScroll: true, target: keytipTarget }),
            React.createElement(KeytipContent, Object.assign({}, this.props))));
    }
}
