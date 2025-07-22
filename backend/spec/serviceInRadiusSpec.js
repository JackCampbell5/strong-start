// Node Module Imports
import seedrandom from "seedrandom";

// Local Module Imports
import { serviceInPerimeter } from "#search/dist-utils.js";

describe("serviceInPerimeter function", () => {
  let rng = seedrandom(0);
  function randomInRange(min, max) {
    return rng() * (max - min) + min;
  }
  const mainRange = {
    low: { longitude: -122, latitude: 45 },
    high: { longitude: -121, latitude: 47 },
  };
  beforeAll(() => {
    const seed = jasmine.getEnv().seed;
    if (seed) {
      rng = seedrandom(seed);
    }
  });
  it("Inside", () => {
    let service = { longitude: -121.5, latitude: 46.5 };
    expect(serviceInPerimeter(mainRange, service)).toBe(true);
  });
  it("Outside lat", () => {
    let service = { longitude: -121.5, latitude: 48.5 };
    expect(serviceInPerimeter(mainRange, service)).toBe(false);
  });

  it("Outside long", () => {
    let service = { longitude: -123.5, latitude: 46.5 };
    expect(serviceInPerimeter(mainRange, service)).toBe(false);
  });
  it("Outside both", () => {
    let service = { longitude: -123.5, latitude: 48.5 };
    expect(serviceInPerimeter(mainRange, service)).toBe(false);
  });
  it("On Border ", () => {
    let service = { longitude: -122, latitude: 47 };
    expect(serviceInPerimeter(mainRange, service)).toBe(true);
  });
});
