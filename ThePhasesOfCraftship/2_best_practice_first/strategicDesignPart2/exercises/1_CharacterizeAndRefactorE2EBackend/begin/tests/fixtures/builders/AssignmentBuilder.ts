import { Assignment, Class } from "@prisma/client";
import { ClassBuilder } from "./ClassBuilder";
import { faker } from "@faker-js/faker";
import { prisma } from "../../../src/database";

export class AssignmentBuilder {
  private assignment: Partial<Assignment> = {};

  withClass(cls: Class) {
    this.assignment.classId = cls.id;
    return this;
  }

  withTitle(title: string) {
    this.assignment.title = title;
    return this;
  }

  async build() {
    this.assignment.id = faker.string.uuid();
    if (!this.assignment.title) this.assignment.title = faker.lorem.words(3);
    if (!this.assignment.classId)
      this.assignment.classId = (await new ClassBuilder().build()).id;

    const builtAssignment = prisma.assignment.upsert({
      where: { id: this.assignment.id },
      update: this.assignment,
      create: this.assignment as Assignment,
    });

    return builtAssignment;
  }
}
