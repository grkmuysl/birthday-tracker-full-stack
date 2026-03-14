require("dotenv").config();
const express = require("express");
const connectDB = require("../backend/config/db");

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
