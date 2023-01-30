import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: {type: Date, default: Date.now},
    title: {type: String, require: true , max: 48},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true , max: 256}
})

export const productSchema = mongoose.model('products', ProductsSchema)