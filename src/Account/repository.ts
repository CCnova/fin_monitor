import { Account as PrismaAccountModel, PrismaClient } from "@prisma/client";
import { PostAccountRequestBody } from "./types";

const prisma = new PrismaClient();

/**
 * Is this necessary? The idea here was to keep the repository without knowledge of
 * outside types
 */
export type Account = PrismaAccountModel;

export type GetAccountWhere = { id: number };
export type PutAccountWhere = { id: number };
export type DeleteAccountWhere = { id: number };
export type PostAccountData = Pick<Account, "name" | "userId">;
export type PutAccountData = Pick<Account, "name" | "balance">;

export type AccountCreator = (data: PostAccountRequestBody) => Promise<Account>;
export type AccountLister = () => Promise<Account[]>;
export type AccountGetter = (where: GetAccountWhere) => Promise<Account | null>;
export type AccountUpdater = (
  where: PutAccountWhere,
  data: PutAccountData
) => Promise<Account>;
export type AccountDeleter = (where: DeleteAccountWhere) => Promise<Account>;

export default {
  createAccount: ((data: PostAccountData) =>
    prisma.account.create({ data })) as AccountCreator,
  listAccounts: (() => prisma.account.findMany()) as AccountLister,
  getAccount: ((where: GetAccountWhere) =>
    prisma.account.findUnique({ where })) as AccountGetter,
  updateAccount: ((where: PutAccountWhere, data: PutAccountData) =>
    prisma.account.update({ where, data })) as AccountUpdater,
  deleteAccount: ((where: DeleteAccountWhere) =>
    prisma.account.delete({ where })) as AccountDeleter,
};
