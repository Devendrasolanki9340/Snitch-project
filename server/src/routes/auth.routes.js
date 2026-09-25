
import { Router } from "express";
import {loginValidator, registerValidator,} from "../validators/auth.validators.js"
import {register, login,refresh,getMe} from "../controller/auth.controller.js"
import {authenticate} from "../middlewares/auth.middleware.js"

const router = Router()

//  Post /api/auth/register

router.post("/register", registerValidator,register)

// post for login 
//  /api/auth/login

router.post("/login", loginValidator , login)


//  post  /api/auth/refresh     
//  this api is create a new refrsh toke and stored

router.post("/refresh", refresh)


//  Get /api/auth/me

router.post("/me", authenticate, getMe)




export default  router