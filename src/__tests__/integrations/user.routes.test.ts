import request from "supertest";
import app from "../../app";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { IUserRequest, IUser } from "../../interfaces/users";

import createUserService from "../../services/users/createUser.service";

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

describe("Testes relacionados às rotas de usuário", () => {
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

  test("POST /users -> Deve criar um novo usuário", async () => {
    const userData: IUserRequest = {
      name: "Matheus",
      email: "matheus@mail.com",
      stack: "Backend",
      password: "1234",
      isAdm: true,
    };
    const result: IUser = await createUserService(userData);

    expect(result).toHaveProperty("id");
    expect(result.password).not.toEqual(userData.password);
  });
});
