import { Assignment, Class } from "@prisma/client";
import { Database } from "../database";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";

export class ClassesService {
  constructor() {}

  static async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    const classData = await Database.createClass(name);
    return classData;
  }

  static async readClassAssignments(
    dto: ReadClassAssignmentsDTO
  ): Promise<Assignment[] | undefined | null> {
    const { id } = dto;

    const classData = await Database.findClassById(id);
    if (!classData) {
      return undefined;
    }

    const assignments = await Database.findClassAssignmentsByClass(classData);
    return assignments;
  }
}
