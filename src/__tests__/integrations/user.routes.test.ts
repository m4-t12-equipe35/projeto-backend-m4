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
    expect(adminResponse.body).toHaveProperty("isActive");
    expect(adminResponse.body).not.toHaveProperty("password");
    expect(adminResponse.body.name).toEqual("Matheus");
    expect(adminResponse.body.email).toEqual("matheus@mail.com");
    expect(adminResponse.body.isAdm).toEqual(true);
    expect(adminResponse.body.isActive).toEqual(true);
  });

  test("POST /users -> Should not be able to create a user that already exists", async () => {
    const adminResponse = await request(app).post("/users").send(userAdminData);

    expect(adminResponse.status).toBe(409);
    expect(adminResponse.body).toMatchObject({
      status: "error",
      message: "E-mail already registered",
    });
  });

  test("GET /users -> Must be able to list users", async () => {
    const loginResponse = await request(app).post("/login").send(userAdminData);

    const notAdminResponse = await request(app)
      .post("/users")
      .send(userNotAdminData);

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(notAdminResponse.body.isAdm).toEqual(false);
    expect(response.body).toHaveLength(2);
  });

  test("GET /users -> Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /users -> Should not be able to list users not being admin", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(userNotAdminData);
    const notAdminResponse = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(notAdminResponse.body).toHaveProperty("message");
    expect(notAdminResponse.status).toBe(403);
  });

  test("DELETE /users/:id -> Should not be able to delete user without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const userToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/users/${userToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users/:id -> Should not be able to delete user not being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNotAdminData);
    const userToBeDeleted = await request(app) // O usuário admin faz o get.
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app) // O usuário não admin tenta fazer o delete.
      .delete(`/users/${userToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /users/:id -> Must be able to soft delete user", async () => {
    await request(app).post("/users").send(userAdminData);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const userToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${userToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    const findUser = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
    expect(findUser.body[0].isActive).toBe(false);
  });

  test("DELETE /users/:id -> Shouldn't be able to delete user with isActive === false", async () => {
    await request(app).post("/users").send(userAdminData);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const userToBeDeleted = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/users/${userToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE -> Should not be able to delete user with invalid id", async () => {
    await request(app).post("/users").send(userAdminData);

    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);

    const response = await request(app)
      .delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
