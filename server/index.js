import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB

// CORS configuration

// Increase the body size limit for JSON and URL-encoded payloads

// 
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes)

// API documentation

// Home route

app.get('/', (req, res) => {
  res.send('Hello from Baby Mart Server!')
})

// Error handling middleware


// Start the server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
  console.log(`Admin URL: ${process.env.ADMIN_URL}`); 
  console.log(`API docs available at: http://localhost:${PORT}/api/docs`);
})
