import express from "express";
import { createUser, getUser, listUsers, updateUser } from "./controller";

const router = express.Router();

router.get("/list", listUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
