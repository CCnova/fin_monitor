import { Account } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import {
  isNumber,
  isPositive,
  isTruthy,
  isZero,
  runValidations,
  ValidationFunction,
} from "../../utils";
import { AccountUpdater } from "../repository";
import { PutAccountRequestBody, PutAccountRequestParams } from "../types";

type GeneratorParams = PutAccountRequestBody & PutAccountRequestParams;

const isValidId: ValidationFunction<GeneratorParams> = (
  params,
  validAction,
  notValidAction
) =>
  isNumber(params.id)
    ? validAction()
    : notValidAction(new Error(`id must be a number. Received: ${params.id}`));

const isValidBalance: ValidationFunction<GeneratorParams> = (
  params,
  validAction,
  notValidAction
) =>
  isPositive(params.balance) || isZero(params.balance)
    ? validAction()
    : notValidAction(
        new Error(
          `balance must be bigger or equal than 0. Received: ${params.balance}`
        )
      );

const isNameValid: ValidationFunction<GeneratorParams> = (
  params,
  validAction,
  notValidAction
) =>
  isTruthy(params.name)
    ? validAction()
    : notValidAction(
        new Error(`name must be a valid string. Received: ${params.name}`)
      );

const validations = [isValidId, isValidBalance, isNameValid];

const validateParams = (params: GeneratorParams) =>
  runValidations(params, validations);

const generatePayload = (data: Account | Error | null) =>
  data instanceof Error ? { error: data, message: data.message } : data;

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: Account | Error | null
) => ({
  kind,
  payload: generatePayload(payloadData),
});

const defineResponseKind = (response: Account | Error | null) => {
  if (response instanceof Error) return UseCaseResponseKind.FAIL;
  if (!response) return UseCaseResponseKind.NOT_FOUND;

  return UseCaseResponseKind.SUCESS;
};

export default function generator(
  updateAccount: AccountUpdater
): UseCase<Account | null | IUseCaseFailPayload, GeneratorParams> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() =>
          updateAccount(
            { id: params.id },
            { balance: params.balance, name: params.name }
          )
        )
        .then((account) => pipeToResponse(defineResponseKind(account), account))
        .catch((error) => pipeToResponse(defineResponseKind(error), error)),
  };
}
