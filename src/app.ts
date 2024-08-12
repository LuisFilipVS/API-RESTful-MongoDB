//ENV VARIABLES
require("dotenv").config();

import express from "express"
import config from "config"

const app = express()

//JSON middleware
app.use(express.json())

//Importando instância do banco de dados
import db from "../config/db"

//Routes
import router from "./router"

//Logger
import Logger from "../config/logger"

//Middlewares
import morganMiddleware from "./middleware/morganMiddleware";


//app port - Utilização do modulo config
const port = config.get<string>("port");

app.use(morganMiddleware)

app.use("/api/", router);



app.listen(3000, async() => {
    await db();
    Logger.info(`Aplicação está funcionado na porta: ${port}`)
})



