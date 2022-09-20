import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
// Make sure this param with the id (the one right above) is at the bottom
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
