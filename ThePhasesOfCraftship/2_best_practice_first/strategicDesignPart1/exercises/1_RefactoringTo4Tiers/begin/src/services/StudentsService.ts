import { prisma } from "../database";
import { Student, StudentAssignment } from "@prisma/client";
import {
  CreateStudentDTO,
  ReadStudentAssignmentsDTO,
  ReadStudentDTO,
  ReadStudentGradesDTO,
} from "../dtos/students";

export class StudentsService {
  constructor() {}

  // We return the full student object here, do we DTO later?
  static async createStudent(dto: CreateStudentDTO): Promise<Student> {
    const { name } = dto;
    const student = await prisma.student.create({
      data: {
        name,
      },
    });

    return student;
  }

  static async readStudent(dto: ReadStudentDTO): Promise<Student | null> {
    const { id } = dto;
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    return student;
  }

  static async readAllStudents(): Promise<Student[]> {
    const students = await prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return students;
  }

  static async readAssignments(
    dto: ReadStudentAssignmentsDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return undefined;
    }

    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    return studentAssignments;
  }

  static async readGrades(
    dto: ReadStudentGradesDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return undefined;
    }

    const studentAssignments = await prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: "submitted",
        grade: {
          not: null,
        },
      },
      include: {
        assignment: true,
      },
    });

    return studentAssignments;
  }
}
