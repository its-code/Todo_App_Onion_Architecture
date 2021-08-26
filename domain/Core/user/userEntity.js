class User {

    constructor(name,email,password,age){
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }


    static createFromObject(userObj){
        return new User(
            userObj.name,
            userObj.email,
            userObj.password,
            userObj.age
        )
    }
    
    
}

module.exports = User;


// ----------------------



    

