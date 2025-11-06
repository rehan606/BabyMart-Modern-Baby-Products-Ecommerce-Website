import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import brandsRoute from "./routes/brandRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";


// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB(); 

// CORS configuration
const allowedOrigins = [process.env.ADMIN_URL].filter(Boolean); // Remove any undefine values

app.use(cors({
  origin: function(origin,callback){
    // Allow requests with no origin ( like mobile apps or url request)
    if (!origin) return callback(null, true);
    
    // In development , allow all origins for easier testing
    if(process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    //
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

// Increase the body size limit for JSON and URL-encoded payloads

// 
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoute)
app.use("/api/brands", brandsRoute)
app.use("/api/categories", categoryRoutes);

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
