import express, { Request, Response } from "express";
import { Errors, isMissingKeys, isUUID, parseForResponse } from "./shared";
import { StudentsController } from "./controllers/StudentsController";
import { ClassesController } from "./controllers/ClassesController";
import { AssignmentsController } from "./controllers/AssignmentsController";
import { ClassEnrollmentsController } from "./controllers/ClassEnrollmentsContoller";
import { StudentAssignmentsController } from "./controllers/StudentAssignmentsController";
import { PrismaClient } from "@prisma/client";
import { Database } from "./database";
import { StudentsService } from "./services/StudentsService";
import { ClassesService } from "./services/ClassesService";
import { AssignmentsService } from "./services/AssignmentsService";
import { ClassEnrollmentsService } from "./services/ClassEnrollmentsService";
import { StudentAssignmentsService } from "./services/StudentAssignmentsService";

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();
const database = new Database(prisma);

const studentsService = new StudentsService(database);
const studentsController = new StudentsController(studentsService);

const classesService = new ClassesService(database);
const classesController = new ClassesController(classesService);

const assignmentsService = new AssignmentsService(database);
const assignmentsController = new AssignmentsController(assignmentsService);

const classEnrollmentsService = new ClassEnrollmentsService(database);
const classEnrollmentsController = new ClassEnrollmentsController(
  classEnrollmentsService
);

const studentAssignmentsService = new StudentAssignmentsService(database);
const studentAssignmentsController = new StudentAssignmentsController(
  studentAssignmentsService
);

app.post("/students", studentsController.create);
app.get("/students", studentsController.readAll);
app.get("/students/:id", studentsController.read);
app.get("/students/:id/assignments", studentsController.readAssignments);
app.get("/students/:id/grades", studentsController.readGrades);

app.post("/classes", classesController.create);
app.get("/classes/:id/assignments", classesController.readAssignments);

app.post("/assignments", assignmentsController.create);
app.get("/assignments/:id", assignmentsController.read);

app.post("/class-enrollments", classEnrollmentsController.create);

app.post("/student-assignments", studentAssignmentsController.create);
app.post("/student-assignments/submit", studentAssignmentsController.submit);
app.post("/student-assignments/grade", studentAssignmentsController.grade);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
