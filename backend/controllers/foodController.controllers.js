import { foodModel } from "../models/foodModel.models.js";
import fs from "fs";

// add fooditems
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: "Image is required"
            });
        }
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.json({
                success: false,
                message: "All fields are required"
            });
        }

        const image_filename = `${req.file.filename}`;
        const food = new foodModel({
            name,
            description,
            price: Number(price),
            image: image_filename,
            category
        });
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        });
    } catch (error) {
        console.error("Error adding food:", error);
        res.json({
            success: false,
            message: "Error adding Food"
        });
    }
};

// all food list-> get all the food items and send as response
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.error("Error listing food:", error);
        res.json({
            success: false,
            message: "Error fetching food list"
        });
    }
};

// remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({
                success: false,
                message: "Food Item not found"
            });
        }

        // for deleting image from uploads folder
        if (food.image && fs.existsSync(`uploads/${food.image}`)) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error("File deletion error:", err.message);
            });
        }

        // for deleting data from database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food removed"
        });
    } catch (error) {
        console.error("Error removing food:", error);
        res.json({
            success: false,
            message: "Error removing Food"
        });
    }
};

export { addFood, listFood, removeFood };
