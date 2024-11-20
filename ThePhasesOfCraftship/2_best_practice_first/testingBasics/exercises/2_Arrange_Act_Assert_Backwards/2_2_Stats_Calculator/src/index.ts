export type StatsResult = {
  min: number,
  max: number,
  count: number,
  avg: number
}

/**
 * A utility class for calculating stats from Integers.
 *
 * This class provides a single static method to calculate the minimum, maximum,
 * number of elements, and average, from a sequence of integers.
 *
 * @example Usage of `PasswordValidator`:
 * ```typescript
 * const input: number[] = [1,2,3,4,5];
 * const result: StatsResult = StatsCalculator.calculate(input);
 * console.log(result); // { min: 1, max: 5, count: 5, avg: 3 }
 * ```
 */
export class StatsCalculator {
  private static getMinValue(input: number[]): number {
    return input.sort((a, b) => a - b)[0];
  }

  public static calculate(input: number[]): StatsResult {
    return { min: this.getMinValue(input), max: 0, count: 0, avg: 0 };
  }
}