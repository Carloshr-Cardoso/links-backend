const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    return res.json('API Running..')
})

app.listen(3001, ()=>{
    console.log('Servidor Rodando na porta 3001: http://localhost:3001/');
})