
const PATTERNS = {
  RGBA_PREFIX_PATTERN: /^rgb\(|^rgba\(/,
  REMOVE_PREFIX_PATTERN: /[^\d,-]|\(|\)| /ig
}

const rgbToHex = (color) => {
  const itsRgba = itsRGBA(color)
  if (itsRgba) {
    const rgbaBits = getColorBits(color)
    return convertRGBABitsToHex(rgbaBits)
  } else {
    throw new Error("Not valid RBGA color")
  }
}

/**
 * 
 * @param {string} color RGBA string color
 * @returns `true` if a valid RGBA color string; `false` otherwise
 */
const itsRGBA = (color) => { return PATTERNS.RGBA_PREFIX_PATTERN.test(color) }

/**
 * 
 * @param {string} rgbaBits valida RGBA color string
 * @returns List of decimal values for RGBA colors
 */
const getColorBits = (rgbaBits) => { return `${rgbaBits}`.replace(PATTERNS.REMOVE_PREFIX_PATTERN, "").split(",") }

/**
 * 
 * @param {string[]} rgbaBits List of decimal values for RGBA colors
 * @returns HEX Color string
 */
const convertRGBABitsToHex = (rgbaBits) => {
  //Check if a bit its a Array
  if (Array.isArray(rgbaBits)) {
    //Not considere tranparency removed
    if (rgbaBits.length === 4) rgbaBits.pop()
    //Check if bits have only 3 positions
    if (rgbaBits.length === 3) {
      const hexColor = rgbaBits.map(item => {
        //Check if value dont reach the maximum for colors
        if (parseInt(item) > 255) throw new Error("Color maximum is 255")
        //Convert to hex value
        const hexValue = Number(item).toString(16)
        //Format hex value if that has only one character
        const hexFormatted = hexValue.length === 1 ? `0${hexValue}` : hexValue
        return hexFormatted
      }).join("")
      //Add hashtag to format hex color
      return `#${hexColor}`.toUpperCase()
    } else {
      throw new Error("RGB Color only have 3 positions")
    }
  }
}

export default rgbToHex
export {
  rgbToHex
}