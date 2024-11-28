import request from "supertest";
import { app } from "../../src/index";

import { faker } from "@faker-js/faker";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { before } from "node:test";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature")
);

defineFeature(feature, (test) => {
  test("Sucessfully create a class room", ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I want to create a class room named "(.*)"$/, () => {
      requestBody = {
        name: `${faker.person.firstName()}-${faker.string.uuid()}`,
      };
    });

    when("I send a request to create a class room", async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    then("the class room should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });
});
