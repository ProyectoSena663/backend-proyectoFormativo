import express from "express";
import dotenv from "dotenv";
import usuarioRouter from "./routes/usuario.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // o usa '*' solo para desarrollo
    credentials: true, // si usas cookies o headers con auth
  })
);
app.use("/usuario", usuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
