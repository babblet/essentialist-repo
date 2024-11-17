import { fizzbuzz } from ".";

describe("fizzbuzz", () => {
  it("should return a string", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
  });

  it("should return 'Fizz' for multiples of 3", () => {
    expect(fizzbuzz(3)).toBe("Fizz");
  });

  it("should return 'Buzz' for multiples of 5", () => {
    expect(fizzbuzz(5)).toBe("Buzz");
  });

  it("should return n as a string for numbers that are not multiples of 3 or 5", () => {
    expect(fizzbuzz(1)).toBe("1");
  });

  it("should return 'FizzBuzz' for multiples of 3 and 5", () => {
    expect(fizzbuzz(15)).toBe("FizzBuzz");
  });

  it("should only allow numbers from 1-100 as input", () => {
    expect(() => fizzbuzz(0)).toThrow();
    expect(() => fizzbuzz(101)).toThrow();
    expect(() => fizzbuzz(50)).not.toThrow();
  });
});