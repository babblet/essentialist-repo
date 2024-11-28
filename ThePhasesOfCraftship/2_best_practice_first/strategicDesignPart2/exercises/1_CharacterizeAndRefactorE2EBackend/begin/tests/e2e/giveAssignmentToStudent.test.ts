import request from "supertest";
import { app } from "../../src/index";

import {
  Assignment,
  Class,
  ClassEnrollment,
  Student,
  StudentAssignment,
} from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import {
  creatingAClass,
  creatingAClassEnrollment,
  creatingAnAssignment,
  creatingAStudent,
  creatingAStudentAssignment,
} from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/giveAssignmentToStudent.feature")
);

defineFeature(feature, (test) => {
  test("Give assignment to student", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingAssignment: Assignment;
    let existingClassEnrollment: ClassEnrollment;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withClass(existingClass)
        .withStudent(existingStudent)
        .build();
    });

    when("the teacher gives an assignment to the student", async () => {
      response = await request(app).post("/student-assignments").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment is created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(existingStudent.id);
    });
  });

  test("Give already assigned assignment to student", ({
    given,
    and,
    when,
    then,
  }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingAssignment: Assignment;
    let existingClassEnrollment: ClassEnrollment;
    let existingStudentAssignment: StudentAssignment;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withClass(existingClass)
        .withStudent(existingStudent)
        .build();
    });

    and("the teacher gives an assignment to the student", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withStudent(existingStudent)
        .withAssignment(existingAssignment)
        .build();
    });

    when("the teacher gives the same assignment to the student", () => {
      response = request(app).post("/student-assignments").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment creation fails", () => {});
  });
});
