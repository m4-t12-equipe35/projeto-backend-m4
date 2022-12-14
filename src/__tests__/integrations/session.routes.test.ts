import request from "supertest";
import app from "../../app";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { mockedAdminData, mockedAdminLogin } from "../mocks";

describe("sessions route tests", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login -  should be able to login with the user", async () => {
    await request(app).post("/users").send(mockedAdminData);
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedAdminLogin);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
  });

  test("POST /login -  should not be able to login with the user with incorrect password or email", async () => {
    const loginResponse = await request(app).post("/login").send({
      email: "matheus@mail.com",
      password: "123",
    });

    expect(loginResponse.status).toBe(403);
    expect(loginResponse.body).toMatchObject({
      status: "error",
      message: "Invalid email or password",
    });
  });
});
