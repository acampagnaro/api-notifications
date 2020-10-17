const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
axios.defaults.baseURL = process.env.AXIOS_DOMAIN

module.exports = {
  login () {
    let token = ''
    return axios.post('/customers/auth/login', { username: process.env.USER_NAME, password: process.env.AUTH_PASSWORD })
      .then((user) => {
        token = user.data.result.token
        console.log(`Auth Success`)
        return token
      })
      .catch((err) => {
        console.log(`Erro! ${err}`)
      })
  }
}