import { MilitartTimeValidator } from './index';

describe('military time validator', () => {
  it('knows that an empty string is an invalid military time', () => {
    const militaryTime = '';
    expect(MilitartTimeValidator.validate(militaryTime)).toBe(false)
  })
})
