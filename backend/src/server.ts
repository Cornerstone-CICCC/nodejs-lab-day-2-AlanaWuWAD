import express from "express";
import path from 'path'
import cookieSession from "cookie-session";
import pageRouter from "./routes/page.routes";
import userRouter from "./routes/user.routes";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

//creat server
const app = express()

//MW
const SING_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if(!SING_KEY || !ENCRYPT_KEY){
    throw new Error ("Missing cookie keys!")
}
app.use(cookieSession({
    name:'session',
    keys: [SING_KEY,ENCRYPT_KEY],
    maxAge: 5*60*1000
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))
app.use(cors({
    origin: 'http://localhost:4321', // Astro port
    credentials: true // allow cookies
  }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/',userRouter)

//404
app.use((req,res)=>{
    res.status(404).send(`Page not found!`)
})

//start server
const PORT = process.env.PORT || 3000
app.listen( PORT, ()=>{
    console.log(`Server is ${PORT}`)
})