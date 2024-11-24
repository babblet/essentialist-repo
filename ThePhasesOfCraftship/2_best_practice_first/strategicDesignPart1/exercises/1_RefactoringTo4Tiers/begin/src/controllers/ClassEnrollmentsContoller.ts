import { Request, Response } from "express";
import { prisma } from "../database";
import { Errors, parseForResponse } from "../shared";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { ClassEnrollmentsService } from "../services/ClassEnrollmentsController";

export class ClassEnrollmentsController {
  static async create(req: Request, res: Response) {
    try {
      const dto = CreateClassEnrollmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const classEnrollment =
        await ClassEnrollmentsService.createClassEnrollment(dto);

      if (classEnrollment === undefined) {
        // TODO: Handle all errors
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
        //return res.status(400).json({
        //  error: Errors.StudentAlreadyEnrolled,
        //  data: undefined,
        //  success: false,
        //});
        //return res.status(404).json({
        //  error: Errors.ClassNotFound,
        //  data: undefined,
        //  success: false,
        //});
      }

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
