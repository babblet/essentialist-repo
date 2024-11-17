export class PalindromeChecker {
  private static removeWhitespace(input: string): string {
    return input.replace(/ /g, "");
  }

  private static reverse(input: string): string {
    return input.split("").reverse().join("");
  }

  public static isItAPalindrome(input: string): boolean {
    return (
      this.removeWhitespace(input.toLowerCase()) ===
      this.removeWhitespace(this.reverse(input).toLowerCase())
    );
  }
}
