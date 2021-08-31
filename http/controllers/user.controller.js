const UserService = require("../../application/services/user.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")


class UserController{


    static createUser = catchAsync(async (req,res) => {
        const user = await UserService.createUser(req.body);
        res.status(httpStatus.CREATED).send(user);
    });
    

    static userLogin = catchAsync(async (req,res) => {

        const {email,password} = req.body;
        const userAuth = await UserService.userLogin({email,password});
        res.status(httpStatus.OK).send(userAuth)
    });

    static userLogOut = catchAsync(async (req,res) => {

        const {user,token} = req
        const {tokens} = req.user;
        const userlogOut = await UserService.userLogOut({tokens,user,token})
        res.status(httpStatus.OK).send(userlogOut)
    });

    static getFindUser = catchAsync(async (req,res) => {

        const _id = req.params.id
        const userID = await UserService.getFindUser(_id)
        res.status(httpStatus.OK).send(userID)
    });


    static updateUser = catchAsync(async (req,res) => {

        const updates = Object.keys(req.body);
        const {user,body} = req;
        const userUpd = await UserService.updateUser({updates,user,body});

        res.status(httpStatus.OK).send(userUpd)
    });


    static deleteUser = catchAsync(async (req,res) => {

        const {user} = req;
        const delUser = await UserService.deleteUser({user})
        res.status(httpStatus.OK).send(delUser)
    });

} 
 
module.exports = UserController

