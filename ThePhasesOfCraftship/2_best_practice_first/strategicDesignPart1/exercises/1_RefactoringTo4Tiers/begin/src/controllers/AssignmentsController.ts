import { Request, Response } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "../shared";
import { prisma } from "../database";

export class AssignmentsController {
  static async create(req: Request, res: Response) {
    try {
      if (isMissingKeys(req.body, ["classId", "title"])) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { classId, title } = req.body;

      const assignment = await prisma.assignment.create({
        data: {
          classId,
          title,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(assignment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
  static async read(req: Request, res: Response) {
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
      const assignment = await prisma.assignment.findUnique({
        include: {
          class: true,
          studentTasks: true,
        },
        where: {
          id,
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

      res
        .status(200)
        .json({
          error: undefined,
          data: parseForResponse(assignment),
          success: true,
        });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
