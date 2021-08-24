const User = require("../../db/models/user")
const UserRepository = require("../../db/repository/user.repository")
const httpStatus = require("http-status")
const ApiError = require("../../http/utils/ApiError")

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
}



module.exports = UserService