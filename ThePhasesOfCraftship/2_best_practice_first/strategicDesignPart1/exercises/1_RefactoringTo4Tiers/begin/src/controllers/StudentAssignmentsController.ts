import { Request, Response } from "express";
import { prisma } from "../database";
import { Errors, parseForResponse } from "../shared";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";
import { StudentAssignmentsService } from "../services/StudentAssignmentsService";

export class StudentAssignmentsController {
  static async create(req: Request, res: Response) {
    try {
      const dto = CreateStudentAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment =
        StudentAssignmentsService.createStudentAssignment(dto);

      if (!studentAssignment) {
        // TODO: Handle this error
        // return res.status(404).json({
        //   error: Errors.StudentNotFound,
        //   data: undefined,
        //   success: false,
        // });

        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(201).json({
        error: undefined,
        data: parseForResponse(studentAssignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  static async submit(req: Request, res: Response) {
    try {
      const dto = SubmitStudentAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        StudentAssignmentsService.submitStudentAssignment(dto);

      if (!studentAssignmentUpdated) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  static async grade(req: Request, res: Response) {
    try {
      const dto = GradeStudentAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // TODO: Move this validation to the DTO
      const { grade } = dto;
      if (!["A", "B", "C", "D"].includes(grade)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        StudentAssignmentsService.gradeStudentAssignment(dto);

      if (!studentAssignmentUpdated) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignmentUpdated),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
