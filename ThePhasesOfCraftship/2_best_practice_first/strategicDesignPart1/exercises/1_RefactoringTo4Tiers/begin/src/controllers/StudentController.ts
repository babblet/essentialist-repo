import { Request, Response } from "express";
import { Errors, isUUID, parseForResponse } from "../shared";
import { prisma } from "../database";

export class StudentController {
  static async readAssignments(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res.status(404).json({
          error: Errors.StudentNotFound,
          data: undefined,
          success: false,
        });
      }

      const studentAssignments = await prisma.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
        },
        include: {
          assignment: true,
        },
      });

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

  static async readGrades(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        return res
          .status(400)
          .json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
          });
      }

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id,
        },
      });

      if (!student) {
        return res
          .status(404)
          .json({
            error: Errors.StudentNotFound,
            data: undefined,
            success: false,
          });
      }

      const studentAssignments = await prisma.studentAssignment.findMany({
        where: {
          studentId: id,
          status: "submitted",
          grade: {
            not: null,
          },
        },
        include: {
          assignment: true,
        },
      });

      res
        .status(200)
        .json({
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
