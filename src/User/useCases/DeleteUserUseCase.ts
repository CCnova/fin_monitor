import { User } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import {
  isNumber,
  isOfType,
  runValidations,
  ValidationFunction,
} from "../../utils";
import { IDelUserRequestParams, UserDeleter } from "../types";

interface IDeleteUserUseCasePayload {
  id: number;
}

const isValidId: ValidationFunction<IDelUserRequestParams> = (
  params,
  isValidAction,
  notValidAction
) => {
  if (!isNumber(params.id))
    notValidAction(
      new Error(`id must be a valid number. Received: ${params.id}`)
    );

  isValidAction();
};

const validations = [isValidId];

const validateParams = (params: IDelUserRequestParams): Promise<unknown[]> =>
  runValidations(params, validations);

const formatToResponse = (
  kind: UseCaseResponseKind,
  payloadData: User | Error
) => ({
  kind,
  payload: isOfType<User>(payloadData)
    ? { id: payloadData.id }
    : { error: payloadData, message: payloadData.message },
});

export default function generator(
  deleteUser: UserDeleter
): UseCase<
  IDeleteUserUseCasePayload | IUseCaseFailPayload,
  IDelUserRequestParams
> {
  return {
    execute: (params) => {
      return validateParams(params)
        .then(() => deleteUser(Number(params.id)))
        .then((user) => formatToResponse(UseCaseResponseKind.SUCESS, user))
        .catch((error) => formatToResponse(UseCaseResponseKind.FAIL, error));
    },
  };
}
