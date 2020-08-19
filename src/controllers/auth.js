const express = require('express');
const bcrypt = require('bcrypt');
const { Account } = require('../models');

const router = express.Router();
const saltRounds = 10;

router.get('/sign-in', (req, res)=>{
    return res.json('sign in!')
})

router.get('/sign-up', async (req, res)=>{
    const email = 'carloshr.cardoso@outlook.com';
    const password = '12345';

    const hash = bcrypt.hashSync(password, saltRounds);
    
    console.log(hash)
    const result = await Account.create({email, password: hash})

    return res.json(result)
})

module.exports = router;