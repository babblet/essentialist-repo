import { fizzbuzz } from ".";

describe("fizzbuzz", () => {
  it("should return a string", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
  });

  it("should return 'Fizz' for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });
});