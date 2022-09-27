import express from "express";
import userRouter from "./User/router";

const app = express();
const PORT = 3000;

app.use("/api/v1/user", userRouter);

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
