import { getPopular } from "#utils/api-helpers/nonprofit-stat-utils.js";
describe("getPopular function", () => {
  it("Output 3 and 2 as they are the most popular ", () => {
    expect(getPopular([1, 3, 3, 2, 2, 3])).toBe("3, 2");
  });

  it("If only one should output one", () => {
    expect(getPopular(["Banking"])).toBe("Banking");
  });

  it("Should also work on strings", () => {
    expect(getPopular(["Hi", "Hello", "Hi", "Bye", "Bye", "Hi"])).toBe(
      "Hi, Bye"
    );
  });
  it("should throw an error with the expected message", () => {
    expect(() => getPopular("[2, 1]")).toThrow(
      new Error("List must be an array")
    );
  });
});
