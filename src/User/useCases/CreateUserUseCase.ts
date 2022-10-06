import { User } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import {
  isLongerThan,
  isOfType,
  isTruthy,
  runValidations,
  ValidationFunction,
} from "../../utils";
import { IPostUserRequestBody, UserCreator } from "../types";

interface ICreateUserUseCasePayload {
  id: number;
}

const isValidPassword: ValidationFunction<IPostUserRequestBody> = (
  params,
  validAction,
  notValidAction
) => {
  if (!isTruthy(params.password) || !isLongerThan(params.password!, 6))
    notValidAction(new Error(`password must be longer than 6 characters`));
  validAction();
};

const validations = [isValidPassword];

const validateParams = (params: IPostUserRequestBody): Promise<unknown[]> => {
  return runValidations(params, validations);
};

const pipeToResponse = (
  kind: UseCaseResponseKind,
  payloadData: User | Error
) => ({
  kind,
  payload: isOfType<User>(payloadData)
    ? { id: payloadData.id }
    : { error: payloadData, message: payloadData.message },
});

export default function generator(
  createUser: UserCreator
): UseCase<
  ICreateUserUseCasePayload | IUseCaseFailPayload,
  IPostUserRequestBody
> {
  return {
    execute: (params) => {
      return validateParams(params)
        .then(() => createUser(params))
        .then((user) => pipeToResponse(UseCaseResponseKind.SUCESS, user))
        .catch((error) => pipeToResponse(UseCaseResponseKind.FAIL, error));
    },
  };
}
