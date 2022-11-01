import createUserService from "../../services/users/createUser.service";
import { IUserRequest, IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { DataSource } from "typeorm";
import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";

describe("Testes relacionados à criação de usuário", () => {
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

  test("Deve criar um novo usuário", async () => {
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
