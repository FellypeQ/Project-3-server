require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));
require("./config/passport.config")(app);

const ListaRouter = require("./routes/lista.routes");
app.use("/api", ListaRouter);

const userRouter = require("./routes/usuarios.routes");
app.use("/api", userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
