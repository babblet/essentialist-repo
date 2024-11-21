import { MilitartTimeValidator } from './index';

describe('military time validator', () => {
  it.each([
    '',
    '1:12 - 14:32',
    '01:12 - 1:32'
  ])('knows that %s is an invalid military time', (militaryTime) => {
    expect(MilitartTimeValidator.validate(militaryTime)).toBe(false)
  })

  it('knows that "01:12 - 14:32" is a valid military time', () => {
    const militaryTime = '01:12 - 14:32';
    expect(MilitartTimeValidator.validate(militaryTime)).toBe(true)
  })
})
