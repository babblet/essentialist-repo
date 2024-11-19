import { PasswordValidationError, PasswordValidator } from '.'

describe('Password Validator', () => {
  it.each([
    "Test1",
    "Test4Pass",
    "someThing4u",
    "thisIsGreat4me",
  ])('knows that "%s" is valid', (password) => {
    const result = PasswordValidator.validate(password);
    expect(result.result).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  })

  describe('Password has to be between 5 and 15 characters long', () => {
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
    it('knows that "TeStInG" has missing digit', () => {
      const password = "TeStInG";
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toContain(PasswordValidationError.Digit);      
    })
  })

  describe('Contains at least one upper case letter', () => {
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

      it('knows that "AVeryLongPassword" has missing length and digit', () => {
        const password = "AVeryLongPassword";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.Digit);
      })
    })

    describe('Result for missing length and upper case letter', () => {
      it('knows that "pa55" has missing length and upper case letter', () => {
        const password = "pa55";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })

      it('knows that "pa55pa55pa55pa55pa55" has missing length and upper case letter', () => {
        const password = "pa55pa55pa55pa55pa55";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })
    })

    describe('Result for missing digit and upper case letter', () => {
      it('knows that "testing" has missing digit and upper case letter', () => {
        const password = "testing";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Digit);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })

      it('knows that "testingtesting" has missing digit and upper case letter', () => {
        const password = "testingtesting";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Digit);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })
    })

    describe('Result for missing all criterias', () => {
      it('knows that "test" has missing all criterias', () => {
        const password = "test";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.Digit);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })

      it('knows that "testtesttest" has missing all criterias', () => {
        const password = "testtesttesttest";
        const result = PasswordValidator.validate(password);
        expect(result.result).toBeFalsy();
        expect(result.errors).toContain(PasswordValidationError.Length);
        expect(result.errors).toContain(PasswordValidationError.Digit);
        expect(result.errors).toContain(PasswordValidationError.UpperCase);
      })
    })
  })
})


