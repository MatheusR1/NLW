const express = require("express");
const server = express();

// configurar pasta publica

server.use(express.static("public"));


// utilizando template engine 

const nujucks = require("nunjucks");

nujucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html",{title:"um titulo"});
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html");
})

// estartando o servidor
server.listen(3000)