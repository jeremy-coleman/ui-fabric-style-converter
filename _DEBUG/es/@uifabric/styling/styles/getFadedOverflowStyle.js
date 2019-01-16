const DEFAULT_HEIGHT = '50%';
const DEFAULT_WIDTH = 20;
export function getFadedOverflowStyle(theme, color = 'bodyBackground', direction = 'horizontal', width = getDefaultValue('width', direction), height = getDefaultValue('height', direction)) {
    const colorValue = theme.semanticColors[color] || theme.palette[color];
    const rgbColor = color2rgb(colorValue);
    const rgba = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)`;
    const gradientDirection = direction === 'vertical' ? 'to bottom' : 'to right';
    return {
        content: '""',
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        pointerEvents: 'none',
        backgroundImage: `linear-gradient(${gradientDirection}, ${rgba} 0%, ${colorValue} 100%)`
    };
}
function color2rgb(colorValue) {
    if (colorValue[0] === '#') {
        return {
            r: parseInt(colorValue.slice(1, 3), 16),
            g: parseInt(colorValue.slice(3, 5), 16),
            b: parseInt(colorValue.slice(5, 7), 16)
        };
    }
    else if (colorValue.indexOf('rgba(') === 0) {
        colorValue = colorValue.match(/rgba\(([^)]+)\)/)[1];
        const parts = colorValue.split(/ *, */).map(Number);
        return {
            r: parts[0],
            g: parts[1],
            b: parts[2]
        };
    }
    return {
        r: 255,
        g: 255,
        b: 255
    };
}
function getDefaultValue(style, direction) {
    if (style === 'width') {
        return direction === 'horizontal' ? DEFAULT_WIDTH : '100%';
    }
    else {
        return direction === 'vertical' ? DEFAULT_HEIGHT : '100%';
    }
}
