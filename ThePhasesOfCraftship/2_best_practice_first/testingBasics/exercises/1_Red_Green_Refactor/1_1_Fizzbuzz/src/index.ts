export const fizzbuzz = (n: number): string => {
  let result = "";

  if (n % 3 === 0) {
    result += "Fizz";
  }

  if (n % 5 === 0) {
    result += "Buzz";
  }

  return result || n.toString();
};