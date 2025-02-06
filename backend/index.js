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

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));


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
