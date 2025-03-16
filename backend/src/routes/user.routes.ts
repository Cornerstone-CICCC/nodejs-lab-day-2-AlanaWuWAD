import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/check-auth', userController.getUserByUsername)
userRouter.post('/login', userController.logInUser)
userRouter.post('/signup', userController.addUser)
userRouter.get('/logout', userController.logout)

export default userRouter