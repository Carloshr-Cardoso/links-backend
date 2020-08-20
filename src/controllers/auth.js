const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');
const { accountSignUp, accountSignIn } = require('../validators/account')
const { getMessages } = require('../helpers/messages')
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt')


const router = express.Router();
const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (req, res)=>{
    const { email, password } = req.body;

    //Verifica usuário
    const account = await Account.findOne({where:{email}});
    if (!account){
        return res.jsonBadRequest(null, getMessages('account.signin.invalid'));
    }
    
    //validar Senha
    const match = bcrypt.compareSync(password, account.password);
    if (!match){
        return res.jsonBadRequest(null, getMessages('account.signin.invalid'));
    }
    
    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({ id: account.id });

    return res.jsonOK(account, getMessages('account.signin.succsess'), { token, refreshToken });


})



router.post('/sign-up', accountSignUp, async (req, res)=>{
    const { email, password } = req.body;

    const account = await Account.findOne({where:{email}});
    if (account){
        return res.jsonUnauthorized(null, getMessages('account.signup.email_exists'));
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({email, password: hash})

    const token = generateJwt({ id: newAccount.id });
    const refreshToken = generateRefreshJwt({ id: newAccount.id });

    return res.jsonOK(newAccount, getMessages('account.signup.succsess'), { token, refreshToken });

})

module.exports = router;