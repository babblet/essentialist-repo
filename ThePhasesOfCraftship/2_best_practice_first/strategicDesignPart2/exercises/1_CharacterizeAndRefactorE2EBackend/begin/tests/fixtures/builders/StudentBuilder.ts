import { Student } from "@prisma/client";
import { prisma } from "../../../src/database";
import { faker } from "@faker-js/faker";

export class StudentBuilder {
  private student: Partial<Student> = {};

  withName(name: string) {
    this.student.name = name;
    return this;
  }

  withEmail(email: string) {
    this.student.email = email;
    return this;
  }

  async build(): Promise<Student> {
    if (!this.student.name) this.student.name = faker.person.fullName();
    if (!this.student.email) this.student.email = faker.internet.email();

    const builtStudent = await prisma.student.upsert({
      where: { email: this.student.email },
      update: this.student,
      create: this.student as Student,
    });

    return builtStudent;
  }
}
