import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import {
  creatingAClass,
  creatingAClassEnrollment,
  creatingAStudent,
} from "../fixtures";
import { Class, ClassEnrollment, Student } from "@prisma/client";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
  path.join(__dirname, "../features/enrollStudentInClass.feature")
);

defineFeature(feature, (test) => {
  beforeAll(async () => {
    await resetDatabase();
  });

  test("Enroll student in class", ({ given, and, when, then }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    when("the student enrolls in the class", async () => {
      response = await request(app).post(`/class-enrollments`).send({
        studentId: existingStudent.id,
        classId: existingClass.id,
      });
    });

    then("the student is enrolled in the class", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(existingStudent.id);
      expect(response.body.data.classId).toBe(existingClass.id);
    });
  });

  test("Fail to enroll non existent student", ({ given, when, then }) => {
    let existingClass: Class;
    let response: any;

    given("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    when("a non existent student enrolls in the class", async () => {
      response = await request(app).post(`/class-enrollments`).send({
        studentId: "non-existent",
        classId: existingClass.id,
      });
    });

    then("the enrollment should fail", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("StudentNotFound");
    });
  });

  test("Fail to enroll student in class with an already enrolled student", ({
    given,
    and,
    when,
    then,
  }) => {
    let existingStudent: Student;
    let existingClass: Class;
    let existingEnrollment: ClassEnrollment;
    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("there is a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("the student is already enrolled in the class", async () => {
      existingEnrollment = await creatingAClassEnrollment()
        .withStudent(existingStudent)
        .withClass(existingClass)
        .build();
    });

    when("the student enrolls in the class", async () => {
      response = await request(app).post(`/class-enrollments`).send({
        studentId: existingStudent.id,
        classId: existingClass.id,
      });
    });

    then("the enrollment should fail", () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe("StudentAlreadyEnrolled");
    });

    and("the student should still be enrolled in the class", () => {});
  });
});
