import { ClassBuilder } from "./builders/ClassBuilder";
import { ClassEnrollmentBuilder } from "./builders/ClassEnrollmentBuilder";
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
