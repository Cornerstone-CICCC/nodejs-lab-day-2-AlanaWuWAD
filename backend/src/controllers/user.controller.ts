import { Request, Response } from "express";
import userModel from "../models/user.model";
import { User } from "../type/user";

//get all users
const getAllUsers = (req: Request, res: Response) => {
    const users = userModel.findAll()
    res.json(users)
}

//getUserByUsername
const getUserByUsername = (req: Request, res: Response) => {
    if (!req.session || !req.session.username) {
        res.status(500).send(`User not logged in!`)
    }
    if ((req.session && req.session.username)) {
        const user = userModel.findByUsername(req.session.username)
        if (!user) {
            res.status(500).send(`User not found!`)
            return
        }
        res.json(user)
    }
}

//logInUser
const logInUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(500).json({ error: `Username or Password is empty!` })
        return
    }
    const user = await userModel.logIn(username, password)
    if (!user) {
        res.status(500).send(`Wrong info!!!`)
        return
    }
    if (req.session) {
        req.session.isLogIn = true
        req.session.username = user.username
    }
    res.send(`Login successfully!`)
}

const checkCookie = (req: Request, res: Response) => {

}

//addUser
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
    const { username, password, firstname, lastname } = req.body
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({ error: 'Wrong user info!' })
        return
    }
    const user = await userModel.creatUser({ username, password, firstname, lastname })
    if (!user) {
        res.status(409).json({ error: '' })
    }
    res.status(201).json(user)
}

//logout
const logout = (req: Request, res: Response) => {
    req.session = null
    res.status(200).send(`Logout successfull!`)
    // res.status(301).redirect('/login')
}



export default {
    getAllUsers,
    getUserByUsername,
    logInUser,
    addUser,
    logout,
}