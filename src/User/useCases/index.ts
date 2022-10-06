import { PrismaClient } from "@prisma/client";
import {
  IPostUserRequestBody,
  IPutUserRequestBody,
  IPutUserRequestParams,
} from "../types";
import createUserGenerator from "./CreateUserUseCase";
import delUserGenerator from "./DeleteUserUseCase";
import getUserGenerator from "./GetUserUseCase";
import listUsersGenerator from "./ListUsersUseCase";
import updateUserGenerator from "./UpdateUserUseCase";

const prisma = new PrismaClient();

// TODO: Move this to a separate file
const databaseClient = {
  fetchUser: (id: number) => prisma.user.findUnique({ where: { id } }),
  updateUser: ({ id, ...data }: IPutUserRequestBody & IPutUserRequestParams) =>
    prisma.user.update({
      where: { id: Number(id) },
      data,
    }),
  listUsers: () => prisma.user.findMany(),
  createUser: (data: IPostUserRequestBody) => prisma.user.create({ data }),
  deleteUser: (id: number) => prisma.user.delete({ where: { id } }),
};

export const listUsersUseCase = listUsersGenerator(databaseClient.listUsers);
export const getUserUseCase = getUserGenerator(databaseClient.fetchUser);
export const createUserUseCase = createUserGenerator(databaseClient.createUser);
export const updateUserUseCase = updateUserGenerator(databaseClient.updateUser);
export const deleteUserUseCase = delUserGenerator(databaseClient.deleteUser);
