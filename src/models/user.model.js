export default class UserModel {
    constructor(id, name, email, password,role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
    }
    static add(name,email,password,role) {
      const newUser = new UserModel(users.length+1, name,email,password,role);
      users.push(newUser);
    }
  
    static isValidUser(email,password) {
      const result = users.find(u => u.email == email && u.password == password);
      return result;
    }
  }

  var users = [];