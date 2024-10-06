const User = require("../models/userModel.js");


const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
        name,
        email,
        password,
    });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (!users) {
            return res.status(404).json({ message: "Users not found!" })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;  // Get the user ID from the request params
    const { name, email, password } = req.body;  // Get the updated fields

    try {
        // Find user by ID and update it with new data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },  // Fields to update
            { new: true, runValidators: true }  // Options: return the updated document and run validators
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);  // Return updated user
    } catch (error) {
        res.status(500).json({ message: error.message });  // Handle errors
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;  // Get the user ID from the request parameters

    try {
        // Attempt to delete the user by ID
        const deletedUser = await User.findByIdAndDelete(id);

        // Check if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" }); // 404 for not found
        }

        // Respond with success message
        res.status(200).json({ message: "User deleted successfully.", deletedUser });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

module.exports = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
