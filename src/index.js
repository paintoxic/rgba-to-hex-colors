const PATTERNS = {
    RGBA_PREFIX_PATTERN: /^rgb\(|^rgba\(/,
    REMOVE_PREFIX_PATTERN: /[^\d,-]|\(|\)| /gi,
    HEX_STRING_PATTERN: /^#(?:[0-9a-f]{3}){2}$/i,
    HEX_SPLITTER_PATTERN: /.{1,2}/g,
};

/**
 *
 * @param {string} color hex color string thath match with hex pattern
 * @param {number} transparency value of transparency
 */
const hexToRgb = (color, transparency = 0) => {
    if (itsRGBA(color)) return color;
    if (itsHex(color)) {
        if (transparency < 0 || transparency > 1)
            throw new Error('Transparencyt value not valid');
        else return convertHextoRgba(color, transparency);
    } else throw new Error('Not valid Hex color');
};

/**
 *
 * @param {string} color color string that match with rgba pattern
 * @returns rgba color string
 */
const rgbToHex = (color) => {
    if (itsHex(color)) return `${color}`.toUpperCase();
    if (itsRGBA(color)) {
        const rgbaBits = getColorBits(color);
        return convertRGBABitsToHex(rgbaBits);
    } else {
        throw new Error('Not valid RGBA color');
    }
};

/**
 *
 * @param {string} color RGBA string color
 * @returns `true` if a valid RGBA color string; `false` otherwise
 */
const itsRGBA = (color) => {
    return PATTERNS.RGBA_PREFIX_PATTERN.test(color);
};

/**
 *
 * @param {string} color string color
 * @returns `true` if a hex color string; `false` otherwise
 */
const itsHex = (color) => {
    return PATTERNS.HEX_STRING_PATTERN.test(color);
};

/**
 *
 * @param {string} rgbaBits valida RGBA color string
 * @returns List of decimal values for RGBA colors
 */
const getColorBits = (rgbaBits) => {
    return `${rgbaBits}`.replace(PATTERNS.REMOVE_PREFIX_PATTERN, '').split(',');
};

/**
 *
 * @param {string} color hex color string
 * @param {number} transparency value of transparency
 */
const convertHextoRgba = (color, transparency) => {
    const processHex = color
        .toUpperCase()
        .replace('#', '')
        .match(PATTERNS.HEX_SPLITTER_PATTERN);
    if (processHex.length > 3) throw new Error('Not valid Hex color');
    else {
        const hexValues = processHex.map((value) => parseInt(value, 16));
        return `rgba(${hexValues[0]},${hexValues[1]},${hexValues[2]},${transparency})`;
    }
};

/**
 *
 * @param {string[]} rgbaBits List of decimal values for RGBA colors
 * @returns HEX Color string
 */
const convertRGBABitsToHex = (rgbaBits) => {
    //Check if a bit its a Array
    if (Array.isArray(rgbaBits)) {
        //Not considere tranparency removed
        if (rgbaBits.length === 4) rgbaBits.pop();
        //Check if bits have only 3 positions
        if (rgbaBits.length === 3) {
            const hexColor = rgbaBits
                .map((item) => {
                    //Check if value dont reach the maximum for colors
                    if (parseInt(item) > 255)
                        throw new Error('Color maximum is 255');
                    //Convert to hex value
                    const hexValue = Number(item).toString(16);
                    //Format hex value if that has only one character
                    const hexFormatted =
                        hexValue.length === 1 ? `0${hexValue}` : hexValue;
                    return hexFormatted;
                })
                .join('');
            //Add hashtag to format hex color
            return `#${hexColor}`.toUpperCase();
        } else {
            throw new Error('RGB Color only have 3 positions');
        }
    }
};

const service = { rgbToHex, hexToRgb };
export default service;
export { rgbToHex, hexToRgb };
