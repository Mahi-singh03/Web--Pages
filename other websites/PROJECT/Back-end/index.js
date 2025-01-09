const express = require('express');
const User = require('./Components/Users');  // Correct import for the User model
const connect = require('./Components/connection');  // Ensure this path is correct

const app = express();

async function startServer() {
    try {
        await connect();  // Ensure the connection is established

        // Fetch data from the collection
        const data = await User.find();
        console.log('Fetched data:', data);  // Display fetched data

    } catch (error) {
        console.error('Server failed to start:', error.message);
        process.exit(1);
    }
}

// Call the function to start the server
startServer();

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
