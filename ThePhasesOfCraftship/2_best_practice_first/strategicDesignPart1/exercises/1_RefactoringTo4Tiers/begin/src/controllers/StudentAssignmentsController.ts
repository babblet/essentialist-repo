import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";
import { StudentAssignmentsService } from "../services/StudentAssignmentsService";

export class StudentAssignmentsController {
  constructor(
    private readonly studentAssignmentsService: StudentAssignmentsService
  ) {}

  async create(req: Request, res: Response) {
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
        await this.studentAssignmentsService.createStudentAssignment(dto);

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

  async submit(req: Request, res: Response) {
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
        await this.studentAssignmentsService.submitStudentAssignment(dto);

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

  async grade(req: Request, res: Response) {
    try {
      const dto = GradeStudentAssignmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated =
        await this.studentAssignmentsService.gradeStudentAssignment(dto);

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
