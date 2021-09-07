const jwt = require("jsonwebtoken")
const User = require("../../infra/db/mongoose/models/user")
const {JWT_SECRET} = require("../../config/auth.config")
const UserRepository = require("../../infra/db/mongoose/repository/user.repository")
const auth =async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded =  jwt.verify(token, JWT_SECRET)
        const user = await UserRepository.findOne({_id: decoded._id, 'tokens.token' :token })
        if(!user){
            throw new Error()
        }

        req.token = token
        req.user=user
        next()
    }catch{
        res.status(401).send({ error: "Please Authenticate !"})
    }
}

module.exports = auth;