import request from "supertest";
import { app } from "../../src";

import { Assignment } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAnAssignment } from "../fixtures";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  path.join(__dirname, "../features/getAssignment.feature")
);

defineFeature(feature, (test) => {
  test("Successfully get an assignment", ({ given, when, then }) => {
    let existingAssignment: Assignment;
    let response: any;

    given("an assignment exists", async () => {
      existingAssignment = await creatingAnAssignment().build();
    });

    when("I try to get the assignment", async () => {
      response = await request(app).get(
        `/assignments/${existingAssignment.id}`
      );
    });

    then("the response should be successful", () => {
      expect(response.status).toBe(200);
      expect(response.body.data.title).toBe(existingAssignment.title);
      expect(response.body.data.classId).toBe(existingAssignment.classId);
    });
  });
  test("Fail to get an assignment that does not exist", ({
    given,
    when,
    then,
  }) => {
    let nonExistingAssignmentId: string;
    let response: any;
    given("an assignment does not exist", () => {
      nonExistingAssignmentId = faker.string.uuid();
    });

    when("I try to get the assignment", async () => {
      response = await request(app).get(
        `/assignments/${nonExistingAssignmentId}`
      );
    });

    then("the response should be unsuccessful", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
