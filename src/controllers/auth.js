const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();
const saltRounds = 10;

router.get('/sign-in', (req, res)=>{
    return res.json('sign in!')
})

router.get('/sign-up', async (req, res)=>{
    const { email, password } = req.body;

    const account = await Account.findOne({where:{email}});
    if (account){
        return res.jsonUnauthorized(null, 'Account already exists!');
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    const newAccount = await Account.create({email, password: hash})

    return res.jsonOK(newAccount);

})

module.exports = router;