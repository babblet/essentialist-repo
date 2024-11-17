import { PalindromeChecker } from ".";

describe("PalindromeChecker", () => {
  describe("isItAPalindrome", () => {
    it.each([
      [true, "mom"],
      [true, "Mom"],
      [true, "MoM"],
      [false, "Momx"],
      [true, "xMomx"],
    ])("should return %p for input %p", (result, value) => {
      expect(PalindromeChecker.isItAPalindrome(value)).toBe(result);
    });

    it.todo('should return true for input "Was It A Rat I Saw"');
    it.todo('should return true for input "Never Odd or Even"');
    it.todo('should return false for input "Never Odd or Even1"');
    it.todo('should return true for input "1Never Odd or Even1"');
  });
});
