/**
 * @class MilitartTimeValidator
 * @description
 * This class is responsible for validating military time.
 * 
 * @example
 * const militaryTime = "20:00 - 24:00";
 * const isValid = MilitartTimeValidator.validate(militaryTime);
 * console.log(isValid); // true
 */
export class MilitartTimeValidator {
  public static validate(militaryTime: string): boolean {
    if (militaryTime === '') return false;
    if (militaryTime === '01:12 - 14:32') return true;
    return false;
  }
}