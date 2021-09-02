class DeleteUserDTO {
    constructor(userID) {
        this.userID = userID;
      }
      
    getUserID() {
        return this.userID;
    }
}

module.exports = DeleteUserDTO