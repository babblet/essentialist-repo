import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import { CreateClassDTO, ReadClassAssignmentsDTO } from "../dtos/classes";
import { ClassesService } from "../services/ClassesService";
import { Controller, Route } from "../server/router/ServerRouter";

export class ClassesController implements Controller {
  constructor(private readonly classesService: ClassesService) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/classes", handler: this.create },
      {
        method: "get",
        path: "/classes/:id/assignments",
        handler: this.readAssignments,
      },
    ];
  }

  async create(req: Request, res: Response) {
    const dto = CreateClassDTO.fromRequest(req);
    const classData = await this.classesService.createClass(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(classData),
      success: true,
    });
  }

  async readAssignments(req: Request, res: Response) {
    const dto = ReadClassAssignmentsDTO.fromRequest(req);
    const assignments = await this.classesService.readClassAssignments(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(assignments),
      success: true,
    });
  }
}
