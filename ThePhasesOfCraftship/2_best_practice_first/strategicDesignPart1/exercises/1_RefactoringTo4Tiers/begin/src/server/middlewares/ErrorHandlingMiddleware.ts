import { NextFunction, Request, Response } from "express";
import { Middleware } from "./Middleware";

export class ErrorHandlingMiddleware implements Middleware {
  public handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response {
    return res.status(500).json({
      error: "Unexpected Error Occurred",
      data: undefined,
      success: false,
      message: error.message,
    });
  }
}
