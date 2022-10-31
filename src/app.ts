import "reflect-metadata";
import "express-async-errors";
import express from "express";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());

app.use(handleErrorMiddleware);

export default app;
