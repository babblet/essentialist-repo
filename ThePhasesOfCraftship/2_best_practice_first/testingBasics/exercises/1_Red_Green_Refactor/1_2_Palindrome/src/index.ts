export class PalindromeChecker {
  private static removeWhitespace(input: string): string {
    return input.replace(/ /g, "");
  }

  private static reverse(input: string): string {
    return input.split("").reverse().join("");
  }

  public static isItAPalindrome(input: string): boolean {
    const formatedInput = this.removeWhitespace(input.toLowerCase());
    const reversedInput = this.reverse(formatedInput);

    return formatedInput === reversedInput;
  }
}
