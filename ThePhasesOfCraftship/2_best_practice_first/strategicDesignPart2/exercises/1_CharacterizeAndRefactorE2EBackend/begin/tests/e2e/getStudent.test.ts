import request from "supertest";
import { Student } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAStudent } from "../fixtures";
import { app } from "../../src";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/getStudent.feature")
);

defineFeature(feature, (test) => {
  test("Successfully get a student", ({ given, when, then }) => {
    let existingStudent: Student;
    let response: any;

    given("a student exists", async () => {
      existingStudent = await creatingAStudent().build();
    });

    when("I try to get the student", async () => {
      response = await request(app).get(`/students/${existingStudent.id}`);
    });

    then("the response should be successful", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe(existingStudent.name);
    });
  });

  test("Fail to get a student that does not exist", ({ given, when, then }) => {
    let nonExistingStudentId: string;
    let response: any;

    given("a student does not exist", () => {
      nonExistingStudentId = faker.string.uuid();
    });

    when("I try to get the student", async () => {
      response = await request(app).get(`/students/${nonExistingStudentId}`);
    });

    then("the response should be unsuccessful", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
