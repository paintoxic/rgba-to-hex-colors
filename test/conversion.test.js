import { rgbToHex } from "../src";

test("Conversion", () => {
  expect(rgbToHex("rgb(255, 255, 255)")).toBe("#FFFFFF")
})