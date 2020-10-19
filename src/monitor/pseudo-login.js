const http = require('../services/httpHelper')

module.exports = {
  login () {
    return http.post('/customers/auth/login', { 
      username: process.env.USER_NAME, 
      password: process.env.AUTH_PASSWORD 
    })
      .then((user) => {
        console.log('Auth Success')

        return user.data.result.token
      })
      .catch((err) => {
        console.log(`ERROR.Pseudo-Login: ${err}`)
      })
  }
}