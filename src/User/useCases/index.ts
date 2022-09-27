import { PrismaClient } from "@prisma/client";
import createUserGenerator from "./CreateUserUseCase";
import getUserGenerator from "./GetUserUseCase";
import listUsersGenerator from "./ListUsersUseCase";
import updateUserGenerator from "./UpdateUserUseCase";

const prisma = new PrismaClient();

export const listUsersUseCase = listUsersGenerator(prisma);
export const getUserUseCase = getUserGenerator(prisma);
export const createUserUseCase = createUserGenerator(prisma);
export const updateUserUseCase = updateUserGenerator(prisma);
