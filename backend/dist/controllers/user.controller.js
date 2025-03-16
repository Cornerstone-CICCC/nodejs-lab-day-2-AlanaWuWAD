"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
//get all users
const getAllUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.json(users);
};
//getUserByUsername
const getUserByUsername = (req, res) => {
    if (!req.session || !req.session.username) {
        res.status(500).send(`User not logged in!`);
    }
    if ((req.session && req.session.username)) {
        const user = user_model_1.default.findByUsername(req.session.username);
        if (!user) {
            res.status(500).send(`User not found!`);
            return;
        }
        res.json(user);
    }
};
//logInUser
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(500).json({ error: `Username or Password is empty!` });
        return;
    }
    const user = yield user_model_1.default.logIn(username, password);
    if (!user) {
        res.status(500).send(`Wrong info!!!`);
        return;
    }
    if (req.session) {
        req.session.isLogIn = true;
        req.session.username = user.username;
    }
    res.send(`Login successfully!`);
});
const checkCookie = (req, res) => {
};
//addUser
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstname, lastname } = req.body;
    if (!username || !password || !firstname || !lastname) {
        res.status(500).json({ error: 'Wrong user info!' });
        return;
    }
    const user = yield user_model_1.default.creatUser({ username, password, firstname, lastname });
    if (!user) {
        res.status(409).json({ error: '' });
    }
    res.status(201).json(user);
});
//logout
const logout = (req, res) => {
    req.session = null;
    res.status(200).send(`Logout successfull!`);
    // res.status(301).redirect('/login')
};
exports.default = {
    getAllUsers,
    getUserByUsername,
    logInUser,
    addUser,
    logout,
};
