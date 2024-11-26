import { ClassEnrollment } from "@prisma/client";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { Database } from "../shared/database";
import {
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
  StudentNotFoundException,
} from "../shared/exceptions";

export class ClassEnrollmentsService {
  constructor(private readonly database: Database) {}

  async createClassEnrollment(
    dto: CreateClassEnrollmentDTO
  ): Promise<ClassEnrollment> {
    const { studentId, classId } = dto;
    const student = await this.database.findStudentById(studentId);
    const classData = await this.database.findClassById(classId);

    const isAlreadyClassEnrolled =
      !!this.database.findClassEnrollmentByClassAndStudent(classData, student);

    if (isAlreadyClassEnrolled) throw new StudentAlreadyEnrolledException();

    const classEnrollment = await this.database.createClassEnrollment(
      classData,
      student
    );

    return classEnrollment;
  }
}
