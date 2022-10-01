import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc    Fetch all products
//@route    GET /api/products
//@access    Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  //throw new Error("Some error")   ---Enable this code just to test PRODUCT_LIST-FAIL

  res.json(products);
});

//@desc    Fetch single product
//@route    GET /api/products/:id
//@access    Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc    Delete a product
//@route    DELETE /api/products/:id
//@access    Private / Admin only
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc    Create a product
//@route    POST /api/products
//@access    Private / Admin only
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc    Update a product
//@route    PUT /api/products/:id
//@access    Private / Admin only
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, countInStock, description } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
