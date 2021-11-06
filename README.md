# rbga-to-hex-colors

[![MIT License][license-image]][license] 

rbga-to-hex-colors is a helper to convert RGBA Color String to Hex color string

### **Example**

```
"rgba(255, 255, 255)" ==> "#FFFFFF"
```

### **How to use**

```js

const { rgbToHex } = require("rbga-to-hex-colors")

const hexColor = rgbToHex("rgba(255, 255, 255)")

// expected output: string "#FFFFFF"

```

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE.md
