import request from "supertest";
import app from "../../app";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { IUserRequest } from "../../interfaces/users";

const userAdminData: IUserRequest = {
  name: "Matheus",
  email: "matheus@mail.com",
  stack: "Backend",
  password: "1234",
  isAdm: true,
};

const userNotAdminData: IUserRequest = {
  name: "Mendes",
  email: "mendes@mail.com",
  stack: "Fullstack",
  password: "1234",
  isAdm: false,
};

describe("users route tests", () => {
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

  test("POST /users -> Must be able to create a user", async () => {
    const adminResponse = await request(app).post("/users").send(userAdminData);

    expect(adminResponse.status).toBe(201);
    expect(adminResponse.body).toHaveProperty("id");
    expect(adminResponse.body).toHaveProperty("name");
    expect(adminResponse.body).toHaveProperty("email");
    expect(adminResponse.body).toHaveProperty("stack");
    expect(adminResponse.body).toHaveProperty("isAdm");
    expect(adminResponse.body).not.toHaveProperty("password");
    expect(adminResponse.body.name).toEqual("Matheus");
    expect(adminResponse.body.email).toEqual("matheus@mail.com");
    expect(adminResponse.body.isAdm).toEqual(true);
  });

  test("POST /users -  Should not be able to create a user that already exists", async () => {
    const adminResponse = await request(app).post("/users").send(userAdminData);

    expect(adminResponse.status).toBe(409);
    expect(adminResponse.body).toMatchObject({
      status: "error",
      message: "E-mail already registered",
    });
  });

  test("GET /users -  Must be able to list users", async () => {
    await request(app).post("/users").send(userNotAdminData);
    const response = await request(app).get("/users");

    expect(response.body).toHaveLength(2);
  });
});
