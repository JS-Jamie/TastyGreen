import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc    Create new order
//@route    POST /api/products
//@access    Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc    Get order by ID
//@route    GET /api/orders/:id
//@access    Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc    Update order to "Paid"
//@route    PUT /api/orders/:id/pay
//@access    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true; //it's false by default. so need to set it to true.
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }; // all of these above will come from the PayPal response

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc    Update order to "Delivered"
//@route    PUT /api/orders/:id/deliver
//@access    Private/Admin only
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true; //it's false by default. so need to set it to true.
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//@desc    Get logged in user orders
//@route    GET /api/orders/myorders
//@access    Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  //'find'(because i need to find more than one. Finding the orders where the user is equals to the req.use._id (=only the logged in useres) )
  res.json(orders);
});

//@desc    Get all orders
//@route    GET /api/orders
//@access    Private / Admin only
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  //'find'(because i need to find more than one. Finding the orders where the user is equals to the req.use._id (=only the logged in useres) )
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};

//update Routes after this
