process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var app = express();
var cors = require("cors");
const path = require('path');
var PORTA = 3000;

const bodyParser = require('body-parser');
var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var medidasRouter = require("./src/routes/controller");
const { request } = require("http");
const { count } = require("console");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/medidas", medidasRouter)

app.listen(PORTA, function() {
    console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
