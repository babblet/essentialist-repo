import request from "supertest";
import { app } from "../../src/index";

import { faker } from "@faker-js/faker";

import { Class } from "@prisma/client";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { resetDatabase } from "../fixtures/reset";
import { creatingAClass } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/createClass.feature")
);

beforeAll(async () => {
  await resetDatabase();
});

defineFeature(feature, (test) => {
  test("Sucessfully create a class", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I want to create a class named "(.*)"$/, () => {
      requestBody = {
        name: `${faker.person.firstName()}-${faker.string.uuid()}`,
      };
    });

    when("I send a request to create a class", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  test("Fail to create a class with an already existing name", ({
    given,
    when,
    then,
  }) => {
    let existingClass: Class;
    let response: any = {};

    given(/^There is a class named "(.*)"$/, async (name) => {
      existingClass = await creatingAClass().withName(name).build();
    });

    when(
      "I send a request to create a class with the existing class name",
      async () => {
        response = await request(app).post("/classes").send({
          name: existingClass.name,
        });
      }
    );

    then("the class should not be created successfully", () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBeDefined();
    });
  });
});
