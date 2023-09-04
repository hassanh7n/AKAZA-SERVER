const Product = require('../model/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');


const createProduct = async(req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create*(req.body);
    res.status(StatusCodes.CREATED).json({product});
};


const getAllProducts = async(req, res) => {

    res.status(200).send("All Products")
};

const singleProduct = async(req, res) => {
    res.status(200).send("Single Product")
};


const updateProduct = async(req, res) => {
    res.send(200).send("Update Product")
};


const deleteProduct = async(req, res) => {
    res.send(200).send("Delete Product")
};


const uploadImage = async(req, res) => {
    res.send(200).send("uploadImage")
}




module.exports = {
    createProduct,
    getAllProducts,
    singleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}
