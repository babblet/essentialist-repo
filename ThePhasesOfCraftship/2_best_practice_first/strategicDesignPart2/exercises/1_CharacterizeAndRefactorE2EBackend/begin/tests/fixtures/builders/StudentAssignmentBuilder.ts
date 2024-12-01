import { Assignment, Student, StudentAssignment } from "@prisma/client";
import { prisma } from "../../../src/database";
import { StudentBuilder } from "./StudentBuilder";
import { AssignmentBuilder } from "./AssignmentBuilder";
import { ClassBuilder } from "./ClassBuilder";

export class StudentAssignmentBuilder {
  private studentAssignment: Partial<StudentAssignment> = {};

  withAssignment(assignment: Assignment) {
    this.studentAssignment.assignmentId = assignment.id;
    return this;
  }

  withStudent(student: Student) {
    this.studentAssignment.studentId = student.id;
    return this;
  }

  async build() {
    if (!this.studentAssignment.studentId)
      this.studentAssignment.studentId = (
        await new StudentBuilder().build()
      ).id;

    if (!this.studentAssignment.assignmentId)
      this.studentAssignment.assignmentId = (
        await new AssignmentBuilder()
          .withClass(await new ClassBuilder().build())
          .build()
      ).id;

    const builtStudentAssignment = prisma.studentAssignment.upsert({
      where: {
        studentId_assignmentId: {
          studentId: this.studentAssignment.studentId!,
          assignmentId: this.studentAssignment.assignmentId!,
        },
      },
      update: this.studentAssignment,
      create: this.studentAssignment as StudentAssignment,
    });

    return builtStudentAssignment;
  }
}
