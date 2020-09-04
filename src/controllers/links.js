const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    return res.jsonOK('Links');
});

router.post('/', (req, res) => {
    return res.jsonOK(null, 'POST Efetuado com Sucesso');
});

module.exports = router;