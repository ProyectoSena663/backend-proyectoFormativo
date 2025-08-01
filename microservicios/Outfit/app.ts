import express from "express";

const app = express();
const PORT = 10104;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Outfit Service");
});

app.listen(PORT, () => {
  console.log(`Outfit Service is running on http://localhost:${PORT}`);
}); 