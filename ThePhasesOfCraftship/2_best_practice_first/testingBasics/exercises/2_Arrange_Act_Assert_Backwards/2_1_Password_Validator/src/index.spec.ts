import { PasswordValidationError, PasswordValidator } from '.'

describe('Password Validator', () => {
  describe('Password has to be between 5 and 15 characters long', () => {
    it('knows that "Test1" is valid', () => {
      const password = "Test1";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    })

    it('knows that "Pa55" has invalid length', () => {
      const password = "Pa55";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(PasswordValidationError.Length);      
    })

    it('knows that "ALongPassword12345" has invalid length', () => {
      const password = "ALongPassword12345";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(PasswordValidationError.Length);      
    })
  })

  describe('Contains at least one digit', () => {
    it('knows that "Test4Pass" is valid', () => {
      const password = "Test4Pass";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    })

    it('knows that "TeStInG" has missing digit', () => {
      const password = "TeStInG";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(PasswordValidationError.Digit);      
    })
  })

  describe('Contains at least one upper case letter', () => {
    it('knows that "someThing4u" is valid', () => {
      const password = "someThing4u";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeTruthy();
      expect(result.errors).toHaveLength(0);
    })

    it('knows that "password123" has missing upper case letter', () => {
      const password = "password123";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(PasswordValidationError.UpperCase);      
    })
  })

  describe("It can return multiple errors", () => {
    describe('Result for missing length and digit criterias', () => {
      it('knows that "Test" has missing length and digit', () => {
        const password = "Test";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.Digit);
      })
    })
  })
})


