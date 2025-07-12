const express = require("express");
const cors = require("cors");
require("dotenv").config(); 
const connectDB = require("./configs/conectDB");
const apiRoutes = require("./routes");


const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", 
}));

connectDB();

app.use("/api", apiRoutes);


const PORT = process.env.PORT_APP;
const HOST = process.env.HOST_APP;
app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
