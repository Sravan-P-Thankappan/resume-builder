import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

connectDB();

app.all("*", (req, res) => {
    res.status(404).json({ message: `Route not found - ${req.originalUrl}` });
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
