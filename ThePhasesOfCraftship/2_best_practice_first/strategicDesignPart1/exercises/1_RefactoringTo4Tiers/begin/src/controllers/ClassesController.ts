import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";
import { ClassesService } from "../services/ClassesService";

export class ClassesController {
  static async create(req: Request, res: Response) {
    try {
      const dto = CreateClassDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const classData = await ClassesService.createClass(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classData),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  static async readAssignments(req: Request, res: Response) {
    try {
      const dto = ReadClassAssignmentsDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const assignments = await ClassesService.readClassAssignments(dto);
      if (assignments === undefined) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }
      res.status(200).json({
        error: undefined,
        data: parseForResponse(assignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
