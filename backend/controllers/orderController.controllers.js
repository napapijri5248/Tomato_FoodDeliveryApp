import { orderModel } from "../models/orderModel.models.js";
import { userModel } from "../models/userModel.models.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing user order from frontend
const placeOrder = async (req, res) => {
    try {
        if (!req.body.userId || !req.body.items || req.body.items.length === 0) {
            return res.json({
                success: false,
                message: "No items to place order"
            });
        }

        // 1. Save new order in MongoDB (payment defaults to false)
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        // 2. Create Razorpay Order options (amount must be in paise: ₹1 = 100 paise)
        const options = {
            amount: Math.round(Number(req.body.amount) * 100),
            currency: "INR",
            receipt: newOrder._id.toString(),
        };

        // 3. Generate Razorpay order
        const order = await razorpay.orders.create(options);

        // 4. Send the razorpay order details & your MongoDB orderId back to frontend
        res.json({
            success: true,
            order: order,
            orderId: newOrder._id
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.json({
            success: false,
            message: error.message || "Error creating order"
        });
    }
};

// verify payment after test payment completes
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (!orderId) {
            return res.json({ success: false, message: "Order ID is missing" });
        }

        if (success === "true" || success === true) {
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true });
            if (order && order.userId) {
                await userModel.findByIdAndUpdate(order.userId, { cart: {} });
            }
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.json({ success: false, message: "Error verifying order" });
    }
};

// userOrders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.json({
            success: false,
            message: "Error fetching orders"
        });
    }
};

// Listing orders for Admin Panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ createdAt: -1 });
        res.json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.json({
            success: false,
            message: "Error fetching list-order"
        });
    }
};

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        return res.json({
            success: true,
            message: "Status Updated"
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.json({
            success: false,
            message: "Error updating status"
        });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
