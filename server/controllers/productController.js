import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// add product: /api/product/add
export const addProduct = async (req, res) => {
    try {

        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({ ...productData, image: imagesUrl })

        res.json({ success: true, message: "Product Addedd" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// product list: /api/product/list
export const productList = async (req, res) => {
    try {

        const products = await Product.find({})
        res.json({ success: true, products })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//  get product by id: /api/product/id
export const productId = async (req, res) => {
    try {

        const { id } = req.body
        const product = await Product.findById(id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// change product in stock: /api/product/stock
export const changeStock = async (req, res) => {
    try {

        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// delete product: /api/product/delete
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await Product.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Deleted" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};