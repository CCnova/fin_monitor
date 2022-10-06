import { Request, Response } from "express";
import {
  IDelUserRequestParams,
  IDelUserResponseBody,
  IFailResponseBody,
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
  res: Response<IListUsersResponseBody | IFailResponseBody>
) {
  return listUsersUseCase
    .execute()
    .then((users) => res.status(200).send({ users }))
    .catch((error) =>
      res.status(500).send({ error, message: "Internal Server Error" })
    );
}

export function getUser(
  req: Request<IGetUserRequestParams>,
  res: Response<IGetUserResponseBody | IFailResponseBody>
) {
  return getUserUseCase
    .execute(req.params)
    .then((user) => res.status(200).send({ user }))
    .catch((error) =>
      res.status(500).send({ error, message: "Internal Server Error" })
    );
}

export function createUser(
  req: Request<{}, {}, IPostUserRequestBody>,
  res: Response<IPostUserResponseBody | IFailResponseBody>
) {
  return createUserUseCase
    .execute(req.body)
    .then((id) => res.status(201).send({ id }))
    .catch((error) =>
      res.status(500).send({ error, message: "Internal Server Error" })
    );
}

export function updateUser(
  req: Request<IPutUserRequestParams, {}, IPutUserRequestBody>,
  res: Response<IPutUserResponseBody | IFailResponseBody>
) {
  return updateUserUseCase
    .execute({ id: req.params.id, ...req.body })
    .then((id) => res.status(200).send({ id }))
    .catch((error) =>
      res.status(500).send({ error, message: "Internal Server Error" })
    );
}

export function deleteUser(
  req: Request<IDelUserRequestParams>,
  res: Response<IDelUserResponseBody | IFailResponseBody>
) {
  return deleteUserUseCase
    .execute(req.params)
    .then((id) => res.status(200).send({ id }))
    .catch((error) =>
      res.status(500).send({ error, message: "Internal server error" })
    );
}
