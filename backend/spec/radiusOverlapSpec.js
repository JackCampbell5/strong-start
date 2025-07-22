// Node Module Imports
import seedrandom from "seedrandom";

// Local Module Imports
import { perimeterOverlap } from "#search/dist-utils.js";

describe("perimeterOverlap function", () => {
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
  it("Not At All", () => {
    const lat = randomInRange(-120, 170);
    const long = randomInRange(48, 80);
    const check1 = {
      low: {
        longitude: lat,
        latitude: long,
      },
      high: {
        longitude: lat + randomInRange(1, 10),
        latitude: long + randomInRange(1, 10),
      },
    };

    expect(perimeterOverlap(mainRange, check1)).toBe(false);
  });
  it("Lat correct ", () => {
    const lat = randomInRange(-121, -121.5);
    const long = randomInRange(48, 80);
    const check1 = {
      low: {
        longitude: lat,
        latitude: long,
      },
      high: {
        longitude: lat + 0.5,
        latitude: long + randomInRange(1, 10),
      },
    };

    expect(perimeterOverlap(mainRange, check1)).toBe(false);
  });
  it("All correct ", () => {
    const lat = randomInRange(-121, -121.5);
    const long = randomInRange(45, 46.5);
    const check1 = {
      low: {
        longitude: lat,
        latitude: long,
      },
      high: {
        longitude: lat + 0.5,
        latitude: long + 0.5,
      },
    };

    expect(perimeterOverlap(mainRange, check1)).toBe(true);
  });
  it("On the border ", () => {
    const lat = -122;
    const long = 47;
    const check1 = {
      low: {
        longitude: lat,
        latitude: long,
      },
      high: {
        longitude: lat + randomInRange(1, 10),
        latitude: long + randomInRange(1, 10),
      },
    };
    expect(perimeterOverlap(mainRange, check1)).toBe(true);
  });
});
