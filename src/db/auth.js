const axios = require('axios');

let root_url = 'https://3000-df0291cc-875b-4121-ad18-fd77918a4b21.ws-eu01.gitpod.io';

module.exports.addUser = async (user) => {
  try{
    let newUser = await axios.post(root_url + '/register', user);
    localStorage.setItem("authToken", newUser.token);
    localStorage.setItem("userDetails", JSON.stringify(user));
  } catch (error) {
    throw Error('Email is taken')
  }      
}

module.exports.login = async(email, password)=>{
    let user = await axios.post(root_url + '/login', {email, password});
    localStorage.setItem("authToken", user.token);
    localStorage.setItem("userDetails", JSON.stringify(user));
    return user;
}

module.exports.getToken = () => {
  return localStorage.getItem("authToken");
}

module.exports.logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userDetails");
}
