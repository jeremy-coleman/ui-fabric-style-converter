import * as React from 'react';
import { BaseDecorator } from './BaseDecorator';
import { getWindow, hoistStatics } from '../../Utilities';
export var ResponsiveMode;
(function (ResponsiveMode) {
    ResponsiveMode[ResponsiveMode["small"] = 0] = "small";
    ResponsiveMode[ResponsiveMode["medium"] = 1] = "medium";
    ResponsiveMode[ResponsiveMode["large"] = 2] = "large";
    ResponsiveMode[ResponsiveMode["xLarge"] = 3] = "xLarge";
    ResponsiveMode[ResponsiveMode["xxLarge"] = 4] = "xxLarge";
    ResponsiveMode[ResponsiveMode["xxxLarge"] = 5] = "xxxLarge";
})(ResponsiveMode || (ResponsiveMode = {}));
const RESPONSIVE_MAX_CONSTRAINT = [479, 639, 1023, 1365, 1919, 99999999];
let _defaultMode;
export function setResponsiveMode(responsiveMode) {
    _defaultMode = responsiveMode;
}
export function withResponsiveMode(ComposedComponent) {
    const resultClass = class WithResponsiveMode extends BaseDecorator {
        constructor(props) {
            super(props);
            this._updateComposedComponentRef = this._updateComposedComponentRef.bind(this);
            this.state = {
                responsiveMode: this._getResponsiveMode()
            };
        }
        componentDidMount() {
            this._events.on(window, 'resize', () => {
                const responsiveMode = this._getResponsiveMode();
                if (responsiveMode !== this.state.responsiveMode) {
                    this.setState({
                        responsiveMode: responsiveMode
                    });
                }
            });
        }
        componentWillUnmount() {
            this._events.dispose();
        }
        render() {
            const { responsiveMode } = this.state;
            return React.createElement(ComposedComponent, Object.assign({ ref: this._updateComposedComponentRef, responsiveMode: responsiveMode }, this.props));
        }
        _getResponsiveMode() {
            let responsiveMode = ResponsiveMode.small;
            const win = getWindow();
            if (typeof win !== 'undefined') {
                try {
                    while (win.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
                        responsiveMode++;
                    }
                }
                catch (e) {
                    responsiveMode = ResponsiveMode.large;
                }
            }
            else {
                if (_defaultMode !== undefined) {
                    responsiveMode = _defaultMode;
                }
                else {
                    throw new Error('Content was rendered in a server environment without providing a default responsive mode. ' +
                        'Call setResponsiveMode to define what the responsive mode is.');
                }
            }
            return responsiveMode;
        }
    };
    return hoistStatics(ComposedComponent, resultClass);
}
