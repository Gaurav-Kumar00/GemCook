const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://gem-cook-9oiy.vercel.app/"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // If you're using cookies or authentication
    })
);

app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

// Error Middleware (For handling errors globally)
app.use(errorMiddleware);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
