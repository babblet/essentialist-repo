import { Assignment } from "@prisma/client";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { Database } from "../database";

export class AssignmentsService {
  constructor() {}

  static async createAssignment(dto: CreateAssignmentDTO): Promise<Assignment> {
    const { classId, title } = dto;
    const assignment = await Database.createAssignment(classId, title);
    return assignment;
  }

  static async readAssignment(
    dto: ReadAssignmentDTO
  ): Promise<Assignment | null> {
    const { id } = dto;
    const assignment = await Database.findAssignmentById(id);
    return assignment;
  }
}
