import request from "supertest";
import { app } from "../../src/index";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAStudent, creatingAStudentAssignment } from "../fixtures";
import { Student, StudentAssignment } from "@prisma/client";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/getAllStudentSubmittedAssignments.feature")
);

defineFeature(feature, (test) => {
  test("Successfully get all student submitted assignments", ({
    given,
    and,
    when,
    then,
  }) => {
    let existingStudent: Student;

    let numberOfAssignments: number = 5;
    let existingStudentAssignments: StudentAssignment[] = [];

    let response: any;

    given("I am a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("I want to get all my submitted assignments", async () => {
      for (let i = 0; i < numberOfAssignments; i++) {
        existingStudentAssignments.push(
          await creatingAStudentAssignment()
            .withStudent(existingStudent)
            .build()
        );
      }
    });

    when(
      "I send a request to get all student submitted assignments",
      async () => {
        response = await request(app).get(
          `/student/${existingStudent.id}/assignments`
        );
      }
    );

    then("I should see all the student submitted assignments", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(numberOfAssignments);
    });
  });

  test("Fail to get all student submitted assignments for non existent student", ({
    given,
    when,
    then,
  }) => {
    let nonExistentStudentId: string;
    let response: any;
    given(
      "I want to get all submitted assignments, but the student does not exist",
      () => {
        nonExistentStudentId = faker.string.uuid();
      }
    );

    when(
      "I send a request to get all student submitted assignments for a non existent student",
      async () => {
        response = await request(app).get(
          `/student/${nonExistentStudentId}/assignments`
        );
      }
    );

    then("I should not see any student submitted assignments", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
