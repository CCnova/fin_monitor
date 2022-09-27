import { PrismaClient, User } from "@prisma/client";
import { UseCase } from "../../types";
import { isNumber } from "../../utils";
import { IGetUserRequestParams } from "../types";

function validateParams(params: IGetUserRequestParams): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isNumber(params.id)) {
      reject(
        new Error(`userId must be a valid number. Received: ${params.id}`)
      );
    }
    resolve();
  });
}

export default function generator(
  databaseClient: PrismaClient
): UseCase<User | null, IGetUserRequestParams> {
  return {
    execute: (params): Promise<User | null> => {
      return validateParams(params)
        .then(() =>
          databaseClient.user.findUnique({ where: { id: Number(params.id) } })
        )
        .then((user) => {
          if (!user) console.log("No user with this id was found");

          return user;
        })
        .catch((error) => {
          console.log("Failed to get user!");

          throw error;
        });
    },
  };
}
