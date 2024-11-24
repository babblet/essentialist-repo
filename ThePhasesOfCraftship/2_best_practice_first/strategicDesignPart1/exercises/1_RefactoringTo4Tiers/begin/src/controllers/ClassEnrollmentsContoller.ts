import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";
import { ClassEnrollmentsService } from "../services/ClassEnrollmentsService";
import { Controller, Route } from "../server/router/ServerRouter";

export class ClassEnrollmentsController implements Controller {
  constructor(
    private readonly classEnrollmentsService: ClassEnrollmentsService
  ) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/class-enrollments", handler: this.create },
    ];
  }

  async create(req: Request, res: Response) {
    const dto = CreateClassEnrollmentDTO.fromRequest(req);
    const classEnrollment =
      await this.classEnrollmentsService.createClassEnrollment(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(classEnrollment),
      success: true,
    });
  }
}
