import { addMilesToLong, addMilesToLat } from "#search/dist-utils.js";

describe("addMilesToLong function", () => {
  it("Adding 50 miles", () => {
    expect(Math.round(addMilesToLong(45, 45, 50) * 100) / 100).toBe(46.02);
  });
  it("Adding 1 mile ", () => {
    expect(Math.round(addMilesToLong(45, 45, 1) * 100) / 100).toBe(45.02);
  });
  it("Adding 25 miles ", () => {
    expect(Math.round(addMilesToLong(45, 45, 25) * 100) / 100).toBe(45.51);
  });
});

describe("addMilesToLat function", () => {
  it("Adding 50 miles", () => {
    expect(Math.round(addMilesToLat(45, 45, 50) * 100) / 100).toBe(45.72);
  });
  it("Adding 1 mile ", () => {
    expect(Math.round(addMilesToLat(45, 45, 1) * 100) / 100).toBe(45.01);
  });
  it("Adding 25 miles ", () => {
    expect(Math.round(addMilesToLat(45, 45, 25) * 100) / 100).toBe(45.36);
  });
});
