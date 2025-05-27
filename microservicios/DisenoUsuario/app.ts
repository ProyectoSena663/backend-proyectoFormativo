import express from "express";
import dotenv from "dotenv";
import diseñoUsuarioRouter from "./routes/diseñoUsuario.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10102;

app.use(express.json());
app.use("/disenoUsuario", diseñoUsuarioRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
