require("dotenv").config();
const express = require("express");
const connectDB = require("../backend/config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
