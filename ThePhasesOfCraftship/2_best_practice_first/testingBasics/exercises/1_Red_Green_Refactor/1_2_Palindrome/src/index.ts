export class PalindromeChecker {
  private static removeWhitespace(input: string): string {
    return input.replace(/ /g, "");
  }

  public static isItAPalindrome(input: string): boolean {
    const reverse = input.split("").reverse().join("");
    return (
      this.removeWhitespace(input.toLowerCase()) ===
      this.removeWhitespace(reverse.toLowerCase())
    );
  }
}

