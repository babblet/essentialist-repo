import { StudentAssignment } from "@prisma/client";
import { Database } from "../database";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";

export class StudentAssignmentsService {
  constructor() {}

  static async createStudentAssignment(
    dto: CreateStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { studentId, assignmentId } = dto;

    const student = await Database.findStudentById(studentId);
    if (!student) {
      return undefined;
    }

    // check if assignment exists
    const assignment = await Database.findAssignmentById(assignmentId);

    if (!assignment) {
      return undefined;
    }

    const studentAssignment = await Database.createStudentAssignment(
      student,
      assignment
    );

    return studentAssignment;
  }

  static async submitStudentAssignment(
    dto: SubmitStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id } = dto;

    const studentAssignment = await Database.findStudentAssignmentById(id);

    if (!studentAssignment) {
      return undefined;
    }

    const studentAssignmentUpdated = await Database.submitStudentAssignment(
      studentAssignment
    );

    return studentAssignmentUpdated;
  }

  static async gradeStudentAssignment(
    dto: GradeStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id, grade } = dto;
    const studentAssignment = await Database.findStudentAssignmentById(id);

    if (!studentAssignment) {
      return undefined;
    }

    const studentAssignmentUpdated = await Database.gradeStudentAssignment(
      studentAssignment,
      grade
    );
    return studentAssignmentUpdated;
  }
}
