import { AssignmentBuilder } from "./builders/AssignmentBuilder";
import { AssignmentSubmissionBuilder } from "./builders/AssignmentSubmissionBuilder";
import { ClassBuilder } from "./builders/ClassBuilder";
import { ClassEnrollmentBuilder } from "./builders/ClassEnrollmentBuilder";
import { StudentAssignmentBuilder } from "./builders/StudentAssignmentBuilder";
import { StudentBuilder } from "./builders/StudentBuilder";

export const creatingAClass = () => {
  return new ClassBuilder();
};

export const creatingAStudent = () => {
  return new StudentBuilder();
};

export const creatingAClassEnrollment = () => {
  return new ClassEnrollmentBuilder();
};

export const creatingAnAssignment = () => {
  return new AssignmentBuilder();
};

export const creatingAStudentAssignment = () => {
  return new StudentAssignmentBuilder();
};

export const creatingAnAssignmentSubmission = () => {
  return new AssignmentSubmissionBuilder();
};
