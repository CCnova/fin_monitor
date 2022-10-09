import express from "express";
import { createAccount, getAccount, listAccounts } from "./controller";

const router = express.Router();

router.post("/", createAccount);
router.get("/:id", getAccount);
router.get("/list", listAccounts);

export default router;
