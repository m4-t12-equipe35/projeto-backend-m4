import "reflect-metadata";
import "express-async-errors";
import express from "express";

import usersRoutes from "./routes/users.routes";

import handleErrorMiddleware from "./middlewares/handleError.middleware";
import sessionsRouters from "./routes/sessions.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", sessionsRouters);

app.use(handleErrorMiddleware);

export default app;
