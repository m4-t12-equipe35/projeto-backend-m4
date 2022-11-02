import "reflect-metadata";
import "express-async-errors";
import express from "express";

import usersRoutes from "./routes/users.routes";
import sessionsRoutes from "./routes/sessions.routes";
import techsRoutes from "./routes/techs.routes";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", sessionsRoutes);
app.use("/techs", techsRoutes);

app.use(handleErrorMiddleware);

export default app;
