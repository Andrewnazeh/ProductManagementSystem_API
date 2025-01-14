

const Product = require('../models/productModel');
exports.getProducts = async (req, res) => {
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

exports.getProductById = async (req, res) => {
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

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
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

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
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

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByIdAndDelete(id);
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