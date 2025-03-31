import express from "express"
import userRoutes from "./src/routes/user.routes"
import designRoutes from "./src/routes/design.routes"
import designUser from "./src/routes/designUser.routes"
import personaRoutes from "./src/routes/persona.routes"

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRoutes)
app.use(designRoutes)
app.use(designUser)
app.use(personaRoutes)


//con este get obtenemos las prendas disponibles para personalizar.
app.get("/prendas/:id", (req, res) =>{
    res.send("GET de prendas")
});

//con este get obtenemos los colores dispononibles para personalizar.
app.get("/colores", (req, res) =>{
    res.send("GET de colores")
});

//con este get obtenemos los diseños disponibles para las personalizaciones.
app.get("/disenhos", (req, res) =>{
    res.send("GET de diseños")
});

//con este get obtenemos los diseños personalizados por los usuarios.
app.get("/personalizaciones/:usuarioId", (req, res) =>{
    res.send("GET de personalizaciones/:usuarioId")
});

app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`))