import { calcDistance } from "#search/dist-utils.js";

const cords1a = { longitude: 45, latitude: 45 };
const cords1b = { longitude: 46, latitude: 46 };

const cords2a = { longitude: 87.87, latitude: 47.87 };
const cords2b = { longitude: 88.2, latitude: 48.2 };

describe("calcDistance function", () => {
  it("Random cords", () => {
    expect(Math.round(calcDistance(cords1a, cords1b) * 100) / 100).toBe(84.37);
  });
  //   This test fails due to discrepancies between the haversine formula and online calculators which can account for more things
  it("Other Random cords", () => {
    expect(Math.round(calcDistance(cords2a, cords2b) * 100) / 100).toBe(22.81);
  });
  it("Should be invertible", () => {
    expect(calcDistance(cords1a, cords1b)).toBe(calcDistance(cords1b, cords1a));
  });
});
