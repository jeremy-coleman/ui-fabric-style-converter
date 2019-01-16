import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { getStyles } from './Beak.styles';
import { RectangleEdge } from '../../../utilities/positioning';
export const BEAK_HEIGHT = 10;
export const BEAK_WIDTH = 18;
export class Beak extends BaseComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { left, top, bottom, right, color, direction = RectangleEdge.top } = this.props;
        let svgHeight;
        let svgWidth;
        if (direction === RectangleEdge.top || direction === RectangleEdge.bottom) {
            svgHeight = BEAK_HEIGHT;
            svgWidth = BEAK_WIDTH;
        }
        else {
            svgHeight = BEAK_WIDTH;
            svgWidth = BEAK_HEIGHT;
        }
        let pointOne;
        let pointTwo;
        let pointThree;
        let transform;
        switch (direction) {
            case RectangleEdge.top:
            default:
                pointOne = `${BEAK_WIDTH / 2}, 0`;
                pointTwo = `${BEAK_WIDTH}, ${BEAK_HEIGHT}`;
                pointThree = `0, ${BEAK_HEIGHT}`;
                transform = 'translateY(-100%)';
                break;
            case RectangleEdge.right:
                pointOne = `0, 0`;
                pointTwo = `${BEAK_HEIGHT}, ${BEAK_HEIGHT}`;
                pointThree = `0, ${BEAK_WIDTH}`;
                transform = 'translateX(100%)';
                break;
            case RectangleEdge.bottom:
                pointOne = `0, 0`;
                pointTwo = `${BEAK_WIDTH}, 0`;
                pointThree = `${BEAK_WIDTH / 2}, ${BEAK_HEIGHT}`;
                transform = 'translateY(100%)';
                break;
            case RectangleEdge.left:
                pointOne = `${BEAK_HEIGHT}, 0`;
                pointTwo = `0, ${BEAK_HEIGHT}`;
                pointThree = `${BEAK_HEIGHT}, ${BEAK_WIDTH}`;
                transform = 'translateX(-100%)';
                break;
        }
        const getClassNames = classNamesFunction();
        const classNames = getClassNames(getStyles, {
            left,
            top,
            bottom,
            right,
            height: `${svgHeight}px`,
            width: `${svgWidth}px`,
            transform: transform,
            color
        });
        return (React.createElement("div", { className: classNames.root, role: "presentation" },
            React.createElement("svg", { height: svgHeight, width: svgWidth, className: classNames.beak },
                React.createElement("polygon", { points: pointOne + ' ' + pointTwo + ' ' + pointThree }))));
    }
}
