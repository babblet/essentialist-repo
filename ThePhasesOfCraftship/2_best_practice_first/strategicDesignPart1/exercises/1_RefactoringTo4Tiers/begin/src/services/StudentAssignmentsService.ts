import { StudentAssignment } from "@prisma/client";
import { Database } from "../database";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";

export class StudentAssignmentsService {
  constructor(private readonly database: Database) {}

  async createStudentAssignment(
    dto: CreateStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { studentId, assignmentId } = dto;

    const student = await this.database.findStudentById(studentId);
    if (!student) {
      return undefined;
    }

    // check if assignment exists
    const assignment = await this.database.findAssignmentById(assignmentId);

    if (!assignment) {
      return undefined;
    }

    const studentAssignment = await this.database.createStudentAssignment(
      student,
      assignment
    );

    return studentAssignment;
  }

  async submitStudentAssignment(
    dto: SubmitStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id } = dto;

    const studentAssignment = await this.database.findStudentAssignmentById(id);

    if (!studentAssignment) {
      return undefined;
    }

    const studentAssignmentUpdated =
      await this.database.submitStudentAssignment(studentAssignment);

    return studentAssignmentUpdated;
  }

  async gradeStudentAssignment(
    dto: GradeStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id, grade } = dto;
    const studentAssignment = await this.database.findStudentAssignmentById(id);

    if (!studentAssignment) {
      return undefined;
    }

    const studentAssignmentUpdated = await this.database.gradeStudentAssignment(
      studentAssignment,
      grade
    );
    return studentAssignmentUpdated;
  }
}
