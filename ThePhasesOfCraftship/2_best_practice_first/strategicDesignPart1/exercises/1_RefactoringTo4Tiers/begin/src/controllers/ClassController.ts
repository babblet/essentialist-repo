import { Request, Response } from "express";
import { Errors, isMissingKeys, parseForResponse } from "../shared";
import { prisma } from "../database";

export class ClassController {
  static async create(req: Request, res: Response) {
    try {
      if (isMissingKeys(req.body, ["name"])) {
        return res
          .status(400)
          .json({
            error: Errors.ValidationError,
            data: undefined,
            success: false,
          });
      }

      const { name } = req.body;

      const cls = await prisma.class.create({
        data: {
          name,
        },
      });

      res
        .status(201)
        .json({ error: undefined, data: parseForResponse(cls), success: true });
    } catch (error) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
