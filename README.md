# rgba-to-hex-colors

[![MIT License][license-image]][license]

rgba-to-hex-colors is a helper to convert an RGB/RGBA color string to a HEX
color string and back.

It supports `#RGB`, `#RGBA`, `#RRGGBB` and `#RRGGBBAA` hex forms, and preserves
the alpha channel in both directions.

### **Example**

```
'rgb(255, 255, 255)'      ==> '#FFFFFF'
'rgba(255, 255, 255, 0.5)' ==> '#FFFFFF80'
'#FFFFFF'   ==> 'rgba(255,255,255,1)'
'#FFFFFF80' ==> 'rgba(255,255,255,0.502)'
'#FFF'      ==> 'rgba(255,255,255,1)'
```

### Methods

| Method   | Function                            |
| -------- | ----------------------------------- |
| rgbToHex | Convert an RGB/RGBA string to HEX   |
| hexToRgb | Convert a HEX string to RGBA        |

### **How to use**

## rgbToHex

`rgbToHex(color)` — returns `#RRGGBB`, or `#RRGGBBAA` when an alpha below 1 is
present. Throws on invalid input or out-of-range channels.

```js
const { rgbToHex } = require('rgba-to-hex-colors');

rgbToHex('rgb(255, 255, 255)'); // '#FFFFFF'
rgbToHex('rgba(255, 255, 255, 0.5)'); // '#FFFFFF80'
```

## hexToRgb

`hexToRgb(color, transparency = 1)` — converts HEX to an `rgba(...)` string.
When the HEX carries its own alpha (`#RRGGBBAA` / `#RGBA`) that value wins;
otherwise `transparency` (default `1`) is used.

```js
const { hexToRgb } = require('rgba-to-hex-colors');

hexToRgb('#FFFFFF'); // 'rgba(255,255,255,1)'
hexToRgb('#FFFFFF', 0.3); // 'rgba(255,255,255,0.3)'
hexToRgb('#FFFFFF80'); // 'rgba(255,255,255,0.502)'
```

> **Breaking change in 2.0.0:** the default alpha for `hexToRgb` is now `1`
> (opaque) instead of `0`. Added `#RGB`, `#RGBA` and `#RRGGBBAA` support, and
> `rgbToHex` now keeps the alpha as `#RRGGBBAA` when it is below 1.

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE.md
