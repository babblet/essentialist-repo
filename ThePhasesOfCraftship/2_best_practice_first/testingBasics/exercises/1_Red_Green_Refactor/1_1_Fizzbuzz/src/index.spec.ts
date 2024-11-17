import { fizzbuzz } from ".";

describe("fizzbuzz", () => {
  it("should return a string", () => {
    expect(typeof fizzbuzz(1)).toBe("string");
  });

  it.each([3,9,42])("should return 'Fizz' for multiples of 3", (n) => {
    expect(fizzbuzz(n)).toBe("Fizz");
  });

  it.each([5,25])("should return 'Buzz' for multiples of 5", (n) => {
    expect(fizzbuzz(n)).toBe("Buzz");
  });

  it.each([1,43])("should return n as a string for numbers that are not multiples of 3 or 5", (n) => {
    expect(fizzbuzz(n)).toBe(n.toString());
  });

  it.each([15,45])("should return 'FizzBuzz' for multiples of 3 and 5", (n) => {
    expect(fizzbuzz(n)).toBe("FizzBuzz");
  });

  it.each([-12, 0, 101, 102, "" as unknown as number])("should not allow numbers outside of 1-100 as input", (n) => {
    expect(() => fizzbuzz(n)).toThrow();
  });
});