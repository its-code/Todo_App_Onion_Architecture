const UserService = require("../../application/services/user.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")
const CreateUserDTO = require("../../domain/DTO/createUserDTO")
const UpdateUserDTO = require("../../domain/DTO/updateUserDTO")
const DeleteUserDTO = require("../../domain/DTO/deleteUserDTO")
const GetUserDTO = require("../../domain/DTO/getUserDTO")

class UserController{


    static createUser = catchAsync(async (req,res) => {
        const {name, email, password, age} = req.body;
        const userDTO = await CreateUserDTO.create({name, email, password, age});
        const user = await UserService.createUser(userDTO);
        
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

        const userID = req.params.id
        const userFindDTO = await new GetUserDTO(userID);
        const user = await UserService.getFindUser(userFindDTO)
        res.status(httpStatus.OK).send(user)

    });

    static updateUser = catchAsync(async (req,res) => {

        const upUserDTO = await UpdateUserDTO.create(req.body)
        const userUpd = await UserService.updateUser(upUserDTO);

        res.status(httpStatus.OK).send(userUpd)
    });


    static deleteUser = catchAsync(async (req,res) => {

        const {user} = req;
        const delUserDTO = await new DeleteUserDTO(user)
        const delUser = await UserService.deleteUser(delUserDTO)
        res.status(httpStatus.OK).send(delUser)
    });

} 
 
module.exports = UserController

