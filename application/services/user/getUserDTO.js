
class GetUserDTO {
    
  constructor(userID ,name, email, password, age) {
    this.userID = userID,
    this.name = name,
    this.email = email,
    this.password = password,
    this.age = age
  }

  getUserID(){
    return this.userID;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

}

module.exports = GetUserDTO;
