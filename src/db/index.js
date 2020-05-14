class Auth {
  constructor() {
    this.users = [
      {
        email: "abc@abc.com",
        name: "First Name",
        id: 0,
        role: "student",
        password: "abcd1234",
      },
    ];
  }

  addUser(user) {
    if (!this.findByEmail(user.email)) {
      this.users.push(user);
      return this.login(user.email, user.password);
    }
    throw Error("User with email already exists");
  }

  findByEmail(email) {
    return this.users.find((user) => user.email == email);
  }

  login(email, password) {
    // console.log(user);
    let foundUser = this.findByEmail(email);
    if (foundUser) {
      if (foundUser.password === password) {
        let token = "moke-jwt-token";
        localStorage.setItem("appAuthToken", token);
        localStorage.setItem("userDetails", JSON.stringify(foundUser));
      } else {
        throw Error("Password is incorrect");
      }
    } else {
      throw Error("User does not exist");
    }
  }

  getToken() {
    return localStorage.getItem("appAuthToken");
  }

  logout() {
    localStorage.removeItem("appAuthToken");
    localStorage.removeItem("userDetails");
  }
}

let auth = new Auth();

export default auth;
