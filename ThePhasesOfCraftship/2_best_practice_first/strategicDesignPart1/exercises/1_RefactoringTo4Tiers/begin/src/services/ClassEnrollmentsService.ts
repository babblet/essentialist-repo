import { ClassEnrollment } from "@prisma/client";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { Database } from "../database";

export class ClassEnrollmentsService {
  static async createClassEnrollment(
    dto: CreateClassEnrollmentDTO
  ): Promise<ClassEnrollment | undefined> {
    const { studentId, classId } = dto;

    const student = await Database.findStudentById(studentId);
    if (!student) {
      return undefined;
    }

    const classData = await Database.findClassById(classId);
    if (!classData) {
      return undefined;
    }

    const isAlreadyClassEnrolled =
      !!Database.findClassEnrollmentByClassAndStudent(classData, student);

    if (isAlreadyClassEnrolled) {
      return undefined;
    }

    const classEnrollment = await Database.createClassEnrollment(
      classData,
      student
    );

    return classEnrollment;
  }
}
