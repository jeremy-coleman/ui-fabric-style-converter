import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, divProperties, getNativeProps, provideContext } from '../../Utilities';
const RESIZE_DELAY = 16;
export const getMeasurementCache = () => {
    const measurementsCache = {};
    return {
        getCachedMeasurement: (data) => {
            if (data && data.cacheKey && measurementsCache.hasOwnProperty(data.cacheKey)) {
                return measurementsCache[data.cacheKey];
            }
            return undefined;
        },
        addMeasurementToCache: (data, measurement) => {
            if (data.cacheKey) {
                measurementsCache[data.cacheKey] = measurement;
            }
        }
    };
};
export const getNextResizeGroupStateProvider = (measurementCache = getMeasurementCache()) => {
    const _measurementCache = measurementCache;
    let _containerWidth;
    function _getMeasuredWidth(measuredData, getElementToMeasureWidth) {
        const cachedWidth = _measurementCache.getCachedMeasurement(measuredData);
        if (cachedWidth !== undefined) {
            return cachedWidth;
        }
        const measuredWidth = getElementToMeasureWidth();
        _measurementCache.addMeasurementToCache(measuredData, measuredWidth);
        return measuredWidth;
    }
    function _shrinkContentsUntilTheyFit(data, onReduceData, getElementToMeasureWidth) {
        let dataToMeasure = data;
        let measuredWidth = _getMeasuredWidth(data, getElementToMeasureWidth);
        while (measuredWidth > _containerWidth) {
            const nextMeasuredData = onReduceData(dataToMeasure);
            if (nextMeasuredData === undefined) {
                return {
                    renderedData: dataToMeasure,
                    resizeDirection: undefined,
                    dataToMeasure: undefined
                };
            }
            measuredWidth = _measurementCache.getCachedMeasurement(nextMeasuredData);
            if (measuredWidth === undefined) {
                return {
                    dataToMeasure: nextMeasuredData,
                    resizeDirection: 'shrink'
                };
            }
            dataToMeasure = nextMeasuredData;
        }
        return {
            renderedData: dataToMeasure,
            resizeDirection: undefined,
            dataToMeasure: undefined
        };
    }
    function _growDataUntilItDoesNotFit(data, onGrowData, getElementToMeasureWidth, onReduceData) {
        let dataToMeasure = data;
        let measuredWidth = _getMeasuredWidth(data, getElementToMeasureWidth);
        while (measuredWidth < _containerWidth) {
            const nextMeasuredData = onGrowData(dataToMeasure);
            if (nextMeasuredData === undefined) {
                return {
                    renderedData: dataToMeasure,
                    resizeDirection: undefined,
                    dataToMeasure: undefined
                };
            }
            measuredWidth = _measurementCache.getCachedMeasurement(nextMeasuredData);
            if (measuredWidth === undefined) {
                return {
                    dataToMeasure: nextMeasuredData
                };
            }
            dataToMeasure = nextMeasuredData;
        }
        return {
            resizeDirection: 'shrink',
            ..._shrinkContentsUntilTheyFit(dataToMeasure, onReduceData, getElementToMeasureWidth)
        };
    }
    function _updateContainerWidth(newWidth, fullWidthData, renderedData, onGrowData) {
        let nextState;
        if (newWidth > _containerWidth) {
            if (onGrowData) {
                nextState = {
                    resizeDirection: 'grow',
                    dataToMeasure: onGrowData(renderedData)
                };
            }
            else {
                nextState = {
                    resizeDirection: 'shrink',
                    dataToMeasure: fullWidthData
                };
            }
        }
        else {
            nextState = {
                resizeDirection: 'shrink',
                dataToMeasure: renderedData
            };
        }
        _containerWidth = newWidth;
        return { ...nextState, measureContainer: false };
    }
    function getNextState(props, currentState, getElementToMeasureWidth, newContainerWidth) {
        if (newContainerWidth === undefined && currentState.dataToMeasure === undefined) {
            return undefined;
        }
        if (newContainerWidth) {
            if (_containerWidth && currentState.renderedData && !currentState.dataToMeasure) {
                return {
                    ...currentState,
                    ..._updateContainerWidth(newContainerWidth, props.data, currentState.renderedData, props.onGrowData)
                };
            }
            _containerWidth = newContainerWidth;
        }
        let nextState = {
            ...currentState,
            measureContainer: false
        };
        if (currentState.dataToMeasure) {
            if (currentState.resizeDirection === 'grow' && props.onGrowData) {
                nextState = {
                    ...nextState,
                    ..._growDataUntilItDoesNotFit(currentState.dataToMeasure, props.onGrowData, getElementToMeasureWidth, props.onReduceData)
                };
            }
            else {
                nextState = {
                    ...nextState,
                    ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureWidth)
                };
            }
        }
        return nextState;
    }
    function shouldRenderDataForMeasurement(dataToMeasure) {
        if (!dataToMeasure || _measurementCache.getCachedMeasurement(dataToMeasure) !== undefined) {
            return false;
        }
        return true;
    }
    function getInitialResizeGroupState(data) {
        return {
            dataToMeasure: { ...data },
            resizeDirection: 'grow',
            measureContainer: true
        };
    }
    return {
        getNextState,
        shouldRenderDataForMeasurement,
        getInitialResizeGroupState
    };
};
const MeasuredContext = provideContext({
    isMeasured: PropTypes.bool
}, () => {
    return { isMeasured: true };
});
const hiddenDivStyles = { position: 'fixed', visibility: 'hidden' };
const hiddenParentStyles = { position: 'relative' };
export class ResizeGroupBase extends BaseComponent {
    constructor(props) {
        super(props);
        this._nextResizeGroupStateProvider = getNextResizeGroupStateProvider();
        this._root = React.createRef();
        this._initialHiddenDiv = React.createRef();
        this._updateHiddenDiv = React.createRef();
        this._hasRenderedContent = false;
        this.state = this._nextResizeGroupStateProvider.getInitialResizeGroupState(this.props.data);
        this._warnDeprecations({
            styles: 'className'
        });
    }
    render() {
        const { className, onRenderData } = this.props;
        const { dataToMeasure, renderedData } = this.state;
        const divProps = getNativeProps(this.props, divProperties, ['data']);
        const dataNeedsMeasuring = this._nextResizeGroupStateProvider.shouldRenderDataForMeasurement(dataToMeasure);
        const isInitialMeasure = !this._hasRenderedContent && dataNeedsMeasuring;
        return (React.createElement("div", Object.assign({}, divProps, { className: className, ref: this._root }),
            React.createElement("div", { style: hiddenParentStyles },
                dataNeedsMeasuring && !isInitialMeasure && (React.createElement("div", { style: hiddenDivStyles, ref: this._updateHiddenDiv },
                    React.createElement(MeasuredContext, null, onRenderData(dataToMeasure)))),
                React.createElement("div", { ref: this._initialHiddenDiv, style: isInitialMeasure ? hiddenDivStyles : undefined, "data-automation-id": "visibleContent" }, isInitialMeasure ? onRenderData(dataToMeasure) : renderedData && onRenderData(renderedData)))));
    }
    componentDidMount() {
        this._afterComponentRendered();
        this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            dataToMeasure: { ...nextProps.data },
            resizeDirection: 'grow',
            measureContainer: true
        });
    }
    componentDidUpdate(prevProps) {
        if (this.state.renderedData) {
            this._hasRenderedContent = true;
            if (this.props.dataDidRender) {
                this.props.dataDidRender(this.state.renderedData);
            }
        }
        this._afterComponentRendered();
    }
    remeasure() {
        if (this._root.current) {
            this.setState({ measureContainer: true });
        }
    }
    _afterComponentRendered() {
        this._async.requestAnimationFrame(() => {
            let containerWidth = undefined;
            if (this.state.measureContainer && this._root.current) {
                containerWidth = this._root.current.getBoundingClientRect().width;
            }
            const nextState = this._nextResizeGroupStateProvider.getNextState(this.props, this.state, () => {
                const refToMeasure = !this._hasRenderedContent ? this._initialHiddenDiv : this._updateHiddenDiv;
                return refToMeasure.current ? refToMeasure.current.scrollWidth : 0;
            }, containerWidth);
            if (nextState) {
                this.setState(nextState);
            }
        });
    }
    _onResize() {
        if (this._root.current) {
            this.setState({ measureContainer: true });
        }
    }
}
