import { MilitartTimeValidator } from './index';

describe('military time validator', () => {
  it('knows that an empty string is an invalid military time', () => {
    const militaryTime = '';
    expect(MilitartTimeValidator.validate(militaryTime)).toBe(false)
  })

  it('knows that "01:12 - 14:32" is a valid military time', () => {
    const militaryTime = '01:12 - 14:32';
    expect(MilitartTimeValidator.validate(militaryTime)).toBe(true)
  })
})
