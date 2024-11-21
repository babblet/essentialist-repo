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
    
    const [leftHour, leftMinute] = leftTime.split(':').map(Number);
    const [rightHour, rightMinute] = rightTime.split(':').map(Number);
    if (!leftHour || !leftMinute || !rightHour || !rightMinute) return false;
    if (leftHour > 23 || leftHour < 0 || rightHour > 23 || rightHour < 0) return false;
    if (leftMinute > 59 || leftMinute < 0 || rightMinute > 59 || rightMinute < 0) return false;

    return true;
  }
}