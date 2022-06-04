import dotenv from "dotenv"
dotenv.config({ path: "./.env" })

import express from "express"
import { connectDB } from "./DB/DB"
import AuthRouter from "./routes/auth/auth-routes"
import cors from "cors"
import * as MiddleWares from "./middleware"
import UsersRouter from "./routes/users/users-routes"

let PORT = process.env.SERVER_PORT || 4000

let app = express()
app.use(cors())
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
connectDB()
app.use("/auth", MiddleWares.isAuthenticated, AuthRouter)
app.use("/users", MiddleWares.isAuthorized, UsersRouter)

app.listen(PORT, () => console.log("server has started on = %d", PORT))
