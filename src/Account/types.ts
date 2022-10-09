import { Account } from "@prisma/client";

export type PostAccountRequestBody = Pick<Account, "name" | "userId">;
export type PostAccountResponseBody = {
  id: number;
};

export type ListAccountsResponseBody = {
  accounts: Account[];
};

export type GetAccountRequestParams = {
  id: string;
};
export type GetAccountResponseBody = { account: Account | null };
