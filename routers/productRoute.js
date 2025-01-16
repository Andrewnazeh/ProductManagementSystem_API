const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const checkUser = require('../middlewares/checkUserMiddleware');
const validate = require('../middlewares/validatorMiddleware');
const { CreateProductSchema, UpdateProductSchema } = require('../validators/productValidator');

const router = express.Router();

router.post('/', checkUser, upload.single('imageUrl'), validate(CreateProductSchema), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', checkUser, validate(UpdateProductSchema), upload.single('imageUrl'), updateProduct);
router.delete('/:id', checkUser, deleteProduct);


module.exports = router;