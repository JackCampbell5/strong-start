import { reformatTitle } from "#utils/filter-create-utils.js";

describe("reformatTitle function", () => {
  it("Hi Hello", () => {
    expect(reformatTitle("Hi Hello")).toBe("hi_hello");
  });
  it("Hi_Hello ", () => {
    expect(reformatTitle("Hi_Hello")).toBe("hi_hello");
  });
  it("hi hello ", () => {
    expect(reformatTitle("hi hello")).toBe("hi_hello");
  });
});
