import { PasswordValidator } from '.'

describe('Password Validator', () => {
  describe('Password has to be between 5 and 15 characters long', () => {
    it('knows that "Test1" is valid', () => {
      const password = "Test1";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    })
  })
})


