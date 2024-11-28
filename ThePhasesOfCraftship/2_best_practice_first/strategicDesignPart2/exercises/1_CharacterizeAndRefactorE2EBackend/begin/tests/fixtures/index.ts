import { ClassBuilder } from "./builders/ClassBuilder";
import { StudentBuilder } from "./builders/StudentBuilder";

export const creatingAClass = () => {
  return new ClassBuilder();
};

export const creatingAStudent = () => {
  return new StudentBuilder();
};
