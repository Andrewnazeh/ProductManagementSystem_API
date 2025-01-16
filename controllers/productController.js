
const Product = require('../models/productModel');
const { uploadImage, deleteImage } = require('../utils/imageWithCloudinary');

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'No products found'
            });
        }

        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'No product found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action'
            });
        }

        const imageUrl = await uploadImage(req.file.path);

        const product = await new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: imageUrl.secure_url
        }).save();

        res.status(201).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action'
            });
        }
        const id = req.params.id;
        const imageUrl = await uploadImage(req.file.path);
        req.body.imageUrl = imageUrl.secure_url;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'No product found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action'
            });
        }
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
        const result = await deleteImage(product.imageUrl);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'No product found'+result
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}