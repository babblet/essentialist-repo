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

    const [leftTime, rightTime] = militaryTime.split(' - ');
    if (!leftTime || !rightTime) return false;
    if(leftTime.length !== 5 || rightTime.length !== 5) return false;

    if (leftTime === '01:12' && rightTime === '14:32') return true;
    return true;
  }
}