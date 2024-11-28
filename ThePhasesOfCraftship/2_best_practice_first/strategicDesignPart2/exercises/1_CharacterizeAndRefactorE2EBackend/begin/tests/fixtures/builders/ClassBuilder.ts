import { faker } from "@faker-js/faker";
import { Class } from "@prisma/client";
import { prisma } from "../../../src/database";

export class ClassBuilder {
  private name: string = faker.person.fullName();

  withName(name: string) {
    this.name = name;
    return this;
  }

  async build(): Promise<Class> {
    if (!this.name) throw new Error("Name is required");

    const builtClass: Class = {
      id: faker.number.int().toString(),
      name: this.name,
    };

    const classData = await prisma.class.upsert({
      where: { id: builtClass.id },
      update: builtClass,
      create: builtClass,
    });

    return classData;
  }
}
