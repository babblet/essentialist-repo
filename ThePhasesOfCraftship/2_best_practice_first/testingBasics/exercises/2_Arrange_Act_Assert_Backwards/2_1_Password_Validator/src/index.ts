type PasswordValidationResult = {
  result: boolean,
  errors: PasswordValidationError[]
}

export enum PasswordValidationError {
  Length = "Password must be between 5 and 15 characters long",
  Digit = "Password must contain at least one digit",
  UpperCase = "Password must contain at least one upper case letter"
}

/**
 * A utility class for validating passwords.
 *
 * This class provides a single static method to validate passwords
 * against the following criteria:
 * 
 * - Password must be between 5 and 15 characters long
 * - Password must contain at least one digit
 * - Password must contain at least one upper case letter
 *
 * @example Usage of `PasswordValidator`:
 * ```typescript
 * const password: string = "Password123";
 * const validationResult: PasswordValidationResult = PasswordValidator.validate(password);
 * console.log(validationResult.result); // true
 * console.log(validationResult.errors); // []
 * ```
 */
export class PasswordValidator {
  static validate(password: string): PasswordValidationResult {
    let errors: PasswordValidationError[] = [];

    if (password.length < 5 || password.length > 15) {
      errors.push(PasswordValidationError.Length);
    }

    if (password.search(/\d/) === -1) {
      errors.push(PasswordValidationError.Digit);
    }

    if (password.search(/[A-Z]/) === -1) {
      errors.push(PasswordValidationError.UpperCase);
    }

    return { result: errors.length === 0, errors };
  }
}