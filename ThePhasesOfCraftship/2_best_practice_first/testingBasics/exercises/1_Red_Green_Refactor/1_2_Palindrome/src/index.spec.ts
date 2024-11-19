import { PalindromeChecker } from ".";

describe("PalindromeChecker", () => {
  describe("isItAPalindrome", () => {
    it.each([
      "mom",
      "Mom",
      "MoM",
      "xMomx",
      "Was It A Rat I Saw",
      "Never Odd or Even",
      "1Never Odd or Even1",
    ])("should check if %p is a palindrome and give a positive", (value) => {
      expect(PalindromeChecker.isItAPalindrome(value)).toBe(true);
    });

    it.each(["Momx", "Never Odd or Even1"])(
      "should check if %p is a palindrome and give a negative",
      (value) => {
        expect(PalindromeChecker.isItAPalindrome(value)).toBe(false);
      }
    );
  });
});
