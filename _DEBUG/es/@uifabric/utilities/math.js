export function getDistanceBetweenPoints(point1, point2) {
    let distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    return distance;
}
export function fitContentToBounds(options) {
    const { contentSize, boundsSize, mode = 'contain', maxScale = 1 } = options;
    const contentAspectRatio = contentSize.width / contentSize.height;
    const boundsAspectRatio = boundsSize.width / boundsSize.height;
    let scale;
    if (mode === 'contain' ? contentAspectRatio > boundsAspectRatio : contentAspectRatio < boundsAspectRatio) {
        scale = boundsSize.width / contentSize.width;
    }
    else {
        scale = boundsSize.height / contentSize.height;
    }
    const finalScale = Math.min(maxScale, scale);
    return {
        width: contentSize.width * finalScale,
        height: contentSize.height * finalScale
    };
}
export function calculatePrecision(value) {
    const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
    if (!groups) {
        return 0;
    }
    if (groups[1]) {
        return -groups[1].length;
    }
    if (groups[2]) {
        return groups[2].length;
    }
    return 0;
}
export function precisionRound(value, precision, base = 10) {
    const exp = Math.pow(base, precision);
    return Math.round(value * exp) / exp;
}
