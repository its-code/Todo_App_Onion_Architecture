
const AuthService = require("../../application/services/auth.service")
const catchAsync = require("../utils/catchasync")
const httpStatus = require("http-status")


class AuthController {

    static userLogin = catchAsync(async (req,res) => {

        const {email,password} = req.body;
        const userAuth = await AuthService.userLogin({email,password});
        res.status(httpStatus.OK).send(userAuth)
    });

    static userLogOut = catchAsync(async (req,res) => {

        const {user,token} = req
        const {tokens} = req.user;
        const userlogOut = await AuthService.userLogOut({tokens,user,token})
        res.status(httpStatus.OK).send(userlogOut)
    });

}

module.exports = AuthController