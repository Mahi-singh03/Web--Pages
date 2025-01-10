const mongoose = require('mongoose');

// Define schema and model correctly
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// Export the model
DataModel = mongoose.model('User', userSchema, 'User');  // Use 'std' as the collection name

module.exports = DataModel;  // Export the model for use in other files
