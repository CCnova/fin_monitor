import { PrismaClient } from "@prisma/client";
import {
  IPostUserRequestBody,
  IPutUserRequestBody,
  IPutUserRequestParams,
} from "./types";

const prisma = new PrismaClient();

export default {
  fetchUser: (id: number) => prisma.user.findUnique({ where: { id } }),
  updateUser: ({ id, ...data }: IPutUserRequestBody & IPutUserRequestParams) =>
    prisma.user.update({
      where: { id: Number(id) },
      data,
    }),
  listUsers: () => prisma.user.findMany({ include: { accounts: true } }),
  createUser: (data: IPostUserRequestBody) => prisma.user.create({ data }),
  deleteUser: (id: number) => prisma.user.delete({ where: { id } }),
};
