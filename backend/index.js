import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import databaseConnection from "./utils/db.js";
import "./config/passport.js";
dotenv.config();


// Import routes
import userRoutes from "./routes/userRoute.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const allowedOrigins = [
    "http://localhost:5173", // Local development
    "https://job-khojo-kxe3k653q-ashish-kumars-projects-c8e992d2.vercel.app",
    "https://job-khojo-theta.vercel.app",
    // Add any other domains you need
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"]
  };
  
  app.use(cors(corsOptions));



// const corsOptions = {
//     origin: "http://localhost:5173",
//     credentials: true,
// };
// app.use(cors(corsOptions));


// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.get('/api/v1/test', (req, res) => {
    res.json({ success: true });
  });


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, async (err) => {
    if (err) {
        console.error("Server failed to start", err);
    } else {
        await databaseConnection();
        console.log(`Server started at: http://localhost:${PORT}`);
    }
});


export default async (req, res) => {
  await databaseConnection();
  app(req, res);
};
