import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const PORT = 3000;

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);

    return prisma.$disconnect();
  });

// app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
