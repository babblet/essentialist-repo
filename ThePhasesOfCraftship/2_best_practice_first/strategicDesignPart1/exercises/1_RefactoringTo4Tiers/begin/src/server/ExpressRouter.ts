import { NextFunction, Router, Request, Response } from "express";
import {
  Controller,
  ServerRouter,
  Route,
  ServerRouteOptions,
} from "./ServerRouter";
import { Middleware } from "../middlewares/Middleware";

type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export class ExpressRouter extends ServerRouter {
  private readonly router: Router = Router();

  constructor(
    options: {
      middlewares: Middleware[];
    } & ServerRouteOptions
  ) {
    super(options);
    this.addControllers(options.controllers);
    this.addMiddlewares(options.middlewares);
  }

  protected addControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      controller.routes().forEach((route: Route) => {
        this.router[route.method](route.path, this.catchWrapper(route.handler));
      });
    });
  }

  private addMiddlewares(middlewares: Middleware[]): void {
    middlewares.forEach((middleware) => {
      this.router.use(middleware.handle);
    });
  }

  public getRouter(): Router {
    return this.router;
  }

  private catchWrapper(handler: ExpressFunction) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log("Handling request");
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  }
}
