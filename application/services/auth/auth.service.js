const User = require("../../../infra/db/mongoose/models/user")
const generateAuthToken = require("../../../infra/utils/jwt")

class AuthService{

    static async userLogin(userBody){

        const userAuth = await User.findByCredentials(userBody.email,userBody.password)
        const token = await generateAuthToken(userAuth)
        
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

}

module.exports = AuthService;