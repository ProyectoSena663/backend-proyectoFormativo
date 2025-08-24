import express from "express"

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 10105

app.get("/", (req, res) => {
    res.send("Personalization Service is running")
})

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`)
})