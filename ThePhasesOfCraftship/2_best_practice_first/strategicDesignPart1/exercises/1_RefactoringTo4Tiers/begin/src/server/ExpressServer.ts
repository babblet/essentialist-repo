import cors from "cors";
import express from "express";
import { ExpressRouter } from "./router/ExpressRouter";

interface ServerConfig {
  port: number;
}

export class ExpressServer {
  constructor(private readonly router: ExpressRouter) {}
  start(config: ServerConfig) {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use(this.router.getRouter());

    const { port } = config;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
