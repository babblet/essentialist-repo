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
  private static validateTime(time: string): boolean {
    if (!time) return false;
    if (time.length !== 5) return false;
    
    const [hour, minute] = time.split(':').map(Number);

    if (!hour || !minute ) return false;
    if (hour > 23 || hour < 0) return false;
    if (minute > 59 || minute < 0) return false;
    return true;
  }

  public static validate(militaryTime: string): boolean {
    const [leftTime, rightTime] = militaryTime.split(' - ');
    return this.validateTime(leftTime) && this.validateTime(rightTime);
  }
}