const express = require("express");
const connectDB = require("./configs/conectDB");
const cors = require('cors')
require("dotenv").config();
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors()); 

// MongoDB Connection
connectDB();

// router
app.use('/api', apiRoutes);

// Start Server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
