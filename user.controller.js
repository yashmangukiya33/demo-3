const User = require('../model/user');
const asyncHandler = require('express-async-handler');
const Joi=require("joi")


const validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    phone:Joi.string().required()
});

// Create a new user
const createUser =  asyncHandler(async (req, res) => {
   
    const { error} = validationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details });
    }

    const { name, email ,phone} = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const user = new User({ name, email,phone });
    await user.save();

    res.status(201).json(user);
});

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (!users) {
        res.status(404).json({ message: 'No users found' });
    } else {
        res.json(users);
    }
});

// Get user by ID
const getUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
});

// Update user by ID
const updateUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name, email,phone } = req.body;

    const user = await User.findByIdAndUpdate(userId, { name, email,phone }, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

// Delete user by ID
const deleteUserById = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    res.json({ message: 'User deleted successfully' });
});
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}