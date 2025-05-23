import express from "express";
import dotenv from "dotenv";
import usuarioRouter from "./routes/usuario.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

app.use(express.json());
app.use("/usuario", usuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
