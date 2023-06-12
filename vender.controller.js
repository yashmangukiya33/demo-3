const Vender = require('../model/vender');
const asyncHandler = require('express-async-handler');
const Joi = require("joi")


const validationSchema = Joi.object({
    name: Joi.string().required()
});

// Create a new vender
const createVender = asyncHandler(async (req, res) => {

    const { error } = validationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details });
    }

    const { name } = req.body;


    // Create a new vender
    const vender = new Vender({ name});
    await vender.save();

    res.status(201).json(vender);
});

// Get all vender
const getAllVender = asyncHandler(async (req, res) => {
    const vender = await Vender.find();

    if (!vender) {
        res.status(404).json({ message: 'No venders found' });
    } else {
        res.json(vender);
    }
});

// Get vender by ID
const getVenderById = asyncHandler(async (req, res) => {
    const venderId = req.params.id;
    const vender = await Vender.findById(venderId);

    if (!vender) {
        res.status(404).json({ message: 'vender not found' });
    } else {
        res.json(vender);
    }
});

// Update vender by ID
const updateVenderById = asyncHandler(async (req, res) => {
    const venderId = req.params.id;
    const { name } = req.body;

    const vender = await Vender.findByIdAndUpdate(venderId, { name}, { new: true });

    if (!vender) {
        return res.status(404).json({ message: 'vender not found' });
    }

    res.json(vender);
});

// Delete vender by ID
const deleteVenderById = asyncHandler(async (req, res) => {
    const venderId = req.params.id;

    const vender = await Vender.findByIdAndDelete(venderId);

    if (!vender) {
        return res.status(404).json({ message: 'vender not found' });
    }
    console.log(vender)
    res.json({ message: 'vender deleted successfully' });
});
module.exports = {
    createVender,
    getAllVender,
    getVenderById,
    updateVenderById,
    deleteVenderById

}