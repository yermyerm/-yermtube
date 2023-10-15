import express from "express";
import {
  deleteUser,
  see,
  getEdit,
  postEdit,
} from "../controllers/userController";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", deleteUser);
userRouter.get("/:id", see);

export default userRouter;
