const User = require("../../../infra/db/mongoose/models/user")
const UserRepository = require("../../../infra/db/mongoose/repository/user.repository")
const httpStatus = require("http-status")
const ApiError = require("../../../http/utils/ApiError");
const UserEntity = require("../../../domain/Core/user/userEntity")

class UserService{
    
    static async createUser(updateUserDTO){

        if (await User.isEmailTaken(updateUserDTO.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }

        const me = await UserRepository.add(updateUserDTO);
        
        return me;
    }

    static async getFindUser(getUserDTO){

        const userID = await UserRepository.find(getUserDTO.getUserID());
        if(!userID){
            throw new ApiError(httpStatus.NOT_FOUND,"No User Found against this ID")
        }
        return userID;
    }

    static async updateUser(updateUserDTO){
        
        const updates = Object.keys(updateUserDTO);
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))

        if(!isValid)
            throw new ApiError(httpStatus.BAD_REQUEST, "Inputs are Invalid!!!")

        const userEntity = UserEntity.createFromObject(updateUserDTO);

        await UserRepository.update({updates,user,userEntity})
        
        const response = {
            message: "User Updated Successfully!!!"
        }

        return response;

    }

    static async deleteUser(delUser){

        await UserRepository.remove(delUser.getUserID());

        const response = {
            message: "User Deleted Successfully!!!"
        }
        return response;
    }

}

module.exports = UserService