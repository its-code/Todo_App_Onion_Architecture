const user = require("../../db/mongoose/models/user")
const UserService = require("../../application/services/user.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")


class UserController{


    static createUser = catchAsync(async (req,res) => {
        const user = await UserService.createUser(req.body);
        res.status(httpStatus.CREATED).send(user);
    });
    

    static userLogin = catchAsync(async (req,res) => {

        const userAuth = await user.findByCredentials(req.body.email,req.body.password)
        const token = await userAuth.generateAuthToken()

        res.status(httpStatus.OK).send({userAuth, token})
    });

    static userLogOut = catchAsync(async (req,res) => {

        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token) 
        await req.user.save()
        res.status(httpStatus.OK).send()

    });

    static getFindUser = catchAsync(async (req,res) => {

        const _id = req.params.id
        const userID= await user.findById(_id)
            
        if(!userID){
            return res.status(404).send()
        }
        res.status(httpStatus.OK).send(userID)
    });

    static updateUser = catchAsync(async (req,res) => {

        const updates = Object.keys(req.body) 
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))
    
        if(!isValid)
            return res.status(400).send()

        updates.forEach((update)=>{
            req.user[update] = req.body[update]
        })

        await req.user.save()  
        res.status(httpStatus.OK).send(req.user)
    });

    static deleteUser = catchAsync(async (req,res) => {

        await req.user.remove()
        res.status(httpStatus.NO_CONTENT).send(req.user)
    });

} 

module.exports = UserController

