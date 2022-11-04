import request from "supertest";
import app from "../../app";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { IUserRequest } from "../../interfaces/users";
import { ITechRequest } from "../../interfaces/techs";

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

const mockedTech: ITechRequest = {
  name: "TypeScript",
  stack: "Fullstack",
};

describe("techs routes test", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(userAdminData);
    await request(app).post("/users").send(userNotAdminData);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /techs -> Must be able to create tech", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);

    const response = await request(app)
      .post("/techs")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedTech);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("stack");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /techs -> Should not be able to create tech that already exists", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const response = await request(app)
      .post("/techs")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedTech);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /techs -> Should not be able to create tech without authentication", async () => {
    const response = await request(app).post("/techs").send(mockedTech);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /techs -> Should not be able to create tech not being admin", async () => {
    const userLoginResponse = await request(app)
      .post("/login")
      .send(userNotAdminData);

    const response = await request(app)
      .post("/techs")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`)
      .send(mockedTech);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /techs -> Must be able to list all techs", async () => {
    const response = await request(app).get("/techs");
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("DELETE /techs/:id -> Should not be able to delete tech without authentication", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const techToBeDeleted = await request(app)
      .get("/techs")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/techs/${techToBeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /techs/:id -> Should not be able to delete tech not being admin", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);
    const notAdminLoginResponse = await request(app)
      .post("/login")
      .send(userNotAdminData);
    const techToBeDeleted = await request(app) // O usuário admin faz o get.
      .get("/techs")
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app) // O usuário não admin tenta fazer o delete.
      .delete(`/techs/${techToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${notAdminLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("DELETE /techs/:id -> Should not be able to delete tech with invalid id", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);

    const response = await request(app)
      .delete(`/techs/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /techs/:id -> Must be able to delete tech", async () => {
    const adminLoginResponse = await request(app)
      .post("/login")
      .send(userAdminData);

    const TechToBeDeleted = await request(app).get("/techs");

    const response = await request(app)
      .delete(`/techs/${TechToBeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
