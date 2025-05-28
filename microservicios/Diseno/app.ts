import express from "express";
import dotenv from "dotenv";
import disenoRouter from "./routes/diseno.routes"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10103;

app.use(express.json());
app.use("/diseno", disenoRouter)

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
