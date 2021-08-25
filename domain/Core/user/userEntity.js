class User {

    constructor({name,email,password,age}){
        this.name = name;
        this.email = email;
        this.password = password;
        this.age = age;
    }


    setUserName(name){
        this.name = name;
    }
    
    setUserEmail(email){
        this.email = email;
    }

    setUserPassword(password){
        this.password = password;
    }

    setUserAge(age){
        this.age = age;
    }

    static UserObject(userObj){
        const user = new User(
            userObj.name,
            userObj.email,
            userObj.password,
            userObj.age
        );
        
        user.setUserName(userObj.name);

        user.setUserEmail(userObj.email);

        user.setUserPassword(userObj.password);

        user.setUserAge(userObj.age);


        
        return user;
    }
    
    
}

module.exports = User;

    

