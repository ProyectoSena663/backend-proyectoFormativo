import express from "express";
import dotenv from "dotenv";
import usuarioRouter from "./routes/usuario.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

// CORS configuration - must be before other middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow multiple origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parsing with error handling
app.use(express.json());

app.use("/usuario", usuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
