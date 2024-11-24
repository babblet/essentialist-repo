import { Database } from "../database";
import { Student, StudentAssignment } from "@prisma/client";
import {
  CreateStudentDTO,
  ReadStudentAssignmentsDTO,
  ReadStudentDTO,
  ReadStudentGradesDTO,
} from "../dtos/students";

export class StudentsService {
  constructor(private readonly database: Database) {}

  // We return the full student object here, do we DTO later?
  async createStudent(dto: CreateStudentDTO): Promise<Student> {
    const { name } = dto;
    const student = await this.database.createStudent(name);
    return student;
  }

  async readStudent(dto: ReadStudentDTO): Promise<Student | null> {
    const { id } = dto;
    const student = await this.database.findStudentById(id);
    return student;
  }

  async readAllStudents(): Promise<Student[]> {
    const students = await this.database.getAllStudents();
    return students;
  }

  async readAssignments(
    dto: ReadStudentAssignmentsDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await this.database.findStudentById(id);
    if (!student) {
      return undefined;
    }

    const studentAssignments =
      await this.database.findStudentAssignmentsByStudent(student);
    return studentAssignments;
  }

  async readGrades(
    dto: ReadStudentGradesDTO
  ): Promise<StudentAssignment[] | undefined | null> {
    const { id } = dto;
    const student = await this.database.findStudentById(id);
    if (!student) {
      return undefined;
    }

    const studentAssignments =
      await this.database.findStudentAssignmentGradesByStudent(student);
    return studentAssignments;
  }
}
