import { Request, Response } from "express";
import { prisma } from "../database";
import { isMissingKeys, Errors, parseForResponse } from "../shared";

export class StudentAssignmentsController {
  static async create(req: Request, res: Response) {
    try {
      if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
        return res
          .status(400)
          .json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
          });
      }

      const { studentId, assignmentId } = req.body;

      // check if student exists
      const student = await prisma.student.findUnique({
        where: {
          id: studentId,
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

      // check if assignment exists
      const assignment = await prisma.assignment.findUnique({
        where: {
          id: assignmentId,
        },
      });

      if (!assignment) {
        return res
          .status(404)
          .json({
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

      res
        .status(201)
        .json({
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
}
