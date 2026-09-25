


import { body, validationResult } from "express-validator"


//   register validation 

export const registerValidator = [
    body("email")
         .exists().withMessage("Email is Required").bail()
        .trim()
        .isEmail().withMessage("Invalid Email Address"),

    body("name")
        .exists().withMessage("Name is Required").bail()
        .isString().withMessage("Name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage("Name length must be between 2 and 50 characters"),

    body("password")
        .exists().withMessage("Password is Required").bail()
        .isString().withMessage("Password must be a string")
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be minimum 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid Request",
                errors: errors.array()
            })
        }

        next()
    }
]







export const loginValidator = [
    body("email")
         .exists().withMessage("Email is Required").bail()
         .isString().withMessage("Email must be a string value").bail()
         .trim()
        .isEmail().withMessage("Enter a valid Email Address"),

    body("password")
        .exists().withMessage("Password is Required").bail()
        .isString().withMessage("Password must be a string").bail()
         .trim()
        .isLength({ min: 6 }).withMessage("Password must be minimum 6 characters long"),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid data",
                errors: errors.array()
            })
        }
        next()
    }
]
