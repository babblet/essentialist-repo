import { Request, Response } from "express";
import { Errors, parseForResponse } from "../shared/shared";
import {
  CreateStudentDTO,
  ReadStudentAssignmentsDTO,
  ReadStudentDTO,
  ReadStudentGradesDTO,
} from "../dtos/students";
import { StudentsService } from "../services/StudentsService";
import { Controller, Route } from "../server/ServerRouter";
import { InvalidRequestBodyException } from "../shared/exceptions";

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
    try {
      const dto = CreateStudentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const student = await this.studentsService.createStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  // GET a student by id
  async read(req: Request, res: Response) {
    try {
      const dto = ReadStudentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const student = await this.studentsService.readStudent(dto);

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(student),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  async readAll(req: Request, res: Response) {
    throw new Error("Just a test");
    try {
      const students = await this.studentsService.readAllStudents();
      res.status(200).json({
        error: undefined,
        data: parseForResponse(students),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  async readAssignments(req: Request, res: Response) {
    try {
      const dto = ReadStudentAssignmentsDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await this.studentsService.readAssignments(
        dto
      );
      if (studentAssignments === undefined) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }

  async readGrades(req: Request, res: Response) {
    try {
      const dto = ReadStudentGradesDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await this.studentsService.readGrades(dto);
      if (studentAssignments === undefined) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      res.status(200).json({
        error: undefined,
        data: parseForResponse(studentAssignments),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
