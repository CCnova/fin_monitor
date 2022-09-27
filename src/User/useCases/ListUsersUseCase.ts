import { PrismaClient, User } from "@prisma/client";
import { UseCase } from "../../types";

export default function generator(
  databaseClient: PrismaClient
): UseCase<User[]> {
  return {
    execute: (): Promise<User[]> => {
      return databaseClient.user.findMany().catch((error) => {
        console.log("Failed to list users!");

        throw error;
      });
    },
  };
}
