import request from "supertest";
import { app } from "../../src/index";

import { Student } from "@prisma/client";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import { creatingAStudent } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/createStudent.feature")
);

defineFeature(feature, (test) => {
  test("Successfully create a student", ({ given, when, then }) => {
    let requestData: Partial<Student>;
    let response: any;

    given("I want to add a student", () => {
      requestData = { name: "John Doe", email: "jhondoe@exmaple.com" };
    });

    when("I send a request to create a student", async () => {
      response = await request(app).post("/students").send(requestData);
    });

    then("the student should be created successfully", () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestData.name);
      expect(response.body.data.email).toBe(requestData.email);
    });
  });

  test("Fail to create a student with an already existing email", ({
    given,
    when,
    then,
  }) => {
    let existingStudent: Student;
    let response: any;

    given("There is a student with an already existing email", async () => {
      existingStudent = await creatingAStudent()
        .withName("John Doe")
        .withEmail("johndoe@example.com")
        .build();
    });

    when(
      "I send a request to create a student with the existing email",
      async () => {
        response = await request(app)
          .post("/students")
          .send({ name: "Jane Doe", email: existingStudent.email });
      }
    );

    then("the student should not be created successfully", () => {
      expect(response.status).toBe(500);
      expect(response.body.error).toBe("ServerError");
    });
  });
});
