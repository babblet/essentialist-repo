import { Class, ClassEnrollment, Student } from "@prisma/client";
import { ClassBuilder } from "./ClassBuilder";
import { StudentBuilder } from "./StudentBuilder";
import { faker } from "@faker-js/faker";
import { prisma } from "../../../src/database";

export class ClassEnrollmentBuilder {
  private classEnrollment: Partial<ClassEnrollment> = {};

  withStudent(student: Student) {
    this.classEnrollment.studentId = student.id;
    return this;
  }

  withClass(cls: Class) {
    this.classEnrollment.classId = cls.id;
    return this;
  }

  async build(): Promise<ClassEnrollment> {
    if (!this.classEnrollment.studentId)
      this.withStudent(await new StudentBuilder().build());
    if (!this.classEnrollment.classId)
      this.withClass(await new ClassBuilder().build());

    const builtClassEnrollment = await prisma.classEnrollment.upsert({
      where: {
        studentId_classId: {
          studentId: this.classEnrollment.studentId!,
          classId: this.classEnrollment.classId!,
        },
      },
      update: this.classEnrollment,
      create: this.classEnrollment as ClassEnrollment,
    });

    return builtClassEnrollment;
  }
}
