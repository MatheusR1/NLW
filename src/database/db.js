// importando dependencia do SQLite3
const sqlite3 = require("sqlite3").verbose();

// iniciar objeto de banco de dados

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// utilizar obj de banco de dados para nossas app's.

// db.serialize(() => {
//     // criar tabelas 
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name  TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT, 
//             items TEXT   
//         );
//     `)

//     inserir dados na tabela 

//     const query =
//     `
//     INSERT INTO places(
//     image,
//     name,
//     address,
//     address2, 
//     state,
//     city,
//     items 
//     ) VALUES (?,?,?,?,?,?,?); 
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
//         "colectoria",
//         "Guilherme gibala, Jardim America",
//         "numero 260",
//         "santa catarina",
//         "Rio do sul",
//         "Resídios eletronicos, lampadas"
//     ]


//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("cadastrado com sucesso ")
//         console.log(this)
//     }
 
//     db.run(query, values, afterInsertData)

//     // consutar dados sql

//     db.all(`SELECT * FROM places`, function(err, rows ){
//         if (err){
//             return console.log(err) 
//         }
//         console.log("aqui estão seus registros: ")
//         console.log(rows)
//     })

//     // deletar dados da tabela 

//     // db.run(`DELETE FROM PLACE `)

    // db.run(`DELETE FROM places WHERE id = ? `,[3], function(err){

    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("registro deletado com sucesso !")
    // });
    
// })
