import { Account } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import { isOfType, runValidations } from "../../utils";
import { AccountCreator } from "../repository";
import { PostAccountRequestBody } from "../types";

const validateParams = (params: PostAccountRequestBody) =>
  runValidations(params, []);

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: Account | Error
) => ({
  kind,
  payload: isOfType<Account>(payloadData)
    ? payloadData.id
    : { error: payloadData, message: payloadData.message },
});

export default function generator(
  createAccount: AccountCreator
): UseCase<number | IUseCaseFailPayload, PostAccountRequestBody> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() => createAccount(params))
        .then((account) => pipeToResponse(UseCaseResponseKind.SUCESS, account))
        .catch((error) => pipeToResponse(UseCaseResponseKind.FAIL, error)),
  };
}
