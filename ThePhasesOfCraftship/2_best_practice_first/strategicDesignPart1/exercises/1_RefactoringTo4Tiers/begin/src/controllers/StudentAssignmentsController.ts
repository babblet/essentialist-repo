import { Request, Response } from "express";
import { prisma } from "../database";
import { Errors, parseForResponse } from "../shared";
import {
  CreateStudentAssignmentDTO,
  GradeStudentAssignmentDTO,
  SubmitStudentAssignmentDTO,
} from "../dtos/studentAssignments";

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

      const { studentId, assignmentId } = dto;

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id: studentId,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      // check if assignment exists
      const assignment = await prisma.assignment.findUnique({
        where: {
          id: assignmentId,
        },
      });

      if (!assignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignment = await prisma.studentAssignment.create({
        data: {
          studentId,
          assignmentId,
        },
      });

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

      const { id } = dto;

      // check if student assignment exists
      const studentAssignment = await prisma.studentAssignment.findUnique({
        where: {
          id,
        },
      });

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated = await prisma.studentAssignment.update({
        where: {
          id,
        },
        data: {
          status: "submitted",
        },
      });

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

      const { id, grade } = dto;

      // validate grade
      if (!["A", "B", "C", "D"].includes(grade)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student assignment exists
      const studentAssignment = await prisma.studentAssignment.findUnique({
        where: {
          id,
        },
      });

      if (!studentAssignment) {
        return res.status(404).json({
          error: Errors.AssignmentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignmentUpdated = await prisma.studentAssignment.update({
        where: {
          id,
        },
        data: {
          grade,
        },
      });

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
