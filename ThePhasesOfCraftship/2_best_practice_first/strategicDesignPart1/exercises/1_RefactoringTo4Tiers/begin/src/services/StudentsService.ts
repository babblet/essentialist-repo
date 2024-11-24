import { Database } from "../database";
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
    const student = await Database.createStudent(name);
    return student;
  }

  static async readStudent(dto: ReadStudentDTO): Promise<Student | null> {
    const { id } = dto;
    const student = await Database.findStudentById(id);
    return student;
  }

  static async readAllStudents(): Promise<Student[]> {
    const students = await Database.getAllStudents();
    return students;
  }

  static async readAssignments(
    dto: ReadStudentAssignmentsDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await Database.findStudentById(id);
    if (!student) {
      return undefined;
    }

    const studentAssignments = await Database.findStudentAssignmentsByStudent(
      student
    );
    return studentAssignments;
  }

  static async readGrades(
    dto: ReadStudentGradesDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await Database.findStudentById(id);
    if (!student) {
      return undefined;
    }

    const studentAssignments =
      await Database.findStudentAssignmentGradesByStudent(student);
    return studentAssignments;
  }
}
