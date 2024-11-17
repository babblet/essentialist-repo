export const fizzbuzz = (n: number): string => {
  if (n < 1 || n > 100) {
    throw new Error("Input must be between 1 and 100");
  }

  let result = "";

  if (n % 3 === 0) {
    result += "Fizz";
  }

  if (n % 5 === 0) {
    result += "Buzz";
  }

  return result || n.toString();
};