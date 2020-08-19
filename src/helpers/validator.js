const messages = require('../config/messages.json')

const getMessages = (path, message) =>{
    return messages[path] || message;
}

const getValidatorError = (error, messagePath) =>{
    if (!error) return null;

    const message = error.details[0].message;
    const type = error.details[0].type;
    const key = error.details[0].context.key;

    const path = `${messagePath}.${key}.${type}`;
    console.log(path);
    const newMessage = getMessages(path, message)
    return {key, message: newMessage};
    // return {error};
};

module.exports = { getValidatorError, getMessages };