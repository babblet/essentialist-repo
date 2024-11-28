import { AssignmentSubmission, StudentAssignment } from "@prisma/client";
import { StudentAssignmentBuilder } from "./StudentAssignmentBuilder";
import { prisma } from "../../../src/database";
import { faker } from "@faker-js/faker";

export class AssignmentSubmissionBuilder {
  private assignmentSubmission: Partial<AssignmentSubmission> = {};

  withStudentAssignment(studentAssignment: StudentAssignment) {
    this.assignmentSubmission.studentAssignmentId = studentAssignment.id;
    return this;
  }

  async build() {
    this.assignmentSubmission.id = faker.string.uuid();
    if (!this.assignmentSubmission.studentAssignmentId)
      this.assignmentSubmission.studentAssignmentId = (
        await new StudentAssignmentBuilder().build()
      ).id;

    const builtAssignmentSubmission = prisma.assignmentSubmission.upsert({
      where: { id: this.assignmentSubmission.id },
      update: this.assignmentSubmission,
      create: this.assignmentSubmission as AssignmentSubmission,
    });

    return builtAssignmentSubmission;
  }
}
