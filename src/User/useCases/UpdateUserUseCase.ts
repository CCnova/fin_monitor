import { User } from "@prisma/client";
import { IUseCaseFailPayload, UseCase, UseCaseResponseKind } from "../../types";
import {
  isLongerThan,
  isNumber,
  isOfType,
  isTruthy,
  runValidations,
  ValidationFunction,
} from "../../utils";
import {
  IPutUserRequestBody,
  IPutUserRequestParams,
  UserUpdater,
} from "../types";

const validateId: ValidationFunction<
  IPutUserRequestBody & IPutUserRequestParams
> = (params, validAction, notValidAction) => {
  if (!isNumber(params.id!))
    notValidAction(
      new Error(`userId must be a valid number. Received: ${params.id}`)
    );
  validAction();
};

const validatePassword: ValidationFunction<
  IPutUserRequestBody & IPutUserRequestParams
> = (params, validAction, notValidAction) => {
  if (isTruthy(params.password) && !isLongerThan(params.password!, 6)) {
    notValidAction(
      new Error(
        `Password must have length bigger than 6, received: ${params.password}`
      )
    );
  }
  validAction();
};

const validations = [validateId, validatePassword];

const validateParams = (
  params: IPutUserRequestBody & IPutUserRequestParams
): Promise<unknown[]> => {
  return runValidations(params, validations);
};

const formatToResponse = (
  kind: UseCaseResponseKind,
  payloadData: User | Error
) => {
  return {
    kind,
    payload: isOfType<User>(payloadData)
      ? payloadData
      : { error: payloadData, message: payloadData.message },
  };
};

export default function generator(
  updateUser: UserUpdater
): UseCase<
  User | IUseCaseFailPayload,
  IPutUserRequestBody & IPutUserRequestParams
> {
  return {
    execute: (params) =>
      validateParams(params)
        .then(() => updateUser(params))
        .then((user) => formatToResponse(UseCaseResponseKind.SUCESS, user))
        .catch((error) => formatToResponse(UseCaseResponseKind.FAIL, error)),
  };
}
