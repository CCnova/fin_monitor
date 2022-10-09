import { Account, PrismaClient } from "@prisma/client";
import { PostAccountRequestBody } from "./types";

const prisma = new PrismaClient();

/**
 * Is this necessary? The idea here was to keep the repository without knowledge of
 * outside types
 */
export type AccountCreator = (data: PostAccountRequestBody) => Promise<Account>;
export type AccountLister = () => Promise<Account[]>;
export type GetAccountWhere = { id: number };
export type AccountGetter = (where: GetAccountWhere) => Promise<Account | null>;

export default {
  createAccount: (data: PostAccountRequestBody) =>
    prisma.account.create({ data }),
  listAccounts: () => prisma.account.findMany(),
  getAccount: (where: GetAccountWhere) => prisma.account.findUnique({ where }),
};
