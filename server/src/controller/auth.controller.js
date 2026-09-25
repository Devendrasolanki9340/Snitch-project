


import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import{createAccessToken, createRefreshToken,readRefreshToken} from "../utils/auth.utils.js"


//  register constroller

export async function register(req, res) {
    const { email, name, password } = req.body

    try {
        const isUserAlreadyExists = await userModel.findOne({ email })

        if (isUserAlreadyExists) {
            return res.status(400).json({
                message: "User already exists with this email address",
                errors: [
                    {
                        field: "email",
                        message: "User already exists with this email address"
                    }
                ]
            })
        }

        
        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await userModel.create({
            email,
            name,
            password: hashedPassword
        })

        const accessToken = createAccessToken({
            userId: user._id,
            role: user.role
        })
        const refreshToken = createRefreshToken({
            userId: user._id,
            role: user.role
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken
        })

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                email: user.email,
                name: user.name,
                id: user._id
            },
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }

}





//  login controller

export async function login (req,res){
    const {email , password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message : " Invalid email or  password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : " Invalid email or  password"
        })
    }

    const accessToken = createAccessToken({
        userId : user._id,
        role : user.role
    })

    const refreshToken = createRefreshToken({
        userId : user._id,
        role : user.role
    })

    await userModel.findOneAndUpdate({
        email
    },{
        refreshToken
    })

    res.cookie("refreshToken" ,refreshToken,{
        httpOnly : true
    })

    res.status(200).json({
        message : "User loggedIn successfully",
        data : {
            user :  {
                 id : user._id,
                 email : user.email,
                 name : user.name
            },
            accessToken
        }
    })

}




//    refresh controller


export async function refresh(req, res) {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token is required"
        })
    }

    try {
        const decoded = readRefreshToken(refreshToken)
        const { userId, role } = decoded

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        if (refreshToken !== user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })
            return res.status(401).json({
                message: "Refresh token mismatch"
            })
        }

        const accessToken = createAccessToken({ userId, role })
        const newRefreshToken = createRefreshToken({ userId, role })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        return res.status(200).json({
            message: "Token rotated successfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        })
    } catch (error) {
        return res.status(401).json({
            message: "Invalid refresh token"
        })
    }
}







export async function getMe (req, res){

    const { userId ,role} = req.body

    const user = await userModel.findById(userId)

    res.status(200).json({
        message : " User data tetch successfully",
        data : {
            user : {
                email :user.email,
                name : user.name,
                id  : user._id
            }
        }
    })
    
}