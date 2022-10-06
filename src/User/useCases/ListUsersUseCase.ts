import { User } from "@prisma/client";
import { UseCase, UseCaseResponseKind } from "../../types";
import { UserLister } from "../types";

const formatToResponse = (users: User[]) => ({
  kind: UseCaseResponseKind.SUCESS,
  payload: users,
});

export default function generator(listUsers: UserLister): UseCase<User[]> {
  return {
    execute: () => listUsers().then(formatToResponse),
  };
}
