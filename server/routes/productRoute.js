import express from 'express'
import { addProduct, changeStock, deleteProduct, productId, productList } from '../controllers/productController.js';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array(['images']), authSeller, addProduct);
productRouter.get('/list', productList)
productRouter.get('/id', productId)
productRouter.post('/stock', authSeller, changeStock)
productRouter.post('/delete', authSeller, deleteProduct);

export default productRouter