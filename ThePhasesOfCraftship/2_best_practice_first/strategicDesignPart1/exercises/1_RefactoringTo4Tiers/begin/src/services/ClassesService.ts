import { Assignment, Class } from "@prisma/client";
import { Database } from "../database";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";

export class ClassesService {
  constructor(private readonly database: Database) {}

  async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    const classData = await this.database.createClass(name);
    return classData;
  }

  async readClassAssignments(
    dto: ReadClassAssignmentsDTO
  ): Promise<Assignment[] | undefined | null> {
    const { id } = dto;

    const classData = await this.database.findClassById(id);
    if (!classData) {
      return undefined;
    }

    const assignments = await this.database.findClassAssignmentsByClass(
      classData
    );
    return assignments;
  }
}
