import user from "./routes/user.routes";
import design from "./routes/design.routes";
import designUser from "./routes/designUser.routes";
import persona from "./routes/persona.routes";

import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use(design);
app.use(user);
app.use(designUser);
app.use(persona);

//con este get obtenemos los diseños personalizados por los usuarios.
app.get("/personalizaciones/:usuarioId", (req, res) => {
  res.send("GET de personalizaciones/:usuarioId");
});

app.listen(port, () => console.log(`servidor corriendo en el puerto ${port}`));
