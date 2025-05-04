import { Hono } from "hono";
import { todoRouter } from "./todo.routes.ts";
import { userRouter } from "./user.routes.ts";

const mainRouter = new Hono();

// Register routes
mainRouter.route("/todo", todoRouter);
mainRouter.route("/users", userRouter);

export { mainRouter };