import request from "supertest";
import { app } from "../../src/index";
import { Class } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAClass } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/createAssignment.feature")
);

defineFeature(feature, (test) => {
  test("Successfully create an assignment", ({ given, when, then }) => {
    let existingClass: Class;
    let response: any;

    given("I have a class", async () => {
      existingClass = await creatingAClass().build();
    });

    when("I create an assignment", async () => {
      response = await request(app).post("/assignments").send({
        title: "Assignment 1",
        classId: existingClass.id,
      });
    });

    then("I should see the assignment in the class", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe("Assignment 1");
      expect(response.body.data.classId).toBe(existingClass.id);
    });
  });
});
