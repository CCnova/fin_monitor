import accountRepository from "../repository";
import createAccountGenerator from "./CreateAccountUseCase";
import deleteAccountGenerator from "./DeleteAccountUseCase";
import getAccountGenerator from "./GetAccountUseCase";
import listAccountsGenerator from "./ListAccountsUseCase";
import updateAccountGenerator from "./UpdateAccountUseCase";

export const createAccountUseCase = createAccountGenerator(
  accountRepository.createAccount
);
export const listAccountsUseCase = listAccountsGenerator(
  accountRepository.listAccounts
);
export const getAccountUseCase = getAccountGenerator(
  accountRepository.getAccount
);
export const updateAccountUseCase = updateAccountGenerator(
  accountRepository.updateAccount
);
export const deleteAccountUseCase = deleteAccountGenerator(
  accountRepository.deleteAccount
);
