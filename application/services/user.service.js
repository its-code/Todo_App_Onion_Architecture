const User = require("../../db/mongoose/models/user")
const UserRepository = require("../../db/mongoose/repository/user.repository")
const httpStatus = require("http-status")
const ApiError = require("../../http/utils/ApiError");
const { deleteUser } = require("../../http/controllers/user.controller");

class UserService{
    
    static async createUser(userBody){

        if (await User.isEmailTaken(userBody.email)) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
        }

        const me = new User(userBody)
        await me.save()
        const token = await me.generateAuthToken()  
        return {me,token};
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

        const userID= await User.findById(id)
        if(!userID){
            throw new ApiError(httpStatus.NOT_FOUND,"No User Found against this ID")
        }
        return userID;
    }

    static async updateUser(userBody){

        const {updates,user,body} = userBody;
        const propertiesUsers = ['name','email','password','age']
        const isValid = updates.every( update => propertiesUsers.includes(update))
    
        if(!isValid)
            throw new ApiError(httpStatus.BAD_REQUEST, "Inputs are Invalid!!!")

        updates.forEach((update)=>{
            user[update] = body[update]
        })

        await user.save()
        
        const response = {
            message: "User Updated Successfully!!!"
        }

        return response;
    }

    static async deleteUser(delUser){
        
        const user = delUser.user;
        await user.remove()

        const response = {
            message: "User Deleted Successfully!!!"
        }
        return response;
    }

}

module.exports = UserService