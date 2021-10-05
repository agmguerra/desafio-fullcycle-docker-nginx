const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const pool = mysql.createPool({
    host: 'mysqldb',
    user: 'admin',
    password: 'admin',
    database: 'nodedb'
})

console.log("Inciando a inserção");
const sql = `insert into people(name) values('Alexandre')`

function insertRow(insertSql) {
    console.log("Inciando a inserção");
    pool.getConnection((err, conn) => {
        if (err) throw err
        console.log("Vou realizar o insert");
        conn.query(insertSql, (err, response) => {
            conn.release();
            if (err) throw err
            console.log(`id ${response.insertId} foi inserido`)
        })
    })
}

setTimeout(() => {
    insertRow(sql);
},5000)


app.get('/', (req, res) => {

    let data
    pool.getConnection((err, conn) => {
        if (err) throw err
        
        conn.query('select name from people', (err, rows, fields) => {
            conn.release();
            if (err) throw err
            let html = ''
            rows.forEach(element => {
                html += '<li>' + element.name + '</li>' 
            });
            
            html = '<ul>' + html + '</ul>'
            console.log(html);
            res.send('<h1>Full Cycle</h1>' + '<p/>' + html);
        })
    })

 
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})
