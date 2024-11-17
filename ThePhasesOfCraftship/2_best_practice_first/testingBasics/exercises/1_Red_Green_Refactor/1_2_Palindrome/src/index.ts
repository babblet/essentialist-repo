export class PalindromeChecker {
  public static isItAPalindrome(input: string): boolean {
    const reverse = input.split("").reverse().join("");
    return input.toLowerCase() === reverse.toLowerCase();
  }
}