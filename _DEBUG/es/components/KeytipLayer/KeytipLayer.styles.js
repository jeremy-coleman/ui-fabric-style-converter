import { ZIndexes } from '../../Styling';
export const getLayerStyles = (props) => {
    return {
        root: [
            {
                zIndex: ZIndexes.KeytipLayer
            }
        ]
    };
};
export const getStyles = (props) => {
    return {
        innerContent: [
            {
                position: 'absolute',
                width: 0,
                height: 0,
                margin: 0,
                padding: 0,
                border: 0,
                overflow: 'hidden',
                visibility: 'hidden'
            }
        ]
    };
};
