const messages = require('../config/messages.json')

const getMessages = (path, message=null) =>{
    return messages[path] || message;
}

module.exports = { getMessages };