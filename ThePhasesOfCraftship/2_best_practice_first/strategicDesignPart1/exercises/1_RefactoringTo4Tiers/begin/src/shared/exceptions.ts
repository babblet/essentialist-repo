export class Exception extends Error {}
export class DTOMissingKeysException extends Exception {
  constructor(missingKeys: string[]) {
    super(
      "Data being transfered is missing required keys: " +
        missingKeys.join(", ")
    );
  }
}

export class DTOIncorredDataInKeysException extends Exception {
  constructor(incorrectData: string, expected: string) {
    super(
      "Data being transfered is incorrect in the following key: " +
        incorrectData +
        ". Expected: " +
        expected
    );
  }
}

export class MalformedUUIDException extends Exception {
  constructor() {
    super("UUID is malformed");
  }
}

export class StudentNotFoundException extends Exception {
  constructor() {
    super("Student not found");
  }
}

export class ClassNotFoundException extends Exception {
  constructor() {
    super(`Class not found`);
  }
}

export class ClassEnrollmentNotFoundException extends Exception {
  constructor() {
    super("Class enrollment not found");
  }
}

export class StudentAlreadyEnrolledException extends Exception {
  constructor() {
    super("Student is already enrolled in class");
  }
}

export class AssignmentNotFoundException extends Exception {
  constructor() {
    super("Assignment not found");
  }
}

export class StudentAssignmentNotFoundException extends Exception {
  constructor() {
    super(
      "Student assignment not found. Please, make sure the student is assigned to the assignment."
    );
  }
}
