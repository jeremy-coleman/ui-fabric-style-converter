import { DirectionalHint } from '../../common/DirectionalHint';
import { getScrollbarWidth, getRTL, Rectangle as FullRectangle } from '../../Utilities';
import { RectangleEdge } from './positioning.types';
export class Rectangle extends FullRectangle {
}
function _createPositionData(targetEdge, alignmentEdge, isAuto) {
    return {
        targetEdge: targetEdge,
        alignmentEdge: alignmentEdge,
        isAuto: isAuto
    };
}
const DirectionalDictionary = {
    [DirectionalHint.topLeftEdge]: _createPositionData(RectangleEdge.top, RectangleEdge.left),
    [DirectionalHint.topCenter]: _createPositionData(RectangleEdge.top),
    [DirectionalHint.topRightEdge]: _createPositionData(RectangleEdge.top, RectangleEdge.right),
    [DirectionalHint.topAutoEdge]: _createPositionData(RectangleEdge.top, undefined, true),
    [DirectionalHint.bottomLeftEdge]: _createPositionData(RectangleEdge.bottom, RectangleEdge.left),
    [DirectionalHint.bottomCenter]: _createPositionData(RectangleEdge.bottom),
    [DirectionalHint.bottomRightEdge]: _createPositionData(RectangleEdge.bottom, RectangleEdge.right),
    [DirectionalHint.bottomAutoEdge]: _createPositionData(RectangleEdge.bottom, undefined, true),
    [DirectionalHint.leftTopEdge]: _createPositionData(RectangleEdge.left, RectangleEdge.top),
    [DirectionalHint.leftCenter]: _createPositionData(RectangleEdge.left),
    [DirectionalHint.leftBottomEdge]: _createPositionData(RectangleEdge.left, RectangleEdge.bottom),
    [DirectionalHint.rightTopEdge]: _createPositionData(RectangleEdge.right, RectangleEdge.top),
    [DirectionalHint.rightCenter]: _createPositionData(RectangleEdge.right),
    [DirectionalHint.rightBottomEdge]: _createPositionData(RectangleEdge.right, RectangleEdge.bottom)
};
function _isRectangleWithinBounds(rect, boundingRect) {
    if (rect.top < boundingRect.top) {
        return false;
    }
    if (rect.bottom > boundingRect.bottom) {
        return false;
    }
    if (rect.left < boundingRect.left) {
        return false;
    }
    if (rect.right > boundingRect.right) {
        return false;
    }
    return true;
}
function _getOutOfBoundsEdges(rect, boundingRect) {
    const outOfBounds = new Array();
    if (rect.top < boundingRect.top) {
        outOfBounds.push(RectangleEdge.top);
    }
    if (rect.bottom > boundingRect.bottom) {
        outOfBounds.push(RectangleEdge.bottom);
    }
    if (rect.left < boundingRect.left) {
        outOfBounds.push(RectangleEdge.left);
    }
    if (rect.right > boundingRect.right) {
        outOfBounds.push(RectangleEdge.right);
    }
    return outOfBounds;
}
function _getEdgeValue(rect, edge) {
    return rect[RectangleEdge[edge]];
}
function _setEdgeValue(rect, edge, value) {
    rect[RectangleEdge[edge]] = value;
    return rect;
}
function _getCenterValue(rect, edge) {
    const edges = _getFlankingEdges(edge);
    return (_getEdgeValue(rect, edges.positiveEdge) + _getEdgeValue(rect, edges.negativeEdge)) / 2;
}
function _getRelativeEdgeValue(edge, value) {
    if (edge > 0) {
        return value;
    }
    else {
        return value * -1;
    }
}
function _getRelativeRectEdgeValue(edge, rect) {
    return _getRelativeEdgeValue(edge, _getEdgeValue(rect, edge));
}
function _getRelativeEdgeDifference(rect, hostRect, edge) {
    const edgeDifference = _getEdgeValue(rect, edge) - _getEdgeValue(hostRect, edge);
    return _getRelativeEdgeValue(edge, edgeDifference);
}
function _moveEdge(rect, edge, newValue) {
    const difference = _getEdgeValue(rect, edge) - newValue;
    rect = _setEdgeValue(rect, edge, newValue);
    rect = _setEdgeValue(rect, edge * -1, _getEdgeValue(rect, edge * -1) - difference);
    return rect;
}
function _alignEdges(rect, target, edge, gap = 0) {
    return _moveEdge(rect, edge, _getEdgeValue(target, edge) + _getRelativeEdgeValue(edge, gap));
}
function _alignOppositeEdges(rect, target, targetEdge, gap = 0) {
    const oppositeEdge = targetEdge * -1;
    const adjustedGap = _getRelativeEdgeValue(oppositeEdge, gap);
    return _moveEdge(rect, targetEdge * -1, _getEdgeValue(target, targetEdge) + adjustedGap);
}
function _isEdgeInBounds(rect, bounds, edge) {
    const adjustedRectValue = _getRelativeRectEdgeValue(edge, rect);
    return adjustedRectValue > _getRelativeRectEdgeValue(edge, bounds);
}
function _flipToFit(rect, target, bounding, positionData, gap = 0) {
    const directions = [RectangleEdge.left, RectangleEdge.right, RectangleEdge.bottom, RectangleEdge.top];
    let currentEstimate = rect;
    let currentEdge = positionData.targetEdge;
    let currentAlignment = positionData.alignmentEdge;
    for (let i = 0; i < 4; i++) {
        if (!_isEdgeInBounds(currentEstimate, bounding, currentEdge)) {
            directions.splice(directions.indexOf(currentEdge), 1);
            if (directions.indexOf(currentEdge * -1) > -1) {
                currentEdge = currentEdge * -1;
            }
            else {
                currentAlignment = currentEdge;
                currentEdge = directions.slice(-1)[0];
            }
            currentEstimate = _estimatePosition(rect, target, { targetEdge: currentEdge, alignmentEdge: currentAlignment }, gap);
        }
        else {
            return {
                elementRectangle: currentEstimate,
                targetEdge: currentEdge,
                alignmentEdge: currentAlignment
            };
        }
    }
    return {
        elementRectangle: rect,
        targetEdge: positionData.targetEdge,
        alignmentEdge: currentAlignment
    };
}
function _flipAlignmentEdge(elementEstimate, target, gap, coverTarget) {
    const { alignmentEdge, targetEdge, elementRectangle } = elementEstimate;
    const oppositeEdge = alignmentEdge * -1;
    const newEstimate = _estimatePosition(elementRectangle, target, { targetEdge: targetEdge, alignmentEdge: oppositeEdge }, gap, coverTarget);
    return {
        elementRectangle: newEstimate,
        targetEdge: targetEdge,
        alignmentEdge: oppositeEdge
    };
}
function _adjustFitWithinBounds(element, target, bounding, positionData, gap = 0, directionalHintFixed, coverTarget) {
    const { alignmentEdge, alignTargetEdge } = positionData;
    let elementEstimate = {
        elementRectangle: element,
        targetEdge: positionData.targetEdge,
        alignmentEdge: alignmentEdge
    };
    if (!directionalHintFixed && !coverTarget) {
        elementEstimate = _flipToFit(element, target, bounding, positionData, gap);
    }
    const outOfBounds = _getOutOfBoundsEdges(element, bounding);
    if (alignTargetEdge) {
        if (elementEstimate.alignmentEdge && outOfBounds.indexOf(elementEstimate.alignmentEdge * -1) > -1) {
            const flippedElementEstimate = _flipAlignmentEdge(elementEstimate, target, gap, coverTarget);
            if (_isRectangleWithinBounds(flippedElementEstimate.elementRectangle, bounding)) {
                return flippedElementEstimate;
            }
        }
    }
    else {
        for (const direction of outOfBounds) {
            elementEstimate.elementRectangle = _alignEdges(elementEstimate.elementRectangle, bounding, direction);
        }
    }
    return elementEstimate;
}
function _centerEdgeToPoint(rect, edge, point) {
    const { positiveEdge } = _getFlankingEdges(edge);
    const elementMiddle = _getCenterValue(rect, edge);
    const distanceToMiddle = elementMiddle - _getEdgeValue(rect, positiveEdge);
    return _moveEdge(rect, positiveEdge, point - distanceToMiddle);
}
function _estimatePosition(elementToPosition, target, positionData, gap = 0, coverTarget) {
    let estimatedElementPosition;
    const { alignmentEdge, targetEdge } = positionData;
    const elementEdge = coverTarget ? targetEdge : targetEdge * -1;
    estimatedElementPosition = coverTarget
        ? _alignEdges(elementToPosition, target, targetEdge, gap)
        : _alignOppositeEdges(elementToPosition, target, targetEdge, gap);
    if (!alignmentEdge) {
        const targetMiddlePoint = _getCenterValue(target, targetEdge);
        estimatedElementPosition = _centerEdgeToPoint(estimatedElementPosition, elementEdge, targetMiddlePoint);
    }
    else {
        estimatedElementPosition = _alignEdges(estimatedElementPosition, target, alignmentEdge);
    }
    return estimatedElementPosition;
}
function _getFlankingEdges(edge) {
    if (edge === RectangleEdge.top || edge === RectangleEdge.bottom) {
        return {
            positiveEdge: RectangleEdge.left,
            negativeEdge: RectangleEdge.right
        };
    }
    else {
        return {
            positiveEdge: RectangleEdge.top,
            negativeEdge: RectangleEdge.bottom
        };
    }
}
function _finalizeElementPosition(elementRectangle, hostElement, targetEdge, alignmentEdge, coverTarget) {
    const returnValue = {};
    const hostRect = _getRectangleFromElement(hostElement);
    const elementEdge = coverTarget ? targetEdge : targetEdge * -1;
    const elementEdgeString = RectangleEdge[elementEdge];
    const returnEdge = alignmentEdge ? alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge;
    returnValue[elementEdgeString] = _getRelativeEdgeDifference(elementRectangle, hostRect, elementEdge);
    returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(elementRectangle, hostRect, returnEdge);
    return returnValue;
}
function _calculateActualBeakWidthInPixels(beakWidth) {
    return Math.sqrt(beakWidth * beakWidth * 2);
}
function _getPositionData(directionalHint = DirectionalHint.bottomAutoEdge, directionalHintForRTL, previousPositions) {
    if (previousPositions) {
        return {
            alignmentEdge: previousPositions.alignmentEdge,
            isAuto: previousPositions.isAuto,
            targetEdge: previousPositions.targetEdge
        };
    }
    const positionInformation = { ...DirectionalDictionary[directionalHint] };
    if (getRTL()) {
        if (positionInformation.alignmentEdge && positionInformation.alignmentEdge % 2 === 0) {
            positionInformation.alignmentEdge = positionInformation.alignmentEdge * -1;
        }
        return directionalHintForRTL !== undefined ? DirectionalDictionary[directionalHintForRTL] : positionInformation;
    }
    return positionInformation;
}
function _getAlignmentData(positionData, target, boundingRect, coverTarget, alignTargetEdge) {
    if (positionData.isAuto) {
        positionData.alignmentEdge = getClosestEdge(positionData.targetEdge, target, boundingRect);
    }
    positionData.alignTargetEdge = alignTargetEdge;
    return positionData;
}
function getClosestEdge(targetEdge, target, boundingRect) {
    const targetCenter = _getCenterValue(target, targetEdge);
    const boundingCenter = _getCenterValue(boundingRect, targetEdge);
    const { positiveEdge, negativeEdge } = _getFlankingEdges(targetEdge);
    if (targetCenter <= boundingCenter) {
        return positiveEdge;
    }
    else {
        return negativeEdge;
    }
}
function _positionElementWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget) {
    const estimatedElementPosition = _estimatePosition(elementToPosition, target, positionData, gap, coverTarget);
    if (_isRectangleWithinBounds(estimatedElementPosition, bounding)) {
        return {
            elementRectangle: estimatedElementPosition,
            targetEdge: positionData.targetEdge,
            alignmentEdge: positionData.alignmentEdge
        };
    }
    else {
        return _adjustFitWithinBounds(elementToPosition, target, bounding, positionData, gap, directionalHintFixed, coverTarget);
    }
}
function _finalizeBeakPosition(elementPosition, positionedBeak) {
    const targetEdge = elementPosition.targetEdge * -1;
    const actualElement = new Rectangle(0, elementPosition.elementRectangle.width, 0, elementPosition.elementRectangle.height);
    const returnEdge = elementPosition.alignmentEdge ? elementPosition.alignmentEdge : _getFlankingEdges(targetEdge).positiveEdge;
    const returnValue = {};
    returnValue[RectangleEdge[targetEdge]] = _getEdgeValue(positionedBeak, targetEdge);
    returnValue[RectangleEdge[returnEdge]] = _getRelativeEdgeDifference(positionedBeak, actualElement, returnEdge);
    return {
        elementPosition: { ...returnValue },
        closestEdge: getClosestEdge(elementPosition.targetEdge, positionedBeak, actualElement),
        targetEdge: targetEdge
    };
}
function _positionBeak(beakWidth, elementPosition) {
    const target = elementPosition.targetRectangle;
    const { positiveEdge, negativeEdge } = _getFlankingEdges(elementPosition.targetEdge);
    const beakTargetPoint = _getCenterValue(target, elementPosition.targetEdge);
    const elementBounds = new Rectangle(beakWidth / 2, elementPosition.elementRectangle.width - beakWidth / 2, beakWidth / 2, elementPosition.elementRectangle.height - beakWidth / 2);
    let beakPositon = new Rectangle(0, beakWidth, 0, beakWidth);
    beakPositon = _moveEdge(beakPositon, elementPosition.targetEdge * -1, -beakWidth / 2);
    beakPositon = _centerEdgeToPoint(beakPositon, elementPosition.targetEdge * -1, beakTargetPoint - _getRelativeRectEdgeValue(positiveEdge, elementPosition.elementRectangle));
    if (!_isEdgeInBounds(beakPositon, elementBounds, positiveEdge)) {
        beakPositon = _alignEdges(beakPositon, elementBounds, positiveEdge);
    }
    else if (!_isEdgeInBounds(beakPositon, elementBounds, negativeEdge)) {
        beakPositon = _alignEdges(beakPositon, elementBounds, negativeEdge);
    }
    return beakPositon;
}
function _getRectangleFromElement(element) {
    const clientRect = element.getBoundingClientRect();
    return new Rectangle(clientRect.left, clientRect.right, clientRect.top, clientRect.bottom);
}
function _getRectangleFromIRect(rect) {
    return new Rectangle(rect.left, rect.right, rect.top, rect.bottom);
}
function _getTargetRect(bounds, target) {
    let targetRectangle;
    if (target) {
        if (target.preventDefault) {
            const ev = target;
            targetRectangle = new Rectangle(ev.clientX, ev.clientX, ev.clientY, ev.clientY);
        }
        else if (target.getBoundingClientRect) {
            targetRectangle = _getRectangleFromElement(target);
        }
        else {
            const point = target;
            targetRectangle = new Rectangle(point.x, point.x, point.y, point.y);
        }
        if (!_isRectangleWithinBounds(targetRectangle, bounds)) {
            const outOfBounds = _getOutOfBoundsEdges(targetRectangle, bounds);
            for (const direction of outOfBounds) {
                targetRectangle[RectangleEdge[direction]] = bounds[RectangleEdge[direction]];
            }
        }
    }
    else {
        targetRectangle = new Rectangle(0, 0, 0, 0);
    }
    return targetRectangle;
}
function _getMaxHeightFromTargetRectangle(targetRectangle, targetEdge, gapSpace, bounds, coverTarget) {
    let maxHeight = 0;
    const directionalHint = DirectionalDictionary[targetEdge];
    const target = coverTarget ? directionalHint.targetEdge * -1 : directionalHint.targetEdge;
    if (target === RectangleEdge.top) {
        maxHeight = _getEdgeValue(targetRectangle, directionalHint.targetEdge) - bounds.top - gapSpace;
    }
    else if (target === RectangleEdge.bottom) {
        maxHeight = bounds.bottom - _getEdgeValue(targetRectangle, directionalHint.targetEdge) - gapSpace;
    }
    else {
        maxHeight = bounds.bottom - targetRectangle.top - gapSpace;
    }
    return maxHeight > 0 ? maxHeight : bounds.height;
}
function _positionElementRelative(props, hostElement, elementToPosition, previousPositions) {
    const gap = props.gapSpace ? props.gapSpace : 0;
    const boundingRect = props.bounds
        ? _getRectangleFromIRect(props.bounds)
        : new Rectangle(0, window.innerWidth - getScrollbarWidth(), 0, window.innerHeight);
    const targetRect = _getTargetRect(boundingRect, props.target);
    const positionData = _getAlignmentData(_getPositionData(props.directionalHint, props.directionalHintForRTL, previousPositions), targetRect, boundingRect, props.coverTarget, props.alignTargetEdge);
    const positionedElement = _positionElementWithinBounds(_getRectangleFromElement(elementToPosition), targetRect, boundingRect, positionData, gap, props.directionalHintFixed, props.coverTarget);
    return { ...positionedElement, targetRectangle: targetRect };
}
function _finalizePositionData(positionedElement, hostElement, coverTarget) {
    const finalizedElement = _finalizeElementPosition(positionedElement.elementRectangle, hostElement, positionedElement.targetEdge, positionedElement.alignmentEdge, coverTarget);
    return {
        elementPosition: finalizedElement,
        targetEdge: positionedElement.targetEdge,
        alignmentEdge: positionedElement.alignmentEdge
    };
}
function _positionElement(props, hostElement, elementToPosition, previousPositions) {
    const positionedElement = _positionElementRelative(props, hostElement, elementToPosition, previousPositions);
    return _finalizePositionData(positionedElement, hostElement, props.coverTarget);
}
function _positionCallout(props, hostElement, callout, previousPositions) {
    const beakWidth = props.isBeakVisible ? props.beakWidth || 0 : 0;
    const gap = _calculateActualBeakWidthInPixels(beakWidth) / 2 + (props.gapSpace ? props.gapSpace : 0);
    const positionProps = props;
    positionProps.gapSpace = gap;
    const positionedElement = _positionElementRelative(positionProps, hostElement, callout, previousPositions);
    const beakPositioned = _positionBeak(beakWidth, positionedElement);
    const finalizedBeakPosition = _finalizeBeakPosition(positionedElement, beakPositioned);
    return {
        ..._finalizePositionData(positionedElement, hostElement, props.coverTarget),
        beakPosition: finalizedBeakPosition
    };
}
export const __positioningTestPackage = {
    _finalizePositionData,
    _calculateActualBeakWidthInPixels,
    _positionElementWithinBounds,
    _positionBeak,
    _getPositionData,
    _getMaxHeightFromTargetRectangle
};
export function positionElement(props, hostElement, elementToPosition, previousPositions) {
    return _positionElement(props, hostElement, elementToPosition, previousPositions);
}
export function positionCallout(props, hostElement, elementToPosition, previousPositions) {
    return _positionCallout(props, hostElement, elementToPosition, previousPositions);
}
export function getMaxHeight(target, targetEdge, gapSpace = 0, bounds, coverTarget) {
    const mouseTarget = target;
    const elementTarget = target;
    const pointTarget = target;
    let targetRect;
    const boundingRectangle = bounds
        ? _getRectangleFromIRect(bounds)
        : new Rectangle(0, window.innerWidth - getScrollbarWidth(), 0, window.innerHeight);
    if (mouseTarget.stopPropagation) {
        targetRect = new Rectangle(mouseTarget.clientX, mouseTarget.clientX, mouseTarget.clientY, mouseTarget.clientY);
    }
    else if (pointTarget.x !== undefined && pointTarget.y !== undefined) {
        targetRect = new Rectangle(pointTarget.x, pointTarget.x, pointTarget.y, pointTarget.y);
    }
    else {
        targetRect = _getRectangleFromElement(elementTarget);
    }
    return _getMaxHeightFromTargetRectangle(targetRect, targetEdge, gapSpace, boundingRectangle, coverTarget);
}
export function getOppositeEdge(edge) {
    return edge * -1;
}
