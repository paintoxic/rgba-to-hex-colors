import { rgbToHex, hexToRgb } from '../src';

describe('rgbToHex', () => {
    test('rgb -> hex', () => {
        expect(rgbToHex('rgb(255, 255, 255)')).toBe('#FFFFFF');
    });

    test('black', () => {
        expect(rgbToHex('rgb(0,0,0)')).toBe('#000000');
    });

    test('pads single-digit channels', () => {
        expect(rgbToHex('rgb(1,2,3)')).toBe('#010203');
    });

    test('opaque rgba drops the alpha', () => {
        expect(rgbToHex('rgba(255,255,255,1)')).toBe('#FFFFFF');
    });

    test('rgba with alpha -> 8-digit hex', () => {
        expect(rgbToHex('rgba(255,255,255,0.5)')).toBe('#FFFFFF80');
    });

    test('hex passes through uppercased', () => {
        expect(rgbToHex('#abcdef')).toBe('#ABCDEF');
    });

    test('throws when a channel is over 255', () => {
        expect(() => rgbToHex('rgb(256,0,0)')).toThrow();
    });

    test('throws on garbage input', () => {
        expect(() => rgbToHex('hello')).toThrow();
    });
});

describe('hexToRgb', () => {
    test('hex -> rgba with default alpha 1', () => {
        expect(hexToRgb('#FFFFFF')).toBe('rgba(255,255,255,1)');
    });

    test('shorthand #RGB', () => {
        expect(hexToRgb('#FFF')).toBe('rgba(255,255,255,1)');
    });

    test('8-digit hex parses the embedded alpha', () => {
        expect(hexToRgb('#FFFFFF80')).toBe('rgba(255,255,255,0.502)');
    });

    test('custom transparency', () => {
        expect(hexToRgb('#000000', 0.3)).toBe('rgba(0,0,0,0.3)');
    });

    test('rgba passes through untouched', () => {
        expect(hexToRgb('rgba(1,2,3,0.4)')).toBe('rgba(1,2,3,0.4)');
    });

    test('throws on an invalid hex length', () => {
        expect(() => hexToRgb('#FFFFF')).toThrow();
    });

    test('throws when transparency is out of range', () => {
        expect(() => hexToRgb('#FFFFFF', 2)).toThrow();
    });
});
