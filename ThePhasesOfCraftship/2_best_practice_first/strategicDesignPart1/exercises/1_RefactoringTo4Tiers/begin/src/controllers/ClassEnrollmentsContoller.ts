import { Request, Response } from "express";
import { prisma } from "../database";
import { Errors, parseForResponse } from "../shared";
import { CreateClassEnrollmentDTO } from "../dtos/classEnrollments";

export class ClassEnrollmentsController {
  static async create(req: Request, res: Response) {
    try {
      const dto = CreateClassEnrollmentDTO.fromRequest(req);
      if (!dto) {
        return res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
      }

      const { studentId, classId } = dto;

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

      // check if class exists
      const cls = await prisma.class.findUnique({
        where: {
          id: classId,
        },
      });

      // check if student is already enrolled in class
      const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
        where: {
          studentId,
          classId,
        },
      });

      if (duplicatedClassEnrollment) {
        return res.status(400).json({
          error: Errors.StudentAlreadyEnrolled,
          data: undefined,
          success: false,
        });
      }

      if (!cls) {
        return res.status(404).json({
          error: Errors.ClassNotFound,
          data: undefined,
          success: false,
        });
      }

      const classEnrollment = await prisma.classEnrollment.create({
        data: {
          studentId,
          classId,
        },
      });

      res.status(201).json({
        error: undefined,
        data: parseForResponse(classEnrollment),
        success: true,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
