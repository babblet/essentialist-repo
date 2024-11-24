import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { AssignmentsService } from "../services/AssignmentsService";
import { Controller, Route } from "../server/ServerRouter";

export class AssignmentsController implements Controller {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/assignments", handler: this.create },
      { method: "get", path: "/assignments/:id", handler: this.read },
    ];
  }

  async create(req: Request, res: Response) {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const assignment = await this.assignmentsService.createAssignment(dto);
      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const dto = ReadAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const assignment = await this.assignmentsService.readAssignment(dto);

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
