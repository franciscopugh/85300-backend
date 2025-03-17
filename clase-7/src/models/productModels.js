import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        index: true,
        required: true
    },
    status: {
        type: Boolean, 
        default: true
    },
    price: {
        type: Number, 
        required: true
    },
    stock: {
        type: Number, 
        required: true
    },
    code: {
        type: String, 
        unique: true,
        required: true
    },
    thumbnail: {
        default: []
    }
})

productSchema.plugin(paginate)

const productModel = model("products", productSchema)

export default productModel