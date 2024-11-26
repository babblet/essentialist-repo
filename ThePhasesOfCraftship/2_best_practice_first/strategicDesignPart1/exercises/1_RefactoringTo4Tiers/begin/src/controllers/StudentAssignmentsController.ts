import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";
import { StudentAssignmentsService } from "../services/StudentAssignmentsService";
import { Controller, Route } from "../server/router/ServerRouter";

export class StudentAssignmentsController implements Controller {
  constructor(
    private readonly studentAssignmentsService: StudentAssignmentsService
  ) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/student-assignments", handler: this.create },
      {
        method: "post",
        path: "/student-assignments/submit",
        handler: this.submit,
      },
      {
        method: "post",
        path: "/student-assignments/grade",
        handler: this.grade,
      },
    ];
  }

  async create(req: Request, res: Response) {
    const dto = CreateStudentAssignmentDTO.fromRequest(req);
    const studentAssignment =
      await this.studentAssignmentsService.createStudentAssignment(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(studentAssignment),
      success: true,
    });
  }

  async submit(req: Request, res: Response) {
    const dto = SubmitStudentAssignmentDTO.fromRequest(req);
    const studentAssignmentUpdated =
      await this.studentAssignmentsService.submitStudentAssignment(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignmentUpdated),
      success: true,
    });
  }

  async grade(req: Request, res: Response) {
    const dto = GradeStudentAssignmentDTO.fromRequest(req);
    const studentAssignmentUpdated =
      await this.studentAssignmentsService.gradeStudentAssignment(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignmentUpdated),
      success: true,
    });
  }
}
