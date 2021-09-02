class UpdateUserDTO {
    
    constructor(name, email, password, age) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.age = age
    }

    getName() {
        return this.name
    }

    getEmail() {
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getAge(){
        return this.age;
    }

    static create({name, email, password, age}) {
        return new UpdateUserDTO(name, email, password, age)
    }

}

module.exports = UpdateUserDTO