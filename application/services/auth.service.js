
class AuthService{

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

}

module.exports = AuthService;