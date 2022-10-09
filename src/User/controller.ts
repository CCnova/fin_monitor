import { Request, Response } from "express";
import { IUseCaseFailPayload, UseCaseResponseKind } from "../types";
import {
  IDelUserRequestParams,
  IDelUserResponseBody,
  IGetUserRequestParams,
  IGetUserResponseBody,
  IListUsersResponseBody,
  IPostUserRequestBody,
  IPostUserResponseBody,
  IPutUserRequestBody,
  IPutUserRequestParams,
  IPutUserResponseBody,
} from "./types";
import {
  createUserUseCase,
  deleteUserUseCase,
  getUserUseCase,
  listUsersUseCase,
  updateUserUseCase,
} from "./useCases";

export function listUsers(
  req: Request,
  res: Response<IListUsersResponseBody | IUseCaseFailPayload>
) {
  return listUsersUseCase
    .execute()
    .then((useCaseResponse) =>
      useCaseResponse.kind === UseCaseResponseKind.SUCESS
        ? res
            .status(200)
            .send({
              users: useCaseResponse.payload as IListUsersResponseBody["users"],
            })
        : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
    );
}

export function getUser(
  req: Request<IGetUserRequestParams>,
  res: Response<IGetUserResponseBody | IUseCaseFailPayload>
) {
  return getUserUseCase.execute(req.params).then((useCaseResponse) => {
    switch (useCaseResponse.kind) {
      case UseCaseResponseKind.SUCESS:
        return res
          .status(200)
          .send({
            user: useCaseResponse.payload as IGetUserResponseBody["user"],
          });
      case UseCaseResponseKind.NOT_FOUND:
        return res.status(200).send({ user: null });
      case UseCaseResponseKind.FAIL:
        return res
          .status(500)
          .send(useCaseResponse.payload as IUseCaseFailPayload);
    }
  });
}

export function createUser(
  req: Request<{}, {}, IPostUserRequestBody>,
  res: Response<IPostUserResponseBody | IUseCaseFailPayload>
) {
  return createUserUseCase
    .execute(req.body)
    .then((useCaseResponse) =>
      useCaseResponse.kind === UseCaseResponseKind.SUCESS
        ? res
            .status(201)
            .send({
              id: useCaseResponse.payload as IPostUserResponseBody["id"],
            })
        : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
    );
}

export function updateUser(
  req: Request<IPutUserRequestParams, {}, IPutUserRequestBody>,
  res: Response<IPutUserResponseBody | IUseCaseFailPayload>
) {
  return updateUserUseCase
    .execute({ id: req.params.id, ...req.body })
    .then((useCaseResponse) =>
      useCaseResponse.kind === UseCaseResponseKind.SUCESS
        ? res
            .status(200)
            .send({
              user: useCaseResponse.payload as IPutUserResponseBody["user"],
            })
        : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
    );
}

export function deleteUser(
  req: Request<IDelUserRequestParams>,
  res: Response<IDelUserResponseBody | IUseCaseFailPayload>
) {
  return deleteUserUseCase
    .execute(req.params)
    .then((useCaseResponse) =>
      useCaseResponse.kind === UseCaseResponseKind.SUCESS
        ? res
            .status(200)
            .send({ id: useCaseResponse.payload as IDelUserResponseBody["id"] })
        : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
    );
}
