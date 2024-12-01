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
import { faker } from "@faker-js/faker";

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

  test("Student does not exist", ({ given, and, when, then }) => {
    let existingClass: Class;
    let existingAssignment: Assignment;
    let nonExistentStudentId: string;
    let response: any;

    given("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("there is an assignment", async () => {
      existingAssignment = await creatingAnAssignment()
        .withClass(existingClass)
        .build();
    });

    and("there is an inexistent student", () => {
      nonExistentStudentId = faker.string.uuid();
    });

    when(
      "the teacher gives an assignment to a non-existent student",
      async () => {
        response = await request(app).post("/student-assignments").send({
          studentId: nonExistentStudentId,
          assignmentId: existingAssignment.id,
        });
      }
    );

    then("the assignment creation fails", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Assignment does not exist", ({ given, and, when, then }) => {
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
        .withClass(existingClass)
        .withStudent(existingStudent)
        .build();
    });

    and("there is a non-existent assignment", () => {
      nonExistentAssignmentId = faker.string.uuid();
    });

    when(
      "the teacher gives a non-existent assignment to the student",
      async () => {
        response = await request(app).post("/student-assignments").send({
          studentId: existingStudent.id,
          assignmentId: nonExistentAssignmentId,
        });
      }
    );

    then("the assignment creation fails", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });

  test("Student is not enrolled", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingAssignment: Assignment;
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

    and("the student is not enrolled in the class", () => {});

    when("the teacher gives an assignment to the student", async () => {
      response = await request(app).post("/student-assignments").send({
        studentId: existingStudent.id,
        assignmentId: existingAssignment.id,
      });
    });

    then("the assignment creation fails", () => {
      console.log(response.body);
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
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
