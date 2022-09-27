import { PrismaClient } from "@prisma/client";
import { UseCase } from "../../types";
import { isLongerThan, isNumber, isTruthy } from "../../utils";
import { IPutUserRequestBody, IPutUserRequestParams } from "../types";

function validateParams(
  params: IPutUserRequestBody & IPutUserRequestParams
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isNumber(params.id)) {
      reject(
        new Error(`userId must be a valid number. Received: ${params.id}`)
      );
    }

    if (isTruthy(params.password) && !isLongerThan(params.password!, 6)) {
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
): UseCase<number, IPutUserRequestBody & IPutUserRequestParams> {
  return {
    execute: (params) => {
      return validateParams(params)
        .then(() =>
          databaseClient.user.update({
            where: { id: Number(params.id) },
            data: {
              email: params.email,
              name: params.name,
              password: params.password,
            },
          })
        )
        .then((user) => user.id)
        .catch((error) => {
          console.log("Failed to update user!");

          throw error;
        });
    },
  };
}
