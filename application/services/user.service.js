const User = require("../../db/mongoose/models/user")
const UserRepository = require("../../db/mongoose/repository/user.repository")
const httpStatus = require("http-status")
const ApiError = require("../../http/utils/ApiError");

class UserService{
    
    static async createUser(userBody){


        if (await User.isEmailTaken(userBody.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }

        const me = await UserRepository.create(userBody);
        
        return me;
    }

    static async userLogin(userBody){

        const userAuth = await User.findByCredentials(userBody.email,userBody.password)
        const token = await userAuth.generateAuthToken()
        
        const loginObj = {userAuth,token}

        return loginObj;
    }

    static async userLogOut(logOutObj){
        
        let tokens = logOutObj.tokens
        const user = logOutObj.user;
        tokens = tokens.filter(token => token.token !== logOutObj.token) 
        await user.save()

        const resp = {
            message : "User Successfully Log Out!!!"
        }
        return resp;
    }

    static async getFindUser(id){

        const userID = await UserRepository.find(id);
      
        return userID;
    }

    static async updateUser(userBody){

        const {updates,user,body} = userBody;
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))
    
        if(!isValid)
            throw new ApiError(httpStatus.BAD_REQUEST, "Inputs are Invalid!!!")

        await UserRepository.update({updates,user,body})
        
        const response = {
            message: "User Updated Successfully!!!"
        }

        return response;
    }

    static async deleteUser(delUser){
        

        await UserRepository.delete(delUser.user);

        const response = {
            message: "User Deleted Successfully!!!"
        }
        return response;
    }

}

module.exports = UserService