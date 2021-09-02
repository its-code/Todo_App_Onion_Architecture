const User = require('../Core/user/userEntity');

class CreateUserDTO {

  constructor(name, email, password, age) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.age = age;
  }

  getUserName(){
    return this.name;
  }

  getUserEmail(){
    return this.email;
  }

  getUserPassword(){
    return this.password;
  }

  getUserAge(){
    return this.age;
  }

  getUser(){
    const {name, email, password, age} = this
    return User.createFromObject({name, email, password, age});
  }

  static create({name, email, password, age}){
    return new CreateUserDTO(name, email, password, age)
  }

}

module.exports = CreateUserDTO;


