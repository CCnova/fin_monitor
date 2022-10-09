import accountRepository from "../repository";
import createAccountGenerator from "./CreateAccountUseCase";
import getAccountGenerator from "./GetAccountUseCase";
import listAccountsGenerator from "./ListAccountsUseCase";

export const createAccountUseCase = createAccountGenerator(
  accountRepository.createAccount
);
export const listAccountsUseCase = listAccountsGenerator(
  accountRepository.listAccounts
);
export const getAccountUseCase = getAccountGenerator(
  accountRepository.getAccount
);
