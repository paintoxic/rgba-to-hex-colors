const PATTERNS = {
    RGBA_PREFIX_PATTERN: /^rgba?\(/i,
    // keep digits, dot, comma and minus (so alpha decimals like 0.5 survive)
    REMOVE_PREFIX_PATTERN: /[^\d.,-]/g,
    // #RGB, #RGBA, #RRGGBB, #RRGGBBAA
    HEX_STRING_PATTERN: /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i,
};

/**
 * @param {string} color
 * @returns {boolean} `true` if the string looks like an rgb()/rgba() color
 */
const itsRGBA = (color) => PATTERNS.RGBA_PREFIX_PATTERN.test(color);

/**
 * @param {string} color
 * @returns {boolean} `true` if the string is a valid HEX color
 */
const itsHex = (color) => PATTERNS.HEX_STRING_PATTERN.test(color);

/**
 * @param {string} rgba rgb()/rgba() color string
 * @returns {string[]} list of the numeric components as strings
 */
const getColorBits = (rgba) =>
    `${rgba}`
        .replace(PATTERNS.REMOVE_PREFIX_PATTERN, '')
        .split(',')
        .filter((value) => value !== '');

/**
 * Expand shorthand hex (#RGB / #RGBA) to its full form (RRGGBB / RRGGBBAA).
 * @param {string} hex hex digits, without the leading '#'
 * @returns {string} the expanded hex digits
 */
const expandHex = (hex) =>
    hex.length === 3 || hex.length === 4
        ? hex
              .split('')
              .map((char) => char + char)
              .join('')
        : hex;

/**
 * @param {string|number} value decimal value for a single channel (0-255)
 * @returns {string} two-character hex byte
 */
const toHexByte = (value) => {
    const n = Number(value);
    if (Number.isNaN(n) || n < 0 || n > 255) {
        throw new Error(`Color value out of range (0-255): ${value}`);
    }
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * @param {string} color hex color string (any supported length)
 * @param {number} transparency alpha (0-1) used when the hex carries no alpha
 * @returns {string} rgba color string
 */
const convertHexToRgba = (color, transparency) => {
    const hex = expandHex(color.replace('#', '')).toUpperCase();
    const pairs = hex.match(/.{2}/g);
    const [r, g, b, a] = pairs.map((value) => parseInt(value, 16));
    const alpha =
        pairs.length === 4 ? Number((a / 255).toFixed(3)) : transparency;
    return `rgba(${r},${g},${b},${alpha})`;
};

/**
 * @param {string[]} bits numeric channel components (3 or 4)
 * @returns {string} hex color string (#RRGGBB or #RRGGBBAA)
 */
const convertRgbaBitsToHex = (bits) => {
    if (bits.length !== 3 && bits.length !== 4) {
        throw new Error('RGB(A) color must have 3 or 4 components');
    }
    const [r, g, b, a] = bits;
    let hex = `${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
    if (bits.length === 4) {
        const alpha = Number(a);
        if (Number.isNaN(alpha) || alpha < 0 || alpha > 1) {
            throw new Error('Alpha must be between 0 and 1');
        }
        // only carry the alpha byte when the color is not fully opaque
        if (alpha < 1) hex += toHexByte(Math.round(alpha * 255));
    }
    return `#${hex}`.toUpperCase();
};

/**
 * Convert a HEX color string to an RGBA color string.
 *
 * @param {string} color HEX color (#RGB, #RGBA, #RRGGBB or #RRGGBBAA)
 * @param {number} [transparency=1] alpha (0-1) used when the HEX has no alpha
 * @returns {string} rgba color string
 */
const hexToRgb = (color, transparency = 1) => {
    if (itsRGBA(color)) return color;
    if (!itsHex(color)) throw new Error('Not a valid HEX color');
    if (transparency < 0 || transparency > 1) {
        throw new Error('Transparency value not valid (0-1)');
    }
    return convertHexToRgba(color, transparency);
};

/**
 * Convert an RGB/RGBA color string to a HEX color string.
 * Emits #RRGGBB, or #RRGGBBAA when alpha is present and below 1.
 *
 * @param {string} color RGB/RGBA color string
 * @returns {string} HEX color string
 */
const rgbToHex = (color) => {
    if (itsHex(color)) return `${color}`.toUpperCase();
    if (!itsRGBA(color)) throw new Error('Not a valid RGBA color');
    return convertRgbaBitsToHex(getColorBits(color));
};

const service = { rgbToHex, hexToRgb };
export default service;
export { rgbToHex, hexToRgb };
