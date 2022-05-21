import { Router } from "express";
import albumRouter from "./albumRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = Router()

router.use(userRouter)
router.use(authRouter)
router.use(albumRouter)

export default router