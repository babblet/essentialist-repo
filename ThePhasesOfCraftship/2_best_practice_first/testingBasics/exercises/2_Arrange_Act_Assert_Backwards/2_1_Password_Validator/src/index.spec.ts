import { PasswordValidationError, PasswordValidator } from ".";

const validPasswords = ["Test1", "Test4Pass", "someThing4u", "thisIsGreat4me"];
const invalidPasswordsWithErrors = [
  { password: "Pa55", errors: [PasswordValidationError.Length] },
  { password: "ALongPassword12345", errors: [PasswordValidationError.Length] },
  { password: "TeStInG", errors: [PasswordValidationError.Digit] },
  { password: "password123", errors: [PasswordValidationError.UpperCase] },
  {
    password: "Test",
    errors: [PasswordValidationError.Length, PasswordValidationError.Digit],
  },
  {
    password: "AVeryLongPassword",
    errors: [PasswordValidationError.Length, PasswordValidationError.Digit],
  },
  {
    password: "pa55",
    errors: [PasswordValidationError.Length, PasswordValidationError.UpperCase],
  },
  {
    password: "pa55pa55pa55pa55pa55",
    errors: [PasswordValidationError.Length, PasswordValidationError.UpperCase],
  },
  {
    password: "testing",
    errors: [PasswordValidationError.Digit, PasswordValidationError.UpperCase],
  },
  {
    password: "test",
    errors: [
      PasswordValidationError.Length,
      PasswordValidationError.Digit,
      PasswordValidationError.UpperCase,
    ],
  },
  {
    password: "testtesttesttest",
    errors: [
      PasswordValidationError.Length,
      PasswordValidationError.Digit,
      PasswordValidationError.UpperCase,
    ],
  },
  // Grading tests
  { password: "maxwell1_c", errors: [PasswordValidationError.UpperCase] },
  { password: "maxwellTheBe", errors: [PasswordValidationError.Digit] },
  { password: "thePhysical1234567", errors: [PasswordValidationError.Length] },
];

describe("Password Validator", () => {
  it.each(validPasswords)('knows that "%s" is valid', (password) => {
    const result = PasswordValidator.validate(password);
    expect(result.result).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  it.each(
    invalidPasswordsWithErrors.map(({ password, errors }) => [password, errors])
  )(
    "knows that '%s' is invalid with validation errors: %s",
    (password, errors) => {
      const result = PasswordValidator.validate(password);
      expect(result.result).toBeFalsy();
      expect(result.errors).toEqual(errors);
    }
  );
});
