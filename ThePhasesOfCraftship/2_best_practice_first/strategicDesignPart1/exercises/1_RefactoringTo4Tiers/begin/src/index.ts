import express, { Request, Response } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "./shared";
import { StudentsController } from "./controllers/StudentsController";
import { ClassesController } from "./controllers/ClassesController";
import { AssignmentsController } from "./controllers/AssignmentsController";
import { ClassEnrollmentsController } from "./controllers/ClassEnrollmentsContoller";
import { StudentAssignmentsController } from "./controllers/StudentAssignmentsController";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/students", StudentsController.create);
app.get("/students", StudentsController.readAll);
app.get("/students/:id", StudentsController.read);
app.get("/students/:id/assignments", StudentsController.readAssignments);
app.get("/students/:id/grades", StudentsController.readGrades);

app.post("/classes", ClassesController.create);
app.get("/classes/:id/assignments", ClassesController.readAssignments);

app.post("/assignments", AssignmentsController.create);
app.get("/assignments/:id", AssignmentsController.read);

app.post("/class-enrollments", ClassEnrollmentsController.create);

app.post("/student-assignments", StudentAssignmentsController.create);
app.post("/student-assignments/submit", StudentAssignmentsController.submit);
app.post("/student-assignments/grade", StudentAssignmentsController.grade);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
