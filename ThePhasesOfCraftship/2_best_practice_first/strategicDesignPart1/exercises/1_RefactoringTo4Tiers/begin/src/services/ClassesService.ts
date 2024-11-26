import { Assignment, Class } from "@prisma/client";
import { Database } from "../shared/database";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";
import { ClassNotFoundException } from "../shared/exceptions";

export class ClassesService {
  constructor(private readonly database: Database) {}

  async createClass(dto: CreateClassDTO): Promise<Class> {
    const { name } = dto;
    const classData = await this.database.createClass(name);

    return classData;
  }

  async readClassAssignments(
    dto: ReadClassAssignmentsDTO
  ): Promise<Assignment[]> {
    const { id } = dto;
    const classData = await this.database.findClassById(id);
    const assignments = await this.database.findClassAssignmentsByClass(
      classData
    );

    return assignments;
  }
}
