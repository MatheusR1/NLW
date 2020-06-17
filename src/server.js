const express = require("express");
const server = express();

// pegar bano de dados

const db = require ("./database/db");

// configurar pasta publica

server.use(express.static("public"));

// habilitar o uso do req.body na app

server.use(express.urlencoded({extended:true}));

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
    // pegando as Strings query por meu da req.query
    // console.log(req.query)

    return res.render("create-point.html");
})

server.post("/savepoint",(req, res)=>{
    // pegando corpo do formulário através do req.body
    // console.log(req.body);

    // inserir dados na tabela 

    const query =
    `
    INSERT INTO places(
    image,
    name,
    address,
    address2, 
    state,
    city,
    items 
    ) VALUES (?,?,?,?,?,?,?); 
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]


    function afterInsertData(err) {

        if (err) {
            return console.log(err)
            res.send("erro no candastro");
        }

        
        console.log("cadastrado com sucesso ")
        console.log(this)

        return res.render("create-point.html", {saved: true})
        
    }
 
    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    
    const search = req.query.search 

    // pegar dados do DB

    console.log(search);

    if (search==""){
        // pesquisa vazia
        return res.render("search-results.html", { total : 0 })
    }
    

    db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%' `, function(err, rows ){

        if (err){
            return console.log(err) 
        }
        const total= rows.length

        // mostrar a pagina HTML com os dados do banco de dados.
        return res.render("search-results.html", {places:rows, total});
    })
})

// estartando o servidor
server.listen(3000);