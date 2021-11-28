import { rgbToHex, hexToRgb } from '../src';

test('rgb_conversion', () => {
    expect(rgbToHex('rgb(255, 255, 255)')).toBe('#FFFFFF');
});

test('hex_conversion', () => {
    expect(hexToRgb('#FFFFFF')).toBe('rgba(255,255,255,0)');
});
