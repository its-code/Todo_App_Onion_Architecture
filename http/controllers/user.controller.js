const UserService = require("../../application/services/user/user.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")
const CreateUserDTO = require("../../application/services/user/createUserDTO")
const UpdateUserDTO = require("../../application/services/user/updateUserDTO")
const DeleteUserDTO = require("../../application/services/user/deleteUserDTO")
const GetUserDTO = require("../../application/services/user/getUserDTO")

class UserController{


    static createUser = catchAsync(async (req,res) => {
        const {name, email, password, age} = req.body;
        const userDTO = await CreateUserDTO.create({name, email, password, age});
        const user = await UserService.createUser(userDTO);
        
        res.status(httpStatus.CREATED).send(user);
    });

    static getFindUser = catchAsync(async (req,res) => {

        const userID = req.params.id
        const userFindDTO = await new GetUserDTO(userID);
        const user = await UserService.getFindUser(userFindDTO)
        res.status(httpStatus.OK).send(user)

    });

    static updateUser = catchAsync(async (req,res) => {
        const {name, email, password, age} = req.body;
        const upUserDTO = await UpdateUserDTO.create({name, email, password, age})
        const userUpd = await UserService.updateUser(upUserDTO,req.user);

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

