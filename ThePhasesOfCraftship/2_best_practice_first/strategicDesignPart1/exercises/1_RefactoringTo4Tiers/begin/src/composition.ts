import { StudentsController } from "./controllers/StudentsController";
import { ClassesController } from "./controllers/ClassesController";
import { AssignmentsController } from "./controllers/AssignmentsController";
import { ClassEnrollmentsController } from "./controllers/ClassEnrollmentsContoller";
import { StudentAssignmentsController } from "./controllers/StudentAssignmentsController";
import { PrismaClient } from "@prisma/client";
import { Database } from "./shared/database";
import { StudentsService } from "./services/StudentsService";
import { ClassesService } from "./services/ClassesService";
import { AssignmentsService } from "./services/AssignmentsService";
import { ClassEnrollmentsService } from "./services/ClassEnrollmentsService";
import { StudentAssignmentsService } from "./services/StudentAssignmentsService";
import { ExpressServer } from "./server/ExpressServer";
import { ErrorHandlingMiddleware } from "./server/middlewares/ErrorHandlingMiddleware";
import { ExceptionHandlingMiddleware } from "./server/middlewares/ExceptionHandlingMiddleware";
import { ExpressRouter } from "./server/router/ExpressRouter";

const prisma = new PrismaClient();
const database = new Database(prisma);

const studentsService = new StudentsService(database);
const classesService = new ClassesService(database);
const assignmentsService = new AssignmentsService(database);
const classEnrollmentsService = new ClassEnrollmentsService(database);
const studentAssignmentsService = new StudentAssignmentsService(database);

const studentsController = new StudentsController(studentsService);
const classesController = new ClassesController(classesService);
const assignmentsController = new AssignmentsController(assignmentsService);
const classEnrollmentsController = new ClassEnrollmentsController(
  classEnrollmentsService
);
const studentAssignmentsController = new StudentAssignmentsController(
  studentAssignmentsService
);

const errorHandler = new ErrorHandlingMiddleware();
const exceptionHandler = new ExceptionHandlingMiddleware();
const routerOptions = {
  controllers: [
    studentsController,
    classesController,
    assignmentsController,
    classEnrollmentsController,
    studentAssignmentsController,
  ],
  middlewares: [exceptionHandler, errorHandler],
};
const router = new ExpressRouter(routerOptions);

export const server = new ExpressServer(router);
