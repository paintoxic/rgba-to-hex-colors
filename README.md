# rgba-to-hex-colors

[![MIT License][license-image]][license]

rgba-to-hex-colors is a helper to convert RGBA Color String to Hex color string and back

### **Example**

```
'rgba(255, 255, 255)' ==> '#FFFFFF'
'#FFFFFF' ==> 'rgba(255,255,255,0)'
```

### Methods

| Method   | Function                         |
| -------- | -------------------------------- |
| rgbToHex | Convert RGBA to Hex color string |
| hexToRgb | Convert Hex to RGBA color string |

### **How to use**

## rgbToHex

```js
const { rgbToHex } = require('rgba-to-hex-colors');

const hexColor = rgbToHex('rgba(255, 255, 255)');

// expected output: string '#FFFFFF'
```

## hexToRgb

```js
const { hexToRgb } = require('rgba-to-hex-colors');

const hexColor = hexToRgb('#FFFFFF');

// expected output: string 'rgba(255,255,255,0)'
```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE.md
