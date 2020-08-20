require('dotenv').config()

const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

options = { expiresIn: "30 minutes" };
refreshOptions = { expiresIn: "30 days" };

const generateJwt = (payload) =>{
    return jwt.sign(payload, tokenPrivateKey, options);
}

const generateRefreshJwt = (payload) =>{
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
}

const verifyJwt = (token) =>{
    return jwt.verify(token, tokenPrivateKey);
}

const verifyRefreshJwt = (token) =>{
    return jwt.verify(token, refreshTokenPrivateKey);
}

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt };