import request from "supertest";
import { app } from "../../src";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAStudent } from "../fixtures";
import { Student } from "@prisma/client";
import { resetDatabase } from "../fixtures/reset";

const feature = loadFeature(
  path.join(__dirname, "../features/getAllStudents.feature")
);

beforeAll(async () => {
  await resetDatabase();
});

defineFeature(feature, (test) => {
  test("Look up all users", ({ given, when, then }) => {
    const numberOfStudents = 100;
    let students: Student[] = [];
    let response: any;

    given("there are students in the system", async () => {
      for (let i = 0; i < numberOfStudents; i++) {
        students.push(await creatingAStudent().build());
      }
    });

    when("I get all students", async () => {
      response = await request(app).get(`/students`);
    });

    then("I should see all students in the system", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(numberOfStudents);
      students.forEach((student) => {
        expect(response.body.data).toContainEqual(
          expect.objectContaining({
            id: student.id,
            name: student.name,
            email: student.email,
          })
        );
      });
    });
  });
});
