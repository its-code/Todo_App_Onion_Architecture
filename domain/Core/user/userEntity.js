class User {

    constructor(name,email,password,age,tokens){
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
        this.tokens = tokens;
    }

    static createFromObject(userObj){
        return new User(
            userObj.name,
            userObj.email,
            userObj.password,
            userObj.age,
            userObj.tokens
        )
    }
    
}

module.exports = User;

// ----------------------



    

