import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import {
  CreateStudentDTO,
  ReadStudentAssignmentsDTO,
  ReadStudentDTO,
  ReadStudentGradesDTO,
} from "../dtos/students";
import { StudentsService } from "../services/StudentsService";
import { Controller, Route } from "../server/router/ServerRouter";

export class StudentsController implements Controller {
  constructor(private readonly studentsService: StudentsService) {}

  routes(): Array<Route> {
    return [
      { method: "post", path: "/students", handler: this.create },
      { method: "get", path: "/students/:id", handler: this.read },
      { method: "get", path: "/students", handler: this.readAll },
      {
        method: "get",
        path: "/students/:id/assignments",
        handler: this.readAssignments,
      },
      {
        method: "get",
        path: "/students/:id/grades",
        handler: this.readGrades,
      },
    ];
  }

  async create(req: Request, res: Response) {
    const dto = CreateStudentDTO.fromRequest(req);
    const student = await this.studentsService.createStudent(dto);

    res.status(201).json({
      error: undefined,
      data: parseForResponse(student),
      success: true,
    });
  }

  // GET a student by id
  async read(req: Request, res: Response) {
    const dto = ReadStudentDTO.fromRequest(req);
    const student = await this.studentsService.readStudent(dto);
    res.status(200).json({
      error: undefined,
      data: parseForResponse(student),
      success: true,
    });
  }

  async readAll(req: Request, res: Response) {
    const students = await this.studentsService.readAllStudents();
    res.status(200).json({
      error: undefined,
      data: parseForResponse(students),
      success: true,
    });
  }

  async readAssignments(req: Request, res: Response) {
    const dto = ReadStudentAssignmentsDTO.fromRequest(req);
    const studentAssignments = await this.studentsService.readAssignments(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignments),
      success: true,
    });
  }

  async readGrades(req: Request, res: Response) {
    const dto = ReadStudentGradesDTO.fromRequest(req);
    const studentAssignments = await this.studentsService.readGrades(dto);

    res.status(200).json({
      error: undefined,
      data: parseForResponse(studentAssignments),
      success: true,
    });
  }
}
