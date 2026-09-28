


import multer from "multer"
import {  Router} from "express"
import {createProductValidator, unlistProductValidator} from  "../validators/product.validator.js"
import  {authenticate , authenticatesSeller } from "../middlewares/auth.middleware.js"
import {createProduct, listAllProducts, unlistProduct,listAllProductsToSeller} from "../controller/product.controller.js"

const router  = Router()
const upload = multer({storage: multer.memoryStorage(),
    limits : {
        files : 5,
        fileSize : 1 * 1024 * 1024 //1mb
    },
    // 
})

// const safeParseJson = (value, fieldName) => {
//     if (value === undefined || value === null) return value
//     if (typeof value !== "string") return value

//     const trimmedValue = value.trim()
//     if (!trimmedValue) return value

//     const looksLikeJson =
//         (trimmedValue.startsWith("{") && trimmedValue.endsWith("}")) ||
//         (trimmedValue.startsWith("[") && trimmedValue.endsWith("]"))

//     if (!looksLikeJson) return value

//     try {
//         return JSON.parse(trimmedValue)
//     } catch {
//         throw new Error(`${fieldName} is not valid JSON. Example: ${fieldName === "sizes" ? '[{"size":"M","stock":50}]' : '{"amount":450,"currency":"INR"}'}`)
//     }
// }

// product api store

//  check is user authenticate
router.post("/", 
    authenticate , 
    //  check the role is seller or not 
    authenticatesSeller,
    //  required for reding the data from req.body if the formate is from-data
 upload.array("images"), 
//  parse th complex data like object and into json
(req,res,next)=>{
     req.body?.price && (req.body.price = JSON.parse(req.body.price))
        req.body?.sizes && (req.body.sizes = JSON.parse(req.body.sizes))
        next()
    // try {
    //     req.body.price = safeParseJson(req.body?.price, "price")
    //     req.body.sizes = safeParseJson(req.body?.sizes, "sizes")
    //     next()
    // } catch (error) {
    //     return res.status(400).json({
    //         message: error.message
    //     })
    // }
},
createProductValidator,
 createProduct)





router.get("/", authenticate , listAllProducts)







/**
 * @method GET
 * @route /api/product/seller
 * @description Read all the products from the DB
 * @access seller
 */
router.get("/seller", authenticate, authenticatesSeller, listAllProductsToSeller)





/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description Unlist a product by its ID
 * @access seller
 */
router.patch("/unlist/:id", authenticate, authenticatesSeller, unlistProductValidator,unlistProduct)





/**
 * @method PATCH
 * @route /api/products/unlist/:id
 * @description list a product by its ID
 * @access seller
 */
router.patch("/unlist/:id", authenticate, authenticatesSeller , )



export default router