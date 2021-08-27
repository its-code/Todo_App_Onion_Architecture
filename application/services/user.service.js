const User = require("../../db/mongoose/models/user")
const UserRepository = require("../../db/mongoose/repository/user.repository")
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

    static async userLogin(userBody){

        const userAuth = await user.findByCredentials(userBody.email,userBody.password)
        const token = await userAuth.generateAuthToken()
        
        const loginObj = {userAuth,token}

        return loginObj;
    }

    static async userLogOut(logOutObj){
        const tokens = logOutObj.tokens
        tokens = tokens.filter(token => token.token !== req.token) 
        await req.user.save()

        const resp = {
            message : "User Sucessfully Log Out!!!"
        }
        return resp;
    }

    static async getFindUser(id){

        const userID= await user.findById(id)
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
            message: "User Updated Sucessfully!!!"
        }

        return response;
    }
}



module.exports = UserService