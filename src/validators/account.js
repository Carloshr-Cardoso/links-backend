const joi = require('@hapi/joi')
const { getValidatorError } = require('../helpers/validator')

//Regras de Validação Para SignIn e SignUp
const rules = {
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
    passwordConfirmation: joi.string().valid(joi.ref('password')).required()
}

const accountSignIn = (req, res, next) =>{
    const {email, password} = req.body;
    
    const schema = joi.object({
        email: rules.email,
        password: rules.password
    })

    const { error } = schema.validate({email, password}, {abortEarly: false})
    
    if (error){
        const errorMessages = getValidatorError(error, 'account.signin');
        return res.jsonBadRequest(null, null, errorMessages);
    }

    next();
};


const accountSignUp = (req, res, next) =>{
    const {email, password, passwordConfirmation} = req.body;
    
    const schema = joi.object({
        email: rules.email,
        password: rules.password,
        passwordConfirmation: rules.passwordConfirmation
    })

    const { error } = schema.validate({email, password, passwordConfirmation}, {abortEarly: false})
    
    if (error){
        const errorMessages = getValidatorError(error, 'account.signup');
        return res.jsonBadRequest(null, null, errorMessages);
    }

    next();
};

module.exports = { accountSignUp, accountSignIn }