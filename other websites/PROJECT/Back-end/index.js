const express = require('express');
const User = require('./Components/Users');  // Correct import for the User model
const connect = require('./Components/connection');  // Ensure this path is correct
const {validations, validationResult} = require('./Components/validations')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

// async function startServer() {
//     try {
//         await connect();  // Ensure the connection is established

//         // Fetch data from the collection
//         const data = await User.find();
//         console.log('Fetched data:', data);  // Display fetched data

//     } catch (error) {
//         console.error('Server failed to start:', error.message);
//         process.exit(1);
//     }
// }

// Call the function to start the server
// startServer();


//POST API
app.post("/SignUp", validations, async (req, res) => {
    const errors = validationResult(req);
    await connect();
    console.warn("database is connected")
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const data = new DataModel(req.body);
    try {
      await data.save();
      console.warn("Data is saved");
      res.status(201).send("Data saved successfully");
    } catch (err) {
      console.error("Error saving data:", err);
      res.status(500).send("Error saving data");
    }
  });
  
  










app.listen(5000, () => {
    console.log('Server started on port 5000');
});
