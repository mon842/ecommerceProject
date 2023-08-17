import { Schema, model, models } from "mongoose";

const ProductSchema =new Schema({
    title:{
        type:"string",
        required: true
    },
    description: 'string',
    price: {
        type:'Number',
        required: true
    }
});

const Product =models.Product || model('Product',ProductSchema);

export default Product;