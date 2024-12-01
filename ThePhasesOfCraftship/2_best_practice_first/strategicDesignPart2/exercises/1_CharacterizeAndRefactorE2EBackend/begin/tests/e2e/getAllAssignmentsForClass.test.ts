import request from "supertest";
import { app } from "../../src";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Assignment, Class } from "@prisma/client";
import { creatingAClass, creatingAnAssignment } from "../fixtures";
import { resetDatabase } from "../fixtures/reset";
import { faker } from "@faker-js/faker";

const feature = loadFeature(
  require.resolve("../features/getAllAssignmentsForClass.feature")
);

beforeAll(async () => {
  await resetDatabase();
});

defineFeature(feature, (test) => {
  test("Successfully get all assignments for a class", ({
    given,
    and,
    when,
    then,
  }) => {
    const numberOfAssignments = 3;
    let existingClass: Class;
    let existingAssignments: Assignment[] = [];
    let response: any;

    given("I have a class", async () => {
      existingClass = await creatingAClass().build();
    });

    and("there are assignments for the class", async () => {
      for (let i = 0; i < numberOfAssignments; i++) {
        existingAssignments.push(
          await creatingAnAssignment().withClass(existingClass).build()
        );
      }
    });

    when("I get all assignments for the class", async () => {
      response = await request(app).get(
        `/classes/${existingClass.id}/assignments`
      );
    });

    then("the response should be successful", () => {
      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(numberOfAssignments);
    });
  });

  test("Fail to get all assignments for a non existing class", ({
    given,
    when,
    then,
  }) => {
    let nonExistingClassId: string;
    let response: any;

    given("I have a non existing class", () => {
      nonExistingClassId = faker.string.uuid();
    });

    when("I get all assignments for the class", async () => {
      response = await request(app).get(
        `/classes/${nonExistingClassId}/assignments`
      );
    });

    then("the response should be unsuccessful", () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBeDefined();
    });
  });
});
