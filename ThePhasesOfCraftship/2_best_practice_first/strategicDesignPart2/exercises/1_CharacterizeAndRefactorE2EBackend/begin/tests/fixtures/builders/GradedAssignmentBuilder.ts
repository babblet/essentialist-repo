import { AssignmentSubmission, GradedAssignment } from "@prisma/client";
import { creatingAnAssignmentSubmission } from "..";
import { faker } from "@faker-js/faker";
import { prisma } from "../../../src/database";

export class GradedAssignmentBuilder {
  private gradedAssignment: Partial<GradedAssignment> = {};

  withAssignmentSubmission(assignmentSubmission: AssignmentSubmission) {
    this.gradedAssignment.assignmentSubmissionId = assignmentSubmission.id;
    return this;
  }

  withGrade(grade: string) {
    this.gradedAssignment.grade = grade;
    return this;
  }

  async build(): Promise<GradedAssignment> {
    this.gradedAssignment.id = faker.string.uuid();
    if (!this.gradedAssignment.assignmentSubmissionId)
      this.gradedAssignment.assignmentSubmissionId = (
        await creatingAnAssignmentSubmission().build()
      ).id;

    if (!this.gradedAssignment.grade)
      this.gradedAssignment.grade = ["A", "A+", "B", "C", "D", "F"][
        faker.number.int({ min: 0, max: 5 })
      ];

    const builtGradedAssignment: GradedAssignment =
      await prisma.gradedAssignment.upsert({
        where: {
          assignmentSubmissionId: this.gradedAssignment.assignmentSubmissionId,
        },
        update: this.gradedAssignment,
        create: {
          id: this.gradedAssignment.id,
          grade: this.gradedAssignment.grade,
          assignmentSubmissionId: this.gradedAssignment.assignmentSubmissionId,
        },
      });

    return builtGradedAssignment;
  }
}
