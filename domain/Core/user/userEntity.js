class User {

    constructor(_id,name,email,age,createdAt,updatedAt){
        this.name = name;
        this.email = email;
        this.age = age;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createFromObject(userObj){
        return new User(
            userObj.name,
            userObj.email,
            userObj.age,
            userObj.createdAt,
            userObj.updatedAt
        )
    }
    
}

module.exports = User;




    

