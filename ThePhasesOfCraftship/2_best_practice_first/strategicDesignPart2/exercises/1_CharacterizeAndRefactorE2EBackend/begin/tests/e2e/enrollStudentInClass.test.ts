import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAClass, creatingAStudent } from "../fixtures";
import { Class, Student } from "@prisma/client";
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
});
