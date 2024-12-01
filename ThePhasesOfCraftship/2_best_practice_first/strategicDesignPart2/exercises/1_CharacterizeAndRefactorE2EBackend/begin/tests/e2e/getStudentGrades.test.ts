import request from "supertest";
import { app } from "../../src/index";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { GradedAssignment, Student } from "@prisma/client";
import {
  creatingAGradedAssignment,
  creatingAnAssignmentSubmission,
  creatingAStudent,
  creatingAStudentAssignment,
} from "../fixtures";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/getStudentGrades.feature")
);

defineFeature(feature, (test) => {
  test("Successfully get student grades", ({ given, and, when, then }) => {
    let existingStudent: Student;

    const numberOfGrades = 5;
    let existingStudentGrades: GradedAssignment[] = [];

    let response: any;

    given("there is a student", async () => {
      existingStudent = await creatingAStudent().build();
    });

    and("the student has grades", async () => {
      for (let i = 0; i < numberOfGrades; i++) {
        existingStudentGrades.push(
          await creatingAGradedAssignment()
            .withAssignmentSubmission(
              await creatingAnAssignmentSubmission()
                .withStudentAssignment(
                  await creatingAStudentAssignment()
                    .withStudent(existingStudent)
                    .build()
                )
                .build()
            )
            .build()
        );
      }
    });

    when("I send a request to get student grades", async () => {
      response = await request(app).get(
        `/student/${existingStudent.id}/grades`
      );
    });

    then("I should see the student grades", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(numberOfGrades);
    });
  });

  test("Fail to get student grades for a student that does not exist", ({
    given,
    when,
    then,
  }) => {
    let nonExistingStudentId: string;
    let response: any;

    given("there is no student", () => {
      nonExistingStudentId = faker.string.uuid();
    });

    when("I send a request to get student grades", async () => {
      response = await request(app).get(
        `/student/${nonExistingStudentId}/grades`
      );
    });

    then("I should not see the student grades", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
