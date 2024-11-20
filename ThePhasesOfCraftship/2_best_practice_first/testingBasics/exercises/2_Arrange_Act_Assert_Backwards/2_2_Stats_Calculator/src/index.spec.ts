import { StatsCalculator } from '.';

describe('stats calculator', () => {
  it('should return an result', () => {
    const input = [1, 2, 3, 4, 5];
    const result = StatsCalculator.calculate(input);
    expect(result).toBeDefined();
  })

  it('should calculate the correct min value for [1,2,3,4,5]', () => {
    const input = [1, 2, 3, 4, 5];
    const result = StatsCalculator.calculate(input);
    expect(result.min).toBe(1);
  })
})