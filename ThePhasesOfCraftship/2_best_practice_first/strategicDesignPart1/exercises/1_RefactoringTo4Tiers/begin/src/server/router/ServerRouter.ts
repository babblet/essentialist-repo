export type RouteMethod = "get" | "post" | "put" | "delete";
export type Route = {
  method: RouteMethod;
  path: string;
  handler: any;
};

export interface Controller {
  routes(): Array<Route>;
}

export type ServerRouterOptions = {
  controllers: Controller[];
};

export class ServerRouter {
  constructor(options: ServerRouterOptions) {}

  protected addControllers(controllers: Controller[]) {
    throw new Error("Method not implemented.");
  }
}
