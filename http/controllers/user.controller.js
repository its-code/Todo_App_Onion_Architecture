const user = require("../../db/models/user")
const UserService = require("../../app/services/user.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")


class UserController{


    static createUser = catchAsync(async (req,res) => {
            const user = await UserService.createUser(req.body);
            res.status(httpStatus.CREATED).send(user);
    });
    

    static async userLogin(req,res){
        try{
            const userAuth = await user.findByCredentials(req.body.email,req.body.password)
            const token = await userAuth.generateAuthToken()
    
            res.send({userAuth, token})
        }catch(e){
            res.status(400).send(e)
        }    
    }

    static async userLogOut(req,res){
        try{
            req.user.tokens = req.user.tokens.filter(token => token.token !== req.token) 
            await req.user.save()
            res.send()
        }catch(e){
            res.status(500).send(e)
        }
    }

    static async getFindUser(req,res){

        try{
            const _id = req.params.id
            const userID= await user.findById(_id)
              
            if(!userID){
              return res.status(404).send()
            }
            res.send(userID)
      
          }catch(e){
              res.status(400).send(e)
          }
    }

    static async updateUser(req,res){

        const updates = Object.keys(req.body) 
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))
    
        if(!isValid)
            return res.status(400).send()
    
        try{
            updates.forEach((update)=>{
                req.user[update] = req.body[update]
            })
    
          await req.user.save()  
          res.send(req.user)
        }catch(e){
            res.status(400).send(e)
        }
    }

    static async deleteUser(req,res){
        try{
            await req.user.remove()
            res.send(req.user)
        }catch(e){
            res.status(400).send(e)
        }
    }

} 

module.exports = UserController

