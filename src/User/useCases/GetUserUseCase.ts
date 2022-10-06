import { User } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import {
  isNumber,
  isOfType,
  runValidations,
  ValidationFunction,
} from "../../utils";
import { IGetUserRequestParams, UserFetcher } from "../types";

const isValidId: ValidationFunction<IGetUserRequestParams> = (
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

const validateParams = (params: IGetUserRequestParams): Promise<unknown[]> => {
  return runValidations(params, validations);
};

const generatePayload = (data: User | Error | null) => {
  if (isOfType<Error>(data)) return { error: data, message: data.message };

  return data;
};

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: User | null | Error
) => ({
  kind,
  payload: generatePayload(payloadData),
});

export default function generator(
  fetchUser: UserFetcher
): UseCase<User | null | IUseCaseFailPayload, IGetUserRequestParams> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() => fetchUser(Number(params.id)))
        .then((user) =>
          pipeToResponse(
            user ? UseCaseResponseKind.SUCESS : UseCaseResponseKind.NOT_FOUND,
            user
          )
        )
        .catch((error) => pipeToResponse(UseCaseResponseKind.FAIL, error)),
  };
}
