const express = require('express');
const db = require('./models');
const response = require('./middlewares/response')

const authController = require('./controllers/auth');
const linkController = require('./controllers/links');
const app = express();


app.use(response);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/* /auth/sign-in  */
app.use('/auth', authController);
/* /link/  */
app.use('/link', linkController);

app.get('/', (req, res)=>{
    return res.json('API Running..')
})


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log('Servidor Rodando na porta 3001: http://localhost:3001/');
    })
})