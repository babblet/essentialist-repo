import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared";
import { CreateAssignmentDTO, ReadAssignmentDTO } from "../dtos/assignments";
import { AssignmentsService } from "../services/AssignmentsService";

export class AssignmentsController {
  static async create(req: Request, res: Response) {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const assignment = await AssignmentsService.createAssignment(dto);
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

  static async read(req: Request, res: Response) {
    try {
      const dto = ReadAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const assignment = await AssignmentsService.readAssignment(dto);

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
