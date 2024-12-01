import request from "supertest";
import { app } from "../../src";

import {
  Student,
  Class,
  Assignment,
  ClassEnrollment,
  StudentAssignment,
  AssignmentSubmission,
} from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import {
  creatingAClass,
  creatingAClassEnrollment,
  creatingAnAssignment,
  creatingAnAssignmentSubmission,
  creatingAStudent,
  creatingAStudentAssignment,
} from "../fixtures";
import e from "express";

const feature = loadFeature(
  path.join(__dirname, "../features/submitStudentAssignment.feature")
);

defineFeature(feature, (test) => {
  test("Submit assignment", ({ given, and, when, then }) => {
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

    and("the student has been given the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withStudent(existingStudent)
        .withAssignment(existingAssignment)
        .build();
    });

    when("the student submits the assignment", async () => {
      response = await request(app).post("/student-assignments/submit").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment is submitted successfully", () => {
      expect(response.status).toBe(201);
    });
  });

  test("Submit assignment that has already been submitted", ({
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
    let existingAssignmentSubmission: AssignmentSubmission;
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

    and("the student has been given the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withStudent(existingStudent)
        .withAssignment(existingAssignment)
        .build();
    });

    and("the student submits the assignment", async () => {
      existingAssignmentSubmission = await creatingAnAssignmentSubmission()
        .withStudentAssignment(existingStudentAssignment)
        .build();
    });

    when("the student submits the assignment again", async () => {
      response = await request(app).post("/student-assignments/submit").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment submission fails", () => {
      expect(response.status).toBe(409);
    });
  });

  test("Fail to submit assignment when students assignment does not exist", ({
    given,
    and,
    when,
    then,
  }) => {
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

    when("the student submits the assignment", async () => {
      response = await request(app).post("/student-assignments/submit").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment submission fails", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
