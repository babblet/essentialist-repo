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
import { Server } from "./server";

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

export const server: Server = new Server(
  studentsController,
  classesController,
  assignmentsController,
  classEnrollmentsController,
  studentAssignmentsController
);
