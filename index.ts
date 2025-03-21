import express from "express"

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("hola typeScript con express!!")
})

app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`))