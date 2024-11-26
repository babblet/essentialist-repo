import { Request, Response, NextFunction } from "express";

export interface Middleware {
  handle(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void;
}
