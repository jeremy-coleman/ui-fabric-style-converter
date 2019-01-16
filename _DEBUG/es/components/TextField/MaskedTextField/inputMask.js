export const DEFAULT_MASK_FORMAT_CHARS = {
    '9': /[0-9]/,
    a: /[a-zA-Z]/,
    '*': /[a-zA-Z0-9]/
};
export function parseMask(mask, formatChars = DEFAULT_MASK_FORMAT_CHARS) {
    if (!mask) {
        return [];
    }
    const maskCharData = [];
    let escapedChars = 0;
    for (let i = 0; i + escapedChars < mask.length; i++) {
        const maskChar = mask.charAt(i + escapedChars);
        if (maskChar === '\\') {
            escapedChars++;
        }
        else {
            const maskFormat = formatChars[maskChar];
            if (maskFormat) {
                maskCharData.push({
                    displayIndex: i,
                    format: maskFormat
                });
            }
        }
    }
    return maskCharData;
}
export function getMaskDisplay(mask, maskCharData, maskChar) {
    let maskDisplay = mask;
    if (!maskDisplay) {
        return '';
    }
    maskDisplay = maskDisplay.replace(/\\/g, '');
    let lastDisplayIndex = 0;
    if (maskCharData.length > 0) {
        lastDisplayIndex = maskCharData[0].displayIndex - 1;
    }
    for (const charData of maskCharData) {
        let nextChar = ' ';
        if (charData.value) {
            nextChar = charData.value;
            if (charData.displayIndex > lastDisplayIndex) {
                lastDisplayIndex = charData.displayIndex;
            }
        }
        else {
            if (maskChar) {
                nextChar = maskChar;
            }
        }
        maskDisplay = maskDisplay.slice(0, charData.displayIndex) + nextChar + maskDisplay.slice(charData.displayIndex + 1);
    }
    if (!maskChar) {
        maskDisplay = maskDisplay.slice(0, lastDisplayIndex + 1);
    }
    return maskDisplay;
}
export function getRightFormatIndex(maskCharData, index) {
    for (let i = 0; i < maskCharData.length; i++) {
        if (maskCharData[i].displayIndex >= index) {
            return maskCharData[i].displayIndex;
        }
    }
    return maskCharData[maskCharData.length - 1].displayIndex;
}
export function getLeftFormatIndex(maskCharData, index) {
    for (let i = maskCharData.length - 1; i >= 0; i--) {
        if (maskCharData[i].displayIndex < index) {
            return maskCharData[i].displayIndex;
        }
    }
    return maskCharData[0].displayIndex;
}
export function clearRange(maskCharData, selectionStart, selectionCount) {
    for (let i = 0; i < maskCharData.length; i++) {
        if (maskCharData[i].displayIndex >= selectionStart) {
            if (maskCharData[i].displayIndex >= selectionStart + selectionCount) {
                break;
            }
            maskCharData[i].value = undefined;
        }
    }
    return maskCharData;
}
export function clearNext(maskCharData, selectionStart) {
    for (let i = 0; i < maskCharData.length; i++) {
        if (maskCharData[i].displayIndex >= selectionStart) {
            maskCharData[i].value = undefined;
            break;
        }
    }
    return maskCharData;
}
export function clearPrev(maskCharData, selectionStart) {
    for (let i = maskCharData.length - 1; i >= 0; i--) {
        if (maskCharData[i].displayIndex < selectionStart) {
            maskCharData[i].value = undefined;
            break;
        }
    }
    return maskCharData;
}
export function insertString(maskCharData, selectionStart, newString) {
    let stringIndex = 0;
    let nextIndex = 0;
    let isStringInserted = false;
    for (let i = 0; i < maskCharData.length && stringIndex < newString.length; i++) {
        if (maskCharData[i].displayIndex >= selectionStart) {
            isStringInserted = true;
            nextIndex = maskCharData[i].displayIndex;
            while (stringIndex < newString.length) {
                if (maskCharData[i].format.test(newString.charAt(stringIndex))) {
                    maskCharData[i].value = newString.charAt(stringIndex++);
                    if (i + 1 < maskCharData.length) {
                        nextIndex = maskCharData[i + 1].displayIndex;
                    }
                    else {
                        nextIndex++;
                    }
                    break;
                }
                stringIndex++;
            }
        }
    }
    return isStringInserted ? nextIndex : selectionStart;
}
