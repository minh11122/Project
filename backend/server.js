const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./configs/conectDB");
require("dotenv").config();
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());

// MongoDB Connection
connectDB();

// router
app.use('/api', apiRoutes);

// Start Server
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
