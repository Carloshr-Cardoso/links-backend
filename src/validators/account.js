const joi = require('@hapi/joi')
const { getValidatorError } = require('../helpers/validator')


const accountSignUp = (req, res, next) =>{
    const {email, password, passwordConfirmation} = req.body;
    
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z-0-9]{3,30}$')),
        passwordConfirmation: joi.string().valid(joi.ref('password')).required(),
    })

    const { error } = schema.validate({email, password, passwordConfirmation}, {abortEarly: false})
    
    if (error){
        const errorMessages = getValidatorError(error, 'account.signup');
        return res.jsonBadRequest(null, null, errorMessages);
    }

    next();
};

module.exports = { accountSignUp }