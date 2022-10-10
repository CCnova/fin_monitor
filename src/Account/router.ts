import express from "express";
import {
  createAccount,
  deleteAccount,
  getAccount,
  listAccounts,
  updateAccount,
} from "./controller";

const router = express.Router();

router.post("/", createAccount);
router.get("/:id", getAccount);
router.get("/list", listAccounts);
router.put("/:id", updateAccount);
router.delete("/:id", deleteAccount);

export default router;
