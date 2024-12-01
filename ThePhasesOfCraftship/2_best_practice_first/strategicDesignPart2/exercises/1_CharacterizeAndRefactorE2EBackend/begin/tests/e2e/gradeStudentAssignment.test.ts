import request from "supertest";
import { app } from "../../src/index";

import { resetDatabase } from "../fixtures/reset";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import {
  creatingAClass,
  creatingAStudent,
  creatingAClassEnrollment,
  creatingAnAssignment,
  creatingAnAssignmentSubmission,
  creatingAStudentAssignment,
  creatingAGradedAssignment,
} from "../fixtures";
import {
  Assignment,
  AssignmentSubmission,
  Class,
  ClassEnrollment,
  GradedAssignment,
  Student,
  StudentAssignment,
} from "@prisma/client";
import { response } from "express";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/gradeStudentAssignment.feature")
);

beforeAll(async () => {
  await resetDatabase();
});

defineFeature(feature, (test) => {
  test("Grade assignment", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingClassEnrollment: ClassEnrollment;
    let existingAssignment: Assignment;
    let existingStudentAssignment: StudentAssignment;
    let existingSubmission: AssignmentSubmission;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    and("the there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student has been assigned the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withAssignment(existingAssignment)
        .withStudent(existingStudent)
        .build();
    });

    and("the student has submitted the assignment", async () => {
      existingSubmission = await creatingAnAssignmentSubmission()
        .withStudentAssignment(existingStudentAssignment)
        .build();
    });

    when("the teacher grades the assignment", async () => {
      response = await request(app).post("/student-assignments/grade").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
        grade: "A",
      });
    });

    then("the grading is successful", () => {
      expect(response.status).toBe(201);
    });
  });

  test("Grade assignment when assignment already graded", ({
    given,
    and,
    when,
    then,
  }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingClassEnrollment: ClassEnrollment;
    let existingAssignment: Assignment;
    let existingStudentAssignment: StudentAssignment;
    let existingSubmission: AssignmentSubmission;
    let existingGradedAssignment: GradedAssignment;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    and("the there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student has been assigned the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withAssignment(existingAssignment)
        .withStudent(existingStudent)
        .build();
    });

    and("the student has submitted the assignment", async () => {
      existingSubmission = await creatingAnAssignmentSubmission()
        .withStudentAssignment(existingStudentAssignment)
        .build();
    });

    and("the assignment has already been graded", async () => {
      existingGradedAssignment = await creatingAGradedAssignment()
        .withAssignmentSubmission(existingSubmission)
        .build();
    });

    when("the teacher grades the assignment", async () => {
      response = await request(app).post("/student-assignments/grade").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
        grade: "A",
      });
    });

    then("the grading is unsuccessful", () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Grade assignment with invalid grade", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingClassEnrollment: ClassEnrollment;
    let existingAssignment: Assignment;
    let existingStudentAssignment: StudentAssignment;
    let existingSubmission: AssignmentSubmission;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    and("the there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student has been assigned the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withAssignment(existingAssignment)
        .withStudent(existingStudent)
        .build();
    });

    and("the student has submitted the assignment", async () => {
      existingSubmission = await creatingAnAssignmentSubmission()
        .withStudentAssignment(existingStudentAssignment)
        .build();
    });

    when(
      "the teacher grades the assignment with an invalid grade",
      async () => {
        response = await request(app).post("/student-assignments/grade").send({
          studentId: existingStudent.id,
          assignmentId: existingAssignment.id,
          grade: "Z",
        });
      }
    );

    then("the grading is unsuccessful", () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Grade non submitted assignment", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingClassEnrollment: ClassEnrollment;
    let existingAssignment: Assignment;
    let existingStudentAssignment: StudentAssignment;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    and("the there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("the student has been assigned the assignment", async () => {
      existingStudentAssignment = await creatingAStudentAssignment()
        .withAssignment(existingAssignment)
        .withStudent(existingStudent)
        .build();
    });

    and("the student has not submitted the assignment", () => {
      // No submission created
    });

    when("the teacher grades the assignment", async () => {
      response = await request(app).post("/student-assignments/grade").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
        grade: "A",
      });
    });

    then("the grading is unsuccessful", () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Grade assignment with non existent student", ({
    given,
    and,
    when,
    then,
  }) => {
    let nonExistentStudentId: string;
    let existingClass: Class;
    let existingAssignment: Assignment;
    let response: any;

    given("there is not a student", () => {
      nonExistentStudentId = faker.string.uuid();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    when(
      "the teacher grades the assignment for a non existent student",
      async () => {
        response = await request(app).post("/student-assignments/grade").send({
          studentId: nonExistentStudentId,
          assignmentId: existingAssignment.id,
          grade: "A",
        });
      }
    );

    then("the grading is unsuccessful", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Grade assignment with non existent Assignment", ({
    given,
    and,
    when,
    then,
  }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingClassEnrollment: ClassEnrollment;
    let nonExistentAssignmentId: string;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is enrolled in the class", async () => {
      existingClassEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    and("the there is not an assignment", () => {
      nonExistentAssignmentId = faker.string.uuid();
    });

    when(
      "the teacher grades the assignment for a non existing assignment",
      async () => {
        response = await request(app).post("/student-assignments/grade").send({
          studentId: existingStudent.id,
          assignmentId: nonExistentAssignmentId,
          grade: "A",
        });
      }
    );

    then("the grading is unsuccessful", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
