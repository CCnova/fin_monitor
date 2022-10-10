import { Request, Response } from "express";
import { IUseCaseFailPayload, UseCaseResponseKind } from "../types";
import {
  DeleteAccountRequestParams,
  DeleteAccountResponseBody,
  GetAccountRequestParams,
  GetAccountResponseBody,
  ListAccountsResponseBody,
  PostAccountRequestBody,
  PostAccountResponseBody,
  PutAccountRequestBody,
  PutAccountRequestParams,
  PutAccountResponseBody,
} from "./types";
import {
  createAccountUseCase,
  deleteAccountUseCase,
  getAccountUseCase,
  listAccountsUseCase,
  updateAccountUseCase,
} from "./useCases";

export function getAccount(
  req: Request<GetAccountRequestParams>,
  res: Response<GetAccountResponseBody | IUseCaseFailPayload>
) {
  return getAccountUseCase.execute(req.params).then((useCaseResponse) => {
    switch (useCaseResponse.kind) {
      case UseCaseResponseKind.SUCESS:
        return res.status(200).send({
          account: useCaseResponse.payload as GetAccountResponseBody["account"],
        });
      case UseCaseResponseKind.NOT_FOUND:
        return res.status(200).send({ account: null });
      case UseCaseResponseKind.FAIL:
        return res
          .status(500)
          .send(useCaseResponse.payload as IUseCaseFailPayload);
    }
  });
}

export function createAccount(
  req: Request<{}, {}, PostAccountRequestBody>,
  res: Response<PostAccountResponseBody | IUseCaseFailPayload>
) {
  return createAccountUseCase.execute(req.body).then((useCaseResponse) =>
    useCaseResponse.kind === UseCaseResponseKind.SUCESS
      ? res.status(201).send({
          id: useCaseResponse.payload as PostAccountResponseBody["id"],
        })
      : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
  );
}

export function listAccounts(
  req: Request,
  res: Response<ListAccountsResponseBody | IUseCaseFailPayload>
) {
  return listAccountsUseCase.execute().then((useCaseResponse) =>
    useCaseResponse.kind === UseCaseResponseKind.SUCESS
      ? res.status(200).send({
          accounts:
            useCaseResponse.payload as ListAccountsResponseBody["accounts"],
        })
      : res.status(500).send(useCaseResponse.payload as IUseCaseFailPayload)
  );
}

export function updateAccount(
  req: Request<PutAccountRequestParams, {}, PutAccountRequestBody>,
  res: Response<PutAccountResponseBody | IUseCaseFailPayload>
) {
  return updateAccountUseCase
    .execute({ ...req.params, ...req.body })
    .then((useCaseResponse) => {
      switch (useCaseResponse.kind) {
        case UseCaseResponseKind.SUCESS:
          return res.status(200).send({
            account: useCaseResponse.payload,
          } as PutAccountResponseBody);
        case UseCaseResponseKind.NOT_FOUND:
          return res.status(401).send({ account: null });
        case UseCaseResponseKind.FAIL:
          return res
            .status(500)
            .send(useCaseResponse.payload as IUseCaseFailPayload);
      }
    });
}

export function deleteAccount(
  req: Request<DeleteAccountRequestParams>,
  res: Response<DeleteAccountResponseBody>
) {
  return deleteAccountUseCase.execute(req.params).then((useCaseResponse) => {
    switch (useCaseResponse.kind) {
      case UseCaseResponseKind.SUCESS:
        return res
          .status(200)
          .send({
            account: useCaseResponse.payload,
          } as DeleteAccountResponseBody);
      case UseCaseResponseKind.NOT_FOUND:
        return res.status(401).send({ account: null });
      case UseCaseResponseKind.FAIL:
        return res
          .status(500)
          .send(useCaseResponse.payload as DeleteAccountResponseBody);
    }
  });
}
