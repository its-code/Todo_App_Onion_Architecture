const {JWT_SECRET} = require("../../config/auth.config")
const jwt = require('jsonwebtoken')


const generateAuthToken = async function(user){
    const token = jwt.sign({ _id: user._id.toString() },JWT_SECRET);
  
    user.tokens = user.tokens.concat({token});
  
    await user.save();
    return token;
}


module.exports = generateAuthToken;