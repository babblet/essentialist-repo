import { Assignment } from "@prisma/client";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { Database } from "../database";

export class AssignmentsService {
  constructor(private readonly database: Database) {}

  async createAssignment(dto: CreateAssignmentDTO): Promise<Assignment> {
    const { classId, title } = dto;
    const assignment = await this.database.createAssignment(classId, title);
    return assignment;
  }

  async readAssignment(dto: ReadAssignmentDTO): Promise<Assignment | null> {
    const { id } = dto;
    const assignment = await this.database.findAssignmentById(id);
    return assignment;
  }
}
