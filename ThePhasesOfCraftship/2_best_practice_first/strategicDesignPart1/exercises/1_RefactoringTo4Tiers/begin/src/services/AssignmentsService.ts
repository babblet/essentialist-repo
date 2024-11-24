import { Assignment } from "@prisma/client";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { prisma } from "../database";

export class AssignmentsService {
  constructor() {}

  static async createAssignment(dto: CreateAssignmentDTO): Promise<Assignment> {
    const { classId, title } = dto;
    const assignment = await prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return assignment;
  }

  static async readAssignment(
    dto: ReadAssignmentDTO
  ): Promise<Assignment | null> {
    const { id } = dto;
    const assignment = await prisma.assignment.findUnique({
      include: {
        class: true,
        studentTasks: true,
      },
      where: {
        id,
      },
    });

    return assignment;
  }
}
