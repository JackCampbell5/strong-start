import { prettyPrintService } from "#api-helpers/service-param-standardize.js";

describe("prettyPrintService function", () => {
  it("hi_hello", () => {
    expect(prettyPrintService("hi_hello")).toBe("Hi Hello");
  });
  it("hi_hello_hi", () => {
    expect(prettyPrintService("hi_hello_hi")).toBe("Hi Hello Hi");
  });
  it("hi ", () => {
    expect(prettyPrintService("hi")).toBe("Hi");
  });
});
