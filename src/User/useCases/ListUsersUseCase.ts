import { User } from "@prisma/client";
import { UseCase, UseCaseResponseKind } from "../../types";
import { isOfType } from "../../utils";
import { UserLister } from "../types";

const formatToResponse = (
  kind: UseCaseResponseKind,
  payloadData: User[] | Error
) => ({
  kind,
  payload: isOfType<User[]>(payloadData)
    ? payloadData
    : { error: payloadData, message: payloadData.message },
});

export default function generator(listUsers: UserLister): UseCase<User[]> {
  return {
    execute: () => {
      return listUsers()
        .then((users) => formatToResponse(UseCaseResponseKind.SUCESS, users))
        .catch((error) => formatToResponse(UseCaseResponseKind.FAIL, error));
    },
  };
}
