import { Request, Response } from "express";
import { IUseCaseFailPayload, UseCaseResponseKind } from "../types";
import {
  GetAccountRequestParams,
  GetAccountResponseBody,
  ListAccountsResponseBody,
  PostAccountRequestBody,
  PostAccountResponseBody,
} from "./types";
import {
  createAccountUseCase,
  getAccountUseCase,
  listAccountsUseCase,
} from "./useCases";

export function getAccount(
  req: Request<GetAccountRequestParams>,
  res: Response<GetAccountResponseBody | IUseCaseFailPayload>
) {
  return getAccountUseCase.execute(req.params).then((useCaseResponse) => {
    switch (useCaseResponse.kind) {
      case UseCaseResponseKind.SUCESS:
        return res
          .status(200)
          .send({
            account:
              useCaseResponse.payload as GetAccountResponseBody["account"],
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
