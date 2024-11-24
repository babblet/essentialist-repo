import { ClassEnrollment } from "@prisma/client";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { prisma } from "../database";

export class ClassEnrollmentsService {
  static async createClassEnrollment(
    dto: CreateClassEnrollmentDTO
  ): Promise<ClassEnrollment | undefined> {
    const { studentId, classId } = dto;

    // check if student exists
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });

    if (!student) {
      return undefined;
    }

    // check if class exists
    const classData = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    // check if student is already enrolled in class
    const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    if (duplicatedClassEnrollment) {
      return undefined;
    }

    if (!classData) {
      return undefined;
    }

    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return classEnrollment;
  }
}
