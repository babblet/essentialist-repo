import { NextFunction, Request, Response } from "express";
import { Middleware } from "./Middleware";
import {
  StudentNotFoundException,
  ClassNotFoundException,
  StudentAlreadyEnrolledException,
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
} from "../../shared/exceptions";

enum HTTPStatus {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export class ExceptionHandlingMiddleware implements Middleware {
  public handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void {
    if (error instanceof StudentNotFoundException) {
      return res.status(404).json({
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof ClassNotFoundException) {
      return res.status(404).json({
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof StudentAlreadyEnrolledException) {
      return res.status(400).json({
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof AssignmentNotFoundException) {
      return res.status(400).json({
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    if (error instanceof StudentAssignmentNotFoundException) {
      return res.status(400).json({
        data: undefined,
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}
