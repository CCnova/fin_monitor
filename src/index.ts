import express from "express";
import accountRouter from "./Account/router";
import userRouter from "./User/router";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
