import { faker } from "@faker-js/faker";
import { Class } from "@prisma/client";
import { prisma } from "../../../src/database";

export class ClassBuilder {
  private class: Partial<Class> = {};

  withName(name: string) {
    this.class.name = name;
    return this;
  }

  async build(): Promise<Class> {
    this.class.id = faker.string.uuid();
    if (!this.class.name) this.class.name = faker.person.fullName();

    const builtClass = await prisma.class.upsert({
      where: { id: this.class.id },
      update: this.class,
      create: this.class as Class,
    });

    return builtClass;
  }
}
