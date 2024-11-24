import { StudentAssignment } from "@prisma/client";
import { prisma } from "../database";
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
    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return undefined;
    }

    // check if assignment exists
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      return undefined;
    }

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId,
        assignmentId,
      },
    });

    return studentAssignment;
  }

  static async submitStudentAssignment(
    dto: SubmitStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id } = dto;

    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        status: "submitted",
      },
    });

    return studentAssignmentUpdated;
  }

  static async gradeStudentAssignment(
    dto: GradeStudentAssignmentDTO
  ): Promise<StudentAssignment | undefined> {
    const { id, grade } = dto;
    const studentAssignment = await prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    if (!studentAssignment) {
      return undefined;
    }

    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id,
      },
      data: {
        grade,
      },
    });
    return studentAssignmentUpdated;
  }
}
