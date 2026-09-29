import { Router } from "express";
import {
  signUp,
  upsertUser,
  getUserByEmail,
  getUserById,
} from "./user.service.js";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.get("/by-email", getUserByEmail); 
userRouter.get("/:id", getUserById);
userRouter.put("/:id", upsertUser);

export default userRouter;