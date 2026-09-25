


import userModel from "../models/user.model.js"

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

        const user = await userModel.create({
            email,
            name,
            password
        })

        return res.status(201).json({
            message: "User registered successfully",
            data: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }
}