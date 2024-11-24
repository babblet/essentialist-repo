import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { AssignmentsService } from "../services/AssignmentsService";
import { Controller, Route } from "../server/router/ServerRouter";

export class AssignmentsController implements Controller {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/assignments", handler: this.create },
      { method: "get", path: "/assignments/:id", handler: this.read },
    ];
  }

  async create(req: Request, res: Response) {
    const dto = CreateAssignmentDTO.fromRequest(req);
    const assignment = await this.assignmentsService.createAssignment(dto);
    res.status(201).json({
      error: undefined,
      data: parseForResponse(assignment),
      success: true,
    });
  }

  async read(req: Request, res: Response) {
    const dto = ReadAssignmentDTO.fromRequest(req);
    const assignment = await this.assignmentsService.readAssignment(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignment),
      success: true,
    });
  }
}
