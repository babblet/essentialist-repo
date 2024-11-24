import { ClassEnrollment } from "@prisma/client";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { Database } from "../database";

export class ClassEnrollmentsService {
  constructor(private readonly database: Database) {}

  async createClassEnrollment(
    dto: CreateClassEnrollmentDTO
  ): Promise<ClassEnrollment | undefined> {
    const { studentId, classId } = dto;

    const student = await this.database.findStudentById(studentId);
    if (!student) {
      return undefined;
    }

    const classData = await this.database.findClassById(classId);
    if (!classData) {
      return undefined;
    }

    const isAlreadyClassEnrolled =
      !!this.database.findClassEnrollmentByClassAndStudent(classData, student);

    if (isAlreadyClassEnrolled) {
      return undefined;
    }

    const classEnrollment = await this.database.createClassEnrollment(
      classData,
      student
    );

    return classEnrollment;
  }
}
