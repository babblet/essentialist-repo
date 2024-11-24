import { AssignmentsController } from "./controllers/AssignmentsController";
import { ClassEnrollmentsController } from "./controllers/ClassEnrollmentsContoller";
import { ClassesController } from "./controllers/ClassesController";
import { StudentAssignmentsController } from "./controllers/StudentAssignmentsController";
import { StudentsController } from "./controllers/StudentsController";

interface ServerConfig {
  port: number;
}

export class Server {
  constructor(
    private readonly studentsController: StudentsController,
    private readonly classesController: ClassesController,
    private readonly assignmentsController: AssignmentsController,
    private readonly classEnrollmentsController: ClassEnrollmentsController,
    private readonly studentAssignmentsController: StudentAssignmentsController
  ) {}

  start(config: ServerConfig) {
    const cors = require("cors");
    const express = require("express");
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.post("/students", this.studentsController.create);
    app.get("/students", this.studentsController.readAll);
    app.get("/students/:id", this.studentsController.read);
    app.get(
      "/students/:id/assignments",
      this.studentsController.readAssignments
    );
    app.get("/students/:id/grades", this.studentsController.readGrades);

    app.post("/classes", this.classesController.create);
    app.get("/classes/:id/assignments", this.classesController.readAssignments);

    app.post("/assignments", this.assignmentsController.create);
    app.get("/assignments/:id", this.assignmentsController.read);

    app.post("/class-enrollments", this.classEnrollmentsController.create);

    app.post("/student-assignments", this.studentAssignmentsController.create);
    app.post(
      "/student-assignments/submit",
      this.studentAssignmentsController.submit
    );
    app.post(
      "/student-assignments/grade",
      this.studentAssignmentsController.grade
    );

    const port = config.port;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
