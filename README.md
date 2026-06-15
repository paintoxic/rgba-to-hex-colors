<h1 align="center">rgba-to-hex-colors</h1>

<p align="center">
  Tiny, zero-dependency helper to convert between <code>RGB/RGBA</code> and <code>HEX</code> color strings — in both directions, alpha included.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/rgba-to-hex-colors"><img alt="npm version" src="https://img.shields.io/npm/v/rgba-to-hex-colors?style=flat-square&color=cb3837&logo=npm"></a>
  <a href="https://www.npmjs.com/package/rgba-to-hex-colors"><img alt="npm downloads" src="https://img.shields.io/npm/dm/rgba-to-hex-colors?style=flat-square&color=blue"></a>
  <a href="https://bundlephobia.com/package/rgba-to-hex-colors"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/rgba-to-hex-colors?style=flat-square&label=minzip"></a>
  <img alt="zero dependencies" src="https://img.shields.io/badge/dependencies-0-success?style=flat-square">
  <a href="./LICENSE.md"><img alt="license" src="https://img.shields.io/npm/l/rgba-to-hex-colors?style=flat-square&color=brightgreen"></a>
</p>

---

## ✨ Features

- 🔁 **Two-way** — `RGB/RGBA → HEX` and `HEX → RGBA`
- 🎨 **Every hex form** — `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- 🫥 **Alpha-aware** — transparency is preserved in both directions
- 🪶 **Zero runtime dependencies** — nothing ships but the source
- ✅ **Battle-tested** — full test suite, validates ranges and bad input
- 📦 **Tiny** — a single small module

## 📦 Installation

```bash
npm install rgba-to-hex-colors
# or
yarn add rgba-to-hex-colors
# or
pnpm add rgba-to-hex-colors
```

## 🚀 Usage

```js
import { rgbToHex, hexToRgb } from 'rgba-to-hex-colors';

rgbToHex('rgb(255, 255, 255)'); // '#FFFFFF'
rgbToHex('rgba(255, 255, 255, 0.5)'); // '#FFFFFF80'

hexToRgb('#FFFFFF'); // 'rgba(255,255,255,1)'
hexToRgb('#FFFFFF80'); // 'rgba(255,255,255,0.502)'
```

## 📖 API

### `rgbToHex(color)`

Convert an `rgb()`/`rgba()` string to a HEX string. Returns `#RRGGBB`, or
`#RRGGBBAA` when an alpha below `1` is present. Throws on invalid input or
channels outside `0–255`.

| Param   | Type     | Description           |
| ------- | -------- | --------------------- |
| `color` | `string` | RGB/RGBA color string |

**Returns** `string` — the HEX color (uppercased).

### `hexToRgb(color, transparency = 1)`

Convert a HEX string to an `rgba()` string. When the HEX carries its own alpha
(`#RGBA` / `#RRGGBBAA`) that value wins; otherwise `transparency` is used.
Throws on an invalid hex or a `transparency` outside `0–1`.

| Param          | Type     | Default | Description                                        |
| -------------- | -------- | ------- | -------------------------------------------------- |
| `color`        | `string` | —       | HEX color (`#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`) |
| `transparency` | `number` | `1`     | Alpha (`0–1`) used when the HEX has no alpha        |

**Returns** `string` — the `rgba(...)` color string.

## 🎨 Conversion reference

| Input                      | Method      | Output                    |
| -------------------------- | ----------- | ------------------------- |
| `rgb(255, 255, 255)`       | `rgbToHex`  | `#FFFFFF`                 |
| `rgba(255, 255, 255, 0.5)` | `rgbToHex`  | `#FFFFFF80`               |
| `rgb(1, 2, 3)`             | `rgbToHex`  | `#010203`                 |
| `#FFF`                     | `hexToRgb`  | `rgba(255,255,255,1)`     |
| `#FFFFFF`                  | `hexToRgb`  | `rgba(255,255,255,1)`     |
| `#FFFFFF80`                | `hexToRgb`  | `rgba(255,255,255,0.502)` |

## 🛠️ Development

```bash
git clone https://github.com/paintoxic/rgba-to-hex-colors.git
cd rgba-to-hex-colors
npm install
npm test      # run the suite with coverage
npm run lint  # eslint
npm run style # prettier check
```

## 🤝 Contributing

Issues and PRs are welcome. Please make sure `npm test`, `npm run lint` and
`npm run style` pass before opening a pull request.

## 📄 License

[MIT](./LICENSE.md) © [Paintoxic](https://github.com/paintoxic)
