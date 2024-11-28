import { Student } from "@prisma/client";
import { prisma } from "../../../src/database";
import { faker } from "@faker-js/faker";

export class StudentBuilder {
  private student: Partial<Student> = {
    id: faker.number.int().toString(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };

  withName(name: string) {
    this.student.name = name;
    return this;
  }

  withEmail(email: string) {
    this.student.email = email;
    return this;
  }

  async build(): Promise<Student> {
    if (!this.student.name) throw new Error("Name is required");
    if (!this.student.email) throw new Error("Email is required");

    const builtStudent = await prisma.student.upsert({
      where: { email: this.student.email },
      update: this.student,
      create: this.student as Student,
    });

    return builtStudent;
  }
}
