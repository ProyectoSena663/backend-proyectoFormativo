import express from "express"
import personalizacionRoutes from "./routes/Personalizacion.routes"
const app = express()

app.use(express.json())
app.use("/personalizacion", personalizacionRoutes)

const PORT = process.env.PORT || 10105

app.get("/", (req, res) => {
    res.send("Personalization Service is running")
})


app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`)
})