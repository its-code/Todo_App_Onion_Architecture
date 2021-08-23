const users = require("../../db/models/user")
const UserRepository = require("../../db/repository/user.repository")

class UserService{
    
    static async createUser(userBody){

        const user = new users(userBody)
        const userCreated = await UserRepository.create(user)
        return userCreated;
    }
}

module.exports = UserService