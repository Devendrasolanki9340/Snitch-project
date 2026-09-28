



import mongoose from "mongoose"



const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            },
            size: {
                type: String,
                enum: [ "XS", "S", "M", "L", "XL", "XXL" ]
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
})

const cartModel = mongoose.model("snitch_carts", cartSchema)

export default cartModel