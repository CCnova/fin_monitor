import { Account } from "@prisma/client";
import { UseCase, UseCaseResponseKind } from "../../types";
import { isOfType } from "../../utils";
import { AccountLister } from "../repository";

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: Account[] | Error
) => ({
  kind,
  payload: isOfType<Account[]>(payloadData)
    ? payloadData
    : { error: payloadData, message: payloadData.message },
});

export default function generator(
  listAccounts: AccountLister
): UseCase<Account[]> {
  return {
    execute: () =>
      listAccounts()
        .then((accounts) =>
          pipeToResponse(UseCaseResponseKind.SUCESS, accounts)
        )
        .catch((error) => pipeToResponse(UseCaseResponseKind.FAIL, error)),
  };
}
