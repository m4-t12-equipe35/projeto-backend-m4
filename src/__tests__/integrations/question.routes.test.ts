import request from "supertest";
import app from "../../app";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import {
  mockedAdminData,
  mockedNotAdminData,
  mockedAdminLogin,
  mockedNotAdminLogin,
  mockedTech,
  mockedQuestion,
  mockedInvalidTechQuestion,
  mockedNoCorrectAnswer,
  mockedTwoCorrectAnswers,
} from "../mocks";

describe("questions routes test", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedAdminData);
    await request(app).post("/users").send(mockedNotAdminData);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /questions -> Should be able to create question", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const newTech = await request(app)
      .post("/techs")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedTech);

    const techs = await request(app).get("/techs");

    mockedQuestion.techId = techs.body[0].id;

    const response = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedQuestion);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("question");
    expect(response.body).toHaveProperty("level");
    expect(response.body).toHaveProperty("tech");
    expect(response.body).toHaveProperty("answers");
    expect(response.body.answers).toHaveLength(4);
    expect(response.status).toBe(201);
  });

  test("POST /questions -> Should not be able to create a question with an invalid techId", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedInvalidTechQuestion);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /questions -> Should not be able to create a question with no correct answer", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const techs = await request(app).get("/techs");

    mockedNoCorrectAnswer.techId = techs.body[0].id;

    const response = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedNoCorrectAnswer);

    expect(response.body).toMatchObject({
      status: "error",
      message: "Your question doesn't have a correct answer",
    });
    expect(response.status).toBe(400);
  });

  test("POST /questions -> Should not be able to create a question with more than one correct answer", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const techs = await request(app).get("/techs");

    mockedTwoCorrectAnswers.techId = techs.body[0].id;

    const response = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedTwoCorrectAnswers);

    expect(response.body).toMatchObject({
      status: "error",
      message: "Each question needs only 1 correct answer",
    });
    expect(response.status).toBe(400);
  });

  test("POST /questions -> Should not be able to create question without authentication", async () => {
    const response = await request(app).post("/questions").send(mockedQuestion);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /questions -> Should not be able to create question not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(mockedNotAdminLogin);

    const response = await request(app)
      .post("/questions")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedQuestion);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /questions -> Must be able to list all questions", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /questions -> Should not be able to list questions without authentication", async () => {
    const response = await request(app).get("/questions");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /questions -> Should not be able to list questions not being admin", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedNotAdminLogin);
    const notAdminResponse = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(notAdminResponse.body).toHaveProperty("message");
    expect(notAdminResponse.status).toBe(403);
  });

  test("PATCH /questions/:id -> Should not be able to update question without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const questionToBeUpdated = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).patch(
      `/questions/${questionToBeUpdated.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /questions/:id -> Should not be able to update question not being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedNotAdminLogin);

    const questionToBeUpdated = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/questions/${questionToBeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /questions/:id -> Should not be able to delete question without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const questionToBeDeleted = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/techs/${questionToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /questions/:id -> Should not be able to delete question not being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(mockedNotAdminLogin);

    const questionToBeDeleted = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/questions/${questionToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /questions/:id -> Should not be able to delete question with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/questions/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /questions/:id -> Must be able to delete question", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    const questionToBeDeleted = await request(app)
      .get("/questions")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/questions/${questionToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
