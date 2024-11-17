import { PalindromeChecker } from '.'

describe('PalindromeChecker', () => {
  describe('isItAPalindrome', () => {
    it('should return true for input "mom"', () => {
      expect(PalindromeChecker.isItAPalindrome('mom')).toBe(true)
    })

    it.todo('should return true for input "Mom"')
    it.todo('should return true for input "MoM"')
    it.todo('should return false for input "Momx"')
    it.todo('should return true for input "xMomx"')
    it.todo('should return true for input "Was It A Rat I Saw"')
    it.todo('should return true for input "Never Odd or Even"')
    it.todo('should return false for input "Never Odd or Even1"')
    it.todo('should return true for input "1Never Odd or Even1"')
  })
})