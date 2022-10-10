import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import { isNumber, runValidations, ValidationFunction } from "../../utils";
import { Account, AccountDeleter } from "../repository";
import { DeleteAccountRequestParams } from "../types";

type GeneratorResponse = Account | null | IUseCaseFailPayload;

const isValidId: ValidationFunction<DeleteAccountRequestParams> = (
  params,
  validAction,
  notValidAction
) =>
  isNumber(params.id)
    ? validAction()
    : notValidAction(
        new Error(`id must be a valid number. Received: ${params.id}`)
      );

const validations = [isValidId];

const validateParams = (params: DeleteAccountRequestParams) =>
  runValidations(params, validations);

const generatePayload = (data: Account | Error | null) =>
  data instanceof Error ? { error: data, message: data.message } : data;

const responseKind = (result: Account | Error | null) => {
  if (result instanceof Error) return UseCaseResponseKind.FAIL;
  if (!result) return UseCaseResponseKind.NOT_FOUND;

  return UseCaseResponseKind.SUCESS;
};

const pipeToResponse = (payloadData: Account | Error | null) => ({
  kind: responseKind(payloadData),
  payload: generatePayload(payloadData),
});

export default function generator(
  deleteAccount: AccountDeleter
): UseCase<GeneratorResponse, DeleteAccountRequestParams> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() => deleteAccount({ id: params.id }))
        .then((account) => pipeToResponse(account))
        .catch((error) => pipeToResponse(error)),
  };
}
