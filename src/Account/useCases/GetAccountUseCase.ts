import { Account } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import { isNumber, runValidations, ValidationFunction } from "../../utils";
import { AccountGetter, GetAccountWhere } from "../repository";
import { GetAccountRequestParams } from "../types";

const isValidId: ValidationFunction<GetAccountRequestParams> = (
  params,
  validAction,
  notValidAction
) => {
  if (!isNumber(params.id))
    notValidAction(
      new Error(`id must be a valid number. Received: ${params.id}`)
    );
  validAction();
};

const validations = [isValidId];

const validateParams = (params: GetAccountRequestParams) => {
  return runValidations(params, validations);
};

const generatePayload = (data: Account | null | Error) =>
  data instanceof Error ? { error: data, message: data.message } : data;

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: Account | null | Error
) => ({
  kind,
  payload: generatePayload(payloadData),
});

const treatParams = (
  params: GetAccountRequestParams
): Promise<GetAccountWhere> =>
  Promise.resolve({
    id: Number(params.id),
  });

export default function generator(
  getAccount: AccountGetter
): UseCase<Account | null | IUseCaseFailPayload, GetAccountRequestParams> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() => treatParams(params))
        .then((treatedParams) => getAccount(treatedParams))
        .then((account) =>
          pipeToResponse(
            account
              ? UseCaseResponseKind.SUCESS
              : UseCaseResponseKind.NOT_FOUND,
            account
          )
        )
        .catch((error) => pipeToResponse(UseCaseResponseKind.FAIL, error)),
  };
}
