import { Assignment, Class } from "@prisma/client";
import { prisma } from "../database";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";

export class ClassesService {
  constructor() {}

  static async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    const classData = await prisma.class.create({
      data: {
        name,
      },
    });
    return classData;
  }

  static async readClassAssignments(
    dto: ReadClassAssignmentsDTO
  ): Promise<Assignment[] | undefined | null> {
    const { id } = dto;

    const classData = await prisma.class.findUnique({
      where: {
        id,
      },
    });

    if (!classData) {
      return undefined;
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        classId: id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return assignments;
  }
}
