import { PalindromeChecker } from ".";

describe("PalindromeChecker", () => {
  describe("isItAPalindrome", () => {
    it.each([
      [true, "mom"],
      [true, "Mom"],
      [true, "MoM"],
      [false, "Momx"],
      [true, "xMomx"],
      [true, "Was It A Rat I Saw"],
      [true, "Never Odd or Even"],
      [false , "Never Odd or Even1"],
      [true , "1Never Odd or Even1"],
    ])("should return %p for input %p", (result, value) => {
      expect(PalindromeChecker.isItAPalindrome(value)).toBe(result);
    });
  });
});
