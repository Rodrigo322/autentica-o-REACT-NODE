import { Router } from "express";
import { UserController } from "./controller/UserController";
import { AuthController } from "./controller/AuthController";
import { authMiddleware } from "./middlewares/auth";

const usercontroller = new UserController();
const authcontroller = new AuthController();

export const router = Router();

router.post("/auth", authcontroller.authenticate);
router.post("/create", usercontroller.store);
router.get("/users", authMiddleware, usercontroller.index);
