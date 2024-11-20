import { StatsCalculator, StatsResult } from '.';

const exampleData = [
  { input: [1, 2, 3, 4, 5],      output: { min: 1, max: 5, count: 5, avg: 3 } },
  { input: [-1, -2, -3, -4, -5], output: { min: -5, max: -1, count: 5, avg: -3 } },
  { input: [1, -2, 3, -4, 5],    output: { min: -4, max: 5, count: 5, avg: 0.6 } }
].map(({ input, output }): [number[], StatsResult] => [input, output]);

describe('stats calculator', () => {
  it('should return an result', () => {
    const input = [1, 2, 3, 4, 5];
    const result = StatsCalculator.calculate(input);
    expect(result).toBeDefined();
  })

  it.each(exampleData)('should calculate the correct min value for %s', (input, output) => {
    const result = StatsCalculator.calculate(input);
    expect(result.min).toBe(output.min);
  })

  it.each(exampleData)('should calculate the correct max value for %s', (input, output) => {
    const result = StatsCalculator.calculate(input);
    expect(result.max).toBe(output.max);
  })

  it.each(exampleData)('should calculate the correct count value for %s', (input, output) => {
    const result = StatsCalculator.calculate(input);
    expect(result.count).toBe(output.count);
  })
})