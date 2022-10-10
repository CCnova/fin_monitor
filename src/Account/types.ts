import { IUseCaseFailPayload } from "../types";
import { Account } from "./repository";

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

export type PutAccountRequestBody = Pick<Account, "balance" | "name">;
export type PutAccountRequestParams = Pick<Account, "id">;
export type PutAccountResponseBody = { account: Account | null };

export type DeleteAccountRequestParams = Pick<Account, "id">;
export type DeleteAccountResponseBody =
  | { account: Account | null }
  | IUseCaseFailPayload;
