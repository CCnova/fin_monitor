import { PrismaClient } from "@prisma/client";
import { UseCase } from "../../types";
import { isLongerThan } from "../../utils";
import { IPostUserRequestBody } from "../types";

function validateParams(params: IPostUserRequestBody): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isLongerThan(params.password, 6)) {
      reject(
        new Error(
          `Password must have length bigger than 6, received: ${params.password}`
        )
      );
    }

    resolve();
  });
}

export default function generator(
  databaseClient: PrismaClient
): UseCase<number, IPostUserRequestBody> {
  return {
    execute: (params) => {
      return validateParams(params)
        .then(() => databaseClient.user.create({ data: params }))
        .then((newUser) => newUser.id)
        .catch((error) => {
          console.log(`Failed to create user, data: ${params}`);

          throw error;
        });
    },
  };
}
