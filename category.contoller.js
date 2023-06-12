const Category = require('../model/category');
const asyncHandler = require('express-async-handler');
const Joi = require("joi")


const validationSchema = Joi.object({
    name: Joi.string().required(),
    total: Joi.number().required()

});

// Create a new Category
const createCategory = asyncHandler(async (req, res) => {

    const { error } = validationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details });
    }

    const { name,total } = req.body;

    // Create a new Category
    const category = new Category({ name,total });
    await category.save();

    res.status(201).json(category);
});

// Get all categorys
const getAllCategorys = asyncHandler(async (req, res) => {
    const categorys = await Category.find();

    if (!categorys) {
        res.status(404).json({ message: 'No categorys found' });
    } else {
        res.json(categorys);
    }
});

// Get category by ID
const getCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
        res.status(404).json({ message: 'category not found' });
    } else {
        res.json(category);
    }
});

// Update category by ID
const updateCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;
    const { name,total } = req.body;

    const category = await Category.findByIdAndUpdate(categoryId, { name,total }, { new: true });

    if (!category) {
        return res.status(404).json({ message: 'category not found' });
    }

    res.json(category);
});

// Delete category by ID
const deleteCategoryById = asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
        return res.status(404).json({ message: 'category not found' });
    }
    console.log(category)
    res.json({ message: 'category deleted successfully' });
});
module.exports = {
    createCategory,
    getAllCategorys,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}